import axios from 'axios';

export const phoneService = {
    async getAllPhones() {
        const response = await axios.get('/phones/getAllPhones');
        return response.data;
    },
    async createPhone(phone) {
        const response = await axios.post('/phones/createPhone', phone);
        return response.data;
    },
    async updatePhone(id, phone) {
        const response = await axios.put(`/phones/updatePhone/${id}`, phone);
        return response.data;
    },
    async destroy(id) {
        const response = await axios.delete(`/phones/destroy/${id}`);
        return response.data;
    }
}