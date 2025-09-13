import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { StatusBadge } from "./StatusBadge";
import type { Lead } from "../../types";

interface LeadsTableProps {
  leads: Lead[];
  onRowClick: (id: string) => void;
}
export const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onRowClick }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: leads.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className='h-full w-full overflow-auto'>
      <div className='sticky top-0 bg-gray-800 z-10 flex items-center border-b-2 border-gray-600 px-3 py-2 font-bold'>
        <div className='w-1/3'>Name</div>
        <div className='w-1/3 hidden md:block'>Company</div>
        <div className='w-1/4'>Status</div>
        <div className='w-1/4 text-right'>Score</div>
      </div>
      <div className='h-[70vh]' style={{ width: "100%", position: "relative" }}>
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const lead = leads[virtualItem.index];
          return (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
              onClick={() => onRowClick(lead.id)}
              className='flex items-center border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer px-3'
            >
              <div className='w-1/3 font-semibold truncate'>{lead.name}</div>
              <div className='w-1/3 hidden md:block truncate'>{lead.company}</div>
              <div className='w-1/4'>
                <StatusBadge status={lead.status} />
              </div>
              <div className='w-1/4 text-right font-bold text-purple-400'>{lead.score}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
