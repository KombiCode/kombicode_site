require 'sidekiq/web'

Rails.application.routes.draw do
  resources :messages
  resources :contacts
  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'

    namespace :madmin do
    end
  end

  get '/:locale' => 'home#index'

  devise_for :users
  root to: 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
