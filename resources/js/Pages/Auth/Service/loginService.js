import axios from "axios";


export const loginService = {
    async login(request) {
        try {
            const response = await axios.post('Auth/login',  request );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async logout()  {
        try {
            const response = await axios.post('Auth/logout');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async resetBlocked(email) {
        try {
            const response = await axios.post('Auth/resetBlocked', { email });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

}
