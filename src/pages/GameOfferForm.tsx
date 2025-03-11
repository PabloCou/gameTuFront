import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import GameOffer from '../models/GameOffer'
import { GameOfferService } from '../services/gameoffer.services'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import InputForm from '../components/InputForm'
import ErrorMsgData from '../utils/ErrorMsgData'
import TextAreaInputForm from '../components/TextAreaInputForm'

function GameOfferForm() {
  const [form, setForm] = useState<Partial<GameOffer>>({
    title: '',
    description: '',
    price: 0,
    releaseDate: new Date().toISOString().slice(0, 10),
    active: true,
  });

  const { id } = useParams();
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      GameOfferService.getById(Number(id))
        .then((data) =>
          setForm({
            ...data,
            releaseDate: new Date(data.releaseDate || '').toISOString().slice(0, 16),
          })
        )
        .catch((error) => setErrors({ message: error.message }))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors({});


      const formattedReleaseDate = new Date(form.releaseDate || '');
      if (isNaN(formattedReleaseDate.getTime())) {
        setErrors({ message: "Fecha de lanzamiento inválida." });
        return;
      }
  
      const formData = {
        ...form,
        price: Number(form.price),
        releaseDate: formattedReleaseDate.toISOString(),
      };
  
      if (id) {
        await GameOfferService.update(Number(id), formData);
      } else {
        await GameOfferService.create(formData);
      }
  
      toast.success('Oferta de juego guardada correctamente!');
      navigate('/game-offers');
    } catch (error) {
      toast.error('Error al guardar la oferta de juego!');
      if (Array.isArray(error)) {
        const errorObj: Record<string, string> = error.reduce((acc: Record<string, string>, err: unknown) => {
          const errorDetail = err as ErrorMsgData;
          acc[errorDetail.path] = errorDetail.msg;
          return acc;
        }, {});
        setErrors(errorObj);
      } else if (error instanceof Error) {
        setErrors({ message: error.message || 'Error desconocido' });
      } else {
        setErrors({ message: error as string || 'Error desconocido' });
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    setForm({ ...form, [name]: checked });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="text-white flex flex-col">
      <h2 className="text-4xl font-extrabold dark:text-white">
        {id ? 'Edición de oferta de juego' : 'Inserción de nueva oferta de juego'}
      </h2>

      <form className="max-w-sm mx-auto min-w-sm" onSubmit={handleSubmit}>
        <InputForm text="Título" name="title" value={form.title || ''} handleChange={handleChange} error={errors.title} />
        <TextAreaInputForm rows={6} text="Descripción" name="description" value={form.description || ''} handleChange={handleChange} error={errors.description} />
        <InputForm text="Precio" name="price" type="number" value={form.price?.toString() || ''} handleChange={handleChange} error={errors.price} />
        <InputForm type="date" text="Fecha de lanzamiento" name="releaseDate" value={form.releaseDate || ''} handleChange={handleChange} error={errors.releaseDate} />
        <InputForm type="checkbox" text="Activa" name="active" checked={form.active} handleChange={handleChangeCheckbox} error={errors.active} />

        {errors.message && <p className="text-center mt-4 text-red-500">{errors.message}</p>}

        <button
          type="submit"
          className="text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-600 dark:focus:ring-orange-700"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default GameOfferForm;
