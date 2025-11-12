import axios from "axios";

export const registerService = {
    async register(request) {
        try {
            const response = await axios.post('Auth/register', request);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}