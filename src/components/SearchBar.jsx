import { useContext, useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import OptionsContext from "../store/OptionsContext";

export default function SearchBar() {
    const searchTerm = useRef();
    const optionCtx = useContext(OptionsContext);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [querry, setQuerry] = useState('');

    function handleClearSelection() {
        setQuerry('');
        searchTerm.current.value = '';
        navigate('/items');
    }

    useEffect(() => {
        if (optionCtx.category !== '') {
            setQuerry('');
            searchTerm.current.value = '';
        }
    }, [optionCtx.category]);

    function handleSearch() {
        setQuerry(searchParams.get("querry"));
        navigate(`/items/search?querry=${encodeURIComponent(searchTerm.current.value)}`);
    }

    return <div className="searchBar">
        {(querry !== '') && <button className="clear-button" onClick={handleClearSelection}><FaTimes /></button>}
        <input type="text" ref={searchTerm} />
        <button className="search-button" onClick={handleSearch}><FaSearch /></button>
    </div>;
}