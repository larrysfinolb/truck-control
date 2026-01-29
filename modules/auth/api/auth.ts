import { api } from "@/lib/axios";
import { LoginSchemaType } from "../schemas/login";
import { LoginResponse } from "../interfaces/loginResponse";
import { SignupResponse } from "../interfaces/signupResponse";
import { SignupSchemaType } from "../schemas/signup";

export const authApi = {
  login: async (payload: LoginSchemaType) => {
    const response = await api.post<LoginResponse>("/auth/login", payload);
    return response.data;
  },
  signup: async (payload: Omit<SignupSchemaType, "confirmPassword">) => {
    const response = await api.post<SignupResponse>("/auth/signup", payload);
    return response.data;
  },
};
