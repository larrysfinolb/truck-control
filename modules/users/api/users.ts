import { api } from "@/lib/axios";
import { UserProfileResponse } from "../interfaces/userResponse";

export const usersApi = {
  getProfile: async () => {
    const response = await api.get<UserProfileResponse>("/users/profile");
    return response.data;
  },
};
