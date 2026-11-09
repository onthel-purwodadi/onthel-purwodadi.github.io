"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { InternalLink } from "@/config/types";
import { siteConfig } from "@/config/site";
import { assetPath, routePath } from "@/lib/urls";

/** Shared Yorich editorial chrome for home + all inner pages.
 * Replaces the brittle demo-HTML string-replacement navigation only;
 * the approved layout, hero, typography, footer and SEO content are preserved. */
export function FixedTemplateHeader({ links }: { links: InternalLink[] }) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const here = pathname.replace(/\/+$/, "") || "/";
  const nav = [{ label: "Home", slug: "" }, ...links.filter(link => link.slug !== "")];
  return <header className="yorich-editorial-header">
    <div className="yorich-editorial-accent" aria-hidden="true" />
    <div className="site-container yorich-editorial-head">
      <Link href={routePath("")} className="yorich-editorial-brand" onClick={() => setOpen(false)} aria-label="Onthel Purwodadi home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assetPath(siteConfig.assets.logo)} alt="" width={38} height={38}/>
        <span>{siteConfig.shortName}</span>
      </Link>
      <button type="button" className="yorich-editorial-toggle" aria-expanded={open} aria-controls="yorich-primary-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(value => !value)}>
        {open ? <X size={23}/> : <Menu size={23}/>}
      </button>
      <nav id="yorich-primary-nav" className={`yorich-editorial-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
        {nav.map(link => {
          const href = routePath(link.slug);
          const active = (href.replace(/\/+$/, "") || "/") === here;
          return <Link key={link.slug || "home"} href={href} className={`yorich-editorial-nav-link ${active ? "active" : ""}`} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>{link.label}</Link>;
        })}
      </nav>
    </div>
  </header>;
}
