import { FormEvent, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function NewsForm() {
    const {user} = useAuth()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    
    const noticia = { titular: title, cuerpo: description, userId: user?.id};

    try {
      const response = await fetch("http://localhost:3000/api/news/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noticia),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la noticia");
      }

      setMessage("Noticia enviada con éxito");
      setTitle("");
      setDescription("");
    } catch (error) {
    if (error instanceof Error)
        setMessage(error.message)
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Nueva Noticia</h2>
      {message && <p className="text-center text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Titular:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-gray-300 p-2 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Cuerpo:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-gray-300 p-2 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-400 text-white p-2 rounded-md hover:bg-orange-600"
        >
          Enviar Noticia
        </button>
      </form>
    </div>
  );
}