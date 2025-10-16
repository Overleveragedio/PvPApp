import { User } from "@/types/competitions"
import { api } from "./api"

export const getUser = async (): Promise<User> => {
    const response = await api.get(`/users/me`)
    return response.data
}

export const updateUser = async (user: User): Promise<User> => {
    const response = await api.patch(`/users/me`, user)
    return response.data
}