#!/usr/bin/env python3
"""Dependency-free static QA checks for the generated SUNKING GROUP site."""
from __future__ import annotations

import json
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

INTERNAL_HOSTS = {"sunkinggroup.org", "www.sunkinggroup.org"}
GTM_ID = "GTM-PV8P6DSV"


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.title_parts: list[str] = []
        self.h1_parts: list[str] = []
        self.h1_count = 0
        self.in_title = False
        self.in_h1 = False
        self.in_jsonld = False
        self.jsonld_parts: list[str] = []
        self.jsonld_blocks: list[str] = []
        self.meta: dict[str, list[str]] = {}
        self.links: list[str] = []
        self.ids: set[str] = set()
        self.images_missing_alt: list[str] = []
        self.nav_labels = 0
        self.has_menu_button = False
        self.has_primary_nav = False
        self.gtm_mentions = 0
        self.contact_form = False
        self.form_note = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        a = dict(attrs)
        if "id" in a and a["id"]:
            self.ids.add(a["id"] or "")
        if tag == "title":
            self.in_title = True
        elif tag == "h1":
            self.in_h1 = True
            self.h1_count += 1
        elif tag == "meta":
            key = (a.get("name") or a.get("property") or "").lower()
            if key:
                self.meta.setdefault(key, []).append(a.get("content") or "")
        elif tag in {"a", "link"} and a.get("href"):
            self.links.append(a["href"] or "")
            if tag == "link" and "canonical" in (a.get("rel") or "").lower().split():
                self.meta.setdefault("canonical", []).append(a["href"] or "")
        elif tag in {"img", "script"} and a.get("src"):
            self.links.append(a["src"] or "")
        elif tag == "img" and "alt" not in a:
            self.images_missing_alt.append(a.get("src") or "(unknown image)")
        elif tag == "nav" and a.get("aria-label"):
            self.nav_labels += 1
        elif tag == "nav" and a.get("id") == "primary-navigation":
            self.has_primary_nav = True
        elif tag == "button" and "menu-toggle" in (a.get("class") or "").split():
            self.has_menu_button = True
        elif tag == "script" and a.get("type") == "application/ld+json":
            self.in_jsonld = True
            self.jsonld_parts = []
        elif tag == "script" and GTM_ID in (a.get("src") or ""):
            self.gtm_mentions += 1
        elif tag == "iframe" and GTM_ID in (a.get("src") or ""):
            self.gtm_mentions += 1
        elif tag == "form" and a.get("id") == "contact-form":
            self.contact_form = True
        elif tag == "p" and "form-note" in (a.get("class") or "").split():
            self.form_note = True

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title_parts.append(data)
        if self.in_h1:
            self.h1_parts.append(data)
        if self.in_jsonld:
            self.jsonld_parts.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self.in_title = False
        elif tag == "h1":
            self.in_h1 = False
        elif tag == "script" and self.in_jsonld:
            self.in_jsonld = False
            self.jsonld_blocks.append("".join(self.jsonld_parts).strip())
            self.jsonld_parts = []


def fail(message: str) -> None:
    ERRORS.append(message)


def resolve_local_target(root: Path, source: Path, raw_url: str) -> tuple[Path | None, str]:
    parsed = urlsplit(raw_url)
    if parsed.scheme in {"mailto", "tel", "javascript", "data"}:
        return None, ""
    if parsed.scheme in {"http", "https"}:
        if parsed.hostname not in INTERNAL_HOSTS:
            return None, ""
    elif parsed.netloc:
        return None, ""
    raw_path = unquote(parsed.path)
    if not raw_path:
        target = source
    elif raw_path.startswith("/"):
        target = root / raw_path.lstrip("/")
    else:
        target = source.parent / raw_path
    if target.is_dir():
        target = target / "index.html"
    if not target.suffix and not target.exists():
        target = target / "index.html"
    return target.resolve(), unquote(parsed.fragment)


def main() -> int:
    global ERRORS
    ERRORS = []
    root = Path(sys.argv[1] if len(sys.argv) > 1 else "_site").resolve()
    if not root.is_dir():
        print(f"ERROR: generated site directory not found: {root}")
        return 2

    html_files = sorted(root.rglob("*.html"))
    canonical_pages = 0
    page_parsers: dict[Path, PageParser] = {}
    canonical_urls: set[str] = set()

    for file in html_files:
        try:
            source = file.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            fail(f"{file.relative_to(root)}: HTML is not UTF-8")
            continue
        parser = PageParser()
        parser.feed(source)
        page_parsers[file.resolve()] = parser
        rel = file.relative_to(root)
        robots = " ".join(parser.meta.get("robots", [])).lower()
        is_legacy_redirect = "noindex" in robots and rel.name != "404.html"

        if is_legacy_redirect:
            continue

        title = "".join(parser.title_parts).strip()
        description = (parser.meta.get("description") or [""])[0].strip()
        canonical = (parser.meta.get("canonical") or [""])[0].strip()
        if not title:
            fail(f"{rel}: missing title")
        if not description:
            fail(f"{rel}: missing meta description")
        elif not 70 <= len(description) <= 180:
            fail(f"{rel}: meta description length {len(description)} is outside 70–180 characters")
        if not canonical:
            fail(f"{rel}: missing canonical URL")
        elif canonical in canonical_urls:
            fail(f"{rel}: duplicate canonical URL {canonical}")
        else:
            canonical_urls.add(canonical)
        canonical_pages += 1

        if parser.h1_count != 1:
            fail(f"{rel}: expected exactly one H1, found {parser.h1_count}")
        if source.count(GTM_ID) < 2:
            fail(f"{rel}: expected GTM script and no-script iframe")
        if not parser.has_primary_nav or not parser.has_menu_button:
            fail(f"{rel}: shared navigation or mobile menu toggle is missing")
        if parser.nav_labels == 0:
            fail(f"{rel}: navigation is missing an accessible aria-label")
        if parser.images_missing_alt:
            fail(f"{rel}: image(s) missing alt attribute: {', '.join(parser.images_missing_alt)}")
        if not parser.meta.get("og:title") or not parser.meta.get("og:description"):
            fail(f"{rel}: missing Open Graph title or description")

        for block in parser.jsonld_blocks:
            try:
                data = json.loads(block)
                if not isinstance(data, (dict, list)):
                    fail(f"{rel}: JSON-LD block is not an object or array")
            except json.JSONDecodeError as exc:
                fail(f"{rel}: invalid JSON-LD ({exc})")

    # Validate local navigation, styles, scripts, images and in-page fragments.
    for file, parser in page_parsers.items():
        rel = file.relative_to(root)
        for raw_url in parser.links:
            target, fragment = resolve_local_target(root, file, raw_url)
            if target is None:
                continue
            if not target.exists():
                fail(f"{rel}: broken local reference {raw_url}")
                continue
            if fragment and target.suffix.lower() in {".html", ".htm"}:
                target_parser = page_parsers.get(target.resolve())
                if target_parser and fragment not in target_parser.ids:
                    fail(f"{rel}: missing fragment #{fragment} in {raw_url}")

    sitemap = root / "sitemap.xml"
    if not sitemap.exists():
        fail("sitemap.xml is missing")
    else:
        try:
            tree = ET.parse(sitemap)
            ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
            locations = [el.text or "" for el in tree.findall(".//sm:loc", ns)]
            if not locations:
                fail("sitemap.xml contains no URL entries")
            for location in locations:
                target, _ = resolve_local_target(root, root / "index.html", location)
                if target is not None and not target.exists():
                    fail(f"sitemap entry does not resolve to a generated file: {location}")
        except ET.ParseError as exc:
            fail(f"sitemap.xml is invalid XML: {exc}")

    if not (root / "robots.txt").exists():
        fail("robots.txt is missing")
    if not (root / "assets" / "site.css").exists():
        fail("assets/site.css is missing from generated site")
    if not (root / "assets" / "site.js").exists():
        fail("assets/site.js is missing from generated site")

    contact = page_parsers.get((root / "contact" / "index.html").resolve())
    if contact and not contact.contact_form:
        fail("contact page does not contain #contact-form")
    if contact and not contact.form_note:
        fail("contact page does not explain the static email-draft behaviour")

    print(f"Checked {len(html_files)} generated HTML files; {canonical_pages} indexable/utility pages.")
    if ERRORS:
        print(f"Found {len(ERRORS)} issue(s):")
        for error in ERRORS:
            print(f" - {error}")
        return 1
    print("PASS: metadata, canonical URLs, GTM, navigation, images, JSON-LD, local links and sitemap.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
