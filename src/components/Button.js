export default function FilterButton({ svg, text, onClick, active }) {
  return (
    <button
      className={active ? "flex items-center space-x-1 border-[1px] px-2 py-1 rounded-lg shadow-lg bg-slate-300" : "flex items-center space-x-1 border-[1px] bg-white px-2 py-1 rounded-lg shadow-lg hover:lg:bg-slate-300"}
      onClick={onClick}
    >
      <span>{svg}</span>
      <p>{text}</p>
    </button>
  );
}
