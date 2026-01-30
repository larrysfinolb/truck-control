import { ApiResponse } from "@/modules/shared/interfaces/apiResponse";
import { User } from "./user";

export type SignupResponse = ApiResponse<{
  user: User;
  token: string;
}>;
