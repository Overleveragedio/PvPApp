import { api } from "./api"

const connectToDiscord = async (code: string) => {
    const response = await api.get('/notifications/discord/create-connection', {
        params: {
            code
        }
    })
    return response.data
}

export { connectToDiscord }