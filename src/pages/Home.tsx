import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <header className="bg-blue-600 dark:bg-blue-800 text-white text-center py-16 px-6">
        <h1 className="text-5xl font-extrabold">¡Bienvenido a GameTu!</h1>
        <p className="mt-4 text-lg">
          Encuentra las mejores ofertas en videojuegos para todas las plataformas y ahorra mientras disfrutas de tus títulos favoritos.
        </p>
        {!isAuthenticated && (
          <Link
            to="/register"
            className="mt-6 inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
          >
            ¡Únete ahora y no te pierdas ninguna oferta!
          </Link>
        )}
      </header>

      {/* Beneficios de la plataforma */}
      <section className="max-w-6xl mx-auto py-4 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          ¿Por qué elegir GameTu?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Descubre las ventajas de ser parte de nuestra comunidad gamer.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {/* Beneficio 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">🎮 Ofertas Exclusivas</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Encuentra descuentos exclusivos en videojuegos para PC, PlayStation, Xbox y Nintendo Switch.
            </p>
          </div>

          {/* Beneficio 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">📩 Notificaciones Personalizadas</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Recibe alertas sobre las ofertas más recientes en tus juegos y géneros favoritos.
            </p>
          </div>

          {/* Beneficio 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">🌟 Comunidad Gamer</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Conéctate con otros jugadores, comparte recomendaciones y explora nuevos títulos.
            </p>
          </div>
        </div>

        {!isAuthenticated && (
          <Link
            to="/register"
            className="mt-10 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            ¡Regístrate Ahora!
          </Link>
        )}
      </section>

      {/* Llamado a la acción adicional */}
      {isAuthenticated && (
        <section className="max-w-screen-lg mx-auto py-10 px-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Explora nuestras últimas ofertas
          </h2>
          <Link
            to="/game-offers"
            className="inline-block bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition"
          >
            Ver Ofertas
          </Link>
        </section>
      )}
    </div>
  );
}

export default Home;
