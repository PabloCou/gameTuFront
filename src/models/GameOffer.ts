export default interface GameOffer {
    id: number;
    title: string;
    description?: string;
    releaseDate: string;  // En formato ISO 8601 (para compatibilidad con JSON)
    price?: number;  // Ahora opcional
    active: boolean;
    createdAt: string; // ISO 8601
    updatedAt: string; // ISO 8601
    idCategory?: number;
    category?: Category; // Relación con Category
    idUserCreator: number;
    userCreator: User; // Relación con User
    rates?: Rate[]; // Relación con Rate
}

interface Category {
    id: number;
    name: string;
}

interface User {
    id: number;
    username: string;
    email: string;
}

interface Rate {
    id: number;
    score: number;
    userId: number;
    gameOfferId: number;
}
