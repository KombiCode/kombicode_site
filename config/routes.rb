require 'sidekiq/web'

Rails.application.routes.draw do
  match "/404", :to => "errors#not_found", :via => :all
  match "/500", :to => "errors#internal_server_error", :via => :all
  
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  resources :messages
  # resources :contacts

  resources :contacts, path_names: {new: 'new/:from' }

  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'

    namespace :madmin do
    end
  end

  get '/:locale' => 'home#index'

  # devise_for :users
  root to: 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
