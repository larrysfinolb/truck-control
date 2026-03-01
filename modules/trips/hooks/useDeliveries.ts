import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deliveriesApi } from "../api/deliveries";
import { CreateDeliverySchemaType, UpdateDeliverySchemaType } from "../schemas/delivery";
import { DeliveriesListParams } from "../interfaces/deliveryParams";
import { GetAllResponse } from "@/modules/shared/interfaces/apiResponse";
import { Delivery } from "../interfaces/deliveryResponse";

const KEY = "deliveries";

export const useDeliveries = <T = Delivery>(params: DeliveriesListParams) => {
  return useQuery({
    queryKey: [KEY, params],
    queryFn: async () => {
      const response = await deliveriesApi.getAll(params);
      return response as GetAllResponse<T>;
    },
  });
};

export const useDelivery = (id: string) => {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => deliveriesApi.getOne(id),
    enabled: !!id,
  });
};

export const useCreateDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDeliverySchemaType) => deliveriesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      console.error("Create delivery failed:", error);
    },
  });
};

export const useUpdateDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDeliverySchemaType }) => deliveriesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      console.error("Update delivery failed:", error);
    },
  });
};

export const useDeleteDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deliveriesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      console.error("Delete delivery failed:", error);
    },
  });
};
