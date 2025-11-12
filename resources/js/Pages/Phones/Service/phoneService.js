import axios from 'axios';



export const phoneService = {
    async getPhones() {
        try {
            const response = await axios.get('phones');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar telefones:', error);
            throw error;
        }
    },
    async createPhone(phone) {
        try {
            const response = await axios.post('phones', phone);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar telefone:', error);
            throw error;
        }
    },
    async updatePhone(phone) {
        try {
            const response = await axios.put(`phones/${phone.id}`, phone);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar telefone:', error);
            throw error;
        }
    },
    async deletePhone(id) {
        try {
            const response = await axios.delete(`phones/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao excluir telefone:', error);
            throw error;
        }
    },
}