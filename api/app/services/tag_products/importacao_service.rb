# frozen_string_literal: true

require 'csv'

module TagProducts 
  class ImportacaoService 
    attr_accessor :file
    
    def initialize(file:)
      @file = file
    end

    def call
      return validate_file if validate_file.values.flatten.any?
  
      response = process(file)
      return response
    end

    private 
  
    def process(file)
      produtos = []
      CSV.foreach(file.path, headers: true) do |row|
        row_hash = row.to_h
        row_hash['nome'] = row_hash['nome'].to_s
        row_hash['preco'] = row_hash['preco'].to_f
        row_hash['descricao'] = row_hash['descricao'].to_s

        imagem_blob = process_imagem(row_hash['imagem'])
        row_hash['imagem'] = imagem_blob if imagem_blob
        
        produtos << row_hash
      end

      result = Produto.create(produtos)

      if result.all?(&:valid?)
        return {ok: 'Importacão realizada com sucesso'}
      else
        erros = result.map { |produto| produto.errors.full_messages }
        return {error: result.errors }
      end
    end

    MAX_FILE_SIZE_MB = 10
    MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

    def validate_file
      size = File.new(file).size

      errors = []
      errors << "Arquivo recebido não é CSV" unless File.extname(file) == '.csv'
      errors << "Arquivo maior do que 10Mb" if size > MAX_FILE_SIZE_BYTES

      return { "erros": errors }
    end

    def process_imagem(imagem)
      imagem_binaria = Base64.decode64(imagem)

      content_type = imagem.match(/data:image\/(.*?);/)[1]
      extension = content_type == 'jpeg' ? 'jpg' : content_type

      imagem_blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new(imagem_binaria),
        filename: "imagem.#{extension}",
        content_type: "image/#{extension}"
      )

      imagem_blob
    end
  end
end
