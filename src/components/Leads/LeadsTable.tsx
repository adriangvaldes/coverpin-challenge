import { Spinner } from "../Spinner";
import { StatusBadge } from "./StatusBadge";

interface LeadsTableProps {
  filteredAndSortedLeads: any[];
  isLoading: boolean;
  setSelectedLeadId: (id: string) => void;
}
export function LeadsTable({ filteredAndSortedLeads, isLoading, setSelectedLeadId }: LeadsTableProps) {
  return (
    <div className='overflow-x-auto'>
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
    </div>
  );
}
