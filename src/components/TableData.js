export default function TableData({ data, header }) {
  const classNameHeader = `text-blue-900 text-lg font-semibold py-2 px-2 border-2 border-blue-100 whitespace-nowrap`;

  return (
    <div className=" bg-white bg-blue-900 rounded-md shadow-md mt-3 mb-10  overflow-x-auto overflow-y-hidden ">
      <table className={"rounded-t-md w-full bg-blue-50 h-full  "}>
        <thead>
          {header?.map((item, index) => (
            <tr key={index}>
              <th className={`${item.index ? classNameHeader : "hidden"}`}>
                {item.index}
              </th>
              <th className={`${item.date ? classNameHeader : "hidden"}`}>
                {item.date}
              </th>
              <th className={`${item.country ? classNameHeader : "hidden"}`}>
                {item.country}
              </th>
              <th className={`${item.cases ? classNameHeader : "hidden"}`}>
                {item.cases}
              </th>
              <th className={`${item.newCases ? classNameHeader : "hidden"}`}>
                {item.newCases}
              </th>
              <th className={`${item.deaths ? classNameHeader : "hidden"}`}>
                {item.deaths}
              </th>
              <th
                className={`${item.newDeaths ? classNameHeader : "hidden"}`}
              >
                {item.newDeaths}
              </th>
              <th className={`${item.recovered ? classNameHeader : "hidden"}`}>
                {item.recovered}
              </th>
              <th
                className={`${
                  item.newRecovered ? classNameHeader : "hidden"
                }`}
              >
                {item.newRecovered}
              </th>
            </tr>
          ))}
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 !== 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-sky-200/[0.07]`}
              >
                {item.map((col, colIndex) => (
                  <td key={colIndex} className={col.className + " px-3 py-3"}>
                    <label>{col.value}</label>
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="bg-white">
              <td colSpan={9} className="text-center text-xs p-4 text-gray-500">
                ไม่พบข้อมูล
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
