FactoryBot.define do
  factory :produto do
    nome { Faker::Commerce.product_name }
    descricao { Faker::Lorem.characters(number: rand(30..255)) }
    preco { Faker::Commerce.price(range: 10..10000) }
  end
end
