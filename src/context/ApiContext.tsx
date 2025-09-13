import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { leadsData } from "../utils/leadsData";
import type { LeadsApiData } from "../types";

type ApiError = {
  message: string;
  details?: any;
};

interface ApiContextType {
  isLoading: boolean;
  error: ApiError | null;
  get: <T>(url: string) => Promise<T>;
  post: <T>(url: string, data?: any) => Promise<T>;
  leadsDataFetched: LeadsApiData[];
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

type ApiProviderProps = {
  children: ReactNode;
};

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [leadsDataFetched, setLeadsDataFetched] = useState<LeadsApiData[]>([]);

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
          new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log(`Buscando dados fictícios de: ${url}`);
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
    <T,>(url: string, data: any): Promise<T> => {
      return handleRequest(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              console.log(`Dados "enviados" para ${url}:`, data);
              resolve({ success: true, received: data } as any);
            }, 1000);
          })
      );
    },
    [handleRequest]
  );

  async function GetLeadsData() {
    try {
      const data = await get<LeadsApiData[]>("/posts");
      setLeadsDataFetched(data);
    } catch (error) {
      console.error("Error fetching leads data:", error);
      throw error;
    }
  }

  useEffect(() => {
    GetLeadsData();
  }, []);

  const contextValue = useMemo(
    () => ({
      isLoading,
      error,
      get,
      post,
      leadsDataFetched,
    }),
    [isLoading, error, get, post, leadsDataFetched]
  );

  return <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>;
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
