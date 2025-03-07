export default interface GameOffer {
    id: number;
    title: string;
    description?: string;
    price: number;
    platform: string;
    genre: string;
    developer: string;
    publisher?: string;
    releaseDate: string;
    imageUrl: string;
    active: boolean;
    contactEmail?: string;
    offerExpiration: string;
    discountPercentage?: number;
    stock?: number;
    rating?: number;
    ageRating?: string;
}
