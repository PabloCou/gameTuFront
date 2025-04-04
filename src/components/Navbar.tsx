import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Collapse } from 'flowbite';
import { useRef } from 'react';

function Navbar() {
  const {user, isAdmin, isAuthenticated, logout} = useAuth()
  const menuHamburguesa = useRef(null)
  const menuHamburguesaTriger = useRef(null)
  const userLogured  = () =>{
    if(!user) return ''
    if(isAuthenticated && user?.role === 'admin') return 'Eres admin'
    if(isAuthenticated) return 'Eres user'
  }

  const handleCollapse = () => {
    const collapse = new Collapse(menuHamburguesa.current,menuHamburguesaTriger.current);
    collapse.toggle();
    console.log('click')
  }

  return (
    

<nav className="bg-white border-gray-200 dark:bg-gray-900">
<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

  <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://us.123rf.com/450wm/valentint/valentint1608/valentint160800806/60999573-icono-gamepad-bot%C3%B3n-de-internet-sobre-fondo-blanco.jpg?ver=6" className="h-8" alt="Logo GameTu"/>
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GameTu</span>
  </Link>
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  {!isAuthenticated &&
      <li>
        <Link to="/login" className="text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange-400 dark:hover:bg-orange-600 dark:focus:ring-orange-500">Login</Link>
      </li>
    }
          {isAuthenticated && <button className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" onClick={logout}>Logout</button>  }

      <button ref={menuHamburguesaTriger} onClick={handleCollapse} data-collapse-toggle="navbar" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-ky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div ref={menuHamburguesa}id="targetEl" className="hidden">
    
</div>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <Link to="/" className="block py-2 px-3 text-white bg-orange-400 rounded-sm md:bg-transparent md:text-orange-600 md:p-0 md:dark:text-orange-400" aria-current="page">Home</Link>
      </li>
      
      {!isAuthenticated &&
      <li>
        <Link to="/register" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-400 md:p-0 md:dark:hover:text-orange-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Registro</Link>
      </li>
      }
       {isAuthenticated &&
      <li>
        <Link to="/profile" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-600 md:p-0 md:dark:hover:text-orange-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Perfil</Link>
      </li>
      } 
      {isAdmin && 
      <li>
        <Link to="/userList" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-600 md:p-0 md:dark:hover:text-orange-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Usuarios</Link>
      </li>
      } 
      {isAuthenticated &&
      <li>
        <Link to="/newComplaint" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-600 md:p-0 md:dark:hover:text-orange-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Quejarse</Link>
      </li>
      }
      {isAuthenticated &&
      <li>
        <Link to="/complaints" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-600 md:p-0 md:dark:hover:text-orange-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Quejas</Link>
      </li>
      }
      {isAdmin && 
        <li>
          <Link to="/news/new" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-600 md:p-0 md:dark:hover:text-orange-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Nueva noticia</Link>
        </li>
      }
      {isAuthenticated &&
      <li>
        <Link to="/news" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-600 md:p-0 md:dark:hover:text-orange-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Noticias</Link>
      </li>
      }
      {isAuthenticated &&
      <li>
        <Link to="/game-offers" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-600 md:p-0 md:dark:hover:text-orange-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Ofertas</Link>
      </li>
      }
      {isAdmin && 
        <li>
          <Link to="/categories" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-600 md:p-0 md:dark:hover:text-orange-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Categorías</Link>
        </li>
      }

      <span className="text-white">
        {user?.email}  {userLogured()}
      </span>
    </ul>
  </div>
  </div>
</nav>

  )
}

export default Navbar