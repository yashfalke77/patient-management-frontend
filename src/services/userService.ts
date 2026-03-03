import { backendApiUrl } from "@/lib/backend.config";
import { userSchema } from "@/models/user.model";
import axios from "axios";

export const register = async (user: userSchema) => {
    console.log("backendApiUrl:", backendApiUrl)
console.log("Type:", typeof backendApiUrl)
    const {data : createdUser} = await axios.post(`${backendApiUrl}/auth/register`, user, {"headers" : {
        "Content-Type": "application/json"
    }})
    return createdUser;
}