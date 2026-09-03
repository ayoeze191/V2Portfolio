"use client";

import { FadeUp } from "./Anim";

export default function SectionHead({
  index,
  title,
  aside,
}: {
  index: string;
  title: string;
  aside?: string;
}) {
  return (
    <FadeUp y={20} duration={0.7}>
      <div className="section-head">
        <span className="index">{index}</span>
        <span className="title">{title}</span>
        {aside && <span className="aside">{aside}</span>}
      </div>
    </FadeUp>
  );
}
