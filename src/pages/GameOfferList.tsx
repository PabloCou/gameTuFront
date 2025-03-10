import { ChangeEvent, useEffect, useState } from "react";
import GameOffer from "../models/GameOffer";
import { GameOfferService } from "../services/gameoffer.services";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

function GameOfferList() {
  const [gameOffers, setGameOffers] = useState<GameOffer[]>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [queryParams, setQueryParams] = useSearchParams();
  const titleQuery = queryParams.get("title") || "";

  useEffect(() => {
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
      setGameOffers(gameOffers?.filter((offer) => offer.id !== id));
      toast.success("Oferta de juego borrada correctamente!");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
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

      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-300 focus:border-orange-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-500"
          value={titleQuery}
          onChange={handleSearchChange}
          placeholder="Buscar por título"
        />

        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-400 dark:hover:bg-orange-600 dark:focus:ring-orange-700"
        >
          Buscar
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {gameOffers?.length === 0 && <p>No hay ofertas disponibles</p>}
      <div className="flex flex-wrap flex-row gap-4 items-center justify-center">
        {gameOffers?.map((offer) => (
          <div key={offer.id} className="">
            <div
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {offer.title}
              </h5>
              <img src={offer.imageUrl} alt={offer.title} className="w-full h-auto rounded-lg mb-2" />
              <p className="font-normal text-gray-700 dark:text-gray-400">{offer.description}</p>
              <p className="font-bold text-lg mt-2">Precio: {offer.price.toFixed(2)} €</p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <Link
                  to={`/game-offers/${offer.id}`}
                  className="px-3 py-2 text-sm font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-400 dark:hover:bg-orange-600 dark:focus:ring-orange-700"
                >
                  Ver
                </Link>
                <Link
                  to={`/game-offers/edit/${offer.id}`}
                  className="px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-green focus:outline-none focus:ring-green dark:bg-green-dark:hover:bg-green-dark:focus:ring-green-dark"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(offer.id)}
                  className="px-3 py-2 text-sm font-medium text-center text-white bg-red rounded-lg hover:red-focus:outline-none "
                >
                  Borrar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameOfferList;
