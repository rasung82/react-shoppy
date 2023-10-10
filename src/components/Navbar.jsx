import {FiShoppingBag} from "react-icons/fi";
import {Link} from "react-router-dom";
import {BsFillPencilFill} from "react-icons/bs";
import {isAdmin, login, logout, onUserStateChange} from "../api/firebase";
import {useEffect, useState} from "react";
import User from "./User";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onUserStateChange( (user) => {
      console.log('R) User uid:%s, isAmin:%s', user?.uid, user?.isAdmin);
      setUser(user);
    })
  },[])

  return (
    <header className='flex justify-between border-b border-b-gray-300 p-2'>
      <Link  to='/' className='flex items-center text-4xl text-brand'>
        <FiShoppingBag className='' />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        { user && <Link to='/carts'>Carts</Link> }
        { user && user.isAdmin &&(
            <Link to='/products/new'>
              <BsFillPencilFill className='text-2xl' />
            </Link>
          )
        }
        { user && <User user={user} /> }
        { user
          ? <button onClick={ ()=> logout().then(user => setUser(user))}>Logout</button>
          : <button onClick={ ()=> login().then(user => setUser(user)) }>Login</button>
        }
      </nav>
    </header>
  );
}
