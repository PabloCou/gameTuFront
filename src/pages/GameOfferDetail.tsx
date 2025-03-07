import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameOfferService } from "../services/gameoffer.services";
import { StarRating } from "../components/StarRating";

// Definición del tipo GameOffer
interface GameOffer {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  description?: string;
  platform: string;
  genre: string;
  developer: string;
  releaseDate: string;
  offerExpiration: string;
}

const GameOfferDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gameOffer, setGameOffer] = useState<GameOffer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    GameOfferService.getById(Number(id))
      .then((data: GameOffer) => setGameOffer(data))
      .catch((error: Error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Cargando oferta...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!gameOffer) return <div>Oferta de juego no encontrada</div>;

  return (
    <div className="text-white bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-4">{gameOffer.title}</h1>
      <img src={gameOffer.imageUrl} alt={gameOffer.title} className="w-full h-64 object-cover rounded-lg mb-4"/>
      <p className="text-2xl font-bold mb-2">Precio: {gameOffer.price.toFixed(2)}€</p>
      <p className="text-xl mb-4">{gameOffer.description}</p>
      <StarRating idOffer={gameOffer.id} />
      <div className="mt-4">
        <p>Plataforma: {gameOffer.platform}</p>
        <p>Género: {gameOffer.genre}</p>
        <p>Desarrollador: {gameOffer.developer}</p>
        <p>Fecha de lanzamiento: {new Date(gameOffer.releaseDate).toLocaleDateString()}</p>
        <p>Oferta válida hasta: {new Date(gameOffer.offerExpiration).toLocaleDateString()}</p>
      </div>
      <button className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
        Comprar ahora
      </button>
    </div>
  );
};

export default GameOfferDetail;
