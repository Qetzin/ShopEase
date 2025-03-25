import { useParams } from "react-router-dom";
import { useContext } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt, FaArrowLeft } from "react-icons/fa";
import CartContext from '../store/CartContext';
import useHttp from "../hooks/useHttp";
import LoadingIcon from "../components/UI/LoadingIcon";
import { currencyFormatter } from "../util/formatting";
import "./ItemDetails.css";
import ErrorMessage from "../components/ErrorMessage";

const requestConfig = {};
export default function ItemDetails() {
    const params = useParams();
    const cartCtx = useContext(CartContext);
    let rate = [];
    const {
        data: item,
        isLoading,
        error
    } = useHttp('https://fakestoreapi.com/products/' + params.id, requestConfig, []);

    if (item.length !== 0) {
        console.log(item);
        const fullStars = Math.floor(item.rating.rate);
        let rest = item.rating.rate - fullStars;

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
    }
    function handleBackButton() {
        window.history.back();
    }
    if (isLoading) {
        return <LoadingIcon />
    }

    if(error){
        return <ErrorMessage title={'404'} message={'Could not find specified item!'}/>
    }

    function handleAddToCart() {
        cartCtx.addItem(item);
    }
    return (<>
        {(!isLoading && item.length !== 0) && (<div className="item-details-main-box">
            <button className="item-details-back-button" onClick={handleBackButton}><FaArrowLeft /></button>
            <div className="item-details-title">{item.title}</div>
            <div className="item-details-top">
                <span>Item rating {rate} ( {item.rating.rate} ) | Rated by {item.rating.count} {(item.rating.count !== 1) ? (<span>users</span>) : (<span>user</span>)}</span >
            </div>
            <img className='item-details-image' src={item.image} />
            <div className="item-details-description">
                <div className="item-details-description-text">Item description</div>
                <div>{item.description}</div>
            </div>
            <div className="item-details-price">
                <h2 className="item-details-price-info">Current price: {currencyFormatter.format(item.price)}</h2>
                <button className="item-details-button" onClick={handleAddToCart}>Add to cart</button>
            </div>
        </div>)}
    </>);
}