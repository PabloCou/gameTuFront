import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameOfferService } from "../services/gameoffer.services";
import { StarRating } from "../components/StarRating";

interface GameOffer {
  id: number;
  title: string;
  price?: number;
  description?: string;
  releaseDate?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  idCategory?: number;
  category?: Category;
  idUserCreator: number;
  userCreator?: User;
  rates?: Rate[];
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

const GameOfferDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gameOffer, setGameOffer] = useState<GameOffer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const offerId = Number(id);
    if (isNaN(offerId)) {
      setError("ID de oferta inválido.");
      setLoading(false);
      return;
    }

    GameOfferService.getById(offerId)
      .then((data) => {
        console.log("Datos recibidos desde el backend:", data);

        if (data && data.id && data.title && data.price !== undefined) {
          setGameOffer(data);
        } else {
          setError("Los datos de la oferta no están completos.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener la oferta:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Cargando oferta...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!gameOffer) return <div>Oferta de juego no encontrada</div>;

  return (
    <div className="text-white bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-4">{gameOffer.title}</h1>
      <p className="text-2xl font-bold mb-2">Precio: {gameOffer.price?.toFixed(2)}€</p>
      {gameOffer.description && <p className="text-xl mb-4">{gameOffer.description}</p>}
      
      <StarRating idOffer={gameOffer.id} />
      
      <div className="mt-4 space-y-2">
        {gameOffer.releaseDate && (
          <p><strong>Fecha de lanzamiento:</strong> {new Date(gameOffer.releaseDate).toLocaleDateString()}</p>
        )}
        {gameOffer.category && (
          <p><strong>Categoría:</strong> {gameOffer.category.name}</p>
        )}
        {gameOffer.userCreator && (
          <p><strong>Creado por:</strong> {gameOffer.userCreator.username}</p>
        )}
      </div>

      <button className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition">
        Comprar ahora
      </button>
    </div>
  );
};

export default GameOfferDetail;
