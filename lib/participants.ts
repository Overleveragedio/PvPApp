import { api } from "./api"

export const createParticipant = async (competitionId: number) => {
    const response = await api.post(`/participants`, { competitionId })
    return response.data
}