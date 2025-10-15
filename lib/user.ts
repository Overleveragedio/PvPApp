import { User } from "@/types/competitions"
import { api } from "./api"

export const getUser = async (): Promise<User | null> => {
    try {
        const response = await api.get(`/users/me`)
        return response.data
    } catch (error) {
        return null
    }
}