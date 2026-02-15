import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../api/users";

const KEYS = {
  users: "users",
  profile: "profile",
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: [KEYS.users, KEYS.profile],
    queryFn: () => usersApi.getProfile(),
  });
};
