module Api 
  module V1 
    class ProdutosController < ApplicationController
      after_action { pagy_headers_merge(@pagy) if @pagy }
      
      def index
        @pagy, produtos = pagy(Produto.all, items: params[:limit])

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

      def importacao 
        file = params[:file]
        importacao = TagProducts::ImportacaoService.new(file: file).call
        
        if importacao.key?(:ok)
          render json: {}, status: :ok
        else
          render json: importacao, status: 400
        end
      end

      private

      def produto_params
        params.require(:produto).permit(:nome, :descricao, :preco, :imagem)
      end
    end
  end
end
