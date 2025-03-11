import GameOffer from "../models/GameOffer";
import { fetchAPI } from "../utils/FetchAPI";

// Verifica si la variable de entorno API_URL_BASE está correctamente definida
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3000'; // Usa localhost como predeterminado si no está definida

export class GameOfferService {
    static async search(title?: string, platform?: string, genre?: string): Promise<GameOffer[]> {
        let url = `${API_URL_BASE}/api/game-offers?`; // Usa la URL base directamente
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

            return response as GameOffer[]; 
        } catch (error) {
            console.error('Error en search:', error);
            throw new Error('Error al obtener las ofertas de juegos.');
        }
    }

    static async getById(id: number): Promise<GameOffer> {
        try {
            const response = await fetchAPI(`${API_URL_BASE}/api/game-offers/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            return response as GameOffer; 
        } catch (error) {
            console.error('Error en getById:', error);
            throw new Error(`Error al obtener la oferta de juego con ID ${id}.`);
        }
    }

    static async create(gameOffer: Partial<GameOffer>): Promise<GameOffer> {
        try {
            console.log('Datos a enviar:', gameOffer);
            console.log('URL de la petición:', `${API_URL_BASE}/api/game-offers/new`);  // Asegúrate de que la URL sea correcta

            const response = await fetchAPI(`${API_URL_BASE}/api/game-offers/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gameOffer),
                credentials: 'include', 
            });
      
            return response as GameOffer;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al crear la oferta:', error.message);
                if (error.message.includes('401')) {
                    throw new Error('No tienes autorización para crear ofertas. Por favor, inicia sesión.');
                }
                if (error.message.includes('403')) {
                    throw new Error('No tienes permisos suficientes para crear ofertas.');
                }
                throw new Error(`Error al crear la oferta: ${error.message}`);
            }
            throw new Error('Error desconocido al crear la oferta de juego.');
        }
    }

    static async update(id: number, gameOffer: Partial<GameOffer>): Promise<GameOffer> {
        try {
            const response = await fetchAPI(`${API_URL_BASE}/api/game-offers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gameOffer),
                credentials: 'include'
            });

            return response as GameOffer;
        } catch (error) {
            console.error('Error en update:', error);
            throw new Error(`Error al actualizar la oferta de juego con ID ${id}.`);
        }
    }

    static async delete(id: number): Promise<void> {
        try {
            await fetchAPI(`${API_URL_BASE}/api/game-offers/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
        } catch (error) {
            console.error('Error en delete:', error);
            throw new Error(`Error al eliminar la oferta de juego con ID ${id}.`);
        }
    }

    static async rateOffer(id: number, rating: number): Promise<void> {
        try {
            await fetchAPI(`${API_URL_BASE}/api/game-offers/${id}/rate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rating }),
                credentials: 'include'
            });
        } catch (error) {
            console.error('Error al calificar la oferta:', error);
            throw new Error('Error al calificar la oferta de juego.');
        }
    }

    static async getOfferRate(id: number): Promise<number> {
        try {
            const response = await fetchAPI(`${API_URL_BASE}/api/game-offers/${id}/rate`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            return response as number;
        } catch (error) {
            console.error('Error al obtener la calificación:', error);
            throw new Error('Error al obtener la calificación de la oferta.');
        }
    }

    static async getMyRate(id: number): Promise<number> {
        try {
            const response = await fetchAPI(`${API_URL_BASE}/api/game-offers/${id}/myRate`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            return response as number;
        } catch (error) {
            console.error('Error al obtener mi calificación:', error);
            throw new Error('Error al obtener tu calificación de la oferta.');
        }
    }
}
