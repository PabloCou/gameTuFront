import GameOffer from "../models/GameOffer"
import { fetchAPI } from "../utils/FetchAPI"
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

export class GameOfferService {
    static async search(title?: string, platform?: string, genre?: string) {
        let url = `${API_URL_BASE}/game-offers?`
        if(title) url += `title=${encodeURIComponent(title)}&`
        if(platform) url += `platform=${encodeURIComponent(platform)}&`
        if(genre) url += `genre=${encodeURIComponent(genre)}&`

        return await fetchAPI(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }) as GameOffer[]
    }

    static async getById(id: number): Promise<GameOffer> {
        return await fetchAPI(`${API_URL_BASE}/game-offers/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }) as GameOffer
    }

    static async create(gameOffer: Partial<GameOffer>): Promise<GameOffer> {
        return await fetchAPI(`${API_URL_BASE}/game-offers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameOffer),
            credentials: 'include'
        }) as GameOffer
    }

    static async update(id: number, gameOffer: Partial<GameOffer>): Promise<GameOffer> {
        return await fetchAPI(`${API_URL_BASE}/game-offers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameOffer),
            credentials: 'include'
        }) as GameOffer
    }

    static async delete(id: number): Promise<void> {
        await fetchAPI(`${API_URL_BASE}/game-offers/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }
}
