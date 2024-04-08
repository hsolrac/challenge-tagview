## API TagProducts 

### Requisitos 

- Ruby 3.1.2
- Postgres

### Configurando 

1 - Instale as dependências ``bundle install`` 

2 - Prepare o banco de dados ``bin/rails db:prepare``

### Suite de Testes 

1 - ``bin/rails rpsec``

### Rodando aplicação 

1 - ``bin/rails server`` 

2 - Acesse a aplicação via cURL:

```bash
curl http://localhost:4000/api/v1/produtos 
```


