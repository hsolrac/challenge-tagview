class Produto < ApplicationRecord
  has_one_attached :imagem, dependent: :destroy

  validates :nome, presence: true, length: { minimum: 3, maximum: 50, message: 'Nome deve ter entre 3 e 50 caracteres' }
  validates :preco, presence: true, numericality: { greater_than_or_equal_to: 10, message: 'Preço deve ser maior ou igual a 10' }
  validates :descricao, presence: true, length: { minimum: 30, maximum: 255, message: 'Descrição deve ter entre 30 e 255 caracteres' }


  def as_json(object = {})
    super(only: [:id, :nome, :descricao, :preco, :imagem]).
      merge(imagem: imagem.url)
  end
end
