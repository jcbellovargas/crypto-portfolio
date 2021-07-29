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
    details_response = @currency.details
    if details_response[:error_code].present?
      render json: details_response, status: details_response[:status]
    else
      render json: details_response[:response], status: details_response[:status]
    end
  end

  def calculate

  end
end