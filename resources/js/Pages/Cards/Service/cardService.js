import axios from 'axios';
export const cardService = {
    async getAllCards() {
        const response = await axios.get('/cards/getAllCards');
        return response.data;
    },
    async createCard(card) {
        const response = await axios.post('/cards/createCard', card);
        return response.data;
    },
    async updateCard(id, card) {
        const response = await axios.put(`/cards/updateCard/${id}`, card);
        return response.data;
    },
    async deleteCard(id) {
        const response = await axios.delete(`/cards/deleteCard/${id}`);
        return response.data;
    }
}