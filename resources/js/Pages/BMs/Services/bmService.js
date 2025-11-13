import axios from 'axios';

export const bmService = {
    async getAllBms() {
        const response = await axios.get('/bms/getAllBms');
        return response.data;
    },
    async createBm(bm) {
        const response = await axios.post('/bms/store', bm);
        return response.data;
    },
    async updateBm(id, bm) {
        const response = await axios.put(`/bms/update/${id}`, bm);
        return response.data;
    },
    async deleteBm(id) {
        const response = await axios.delete(`/bms/destroy/${id}`);
        return response.data;
    }
}