import { useMemo, useState } from "react"
import { useCar } from "../context/CarContext"
import { Link } from 'react-router-dom'
import { 
  useReactTable, 
  flexRender, 
  getCoreRowModel, 
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export default function TableCars({cars}) {
  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('')
  const { deleteCar } = useCar()
  const data = useMemo(() => cars, [cars])

  const columns = [
    {
      header: 'Marca',
      accessorKey: 'brand',
    },
    {
      header: 'Modelo',
      accessorKey: 'model',
    },
    {
      header: 'Año',
      accessorKey: 'year',
      cell: ({row}) => {
        const rowData = row.original
        return <p>{dayjs(rowData.year).utc().format('DD/MM/YYYY')}</p>
      }
    },
    {
      header: 'Acciones',
      accessorKey: 'actions',
      cell: ({row}) => {
        const rowData = row.original
        return (
        <p className='flex gap-x-4 items-center'>
          <button onClick={ () => deleteCar(rowData._id) } className='px-4 py-1 border border-[#F6A11B] font-semibold rounded hover:bg-zinc-800 transition-all'>eliminar</button>
          <Link to={`/cars/${rowData._id}`} className='px-4 py-1 border border-[#13BAE6] font-semibold rounded hover:bg-zinc-800 transition-all'>editar</Link>  
        </p>)
      }
      
    }
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  })
  
  return (
    <section>
      <div className='flex flex-col sm:flex-row items-center justify-between pb-4'>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
          className='inline-flex items-center bg-zinc-800 text-zinc-200 border border-gray-300 rounded-lg text-sm px-3 py-1.5 mb-4 sm:mb-0'
        >
          {[10, 15, 20, 25, 30].map(pageSize => (
            <option key={pageSize} value={pageSize} className='hover:bg-zinc-500'>
              Mostrar {pageSize} automóviles
            </option>
          ))}
        </select>

        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-zinc-200" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input className='block p-2 pl-10 text-sm border border-gray-300 rounded-lg w-80 bg-zinc-800 text-zinc-200' type="text" value={filtering} onChange={ (e) => setFiltering(e.target.value) }  placeholder='Buscar automóvil'/>
        </div>

        
      </div>

      <div className='overflow-x-auto mx-4 sm:mx-0'>
      <table className='w-full text-sm text-left bg-zinc-800'>
        <thead className='text-xs uppercase bg-zinc-800 text-zinc-200'>
          {
            table.getHeaderGroups().map( (headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map( (header) => (
                  <th key={header.id} onClick={header.column.getToggleSortingHandler()} className='px-6 py-3'>
                    <div>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      { {asc:'🔼', desc:'🔽'}[header.column.getIsSorted() ?? null] }
                    </div>
                  </th>
                ))}
              </tr> 
            ))
          }
        </thead>
        <tbody>
          {
            table.getRowModel().rows.map( (row) => (
              <tr key={row.id} className='bg-zinc-700 hover:bg-zinc-500 text-zinc-200'>
                {row.getVisibleCells().map( (cell) => (
                  <td key={cell.id} className='px-6 py-4'>
                    {
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    }
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
      </div>

      <nav className="flex items-center justify-center sm:justify-end pt-4" aria-label="Table navigation">
        <ul className="inline-flex -space-x-px text-sm h-8">
            <li>
                <button 
                  className="flex items-center justify-center px-3 h-8 ml-0 leading-tight bg-zinc-800 text-zinc-200 hover:bg-zinc-500 hover:text-zinc-100 border border-gray-300 rounded-l-lg"
                  onClick={ () => table.setPageIndex(0) }
                >Primera</button>
            </li>
            <li>
                <button 
                  className="flex items-center justify-center px-3 h-8 leading-tight bg-zinc-800 text-zinc-200 hover:bg-zinc-500 hover:text-zinc-100 border border-gray-300 disabled:text-zinc-500 disabled:hover:bg-zinc-800"
                  disabled={!table.getCanPreviousPage()} onClick={ () => table.previousPage() }
                >Anterior</button>
            </li>
            <li>
                <button 
                  className="flex items-center justify-center px-3 h-8 leading-tight bg-zinc-800 text-zinc-200 hover:bg-zinc-500 hover:text-zinc-100 border border-gray-300 disabled:text-zinc-500 disabled:hover:bg-zinc-800"
                  disabled={!table.getCanNextPage()} onClick={ () => table.nextPage() }
                >Siguiente</button>
            </li>
            <li>
                <button 
                  className="flex items-center justify-center px-3 h-8 leading-tight bg-zinc-800 text-zinc-200 hover:bg-zinc-500 hover:text-zinc-100 border border-gray-300 rounded-r-lg"
                  onClick={ () => table.setPageIndex(table.getPageCount() - 1) }
                >Última</button>
            </li>
        </ul>
    </nav>
    </section>
  )
}
