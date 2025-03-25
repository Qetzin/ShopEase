import useHttp from "../hooks/useHttp";
import './ShoppingItems.css';
import ShoppingItem from "../components/ShoppingItem";
import LoadingIcon from "../components/UI/LoadingIcon";
import { useContext } from "react";
import OptionsContext from "../store/OptionsContext";
import NotFound from "../components/NotFound";

const requestConfig = {};
export default function ShoppingItems() {
    const optionCtx = useContext(OptionsContext);
    let filteredItems;
    const {
        data: loadedItems,
        isLoading,
        error
    } = useHttp('https://fakestoreapi.com/products', requestConfig, []);

    if (loadedItems.length !== 0) {
        if (optionCtx.sort === 'LowToHigh') {
            loadedItems.sort((a, b) => a.price - b.price);
        }
        else if (optionCtx.sort === 'HighToLow') {
            loadedItems.sort((a, b) => b.price - a.price);
        }
        else if (optionCtx.sort === 'Rating') {
            loadedItems.sort((a, b) => b.rating.rate - a.rating.rate);
        }
        else if (optionCtx.sort === 'RatingCount') {
            loadedItems.sort((a, b) => b.rating.count - a.rating.count);
        }
        else {
            loadedItems.sort((a, b) => a.id - b.id);
        }

        filteredItems = loadedItems.filter((product) => {
            const min = optionCtx.priceFrom === "" ? 0 : parseFloat(optionCtx.priceFrom);
            const max = optionCtx.priceTo === "" ? Infinity : parseFloat(optionCtx.priceTo);
            if (product.price >= min && product.price <= max) {
                return product;
            }
            else {
                return null;
            }
        });
        if (optionCtx.sort === "Default") {
            if (optionCtx.priceFrom !== "" || optionCtx.priceTo !== "") {
                filteredItems.sort((a, b) => a.price - b.price);
            }
        }
    }
    if (isLoading) {
        return <LoadingIcon />
    }
    console.log("From:" + optionCtx.priceFrom + " To:" + optionCtx.priceTo);
    if (filteredItems !== undefined) {
        if (filteredItems.length !== 0) {
            return (
                <ul className='items-list' id="items-list">
                    {filteredItems.map((item) => <ShoppingItem key={item.id} item={item} />)}
                </ul>
            );
        }
        else {
            if (optionCtx.priceFrom !== undefined && optionCtx.priceTo !== undefined) {
                if (optionCtx.priceFrom !== '' || optionCtx.priceTo !== '') {
                    return (<NotFound />);
                }
            }
            else {
                return (<ul className='items-list' id="items-list">
                    {loadedItems.map((item) => <ShoppingItem key={item.id} item={item} />)}
                </ul>);
            }
        }
    }
    else {
        return (
            <ul className='items-list' id="items-list">
                {loadedItems.map((item) => <ShoppingItem key={item.id} item={item} />)}
            </ul>
        );
    }
}