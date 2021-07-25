import React, { Component } from 'react'
import axios from 'axios'
import Search from './Search'
import Currency from './Currency'

class PortfolioComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSearch: [],
      currencyDetails: {},
    };
  }

  resetSearch() {
    this.setState({ currentSearch: [] });
    return;
  }

  handleChange(e) {
    const pattern = e.target.value;
    if (pattern.length == 0) this.resetSearch();
    axios.post('./search', { 
      pattern: pattern
    })
    .then( (response) => {
      this.setState({ currentSearch: response.data })
    })
  }

  handleClick(e) {
    const currency_id = e.target.getAttribute("data-id");
    axios.post('./currency_details', { 
      id: currency_id
    })
    .then( (response) => {
      this.setState({ currencyDetails: response.data.details });
      this.resetSearch();
    })
  }


  render () {
    const details = this.state.currencyDetails;
    if (details.key) debugger;
    return (
      <div>
        <Search 
          onChange={ (e) => this.handleChange(e) } 
          searchResults={this.state.currentSearch.currencies}
          onClick={ (e) => this.handleClick(e) }
        />
        {details.key && (
          <Currency 
            price={details.price} 
            key={details.key} 
            img={details.img} 
            name={details.name} 
            volume={details.volume} 
            change24h={details.change_24h} 
            marketcap={details.market_cap} 
            symbol={details.symbol}
          />
        )}
      </div>
    );
  }

}

export default PortfolioComponent


