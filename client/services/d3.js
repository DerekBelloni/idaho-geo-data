import { api } from "./Api.js";

export default class D3Config {
    async getD3Directory() {
        try {
            const res = await api.get('/');
        } catch (e) {

        }
    }
};
