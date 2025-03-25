import './ShoppingItem.css';
import { useContext } from 'react';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import CartContext from '../store/CartContext';
import { useNavigate } from 'react-router-dom';

export default function ShoppingItem({ item }) {

    const cartCtx = useContext(CartContext);
    const navigate = useNavigate();
    const fullStars = Math.floor(item.rating.rate);

    let rest = item.rating.rate - fullStars;
    let rate = [];

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            rate.push(<FaStar key={i} />);
        }
        else {
            if (i === fullStars) {
                if (rest < 0.5) {
                    rate.push(<FaRegStar key={i} />);
                }
                else {
                    rate.push(<FaStarHalfAlt key={i} />);
                }
            }
            else {
                rate.push(<FaRegStar key={i} />);
            }
        }
    }
    function handleAddItemtoCart(event) {
        event.stopPropagation();
        cartCtx.addItem(item);
    }
    function handleNavigateToItemDetails(id) {
        navigate("/items/" + id);
    }

    return <li className='item' onClick={() => { handleNavigateToItemDetails(item.id) }}>
        <article className='item-box'>
            <img className='item-image' src={item.image} />
            <div className='item-title'>
                <h3>{item.title}</h3>
            </div>
            <label className='item-category'>Category: {item.category}</label>
            <div className='item-info'>
                <div>
                    <p>Rating</p>
                    <div className='item-rating'>{rate}({item.rating.count})</div>
                    <p className='item-price'>${item.price}</p>

                </div>
                <div className='item-price-buy'>
                </div>
            </div>
            <button className='item-button' onClick={handleAddItemtoCart}>Add to cart</button>
        </article>
    </li>
}