export default function Card({
  children = null,
  childrenClassName = "flex flex-col justify-start gap-2 h-full p-3 rounded",
  className = "bg-white rounded mt-7 flex flex-col justify-start shadow-[0_1px_2px_1px_rgba(0,0,0,0.1)] mb-7 ",
}) {
  return (
    <div className={className}>
      <div className={childrenClassName}>{children}</div>
    </div>
  );
}
