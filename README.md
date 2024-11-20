#App

Gympass Style app.

## RFs (Requisitos Funcionais) -> Funcionalidade 

- [ ] Deve ser possivel se cadastrar;
- [ ] Deve ser possivel se Autenticar;
- [ ] Deve ser possivel obter o perfil de um usuario logado;
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [ ] Deve ser possivel o usuario obter seu historico de check-ins;
- [ ] Deve ser possivel o usuario buscar academias proximas;
- [ ] Deve ser possivel o usuario buscar academias pelo nome;
- [ ] Deve ser possivel o usuario realizar check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuario;
- [ ] Deve ser possivel cadastrar uma academia;

## RNs (Regras de Negocio) -> 

- [ ] O usuario nao deve poder se cadastrar com o email duplicado;
- [ ] O usuario nao pode fazer 2 check-ins no mesmo dia;
- [ ] O usuario nao pode fazer check-in se nao estiver perto (100m) da academia;
- [ ] O check-in so pode ser validado ate 20 min apos criado;
- [ ] O check-in so pode ser validado por administradores;
- [ ] A academia so pode ser cadastrado por administradores;

## RNFs (Requisitos Nao Funcionais) -> Qual bando de dados? Qual estrategia da aplicacao? Coisas mais tecnicas

- [ ] A senha do usuario precisa estar criptografada;
- [ ] Os dados da aplicacao precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 items por pagina;
- [ ] O usuario deve ser identificado por um JWT;

## Primeiros comandos

- npm init -y
- npm i typescript @types/node tsx tsup -D  // Instala o typescript, tsx (biblioteca usada para executar o codigo typescript pois o node nao entende ts), tsup ( Biblioteca utilizada na criacao da build da aplicacao, para quando colocar o projeto em producao o codigo ts seja convertido para js)
- npx tsc --init (Cria o tsconfig.json)
- npm i fastify
- npm i dotenv (Biblioteca usada para ler o arquivo .env e transformar em variaveis ambiente dentro do node)
- npm i zod
- npm i eslint @rocketseat/eslint-config -D

- npm i prisma -D 
    - npx prisma init
    - npx prisma generate, cria uma forma automatica de tipagem do schema, que seria a integracao do typescript para que o codiga entenda que existe a tabela criada, e que ela tem os campos inseridos.
-npm i @prisma/client, usada para acessar o banco de dados

## Utils
- (ALIAS DE IMPORTACAO) No tsconfig.js, descomentar e aplicar esses comandos:
    "baseUrl": "./",                                  
    "paths": {
        "@/*": ["./src/*"]
    },
    Torna possivel importar utilizando apenas @/nomedoarquivo, sem precisar utilizar ../../ para voltar pastas

- No settings.json, aplicar esses comandos para quando salvar arquivos prisma ocorrer uma formatação:    
    "[prisma]": {
    "editor.formatOnSave": true
    }
