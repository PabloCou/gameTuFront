import { useEffect, useState } from "react";
import { UserService } from "../services/userService";
import User from "../models/User";

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    UserService.getProfile()
      .then(setUser)
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Error desconocido");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Perfil de Usuario
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-gray-700 dark:text-gray-300">Cargando...</p>
      ) : user ? (
        <div className="space-y-4">
          <ProfileField label="Nombre" value={user.name} />
          {user.surname && <ProfileField label="Apellidos" value={user.surname} />}
          <ProfileField label="Correo Electrónico" value={user.email} />
          <ProfileField label="Rol" value={user.role || "Usuario estándar"} />
          <ProfileField label="Activado" value={user.active ? "Sí" : "No"} />
          <ProfileField
            label="Recibe notificaciones por email"
            value={user.accepNotifications ? "Sí" : "No"}
          />
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">No se encontró información del usuario.</p>
      )}
    </div>
  );
}

const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
  </div>
);

export default Profile;
