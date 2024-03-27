class CreateProdutos < ActiveRecord::Migration[7.1]
  def change
    create_table :produtos, id: :uuid do |t|
      t.string :nome
      t.text :descricao
      t.decimal :preco
      t.string :imagem

      t.timestamps
    end
  end
end
