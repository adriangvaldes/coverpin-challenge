import { Search, ChevronDownIcon } from "lucide-react";
import { LeadsTable } from "./LeadsTable";
import { useMemo, useState } from "react";
import { useApi } from "../../context/ApiContext";
import { usePersistentState } from "../../hooks/usePersistentState";

export function Leads() {
  const { leadsDataFetched } = useApi();

  const [searchTerm, setSearchTerm] = usePersistentState("seller-console-search", "");
  const [statusFilter, setStatusFilter] = usePersistentState("seller-console-status", "All");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  const filteredAndSortedLeads = useMemo(() => {
    return leadsDataFetched
      .filter((lead) => {
        const lowerSearch = searchTerm.toLowerCase();
        const matchesSearch =
          lowerSearch === "" ||
          lead.name.toLowerCase().includes(lowerSearch) ||
          lead.company.toLowerCase().includes(lowerSearch);

        const matchesStatus = statusFilter === "All" || lead.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => b.score - a.score);
  }, [leadsDataFetched, searchTerm, statusFilter]);

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

        <LeadsTable
          filteredAndSortedLeads={filteredAndSortedLeads}
          isLoading={isLoading}
          setSelectedLeadId={setSelectedLeadId}
        />
      </div>
    </div>
  );
}
