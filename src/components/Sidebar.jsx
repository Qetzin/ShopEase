import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import OptionsContext from '../store/OptionsContext.jsx';
import "./Sidebar.css";
import { useContext, useRef } from "react";

const requestConfig = {}
export default function Sidebar() {

    const sortTypeInput = useRef();
    const fromInput = useRef();
    const optionCtx = useContext(OptionsContext);

    const navigate = useNavigate();
    const {
        data: loadedCategories,
        isLoading,
        error
    } = useHttp('https://fakestoreapi.com/products/categories', requestConfig, []);

    function handleChangeSortType(event) {
        optionCtx.selectSortType(event.target.value);
    }

    function handlePriceToChange(event) {
        optionCtx.selectPriceRangeTo(event.target.value);
        sortTypeInput.current.value = "LowToHigh";
        optionCtx.selectSortType("LowToHigh");
    }
    function handlePriceFromChange(event) {
        optionCtx.selectPriceRangeFrom(event.target.value);
        sortTypeInput.current.value = "LowToHigh";
        optionCtx.selectSortType("LowToHigh");
    }
    function handleCategoryChange(category) {
        if (category !== optionCtx.category) {
            optionCtx.selectCategory(category);
            navigate("/category/" + category);
        }
        else {
            optionCtx.selectCategory('');
            navigate("/items");
        }
    }

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return `${string[0].toUpperCase()}${string.slice(1)}`;
    }

    return (<div className="main-box">
        <div className="category-title">
            <label>Sort by</label>
            <select ref={sortTypeInput} className="select-sort-type" onChange={handleChangeSortType}>
                <option value="">Default</option>
                <option value="LowToHigh">Price: Low to High</option>
                <option value="HighToLow">Price: High to Low</option>
                <option value="Rating">Best Rating</option>
                <option value="RatingCount">Most Reviews</option>
            </select>
        </div>
        <p className="category-title">Price</p>
        <div>
            <span className="from-text">From:</span>
            <span className="to-text">To:</span>
        </div>
        <div className="price-box">
            <input className="price-input" type="number" ref={fromInput} defaultValue="" onBlur={handlePriceFromChange}></input>
            <span> - </span>
            <input className="price-input" type="number" defaultValue="" onBlur={handlePriceToChange}></input>
        </div>
        <p className="category-title">Categories</p>
        <ul className="category-list">
            {loadedCategories.map((category) => (<li className="category-list-item" key={category}>
                <button className={`list-item${(category === optionCtx.category) ? '-active' : ''}`} onClick={() => { handleCategoryChange(category) }}>{capitalizeFirstLetter(category)}</button>
            </li>))}
        </ul>
    </div>);
}