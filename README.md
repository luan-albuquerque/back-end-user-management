# API REST - NestJS e TypeORM

Bem-vindo(a) à minha API REST, desenvolvida com NestJS e TypeScript. Esta API utiliza TypeORM para o gerenciamento de usuários, adotando uma abordagem baseada em DDD e incorporando princípios fundamentais de SOLID para garantir uma arquitetura robusta e flexível.

Para facilitar o desenvolvimento e a implantação, utilizei Docker para a configuração do ambiente de desenvolvimento. Essa escolha não apenas simplifica os testes, mas também torna nossa API altamente eficiente e confiável em qualquer cenário.

Além disso, implemente testes unitários com Jest em partes essenciais do código, incluindo useCases e Entity, garantindo assim a qualidade e a confiabilidade do sistema.

Para facilitar a compreensão e integração com nossa API, utilizamos o Swagger como forma de documentação. Você pode acessar a documentação da API em /api/docs.

## Pré-requisitos

- Sistema operacional Linux Ubuntu 20.04 lts ou Windows 11

- Instalar VS CODE para visualizar os projetos

- Instalar Node versão v18.20.0 !Importante

- Instalar Yarn versão 1.22.22 !Importante

- Instalar a versão Git 2.25.1 

- Instalar Docker versão 24.0.5

- Instalar Docker-compose versão1.25.0-1

## Tecnologias
- Nestjs
- TypeORM
- Postgresql
- Swagger
- NodeMailer
- Docker

## Link para testar em produção:

`link`: https://

## Link para visualizar a documentação (swagger):

`link`: https://


# Observações

- É necessário adicionar todas as variaveis de ambiente para rodar perfeitamente.

- Deixarei no .env.example as variaveis ja disponivel.

- Qualquer dúvida, pode mandar mensagem para o meu e-mail luan.santos6605@gmail.com


## Arvore de diretorios e arquivos

```shell
  $ tree
├── app
│   ├── config
│   │   └── swagger.config.ts
│   ├── core
│   │   ├── guards
│   │   │   ├── admin.guard.ts
│   │   │   └── jwt.guard.ts
│   │   ├── jwt
│   │   │   └── jwt.module.ts
│   │   └── repositories
│   │       ├── contract
│   │       │   └── base.repository.contract.ts
│   │       └── implementations
│   │           └── base.repository.ts
│   └── modules
│       ├── auth
│       │   ├── auth.module.ts
│       │   ├── controller
│       │   │   └── auth.controller.ts
│       │   ├── data
│       │   ├── infra
│       │   ├── presentation
│       │   │   └── dto
│       │   │       ├── login.dto.ts
│       │   │       ├── redefine-password.dto.ts
│       │   │       └── update-password.dto.ts
│       │   └── usecase
│       │       ├── authenticate.usecase.ts
│       │       ├── redefine-password.usecase.ts
│       │       ├── send-email-with-token.usecase.ts
│       │       ├── token-decrypt.use.case.ts
│       │       └── token-encrypt.usecase.ts
│       ├── mail
│       │   ├── dtos
│       │   ├── mail.module.ts
│       │   ├── template
│       │   │   ├── confirmRedefinePassword.ejs
│       │   │   └── sendToken.ejs
│       │   └── usecase
│       │       ├── sendEmailConfirmRecoveyPassword.usecase.ts
│       │       └── SendEmailWithTokenForRecoverPassword.usecase.ts
│       └── user
│           ├── controller
│           │   └── user.controller.ts
│           ├── data
│           │   ├── contract
│           │   │   └── user-repository.contract.ts
│           │   ├── dto
│           │   │   ├── create-user.dto.ts
│           │   │   └── update-user.dto.ts
│           │   └── enums
│           │       └── acess-level.enum.ts
│           ├── domain
│           │   ├── __test__
│           │   │   └── user.spec.ts
│           │   └── user.entity.ts
│           ├── infra
│           │   ├── database
│           │   │   ├── database.module.ts
│           │   │   └── typeorm
│           │   │       ├── models
│           │   │       │   └── user.model.ts
│           │   │       └── repositories
│           │   │           └── typeorm-user.repository.ts
│           │   └── mappers
│           │       └── user.mapper.ts
│           ├── presentation
│           │   ├── dto
│           │   │   ├── create-user.dto.ts
│           │   │   └── update-user.dto.ts
│           │   └── responses
│           │       └── user.response.ts
│           ├── usecase
│           │   ├── create-user.usecase.ts
│           │   ├── delete-user.usecase.ts
│           │   ├── find-all-users.usecase.ts
│           │   ├── find-user-by-id.usecase.ts
│           │   ├── __test__
│           │   │   ├── create-user.usecase.spec.ts
│           │   │   ├── delete-use.use.case.spec.ts
│           │   │   ├── find-all-users.usecase.spec.ts
│           │   │   ├── find-user-by-id.usecase.spec.ts
│           │   │   └── update-user.usecase.spec.ts
│           │   └── update-user.usecase.ts
│           └── user.module.ts
├── app.module.ts
└── main.ts
```


## Inicializando Projeto

1. Clonar repositório

```bash
git clone https://github.com/luan-albuquerque/back-end-user-management.git
```

2. Instalar as depedências

obs: de preferencia yarn

```bash
npm install
ou
yarn
```

3. Ajustar o .env

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env ( ou somente renomear o arquivo env.example para .env )
`HOST`
`PORT`

`DB_HOST`
`DB_PORT`
`DB_USERNAME`
`DB_PASSWORD`
`DB_DATABASE`

`JWT_SECRET_KEY="I_WANT_TO_BE_PART_OF_THE_INDT_TEAM"`
`SECRET_ENCRYPT_AND_DECRYPT="SECRET_"`

`EMAIL_SERVICE="gmail"`
`EMAIL_HOST="smtp.gmail.com"`
`EMAIL_PORT=587`
`EMAIL_MAIL="testeindtmail@gmail.com"`
`PASSWORD_MAIL="ptgnxvracvneflbp"`


4. Rodar a aplicação com docker

```bash
docker-compose up --build
```

5. Rodar a aplicação localmente

```bash
yarn start:dev

```

6. Rodar a jest

```bash
yarn test

```
