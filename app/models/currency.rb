
class Currency < ApplicationRecord
  def details
    coingecko_api = Coingecko.new
    coingecko_api.currency_data(self.currency_id)
  end

  def current_value(amount)
    (self.price * amount).round(5)
  end
end