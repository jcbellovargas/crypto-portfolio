
class Currency < ApplicationRecord
  def details
    coingecko_client = CoingeckoClient.new
    currency_data = coingecko_client.currency_data(self.currency_id)
    market_chart = coingecko_client.market_chart(self.currency_id, "usd", 8, "daily")
    currency_data[:response][:market_chart] = market_chart[:response] if market_chart[:response].present?
    currency_data
  end

  def current_value(amount)
    (self.price * amount).round(5)
  end
end