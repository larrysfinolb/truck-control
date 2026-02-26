import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TrucksListParams } from "../interfaces/truckParams";
import { trucksApi } from "../api/trucks";
import { CreateTruckSchemaType, TruckIdSchemaType, UpdateTruckSchemaType } from "../schemas/truck";

const KEYS = {
  trucks: "trucks",
};

export const useTrucks = (params: TrucksListParams) => {
  return useQuery({
    queryKey: [KEYS.trucks, params],
    queryFn: async () => trucksApi.getAll(params),
  });
};

export const useTruck = (id: TruckIdSchemaType) => {
  return useQuery({
    queryKey: [KEYS.trucks, id],
    queryFn: () => trucksApi.getOne(id),
    enabled: !!id,
  });
};

export const useCreateTruck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTruckSchemaType) => trucksApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.trucks] });
    },
    onError: (error) => {
      console.error("Create truck failed:", error);
    },
  });
};

export const useUpdateTruck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: TruckIdSchemaType; data: UpdateTruckSchemaType }) => trucksApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.trucks] });
    },
    onError: (error) => {
      console.error("Update truck failed:", error);
    },
  });
};

export const useDeleteTruck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: TruckIdSchemaType) => trucksApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.trucks] });
    },
    onError: (error) => {
      console.error("Delete truck failed:", error);
    },
  });
};
