import { backendApiUrl } from "@/lib/backend.config";
import { userSchema } from "@/models/user.model";
import axios from "axios";

export const register = async (user: userSchema) => {
  const { data: createdUser } = await axios.post(
    `${backendApiUrl}/auth/register`,
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return createdUser;
};

export const login = async (user: userSchema) => {
  const { data: token } = await axios.post(
    `${backendApiUrl}/auth/login`,
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return token;
};
