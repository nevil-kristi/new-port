
export default function Marquee({ children, duration = "15s" }) {
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
