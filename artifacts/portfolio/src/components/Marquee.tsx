import type { ReactNode } from "react";

export default function Marquee({
  children,
  duration = "15s",
}: {
  children: ReactNode;
  duration?: string;
}) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className="inline-block animate-(--animate-marquee)"
        style={{ animationDuration: duration }}
      >
        {children}
      </div>
    </div>
  );
}
