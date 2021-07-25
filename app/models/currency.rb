
class Currency < ApplicationRecord
  def details
    # https://www.coingecko.com/api/documentations/v3
    url = "https://api.coingecko.com/api/v3/coins/#{self.currency_id}"
    response = Faraday.get(url)
    json_response = JSON.parse(response.body)
    {}.tap do |response|
      response[:key] = json_response["id"]
      response[:name] = json_response["name"]
      response[:symbol] = json_response["symbol"].upcase
      response[:volume] = json_response["market_data"]["total_volume"]["usd"]
      response[:price] = json_response["market_data"]["current_price"]["usd"]
      response[:change_24h] = json_response["market_data"]["price_change_percentage_24h"] || 0
      response[:market_cap] = json_response["market_data"]["market_cap"]["usd"]
      response[:symbol] = json_response["symbol"]
      response[:img] = json_response["image"]["small"]  
    end
  end

  def current_value(amount)
    (self.price * amount).round(5)
  end
end