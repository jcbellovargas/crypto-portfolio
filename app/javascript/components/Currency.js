import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import "./Currency.css";


function Currency(props) {
  debugger;
  return (
    <div className="cryptoCoin">
      <img src={props.img} alt={`${props.name}`} className="coinLogo" />
      <div className="coinNameWrap">
        <h1 className="coinName">{props.name}</h1>
        <p className="coinSymbol">{props.symbol}</p>
      </div>
      <p className="coinPrice">${props.price.toLocaleString()}</p>
      <p className="coinMarketcap">Market Cap: ${props.marketcap.toLocaleString()}</p>
      <p className="coinVolume">Volume (24H): ${props.volume.toLocaleString()}</p>
      {props.change24h < 0 ? (
        <div className="priceContainerDOWN">
          <FontAwesomeIcon icon={faAngleDown} />
          <p className="priceChange">{props.change24h.toFixed(2)}%</p>
        </div>
      ) : (
        <div className="priceContainerUP">
          <FontAwesomeIcon icon={faAngleUp} />
          <p className="priceChange">{props.change24h.toFixed(2)}%</p>

        </div>
      )}
      <button type="button" class="btn btn-primary btn-rounded btn-icon"> <FontAwesomeIcon icon={faPlus} /> 
        Add to Portfolio
      </button> 
      
    </div>  
  );
}

export default Currency