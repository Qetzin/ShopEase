import { useLocation } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import ShoppingItem from "../components/ShoppingItem";
import NotFound from "../components/NotFound";
import { useContext } from "react";
import OptionsContext from "../store/OptionsContext";

const requestConfig = [];

export default function SearchResultsPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const querry = searchParams.get("querry");
    const optionCtx = useContext(OptionsContext);

    let filteredItems = [];
    let searchMatch = [];
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

    if (!isLoading && filteredItems.length !== 0) {
        console.log(loadedItems);
        searchMatch = filteredItems.filter(item => 
            item.title.toLowerCase().includes(querry.toLowerCase()));
    }
    
    if(querry === ""){
        return(
            <ul className='items-list' id="items-list">
                {loadedItems.map((item) => <ShoppingItem key={item.id} item={item} />)}
            </ul>
            );
        }
    if (searchMatch!==undefined && searchMatch.length !== 0) {
        return (
            <ul className='items-list' id="items-list">
                {searchMatch.map((item) => <ShoppingItem key={item.id} item={item} />)}
            </ul>);
    }
    else {
        return (<NotFound />);
    }
} 