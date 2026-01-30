import { ApiResponse } from "@/modules/shared/interfaces/apiResponse";
import { User } from "./user";

export type LoginResponse = ApiResponse<{
  user: User;
  token: string;
}>;
