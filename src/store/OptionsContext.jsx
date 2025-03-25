import { createContext, useState } from "react";

const OptionsContext = createContext({
    sort:'',
    priceFrom: '',
    priceTo: '',
    category:'',
    selectCategory: (category) => {},
    selectSortType: (type) => {},
    selectPriceRangeFrom: (priceFrom) => {},
    selectPriceRangeTo: (priceTo) => {},
});

export function OptionsContextProvider({children}) {
    const [sortType,setSortType] = useState('');
    const [category,setCategory] = useState('');
    const [priceFrom,setPriceFrom] = useState('');
    const [priceTo,setPriceTo] = useState('');

    function selectCategory(category) {
        setCategory(category);
    }
    function selectSortType(type){
        setSortType(type);
    }
    function selectPriceRangeFrom(priceFrom) {
        setPriceFrom(priceFrom);
    }
    function selectPriceRangeTo(priceTo) {
        setPriceTo(priceTo);
    }
    const optionCtx = {
        sort:sortType,
        priceFrom:priceFrom,
        priceTo: priceTo,
        category: category,
        selectCategory,
        selectSortType,
        selectPriceRangeFrom,
        selectPriceRangeTo,
    }
    return(<OptionsContext.Provider value={optionCtx}>
        {children}
    </OptionsContext.Provider>)
}

export default OptionsContext;