import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Search from './Search'
import Currency from './Currency'
import Dashboard from './Dashboard'

export default function Portfolio() {

  const [currentSearch, setCurrentSearch] = useState([]);
  const [currencyDetails, setCurrencyDetails] = useState({});
  
  const resetSearch = () => {
    setCurrentSearch([]);
    return;
  }
  const handleChange = (e) => {
    const pattern = e.target.value;
    if (pattern.length == 0) resetSearch();
    axios.post('./search', { 
      pattern: pattern
    })
    .then( (response) => {
      setCurrentSearch(response.data)
    })
  }
  const handleClick = (e) => {
    const currency_id = e.target.getAttribute("data-id");
    axios.post('./currency_details', { 
      id: currency_id
    })
    .then( (response) => {
      setCurrencyDetails(response.data.details);
      resetSearch();
    })
  }
  return (
    <div>
      <Search 
        onChange={ (e) => handleChange(e) } 
        searchResults={currentSearch.currencies}
        onClick={ (e) => handleClick(e) }
      />
      {currencyDetails.key && (
        <Currency 
          price={currencyDetails.price} 
          key={currencyDetails.key} 
          img={currencyDetails.img} 
          name={currencyDetails.name} 
          volume={currencyDetails.volume} 
          change24h={currencyDetails.change_24h} 
          marketcap={currencyDetails.market_cap} 
          symbol={currencyDetails.symbol}
        />
      )}
    </div>
  );
}


