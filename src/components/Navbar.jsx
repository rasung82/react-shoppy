import {FiShoppingBag} from "react-icons/fi";
import {Link} from "react-router-dom";
import {BsFillPencilFill} from "react-icons/bs";

export default function Navbar() {
  return (
    <header className='flex justify-between border-b border-b-gray-300 p-2'>
      <Link  to='/' className='flex items-center text-4xl text-brand'>
        <FiShoppingBag className='' />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>
        <Link to='/products/new'>
          <BsFillPencilFill className='text-2xl' />
        </Link>
        <button>Login</button>
      </nav>
    </header>
  );
}
