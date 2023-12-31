import {FiShoppingBag} from "react-icons/fi";
import {Link} from "react-router-dom";
import {BsFillPencilFill} from "react-icons/bs";
import User from "./User";
import Button from "./ui/Button";
import {useAuthContext} from "./context/AuthContext";

export default function Navbar() {
  const {user, login, logout} = useAuthContext();

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
          ? <Button text='logout' onClick={() => logout()} />
          : <Button text='login' onClick={() => login()} />
        }
      </nav>
    </header>
  );
}
