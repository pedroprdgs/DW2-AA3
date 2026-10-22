# Instalação e configuração

## 1. Pré-requisitos

Antes de executar o projeto, instale:

- **Node.js** com suporte a ES Modules.
- **npm**, incluído com o Node.js.
- **MySQL client**.
- **Git**, para clonar o repositório.

## 2. Clonar o projeto

```bash
git clone https://github.com/pedroprdgs/DW2-AA3.git
cd DW2-AA3
```

## 3. Instalar as dependências

Na raiz do projeto, execute:

```bash
npm install
```

## 4. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=db_vendas
```

Substitua `seu_usuario` e `sua_senha` pelas credenciais do MySQL instalado no ambiente.

**Importante:** não compartilhe o arquivo `.env` nem envie suas credenciais ao Git. Utilize o `.env.example` para documentar as variáveis necessárias.

## 5. Criar o banco de dados

No MySQL, execute o script de estrutura:

```bash
mysql -u seu_usuario -p < database/schema.sql
```

Esse script deve criar o banco `db_venda` e as tabelas necessárias para a aplicação.

## 6. Inserir os dados de teste

Após criar as tabelas, execute:

```bash
mysql -u seu_usuario -p < database/seed.sql
```

O script insere as regiões, os vendedores e as vendas de exemplo.

## 7. Executar a aplicação

Para iniciar em modo de desenvolvimento:

```bash
npm run dev
```

Para executar usando o comando de produção:

```bash
npm start
```

Por padrão, a API estará disponível em:

```text
http://localhost:3000
```

Se a variável `PORT` estiver configurada com outra porta, utilize o endereço correspondente.

## 8. Verificar a instalação

Com o servidor em execução, teste uma rota como:

```http
GET http://localhost:3000/vendedores
```

Uma resposta HTTP de sucesso indica que a API está respondendo. Para verificar o acesso ao banco de dados, consulte também as rotas que realizam operações de leitura e escrita.
