require 'rails_helper'

RSpec.describe Produto, type: :model do
  it 'it valid with attributes' do 
    produto = create(:produto)
    expect(produto).to be_valid
  end

  it 'it not valid without attributes nome, preco and descricao' do 
    produto = build(:produto, nome: nil, descricao: nil, preco: nil)
    expect(produto).to_not be_valid
  end

  context 'Validates' do 
    it { should validate_presence_of(:nome) }
    it { should validate_presence_of(:preco) }
    it { should validate_presence_of(:descricao) }

    it { is_expected.to validate_length_of(:nome).is_at_least(3).is_at_most(50).with_message("deve ter entre 3 e 50 caracteres") }
    it { is_expected.to validate_length_of(:descricao).is_at_least(30).is_at_most(255).with_message("deve ter entre 30 e 255 caracteres") }
    it { is_expected.to validate_numericality_of(:preco).is_greater_than_or_equal_to(10).with_message("deve ser maior ou igual a 10") }


    it 'has a maximum size of 2 megabytes' do

      imagem = File.open(Rails.root.join('spec', 'support', 'test_images', '64.png'))
      produto = build(:produto, imagem: imagem)
      produto.valid?
      expect(produto.errors[:imagem]).to include('imagem muito grande (máximo 2mb)')
    end
  end
end
