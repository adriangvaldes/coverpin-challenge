import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { leadsData } from "../utils/leadsData";
import type { Lead, Opportunity } from "../types";

type ApiError = {
  message: string;
  details?: any;
};

interface ApiContextType {
  isLoading: boolean;
  error: ApiError | null;
  get: <T>(url: string) => Promise<T>;
  post: <T>(url: string, data?: any) => Promise<T>;
  leadsDataFetched: Lead[];
  updateLeads: (newValue: Lead[]) => void;
  showToast: (message: string, type?: "success" | "error") => void;
  handleConvertToOpportunity: (lead: Lead) => void;
  opportunities: Opportunity[];
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

type ApiProviderProps = {
  children: ReactNode;
};

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [leadsDataFetched, setLeadsDataFetched] = useState<Lead[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
    show: false,
    message: "",
    type: "success",
  });

  const handleRequest = useCallback(async (request: () => Promise<any>) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await request();
      return response;
    } catch (err) {
      const apiError: ApiError = {
        message: `API Error: Failed API`, // We can enhance this to extract more meaningful messages from the error object and track the error codes.
        details: "No additional details provided.",
      };
      setError(apiError);
      throw apiError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const get = useCallback(
    <T,>(url: string): Promise<T> => {
      return handleRequest(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              if (url.includes("/posts")) {
                resolve(leadsData);
              } else {
                resolve([] as any);
              }
            }, 1500);
          })
      );
    },
    [handleRequest]
  );

  const post = useCallback(
    <T,>(data: any): Promise<T> => {
      return handleRequest(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({ success: true, received: data } as any);
            }, 1000);
          })
      );
    },
    [handleRequest]
  );

  async function GetLeadsData() {
    try {
      const data = await get<Lead[]>("/posts");
      setLeadsDataFetched(data);
    } catch (error) {
      console.error("Error fetching leads data:", error);
      throw error;
    }
  }

  const updateLeads = useCallback(
    (newValue: Lead[]) => {
      setLeadsDataFetched(newValue);
    },
    [leadsDataFetched]
  );

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  }, []);

  useEffect(() => {
    GetLeadsData();
  }, []);

  const handleConvertToOpportunity = useCallback(
    (leadToConvert: Lead) => {
      const newOpportunity: Opportunity = {
        id: `opp_${Date.now()}`,
        name: `${leadToConvert.name} - ${leadToConvert.company}`,
        stage: "Discovery",
        amount: null,
        accountName: leadToConvert.company,
      };
      setOpportunities((prev) => [...prev, newOpportunity]);
      updateLeads(leadsDataFetched.filter((lead) => lead.id !== leadToConvert.id));
      showToast("Lead converted to Opportunity!");
    },
    [showToast]
  );

  const contextValue = useMemo(
    () => ({
      isLoading,
      error,
      get,
      post,
      leadsDataFetched,
      updateLeads,
      showToast,
      handleConvertToOpportunity,
      opportunities,
    }),
    [isLoading, error, get, post, leadsDataFetched]
  );

  return (
    <ApiContext.Provider value={contextValue}>
      {children}
      <div
        className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-lg text-white transition-all duration-300 ease-in-out ${
          toast.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
        } ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
      >
        {toast.message}
      </div>
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
