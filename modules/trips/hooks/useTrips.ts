import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateTripSchemaType, UpdateTripSchemaType } from "../schemas/trip";
import { GetAllResponse } from "@/modules/shared/interfaces/apiResponse";
import { QUERY_KEYS } from "../consts/query-keys";
import { Trip, TripsListParams } from "../interfaces/trip";
import { tripsApi } from "../api/trips";

export const useDeliveries = <T = Trip>(params: TripsListParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TRIPS, params],
    queryFn: async () => {
      const response = await tripsApi.getAll(params);
      return response as GetAllResponse<T>;
    },
  });
};

export const useDelivery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TRIPS, id],
    queryFn: () => tripsApi.getOne(id),
    enabled: !!id,
  });
};

export const useCreateDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTripSchemaType) => tripsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRIPS] });
    },
    onError: (error) => {
      console.error("Create delivery failed:", error);
    },
  });
};

export const useUpdateDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTripSchemaType }) => tripsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRIPS] });
    },
    onError: (error) => {
      console.error("Update delivery failed:", error);
    },
  });
};

export const useDeleteDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tripsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRIPS] });
    },
    onError: (error) => {
      console.error("Delete delivery failed:", error);
    },
  });
};
