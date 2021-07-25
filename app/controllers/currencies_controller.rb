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
    render json: { details: @currency.details }
  end

  def calculate

  end
end