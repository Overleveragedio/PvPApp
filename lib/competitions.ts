import { Competition, CompetitionStatus, PaginatedResponse } from "@/types/competitions"
import { api } from "./api"

const getFeaturedCompetition = async () => {
    const response = await api.get<Competition>('/competitions/featured')
    return response.data
}

const getCompetitionById = async (id: string) => {
    const response = await api.get<Competition>(`/competitions/${id}`)
    return response.data
}

const filterCompetitions = async (params: any) => {
    const response = await api.get<PaginatedResponse<Competition>>('/competitions/filter', {
        params: params
    })
    return response.data
}

export {
    getFeaturedCompetition,
    getCompetitionById,
    filterCompetitions
}