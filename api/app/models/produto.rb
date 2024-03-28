class Produto < ApplicationRecord
  has_one_attached :imagem, dependent: :destroy

  validates :nome, presence: true, length: { minimum: 3, maximum: 50 }
  validates :preco, presence: true, numericality: { greater_than_or_equal_to: 10}
  validates :descricao, presence: true, length: { minimum: 30, maximum: 255 }

  def as_json(object = {})
    super(only: [:nome, :descricao, :preco, :imagem]).
      merge(imagem: imagem_url)
  end

  private 

  def imagem_url 
    imagem.attached? ? Rails.application.routes.url_helpers.rails_blob_path(imagem, only_path: true) : ''
  end

end
