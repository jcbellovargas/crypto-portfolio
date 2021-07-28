# https://www.coingecko.com/api/documentations/v3
class CoingeckoClient
  def currency_data(currency_id)
    begin
      url = "https://api.coingecko.com/api/v3/coins/#{currency_id}"
      response = Faraday.get(url)
      json_response = JSON.parse(response.body)
      if json_response["error"].present?
        return error_response("API_ERROR", json_response["error"], 500)
      end
      response = {}
      response[:key] = json_response["id"]
      response[:name] = json_response["name"]
      response[:symbol] = json_response["symbol"].upcase
      response[:volume] = json_response["market_data"]["total_volume"]["usd"]
      response[:price] = json_response["market_data"]["current_price"]["usd"]
      response[:change_24h] = json_response["market_data"]["price_change_percentage_24h"].round(2) || 0
      response[:market_cap] = json_response["market_data"]["market_cap"]["usd"]
      response[:symbol] = json_response["symbol"]
      response[:img] = json_response["image"]["small"]
      { response: response, status: 200 }
    rescue => e
      return error_response("API_ERROR", e.message, 500)
    end
  end

  def market_chart(currency_id, vs_currency, days, interval)
    begin
      url = "https://api.coingecko.com/api/v3/coins/"
      url += "#{currency_id}/market_chart?vs_currency=#{vs_currency}&days=#{days}&interval=#{interval}"
      response = Faraday.get(url)
      json_response = JSON.parse(response.body)
      if json_response["error"].present?
        return error_response("API_ERROR", json_response["error"], 500)
      end
      chart_data = []
      json_response["prices"].each do |daily_price|
        ticks = daily_price.first
        price = daily_price.last
        date = Time.at(ticks/1000).strftime("%m/%d")
        chart_data << { date: date, price: price }
      end
      { response: chart_data, status: 200 }
    rescue => e
      return error_response("API_ERROR", e.message, 500)
    end
  end

  private

  def error_response(code, message, status)
    { error_code: code, message: message, status: status }
  end
end