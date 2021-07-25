Rails.application.routes.draw do
  root 'currencies#index'
  post 'search', to: 'currencies#search'
  post 'calculate', to: 'currencies#calculate'
  post 'currency_details', to: 'currencies#currency_details'
end
