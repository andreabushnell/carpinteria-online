export default function DataTable({ columns, data, onView, maxHeight = "400px" }) {
  return (
    <div 
      className="w-full border border-neutral-200 rounded-lg shadow-sm overflow-x-auto"
      style={{ maxHeight: maxHeight, overflowY: 'auto' }}
    >
      <table className="w-full text-sm text-left border-collapse">
        <thead className="text-xs text-white uppercase bg-accent sticky top-0 z-10">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left">
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-left">
                  {col.render ? col.render(item[col.key], item) : item[col.key]}
                </td>
              ))}
              <td className="px-4 py-3 text-right">
                <button 
                  onClick={() => onView(item.id)}
                  className="text-primary p-xs rounded-sm hover:bg-accent hover:text-white"
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}