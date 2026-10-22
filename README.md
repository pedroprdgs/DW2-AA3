# Sistema de Vendas com Comissões, Metas e Performance

Uma rede de lojas possui unidades nas regiões Norte, Nordeste, Sudeste e Sul. Atualmente, o controle de vendas, comissões e metas dos vendedores é realizado por planilhas. Com o crescimento da rede, torna-se necessário desenvolver um sistema Back-End que armazene dados em banco relacional, automatize o cálculo de comissões e disponibilize relatórios de desempenho comercial.

## Desafio e requisitos técnicos

Desenvolva uma aplicação Back-End em **JavaScript** com Node.js e MySQL para gerenciar vendedores, vendas, comissões e metas, utilizando funções assíncronas com async/await.

* Utilizar mysql2/promise na comunicação com o MySQL.

* Implementar funções reutilizáveis com async/await e tratamento de erros com try/catch.

* Utilizar SQL: INSERT, SELECT, UPDATE, DELETE, JOIN, GROUP BY e funções de agregação.

* Empregar consultas parametrizadas para prevenir SQL Injection.

* Disponibilizar uma API REST com Express e respostas JSON; testar com Postman ou Insomnia ou Thunder Client.

* **Não é necessário desenvolver interface Front-End.**

## Modelagem do banco de dados

Criar o banco `db_venda` e, no mínimo, as três tabelas abaixo. Definir chaves primárias, estrangeiras e restrições de integridade.

### Vendedores

| Campo | Tipo sugerido | Descrição |
| ----- | ------------- | --------- |
| id_vendedor | INT | Chave primária |
| nome | VARCHAR(100) | Nome do vendedor |
| meta_mensal | DECIMAL(12,2) | Meta mensal em R$ |
| percentual_base | DECIMAL(5,2) | Comissão base (%) |
| ativo | BOOLEAN | Situação do vendedor |

### Regiões

| Campo | Tipo sugerido | Descrição |
| ----- | ------------- | --------- |
| id_região | INT | Chave primária |
| nome_região | VARCHAR(50) | Norte, Nordeste, Sudeste ou Sul |
| percentual_bonus | DECIMAL(5,2) | Bonus regional (%) |

### Vendas

| Campo | Tipo sugerido | Descrição |
| ----- | ------------- | --------- |
| id_venda | INT | Chave primária / código único |
| id_vendedor | INT | Chave estrangeira para vendedores |
| id_regiao | INT | Chave estrangeira para regiões |
| data_venda | DATETIME | Data e hora da venda |
| valor_venda | DECIMAL(12,2) | Valor da venda em R$ |
| tipo_cliente | ENUM('PF', 'PJ') | Pessoa física ou jurídica |
| valor_comissao | DECIMAL(12,2) | Comissão calculada em R$ |

## Funcionalidades obrigatórias

### Cadastro e gerenciamento de vendedores

1. Cadastrar vendedor com nome, meta mensal e percentual base.

2. Listar todos os vendedores e consultar vendedor por código.

3. Atualizar meta mensal e percentual base.

4. Desativar vendedor, preservando o histórico de vendas.

### Cadastro e gerenciamento de vendas

1. Registrar venda vinculada a vendedor e região.

2. Listar vendas e consultar vendas por vendedor e por região.

3. Excluir uma venda após verificar sua existência.

4. Validar vendedor ativo, região existente, valor positivo e código de venda único.

## Regras de comissão

Comissão base = valor da venda × percentual base / 100. Os bônus são somados ao percentual base, sem composição entre percentuais.

| Tipo de cliente | Bônus |
| --------------- | ----- |
| PF - Pessoa Física | 2% |
| PJ - Pessoa Jurídica | 3% |

| Região | Bônus |
| ------ | ----- |
| Norte | 1% |
| Nordeste | 1% |
| Sudeste | 0% |
| Sul | 0,5% |

**Comissão total** = valor_venda × (percentual_base + percentual_cliente + percentual_regiao) / 100.

Exemplo: uma venda de R$ 2.000,00 para cliente PJ na região Norte, com base de 5%, gera comissão de R$ 180,00 (9%).

Implementar uma função específica para calcular a comissão; evitar duplicação dessa lógica.

## Funções assíncronas obrigatórias

| Função | Responsabilidade |
| ------ | ---------------- |
| cadastrarVendedor() | Inserir vendedor no MySQL |
| listarVendedores() | Consultar vendedores |
| atualizarVendedor() | Atualizar meta e comissão base |
| desativarVendedor() | Alterar situação do vendedor |
| registrarVenda() | Validar, calcular e registrar uma venda |
| listarVendas() | Consultar vendas |
| consultarVendasPorVendedor() | Filtrar por vendedor |
| excluirVenda() | Excluir venda existente |
| calcularComissao() | Aplicar as regras de comissão |
| gerarRelatorioPerformance() | Consolidar indicadores por período |

Exemplo de estrutura de função assíncrona (apenas referência; não é a solução completa):

```javascript
async function listarVendedores() {
    try {
        const [resultados] = await conexao.execute(
            "SELECT * FROM vendedores WHERE ativo = ?", [1]
        );
        return resultados;
    } catch (erro) {
        console.error("Erro ao consultar vendedores:", erro.message);
        throw erro;
    }
}
```

## Relatórios de performance

O relatório deverá receber data inicial e final, e calcular os indicadores com base nas vendas do período. Para metas mensais, considerar o mês de referência.

| Indicador | Resultado esperado |
| --------- | ------------------ |
| Total de vendas | Quantidade de vendas registradas |
| Vendas por região | Soma em R$ por região |
| Vendas por tipo de cliente | Soma em R$ para PF e PJ |
| Melhor vendedor | Maior valor vendido |
| Maior comissão | Vendedor com maior comissão acumulada |
| Metas atingidas | Quantidade de vendedores que atingiram a meta no mês |
| Comissão média geral | Média da comissão por venda |
| Comissão média por região | Média da comissão por venda em cada região |

**Requisito**: pelo menos quatro indicadores deverão utilizar consultas SQL com `JOIN`, `GROUP BY`, `SUM()`, `AVG()` ou `COUNT()`.

## API REST

| Método | Endpoint | Operação |
| ------ | -------- | -------- |
| POST | /vendedores | Cadastrar vendedor |
| GET | /vendedores | Listar vendedores |
| GET | /vendedores/:id | Consultar vendedor |
| PUT | /vendedores/:id | Atualizar vendedor |
| PATCH | /vendedores/:id/desativar | Desativar vendedor |
| POST | /vendas | Registrar venda |
| GET | /vendas | Listar vendas |
| GET | /vendas/vendedor/:id | Consultar por vendedor |
| GET | /vendas/regiao/:id | Consultar por região |
| DELETE | /vendas/:id | Excluir venda |
| GET | /relatorios/performance | Relatório gerencial |

Exemplo: `GET /relatorios/performance?inicio=2026-10-01&fim=2026-10-31`. Retornar JSON e códigos HTTP pertinentes, como 200, 201, 400, 404 e 500.

## Testes obrigatórios

Cadastrar no mínimo cinco vendedores e quinze vendas distribuídas entre as quatro regiões, incluindo PF e PJ.

1. Cadastro de vendedor e registro com comissão correta.

2. Tentativa de venda com código duplicado.

3. Tentativa de venda para vendedor inexistente ou inativo.

4. Atualização de meta mensal.

5. Consultas por região e por vendedor.

6. Relatório mensal identificando atingimento de metas.

7. Tratamento de erros na conexão ou consulta ao banco.

## Entregáveis

* Código fonte completo da API Node.js.

* Script .sql para criação do banco, tabelas, relacionamentos e dados de teste.

* Capturas de tela das requisições e respostas no Postman ou Insomnia.

* README com [instalação](./INSTALLATION.md), [configuração](./INSTRUCTIONS.md) e execução da aplicação.

* Credenciais do banco em variáveis de ambiente, sem senhas no código-fonte.

## Critérios de avaliação

| Critério | Nota |
| -------- | ---- |
| Modelagem MySQL e relacionamentos | 1,5 |
| Funções com async/await | 2,0 |
| Cadastro, consulta e atualização | 1,5 |
| Regras de comissões | 1,5 |
| Relatórios SQL e indicadores | 1,5 |
| Testes e organização | 1,0 |
| Entregáveis no seu github | 1,0 |
| TOTAL | 10,0 |
