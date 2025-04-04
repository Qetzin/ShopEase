import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";
import "./Cart.css";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => { return totalPrice + item.quantity * item.price }, 0);

    function handleCloseCart() {
        userProgressCtx.hideCart()
    }
    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }
    return <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map(item => (
                <CartItem
                    key={item.id}
                    name={item.title}
                    quantity={item.quantity}
                    price={item.price}
                    onIncrease={() => { cartCtx.addItem(item) }}
                    onDecrease={() => { cartCtx.removeItem(item.id) }}
                />))}
        </ul>
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <button className="text-button" onClick={handleCloseCart}>Close</button>
            {cartCtx.items.length > 0 && <button className="button" onClick={handleGoToCheckout}>Go to checkout</button>}
        </p>
    </Modal>
}