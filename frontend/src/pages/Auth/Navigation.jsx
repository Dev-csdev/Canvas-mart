import {useRef, useState} from "react";
import {AiOutlineHome, AiOutlineShopping, 
  AiOutlineLogin, AiOutlineUserAdd, 
  AiOutlineShoppingCart} from 'react-icons/ai';
import {FaHeart} from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Navigation.css';
import {useSelector, useDispatch} from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import {logout} from '../../redux/features/auth/authSlice';

const Navigation = () => {
  const {userInfo} = useSelector(state => state.auth)

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
        await logoutApiCall().unwrap()
        dispatch(logout());
        navigate("/login");
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex items-center justify-between w-full p-6 bg-slate-900 text-white fixed top-0 left-0 right-0 z-50">
      <div className="flex space-x-6">
        <Link to='/' className="flex items-center transition-transform transform hover:translate-y-1">
          <AiOutlineHome size={26}/>
          <span className="hidden md:inline ml-2">HOME</span>
        </Link>

        <Link to='/shop' className="flex items-center transition-transform transform hover:translate-y-1">
          <AiOutlineShopping size={26}/>
          <span className="hidden md:inline ml-2">SHOP</span>
        </Link>

        <Link to='/cart' className="flex items-center transition-transform transform hover:translate-y-1">
          <AiOutlineShoppingCart size={26}/>
          <span className="hidden md:inline ml-2">CART</span>
        </Link>

        <Link to='/favourite' className="flex items-center transition-transform transform hover:translate-y-1">
          <FaHeart size={26}/>
          <span className="hidden md:inline ml-2">FAVOURITE</span>
        </Link>
      </div>

      <div className="relative">
        <button onClick={toggleDropdown} className="flex items-center text-gray-800 focus:outline-none">
        {userInfo && (
          <>
            <FaUserCircle className="h-6 w-6 text-white mr-2" />
            <span className="text-white">{userInfo.username}</span>
          </>
        )}
          {userInfo && (
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 ml-1 transition-transform duration-300 ${
              dropdownOpen ? "rotate-180" : "rotate-0"
            }`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="white"
          >
            <path 
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={dropdownOpen ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} 
            />
          </svg>          
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul className="absolute right-0 mt-2 bg-white text-gray-600 shadow-lg">
            {userInfo.isAdmin && (
              <>
                <li><Link to='/admin/dashboard' className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link></li>
                <li><Link to='/admin/productlist' className="block px-4 py-2 hover:bg-gray-100">Products</Link></li>
                <li><Link to='/admin/categorylist' className="block px-4 py-2 hover:bg-gray-100">Category</Link></li>
                <li><Link to='/admin/orderlist' className="block px-4 py-2 hover:bg-gray-100">Orders</Link></li>
                <li><Link to='/admin/userlist' className="block px-4 py-2 hover:bg-gray-100">Users</Link></li>
              </>
            )}
            <li><Link to='/profile' className="block px-4 py-2 hover:bg-gray-100">Profile</Link></li>
            <li><button onClick={logoutHandler} className="block px-4 py-2 hover:bg-gray-100">Logout</button></li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <div className="flex space-x-6">
          <Link to='/login' className="flex items-center transition-transform transform hover:translate-y-1">
            <AiOutlineLogin size={26}/>
            <span className="hidden md:inline ml-2">LOGIN</span>
          </Link>
          
          <Link to='/register' className="flex items-center transition-transform transform hover:translate-y-1">
            <AiOutlineUserAdd size={26}/>
            <span className="hidden md:inline ml-2">REGISTER</span>
          </Link>
        </div>
      )}
    </div>
  );  
};

export default Navigation;