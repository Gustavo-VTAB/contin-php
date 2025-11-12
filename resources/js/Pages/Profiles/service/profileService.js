import axios from 'axios';

export const profileService = {
    async getAllProfiles() {
        const response = await axios.get('/profiles/getAllProfiles');
        return response.data;
    },
    async createProfile(profile) {
        const response = await axios.post('/profiles/store', profile);
        return response.data;
    },
    async updateProfile(id, profile) {
        const response = await axios.put(`/profiles/update/${id}`, profile);
        return response.data;
    },
    async deleteProfile(id) {
        const response = await axios.delete(`/profiles/destroy/${id}`);
        return response.data;
    }
}