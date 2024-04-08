class Produto < ApplicationRecord
  has_one_attached :imagem, dependent: :destroy

  validates :nome, presence: true, length: { minimum: 3, maximum: 50, message: "deve ter entre 3 e 50 caracteres" }
  validates :preco, presence: true, numericality: { greater_than_or_equal_to: 10, message: "deve ser maior ou igual a 10" }
  validates :descricao, presence: true, length: { minimum: 30, maximum: 255, message: "deve ter entre 30 e 255 caracteres" }
  validate :imagem_size_validation

  def as_json(object = {})
    super(only: [:id, :nome, :descricao, :preco, :imagem]).
      merge(imagem: imagem.url)
  end

  private

  def imagem_size_validation
    if imagem.attached? && imagem.blob.byte_size > 2.megabytes
      errors.add(:imagem, 'imagem muito grande (máximo 2mb)')
    end
  end
end
