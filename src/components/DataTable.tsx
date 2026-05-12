import type { ReactNode } from "react";

interface DataTableProps<T> {
  headers: string[];
  data: T[];
  renderRow: (item: T, index: number) => ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T>({
  headers,
  data,
  renderRow,
  isLoading,
  emptyMessage = "Data belum ada, Kak!",
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-hidden rounded-titanium border border-slate-100 bg-white shadow-sm">
      {/* Container scrollable dengan scrollbar halus */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
        <table className="w-full text-left border-collapse min-w-150">
          {/* Table Header */}
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-4 sm:px-6 py-4 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-50">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {headers.map((_, j) => (
                    <td key={j} className="px-4 sm:px-6 py-4">
                      <div className="h-4 bg-slate-100 rounded-md w-full"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length > 0 ? (
              data.map((item, index) => renderRow(item, index))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-6 py-12 text-center text-slate-400 italic text-sm">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Indikator scroll buat mobile biar user tau tabel bisa digeser */}
      <div className="md:hidden py-2 bg-slate-50/50 text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest border-t border-slate-100">
        ← Geser untuk lihat detail →
      </div>
    </div>
  );
}
