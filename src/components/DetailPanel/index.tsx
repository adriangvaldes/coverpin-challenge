import { XIcon } from "lucide-react";
import { useState, useEffect } from "react";
import type { Lead } from "../../types";

interface DetailPanelProps {
  lead: Lead;
  onClose: () => void;
  onSave: (lead: Lead) => void;
  onConvert: (lead: Lead) => void;
  isSaving: boolean;
}

export const DetailPanel = ({ lead, onClose, onSave, onConvert, isSaving }: DetailPanelProps) => {
  const [editedLead, setEditedLead] = useState(lead);
  const [emailError, setEmailError] = useState("");
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  // Controla a animação de entrada
  useEffect(() => {
    // Adiciona um pequeno delay para garantir que a transição CSS seja aplicada
    const timer = setTimeout(() => setIsPanelVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Controla a animação de saída
  const handleClose = () => {
    setIsPanelVisible(false);
    // Espera a animação terminar antes de chamar a função onClose do pai
    setTimeout(onClose, 300); // A duração deve corresponder à da transição
  };

  useEffect(() => {
    setEditedLead(lead);
    setEmailError("");
  }, [lead]);

  const handleInputChange = (field: "email" | "status", value: string) => {
    setEditedLead((prev) => ({ ...prev, [field]: value }));
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSave = () => {
    if (!emailError) {
      onSave(editedLead);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
        isPanelVisible ? "bg-opacity-50" : "bg-opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-800 text-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isPanelVisible ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='p-6 h-full flex flex-col'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold'>Lead Details</h2>
            <button onClick={handleClose} className='p-1 rounded-full hover:bg-gray-700'>
              <XIcon />
            </button>
          </div>

          <div className='flex-grow space-y-4 overflow-y-auto pr-2'>
            <div>
              <label className='text-sm text-gray-400'>Name</label>
              <p className='text-lg'>{lead.name}</p>
            </div>
            <div>
              <label className='text-sm text-gray-400'>Company</label>
              <p className='text-lg'>{lead.company}</p>
            </div>
            <div>
              <label htmlFor='email' className='text-sm text-gray-400'>
                Email
              </label>
              <input
                id='email'
                type='email'
                value={editedLead.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className='w-full bg-gray-700 p-2 rounded mt-1 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
              {emailError && <p className='text-red-400 text-sm mt-1'>{emailError}</p>}
            </div>
            <div>
              <label htmlFor='status' className='text-sm text-gray-400'>
                Status
              </label>
              <select
                id='status'
                value={editedLead.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className='w-full bg-gray-700 p-2 rounded mt-1 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500'
              >
                {["New", "Contacted", "Qualified", "Unqualified"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='text-sm text-gray-400'>Score</label>
              <p className='text-lg font-bold text-purple-400'>{lead.score}</p>
            </div>
          </div>

          <div className='flex-shrink-0 pt-4 mt-4 border-t border-gray-700 flex space-x-4'>
            <button
              onClick={handleSave}
              disabled={isSaving || !!emailError}
              className='flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded transition duration-200'
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => onConvert(lead)}
              className='flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200'
            >
              Convert to Opportunity
            </button>
            <button onClick={handleClose} className='text-gray-400 hover:text-white'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
