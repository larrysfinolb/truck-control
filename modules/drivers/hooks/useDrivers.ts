import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { driversApi } from "../api/driver";
import { DriversListParams } from "../interfaces/driverParams";
import { CreateDriverSchemaType, DriverIdSchemaType, UpdateDriverSchemaType } from "../schemas/driver";

const KEYS = {
  drivers: "drivers",
};

export const useDrivers = (params: DriversListParams) => {
  return useQuery({
    queryKey: [KEYS.drivers, params],
    queryFn: async () => driversApi.getAll(params),
  });
};

export const useDriver = (id: DriverIdSchemaType) => {
  return useQuery({
    queryKey: [KEYS.drivers, id],
    queryFn: () => driversApi.getOne(id),
    enabled: !!id,
  });
};

export const useCreateDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDriverSchemaType) => driversApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.drivers] });
    },
    onError: (error) => {
      console.error("Create driver failed:", error);
    },
  });
};

export const useUpdateDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: DriverIdSchemaType; data: UpdateDriverSchemaType }) => driversApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.drivers] });
    },
    onError: (error) => {
      console.error("Update driver failed:", error);
    },
  });
};

export const useDeleteDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: DriverIdSchemaType) => driversApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.drivers] });
    },
    onError: (error) => {
      console.error("Delete driver failed:", error);
    },
  });
};
