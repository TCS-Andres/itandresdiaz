import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/lib/site";
import { summit } from "@/lib/summit";

/**
 * "Save my contact" on /summit. A vCard built from the same details as the rest
 * of the site, with a photo, rendered once at build time. On a phone, opening it
 * goes straight to the add-contact screen.
 */
export const dynamic = "force-static";

/** vCard lines longer than 75 characters must be folded onto continuation lines. */
function fold(line: string) {
  const parts: string[] = [];
  for (let i = 0; i < line.length; i += 74) parts.push(line.slice(i, i + 74));
  return parts.join("\r\n ");
}

/** Commas, semicolons, and backslashes are separators in vCard text values. */
const esc = (value: string) => value.replace(/([\\;,])/g, "\\$1");

export async function GET() {
  const [first, ...rest] = site.name.split(" ");
  const photo = await readFile(path.join(process.cwd(), "public", "andres-contact.jpg"));

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${esc(rest.join(" "))};${esc(first)};;;`,
    `FN:${esc(site.name)}`,
    `ORG:${esc(site.company)}`,
    `TITLE:${esc(site.role)}`,
    `EMAIL;TYPE=INTERNET,WORK:${summit.links.email}`,
    `URL:${site.url}`,
    `URL;TYPE=WORK:${site.website}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${summit.links.linkedin}`,
    `X-SOCIALPROFILE;TYPE=instagram:${summit.links.instagram}`,
    `NOTE:${esc(`Met at the AI for Small Business Summit 2026. Book a free 30-minute call at ${site.url}/summit`)}`,
    `PHOTO;ENCODING=b;TYPE=JPEG:${photo.toString("base64")}`,
    "END:VCARD",
  ];

  return new Response(lines.map(fold).join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      // Inline so iPhone Safari opens the add-contact sheet directly; desktop
      // browsers cannot render a vCard, so they save it under this name.
      "Content-Disposition": 'inline; filename="Andres Diaz.vcf"',
    },
  });
}
