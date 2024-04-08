Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do 
    namespace :v1 do 
      resources :produtos, only: [:index, :create] do 
        post 'importacao', on: :collection
      end
    end
  end
end
