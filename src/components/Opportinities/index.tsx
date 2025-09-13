import { useApi } from "../../context/ApiContext";

export function Opportunities() {
  const { opportunities } = useApi();
  return (
    <div className='bg-gray-800 rounded-2xl p-10 flex flex-col gap-5 md:w-1/3'>
      <h2 className='text-xl font-bold mb-4'>Opportunities</h2>
      {opportunities.length === 0 ? (
        <div className='text-center p-8 text-gray-500'>No opportunities yet.</div>
      ) : (
        <div className='space-y-2'>
          {opportunities.map((opp) => (
            <div key={opp.id} className='bg-gray-700 p-3 rounded'>
              <p className='font-bold'>{opp.name}</p>
              <p className='text-sm text-gray-400'>{opp.stage}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
