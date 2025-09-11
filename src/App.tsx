import { useState } from "react";
import { Leads, Opportunities } from "./components";

function App() {
  return (
    <div className='bg-gray-950 min-h-screen font-sans p-4 sm:p-6 md:p-8'>
      <h1 className='text-3xl text-white font-bold'>Mini Seller Console</h1>

      <div className='md:flex-row flex flex-col flex-1 w-full gap-8 mt-10'>
        <Leads />

        <Opportunities />
      </div>
    </div>
  );
}

export default App;
