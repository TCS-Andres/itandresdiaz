import { industries } from "@/lib/site";

export function Marquee() {
  const row = [...industries, ...industries];

  return (
    <section className="border-y border-line bg-white py-6" aria-label="Industries served">
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_9%,#000_91%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-10">
          {row.map((item, i) => (
            <li
              key={`${item}-${i}`}
              className="flex shrink-0 items-center gap-10 font-display text-[15px] font-semibold text-navy-300"
              aria-hidden={i >= industries.length}
            >
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-orange/60" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
