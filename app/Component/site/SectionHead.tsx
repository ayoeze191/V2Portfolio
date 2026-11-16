import type { ReactNode } from "react";
import { Reveal } from "../Reveal";

/**
 * Section opener. Inner pages use the plain two-tone heading; home
 * sections pass `cmd` (the kubectl line above it) and `giant` for the
 * condensed display title. Wrap the second clause in <em>.
 */
export default function SectionHead({
  title,
  intro,
  action,
  cmd,
  index,
  giant = false,
}: {
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  cmd?: ReactNode;
  index?: string;
  giant?: boolean;
}) {
  return (
    <div className="sec-head">
      <div>
        {cmd ? (
          <Reveal y={8}>
            <p className="cmd mb-5">
              {index ? <span className="tag !text-[var(--fg-3)] mr-2">{index}</span> : null}
              <span className="ps">$</span>
              <span>{cmd}</span>
            </p>
          </Reveal>
        ) : null}
        <Reveal y={giant ? 24 : 12}>
          <h2 className={giant ? "sec-title" : "h2 max-w-[20ch]"}>{title}</h2>
        </Reveal>
        {intro ? (
          <Reveal y={12} delay={0.05}>
            <p className="lede mt-5">{intro}</p>
          </Reveal>
        ) : null}
      </div>
      {action ? <Reveal y={12} delay={0.08}>{action}</Reveal> : null}
    </div>
  );
}
