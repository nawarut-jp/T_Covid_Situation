export default function Input({
  label = "",
  placeholder = "",
  value = "",
  onChange = () => {},
}) {
  return (
    <div className="flex-col flex ">
      {label && <label className="text-gray-800 text-lg ">{label}</label>}
      <input type="number" placeholder={placeholder} value={value} onChange={onChange} className="bg-white rounded-md border border-gray-200 text-gray-500 px-3 py-3 mt-3 focus:outline-none h-full text-lg"/>
    </div>
  );
}
