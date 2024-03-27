module Api 
  module V1 
    class ProdutosController < ApplicationController
      def index 
        pagy, produtos = pagy(Produto.all)
        render json: produtos
      end

      def create 
        produto = Produto.new(produto_params)

        if produto.save
          render json: produto, status: :ok
        else 
          render json: { errors: produto.errors.messages.values.flatten }, status: :unprocessable_entity
        end
      end

      private

      def produto_params
        params.require(:produto).permit(:nome, :descricao, :preco, :imagem)
      end
    end
  end
end
