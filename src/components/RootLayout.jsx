import './Header.css';
import { useContext } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';

export default function RootLayout() {
    const cartCtx = useContext(CartContext);
    const navigate = useNavigate();
    const userProgressCtx = useContext(UserProgressContext);
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    function handleTitleClick(){
        navigate("/items");
    }

    return (<>
        <div className="header">
            <div className="header-left">
                <img />
                <h2 className='header-title' onClick={handleTitleClick}>ShopEase</h2>
            </div>
            <SearchBar />
            <button className='header-button' onClick={handleShowCart}><FaShoppingCart className='shopping-cart-icon'/> <span className='cart-items-total'>{totalCartItems}</span></button>
        </div>
        <div className='content'>
            <Sidebar />
            <Outlet />
        </div>
    </>);
}