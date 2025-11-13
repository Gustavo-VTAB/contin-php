import axios from 'axios';

export const logService = {
    async getAllLogs() {
        const response = await axios.get('/logs/getAllLogs');
        return response.data;
    },
    async createLog(log) {
        const response = await axios.post('/logs/store', log);
        return response.data;
    },
    async updateLog(id, log) {
        const response = await axios.put(`/logs/update/${id}`, log);
        return response.data;
    },
    async deleteLog(id) {
        const response = await axios.delete(`/logs/destroy/${id}`);
        return response.data;
    }
}