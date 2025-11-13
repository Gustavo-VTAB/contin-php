import axios from 'axios';

export const pageService = {
    async getAllPages() {
        const response = await axios.get('/pages/getAllPages');
        return response.data;
    },
    async createPage(page) {
        const response = await axios.post('/pages/createPage', page);
        return response.data;
    },
    async updatePage(id, page) {
        const response = await axios.put(`/pages/updatePage/${id}`, page);
        return response.data;
    },
    async destroy(id) {
        const response = await axios.delete(`/pages/destroy/${id}`);
        return response.data;
    }
}