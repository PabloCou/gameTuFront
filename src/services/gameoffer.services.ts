import GameOffer from "../models/GameOffer";
import { fetchAPI } from "../utils/FetchAPI";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export class GameOfferService {
    static async search(title?: string, platform?: string, genre?: string): Promise<GameOffer[]> {
        let url = `${API_URL_BASE}/game-offers?`;
        if (title) url += `title=${encodeURIComponent(title)}&`;
        if (platform) url += `platform=${encodeURIComponent(platform)}&`;
        if (genre) url += `genre=${encodeURIComponent(genre)}&`;

        try {
            const response = await fetchAPI(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            // Verifica que la respuesta es válida (código 2xx) y devuelve los datos en JSON
            if (!response.ok) {
                const errorText = await response.text();  // Extrae el cuerpo de la respuesta como texto
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }

            return response.json() as GameOffer[];  // Convierte la respuesta a JSON
        } catch (error) {
            console.error('Error en search:', error);
            throw new Error('Error al obtener las ofertas de juegos.');
        }
    }

    static async getById(id: number): Promise<GameOffer> {
        try {
            const response = await fetchAPI(`${API_URL_BASE}/game-offers/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            // Verifica la respuesta
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }

            return response.json() as GameOffer;
        } catch (error) {
            console.error('Error en getById:', error);
            throw new Error(`Error al obtener la oferta de juego con ID ${id}.`);
        }
    }

    static async create(gameOffer: Partial<GameOffer>): Promise<GameOffer> {
        try {
            const response = await fetchAPI(`${API_URL_BASE}/game-offers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gameOffer),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }

            return response.json() as GameOffer;
        } catch (error) {
            console.error('Error en create:', error);
            throw new Error('Error al crear la oferta de juego.');
        }
    }

    static async update(id: number, gameOffer: Partial<GameOffer>): Promise<GameOffer> {
        try {
            const response = await fetchAPI(`${API_URL_BASE}/game-offers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gameOffer),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }

            return response.json() as GameOffer;
        } catch (error) {
            console.error('Error en update:', error);
            throw new Error(`Error al actualizar la oferta de juego con ID ${id}.`);
        }
    }

    static async delete(id: number): Promise<void> {
        try {
            const response = await fetchAPI(`${API_URL_BASE}/game-offers/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error('Error en delete:', error);
            throw new Error(`Error al eliminar la oferta de juego con ID ${id}.`);
        }
    }
}
