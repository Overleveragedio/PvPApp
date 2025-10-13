import { Competition, CompetitionStatus } from "@/types/competitions"
import { api } from "./api"

const fetchCompetitions = async (status?: CompetitionStatus) => {
    const response = await api.get<Competition[]>('/competitions', {
        params: {
            status
        }
    })
    return response.data
}

const getFeaturedCompetition = async () => {
    const response = await api.get<Competition>('/competitions/featured')
    return response.data
}

const getCompetitionById = async (id: string) => {
    const response = await api.get<Competition>(`/competitions/${id}`)
    return response.data
}

export { fetchCompetitions, getFeaturedCompetition, getCompetitionById }