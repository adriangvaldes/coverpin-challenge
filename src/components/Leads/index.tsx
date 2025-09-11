import { Search, ChevronDownIcon } from "lucide-react";

export function Leads() {
  return (
    <div className='bg-gray-800 rounded-2xl p-10 flex flex-col gap-5 flex-1 shadow-lg'>
      <div className=''>
        <h2 className='text-xl font-bold mb-4'>Leads</h2>
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <div className='relative flex-grow'>
            <input
              type='text'
              placeholder='Search by name or company...'
              // value={searchTerm}
              onChange={(e) => console.log(e.target.value)}
              className='w-full bg-gray-700 p-2 pl-12 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
            <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
              <Search />
            </div>
          </div>
          <div className='relative'>
            <select
              // value={statusFilter}
              onChange={(e) => console.log(e.target.value)}
              className='w-full sm:w-48 appearance-none bg-gray-700 p-2 pr-8 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500'
            >
              <option value='All'>All Statuses</option>
              {["New", "Contacted", "Qualified", "Unqualified"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'>
              <ChevronDownIcon />
            </div>
          </div>
        </div>

        {/* Tabela de Leads */}
        {/* <div className='overflow-x-auto'>
              {isLoading ? (
                <div className='flex justify-center items-center h-64'>
                  <Spinner />
                </div>
              ) : filteredAndSortedLeads.length === 0 ? (
                <div className='text-center p-8 text-gray-500'>No leads found.</div>
              ) : (
                <table className='w-full text-left'>
                  <thead>
                    <tr className='border-b border-gray-700'>
                      <th className='p-2'>Name</th>
                      <th className='p-2 hidden md:table-cell'>Company</th>
                      <th className='p-2'>Status</th>
                      <th className='p-2 text-right'>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLeadId(lead.id)}
                        className='border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer'
                      >
                        <td className='p-3 font-semibold'>{lead.name}</td>
                        <td className='p-3 hidden md:table-cell'>{lead.company}</td>
                        <td className='p-3'>
                          <StatusBadge status={lead.status} />
                        </td>
                        <td className='p-3 text-right font-bold text-purple-400'>{lead.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div> */}
      </div>
    </div>
  );
}
