# Free Book Store

Esta é uma API criada com Express, Typescript, Prisma, Postgres e Jest, que tem como objetivo gerenciar uma livraria comunitária para empréstimo de livros.

## Instalação

Certifique-se de ter o Node.js e o npm (gerenciador de pacotes do Node.js) instalados em seu sistema antes de prosseguir.

1. Clone este repositório para o seu ambiente local:

```bash
git clone git@github.com:codethi/freebookstore-api.git
```

2. Navegue até o diretório do projeto:

```bash
cd free-book-store
```

3. Crie um arquivo `.env.development` na raiz do projeto e adicione as seguintes configurações:

```plaintext
DATABASE_URL=<URL_DO_BANCO_DE_DADOS>
SECRET_JWT=<CHAVE_SECRETA_PARA_JWT>
MODE=<MODO_DE_EXECUCAO>
```

Certifique-se de substituir `<URL_DO_BANCO_DE_DADOS>`, `<CHAVE_SECRETA_PARA_JWT>` e `<MODO_DE_EXECUCAO>` pelos valores apropriados para o seu ambiente. Repita essas configurações para o arquivo `.env.test`, garantindo que os mesmos dados sejam utilizados para esses ambientes também.

4. Instale as dependências do projeto:

```bash
npm install
```

5. Execute as migrações do banco de dados para criar a estrutura necessária para o ambiente de desenvolvimento:

```bash
npm run dev:migration:generate
```

6. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O servidor será executado localmente em `http://localhost:3000`.

## Scripts

O projeto possui os seguintes scripts no arquivo `package.json`:

- `build`: Compila o código TypeScript para JavaScript.
- `dev`: Inicia o servidor de desenvolvimento com o `ts-node` assistindo alterações no diretório `src/server`.
- `dev:migration:generate`: Gera as migrações do Prisma para o ambiente de desenvolvimento.
- `test:migration:generate`: Gera as migrações do Prisma para o ambiente de teste.
- `test`: Executa os testes unitários utilizando o Jest no ambiente de teste.
- `test:coverage`: Executa os testes unitários e gera um relatório de cobertura.

## Contribuição

Se você deseja contribuir com o projeto, siga as etapas abaixo:

1. Crie um fork deste repositório.
2. Crie uma nova branch com a sua contribuição:

```bash
git checkout -b minha-contribuicao
```

3. Faça as alterações e commit no repositório local.
4. Envie as alterações para o seu fork:

```bash
git push origin minha-contribuicao
```

5. Abra um pull request para o repositório original.

Agradecemos antecipadamente por suas contribuições!

## Licença

Este projeto está licenciado sob a licença [Mozilla Public License 2.0](LICENSE).