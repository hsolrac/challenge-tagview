## Teste para vaga de Desenvolvedor FullStack na TagView 

### Requisitos
- Docker
- Docker compose

> (Caso não esteja usando docker, você pode consultar o README de cada projeto separadamente)
 [API](/api/README.md) | [Cliente](/client/README.md)


### Rodando projeto
Clone este repositorio
```bash
git clone git@github.com:hsolrac/challenge-tagview.git
cd challenge-tagview
```
Buid e rode o projeto 

```bash
docker compose up --build
```

Aguarde alguns minutos e se tudo estiver ok, basta acessar *http://localhost:3000*

### Testes 

```bash
docker exec it nome_do_container bin/rails rspec
```

### Documentação API (exemplos com cURL)

Defina a seguinte variavel de ambiente para usar nos exemplos:

```bash
export API_HOST=http://localhost:4000/api/v1/
```
#### Lista de Produtos 
 > O *[jq](https://jqlang.github.io/jq/download/)* é um utilitário para formatar saidas JSON no terminal

```bash
curl -H "X-API-KEY: tagview-desafio-2024" "$API_HOST/produtos" | jq 
```
#### Cadastrando um produto 

```bash
curl -X POST $API_HOST \
     -H "Content-Type: application/json" \
     -H "X-API-KEY: tagview-desafio-2024" \
     -d '{"nome": "Produto1", "descricao": "Este produto é um teste feito via cURL", "preco": 100}' | jq
```
#### Importando produtos via csv 

```bash
curl -X POST  -H "X-API-KEY: tagview-desafio-2024" \
 -F "file=@/caminho/para/o/arquivo.csv" $API_HOST"/importacao"
```
##### TODO
- API
  - Endpoints
    - [x] Lista de produtos
    - [x] Cadastro de produtos
  - Validações
    - [x]  Nome do Produto: mínimo de 3 caracteres, máximo 50, obrigatório.
    - [x]  Preço do Produto: mínimo numérico de 10, máximo indefinido, obrigatório.
    - [x]  Descrição Completa: mínimo de 30 caracteres, máximo de 255, obrigatório.
    - [x]  Imagem: png ou jpg, máximo de 5MB, opcional.
    - [x]  (Opcional) Importação de produtos via CSV
  - [x] Paginação
      
- FRONTEND
    - [x] /produtos/exibir (Listagem em cards)
    - [x] /produtos/cadastro
    - [x] Paginação e escolher limite de produtos por pagina (20, 50 ou todos)
    - [x] Abrir modal com informações do produto ao clicar no card
    - [x] Validações
    - [x] Abrir modal do produto ao detectar query params idProduto
    - Melhorias visuais
        - [ ] Listagem
        - [x] Formulario de cadastro
        - [x] Paginação e select de itens por pagina
        - [ ] Modal
        - [ ] Card  
      
 
- [x] Deploy    
