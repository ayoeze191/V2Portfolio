import type { ReactNode } from "react";
import { Reveal } from "../Reveal";

/**
 * Section opener: a two-tone heading on the left (wrap the grey clause in
 * <em>), an optional action on the right.
 */
export default function SectionHead({
  title,
  intro,
  action,
}: {
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="sec-head">
      <div>
        <Reveal y={12}>
          <h2 className="h2 max-w-[20ch]">{title}</h2>
        </Reveal>
        {intro ? (
          <Reveal y={12} delay={0.05}>
            <p className="lede mt-4">{intro}</p>
          </Reveal>
        ) : null}
      </div>
      {action ? <Reveal y={12} delay={0.08}>{action}</Reveal> : null}
    </div>
  );
}
