import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Search(props) {
  let results;
  let autocompleteClass = "search-input";
  if (props.searchResults) {
    results = props.searchResults.map( result => <li data-id={result.id} onClick={props.onClick} key={result.currency_id}>{result.name} ({result.symbol.toUpperCase()})</li>)
    autocompleteClass += ' active'
  }
  return (
    <div className="wrapper">
      <div className={autocompleteClass}>
        <input onChange={props.onChange} placeholder="Search Crypto"/>
        <div className="autocom-box">
          {results}
        </div>
        <div className="icon">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>  
    </div>
  
  );
}

export default Search