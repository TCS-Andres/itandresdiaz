import Image from "next/image";
import {
  GlobeIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  UserPlusIcon,
} from "@/components/icons";
import { site } from "@/lib/site";
import { CONTACT_CARD_PATH, summit } from "@/lib/summit";

const ROWS = [
  { icon: MailIcon, label: site.email, href: `mailto:${site.email}`, external: false },
  { icon: LinkedInIcon, label: "LinkedIn", href: site.social.linkedin, external: true },
  { icon: InstagramIcon, label: "@mycreativestrategist", href: site.social.instagram, external: true },
  { icon: GlobeIcon, label: "itsandresdiaz.com", href: "/", external: false },
];

/** A digital business card: who I am, how to reach me, and one tap to save it. */
export function ContactCard() {
  return (
    <div className="rounded-3xl border border-white/12 bg-navy-600/80 p-6 shadow-elevated backdrop-blur-md md:p-7">
      <div className="flex items-center gap-4">
        <Image
          src="/andres-contact.jpg"
          alt={site.name}
          width={400}
          height={400}
          sizes="72px"
          className="h-[72px] w-[72px] shrink-0 rounded-full object-cover ring-2 ring-orange ring-offset-2 ring-offset-navy-600"
        />
        <div className="min-w-0">
          <p className="font-display text-xl font-bold text-white">{site.name}</p>
          <p className="mt-0.5 text-sm leading-snug text-white/65">{site.role}</p>
          <p className="mt-0.5 text-sm font-medium text-orange">{site.company}</p>
        </div>
      </div>

      <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
        {ROWS.map(({ icon: Icon, label, href, external }) => (
          <li key={href}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex min-h-[52px] items-center gap-3.5 py-2 text-[15px] text-white/80 transition-colors hover:text-white"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.07] text-orange transition-colors group-hover:bg-orange group-hover:text-navy">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0 truncate">{label}</span>
            </a>
          </li>
        ))}
      </ul>

      <a href={CONTACT_CARD_PATH} className="btn-primary mt-6 w-full">
        <UserPlusIcon className="h-[18px] w-[18px]" />
        {summit.hero.secondaryCta}
      </a>
    </div>
  );
}
