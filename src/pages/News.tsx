import { useEffect, useState } from "react";
import Noticia from "../models/Noticia";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

export default function NewsList() {
    const { user } = useAuth();
    const navigate = useNavigate();
  const [news, setNews] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as string | null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL_BASE+`/news/list?id=${user?.id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Error al obtener las noticias");

        const data = await response.json();
        setNews(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Lista de Noticias</h2>
      {news.length === 0 ? (
        <p className="text-gray-500 text-center">No hay noticias registradas.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {news.map((noticia, index) => (
            <li key={index} className="p-4 hover:bg-gray-100 rounded-md">
              <p className="text-lg font-semibold">{noticia.titular || "Sin titular"}</p>
              <p className="text-gray-600">{noticia.cuerpo || "Sin cuerpo"}</p>
            </li>
          ))}
        </ul>
      )}
        <button className="bg-orange-600 h-15 w-30 rounded"    onClick={() => navigate('/news/new')}>Nueva noticia</button>
    </div>
  );
}