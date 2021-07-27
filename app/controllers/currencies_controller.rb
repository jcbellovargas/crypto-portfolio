class CurrenciesController < ApplicationController
  def index
  end

  def search
    pattern = "#{params[:pattern].downcase}%"
    currencies = Currency.where("LOWER(name) LIKE ? OR LOWER(symbol) LIKE ?", pattern, pattern)
    render json: { currencies: currencies }
  end

  def currency_details
    @currency = Currency.find(params[:id])
    currency_details = @currency.details
    render json: currency_details, status: 200
    # render json: ["Error message"], status: 500
  end

  def calculate

  end
end