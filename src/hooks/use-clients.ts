import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { clientsApi } from '@/lib/api/clients';
import { ClientsResponse } from '@/types/api';

type ClientsQueryKey = [string];
type ClientsQueryOptions = Omit<
  UseQueryOptions<ClientsResponse, Error, ClientsResponse, ClientsQueryKey>,
  'queryKey' | 'queryFn'
>;

export const useClients = (options?: ClientsQueryOptions) => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: clientsApi.getClients,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    ...options,
  });
};

type ClientsWithCountsQueryKey = [string];
type ClientsWithCountsQueryOptions = Omit<
  UseQueryOptions<ClientsResponse, Error, ClientsResponse, ClientsWithCountsQueryKey>,
  'queryKey' | 'queryFn'
>;

export const useClientsWithProjectCounts = (options?: ClientsWithCountsQueryOptions) => {
  return useQuery({
    queryKey: ['clients-with-counts'],
    queryFn: clientsApi.getClientsWithProjectCounts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    ...options,
  });
};
