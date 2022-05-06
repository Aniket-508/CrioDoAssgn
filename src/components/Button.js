export default function FilterButton({ svg, text, onClick, active }) {
  return (
    <button
      className={active ? "flex items-center space-x-1 border-[1px] border-r-gray-400 px-2 py-1 rounded-lg shadow-lg bg-slate-300" : "flex items-center space-x-1 border-[1px] border-r-gray-400 px-2 py-1 rounded-lg shadow-lg hover:bg-slate-300"}
      onClick={onClick}
    >
      <span>{svg}</span>
      <p>{text}</p>
    </button>
  );
}
