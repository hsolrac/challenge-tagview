class ApplicationController < ActionController::API
  include Pagy::Backend
  include ActiveStorage::SetCurrent
end
