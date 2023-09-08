export interface RowProps {
    className?: string;
    data: any[];
}

interface TableProps {
    className?: string;
    headers: RowProps;
    rows: RowProps[];
}

export const Table = ({className, headers, rows: data}: TableProps) => {
    return (
        <div className={`flex flex-col ${className}`}>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr className={headers.className}>
                      {headers.data.map((data, index) => <th key={index} className="px-4 py-2">{data}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr key={index} className={row.className}>
                        {row.data.map((data, col) => <td key={col} className="border px-4 py-2 border-gray-950 text-gray-800">{data}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    )
}