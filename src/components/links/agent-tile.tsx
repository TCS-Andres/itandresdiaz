import type { ComponentType, SVGProps } from "react";
import {
  InboxIcon,
  MessageIcon,
  PhoneCallIcon,
  RewindIcon,
  StarIcon,
  ZapIcon,
} from "@/components/icons";

const AGENT_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  phone: PhoneCallIcon,
  inbox: InboxIcon,
  zap: ZapIcon,
  chat: MessageIcon,
  star: StarIcon,
  rewind: RewindIcon,
};

/**
 * An AI agent's app icon: a white line icon on the brand-gradient tile, used in
 * the agent deck. `icon` is a key from
 * `links.ai.agents`.
 */
export function AgentTile({ icon, size }: { icon: string; size: number }) {
  const Icon = AGENT_ICONS[icon];
  return (
    <span
      aria-hidden="true"
      className="brand-tile grid place-items-center rounded-[28%] text-white"
      style={{ width: size, height: size }}
    >
      {Icon && <Icon style={{ width: size * 0.5, height: size * 0.5 }} strokeWidth={2.1} />}
    </span>
  );
}
