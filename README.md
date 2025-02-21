<<<<<<< HEAD
# gympass-api
=======
#App

Gympass Style app.

## RFs (Requisitos Funcionais)

- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possivel se Autenticar;
- [x] Deve ser possivel obter o perfil de um usuario logado;
- [x] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [x] Deve ser possivel o usuario obter seu historico de check-ins;
- [x] Deve ser possivel o usuario buscar academias proximas;
- [x] Deve ser possivel o usuario buscar academias pelo nome;
- [x] Deve ser possivel o usuario realizar check-in em uma academia;
- [x] Deve ser possivel validar o check-in de um usuario;
- [x] Deve ser possivel cadastrar uma academia;

## RNs (Regras de Negocio)

- [x] O usuario nao deve poder se cadastrar com o email duplicado;
- [x] O usuario nao pode fazer 2 check-ins no mesmo dia;
- [x] O usuario nao pode fazer check-in se nao estiver perto (100m) da academia;
- [x] O check-in so pode ser validado ate 20 min apos criado;
- [x] O check-in so pode ser validado por administradores;
- [x] A academia so pode ser cadastrado por administradores;

## RNFs (Requisitos Nao Funcionais)

- [x] A senha do usuario precisa estar criptografada;
- [x] Os dados da aplicacao precisam estar persistidos em um banco PostgreSQL;
- [x] Todas as listas de dados precisam estar paginadas com 20 items por pagina;
- [x] O usuario deve ser identificado por um JWT;
>>>>>>> 98ba41f (Initial Commit)
