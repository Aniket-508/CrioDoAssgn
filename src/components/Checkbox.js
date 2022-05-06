export default function FilterCheckbox({ name, checked = false, onChange }) {
  return (
    <div className="flex items-center h-5">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 "
      />
      <label
        htmlFor="cuisine-name"
        className="ml-2 text-base font-medium text-gray-900"
      >
        {name}
      </label>
    </div>
  );
}
