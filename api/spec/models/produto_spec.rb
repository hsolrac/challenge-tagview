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

    it { should validate_length_of(:nome).is_at_least(3).is_at_most(50) }
    it { should validate_length_of(:descricao).is_at_least(30).is_at_most(255) }
    it { should validate_numericality_of(:preco).is_greater_than_or_equal_to(10) }


    it 'has a maximum size of 2 megabytes' do
      produto = build(:produto, imagem: fixture_file_upload('/home/carlos/Imagens/wallpaper/64.png', 'image/jpeg'))
      produto.valid?
      expect(produto.errors[:imagem]).to include('imagem muito grande (máximo 2mb)')
    end
  end
end
