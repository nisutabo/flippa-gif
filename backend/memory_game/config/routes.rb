Rails.application.routes.draw do
  namespace :api do
    resources :cards, only: [:index]
    resources :categories, only: [:index, :show]
    end
end
