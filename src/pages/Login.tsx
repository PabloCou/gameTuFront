import { ChangeEvent, FormEvent, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState(
    {
      email: '',
      password: ''
    }
  )
  const [message, setMessage ] = useState('')
  const {login} = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // mensaje por post al api del backend
    try{
      //await AuthService.loginUser(form.email, form.password) // backend
      await login(form.email, form.password)
      setMessage('login successfull')
      navigate("/home");
    }catch(error){
      const msg = error instanceof Error ? error.message : 'Error desconocido'
      setMessage(msg)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setForm({ ...form, [name]: value, })
  }


  return (
    <form className="max-w-sm mx-auto min-w-sm" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      
      <button type="submit" className="text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-600 dark:focus:ring-orange-700">Submit</button>
      {message}
    </form>

  )
}

export default Login