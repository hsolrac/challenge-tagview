class Produto < ApplicationRecord
  has_one_attached :imagem

  has_one_attached :imagem

  validates :nome, presence: true, length: { minimum: 3, maximum: 50 }
  validates :preco, presence: true, numericality: { greater_than_or_equal_to: 10}
  validates :descricao, presence: true, length: { minimum: 30, maximum: 255 }

  def as_json(options = {})
    super(options.merge({
      except: [:created_at, :updated_at],
      methods: :imagem
    }))
  end
end
