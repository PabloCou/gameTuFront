import { ChangeEvent, useEffect, useState } from "react";
import GameOffer from "../models/GameOffer";
import { GameOfferService } from "../services/gameoffer.services";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

function GameOfferList() {
  const [gameOffers, setGameOffers] = useState<GameOffer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [queryParams, setQueryParams] = useSearchParams();
  const titleQuery = queryParams.get("title") || "";

  useEffect(() => {
    setLoading(true);
    GameOfferService.search(titleQuery)
      .then(setGameOffers)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [titleQuery]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setQueryParams(newTitle ? { title: newTitle } : {});
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Estás seguro que quieres borrar esta oferta de juego?")) return;

    try {
      await GameOfferService.delete(id);
      setGameOffers((prevOffers) => prevOffers.filter((offer) => offer.id !== id));
      toast.success("Oferta de juego borrada correctamente!");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
      toast.error("Error al borrar la oferta!");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-4xl font-extrabold dark:text-white">Lista de ofertas de videojuegos</h2>
      <Link
        to="/game-offers/new"
        className="text-white w-fit bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-600 dark:focus:ring-orange-700"
      >
        Añadir nueva oferta de videojuego
      </Link>

      <div className="relative">
        <input
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-300 focus:border-orange-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-500"
          value={titleQuery}
          onChange={handleSearchChange}
          placeholder="Buscar por título"
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {gameOffers.length === 0 && !loading && <p>No hay ofertas disponibles</p>}

      <div className="flex flex-wrap flex-row gap-4 items-center justify-center">
        {gameOffers.map((offer) => (
          <div key={offer.id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{offer.title}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{offer.description}</p>
            <p className="font-bold text-lg mt-2">Precio: {offer.price?.toFixed(2)} €</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Link
                to={`/game-offers/${offer.id}`}
                className="px-3 py-2 text-sm font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-400 dark:hover:bg-orange-600 dark:focus:ring-orange-700"
              >
                Ver
              </Link>
              <Link
                to={`/game-offers/edit/${offer.id}`}
                className="px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-green-700"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(offer.id)}
                className="px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700"
              >
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameOfferList;
