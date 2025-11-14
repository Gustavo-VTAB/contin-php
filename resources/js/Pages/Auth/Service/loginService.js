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

    async getProfile(){
        try {
            const response = await axios.get('Auth/getProfile');
            return response.data;
        } catch (error) {
            throw error;
        }
    },


    async changePassword(email, newPassword){
        try {
            const response = await axios.post('Auth/changePassword', {email, newPassword});
            return response.data;
        } catch (error) {
            throw error;
        }
    },


}
