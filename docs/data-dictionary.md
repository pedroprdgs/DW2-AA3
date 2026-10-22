# Dicionário de dados — Sistema de Vendas

## Tabela `vendedores`

Armazena os vendedores cadastrados no sistema, suas metas mensais, seus percentuais de comissão base e sua situação.

| Campo | Tipo de dado | Restrições | Descrição |
| ----- | ------------ | ---------- | --------- |
| id | INT | PK, AUTO_INCREMENT | Identificador único do vendedor. |
| nome | VARCHAR(100) | NOT NULL | Nome do vendedor, com até 100 caracteres. |
| meta_mensal | DECIMAL(12,2) | NOT NULL, DEFAULT 0 | Valor da meta mensal de vendas do vendedor. |
| percentual_base | DECIMAL(5,2) | NOT NULL, DEFAULT 0 | Percentual base utilizado no cálculo da comissão. |
| ativo | BOOLEAN | NOT NULL, DEFAULT 1 | Indica se o vendedor está ativo no sistema. |

## Tabela `regioes`

Armazena as regiões comerciais e os percentuais de bônus aplicados às vendas realizadas em cada uma delas.

| Campo | Tipo de dado | Restrições | Descrição |
| ----- | ------------ | ---------- | --------- |
| id | INT | PK, AUTO_INCREMENT | Identificador único da região. |
| nome | VARCHAR(50) | NOT NULL | Nome da região comercial, com até 50 caracteres. |
| percentual_bonus | DECIMAL(5,2) | NOT NULL, DEFAULT 0 | Percentual de bônus regional aplicado ao cálculo da comissão. |

## Tabela `vendas`

Armazena as vendas registradas, relacionando cada operação a um vendedor e a uma região, além de guardar os dados utilizados no cálculo da comissão.

| Campo | Tipo de dado | Restrições | Descrição |
| ----- | ------------ | ---------- | --------- |
| id | INT | PK, AUTO_INCREMENT | Identificador único da venda. |
| id_vendedor | INT | NOT NULL, FK | Identificador do vendedor responsável pela venda. Referencia vendedores.id. |
| id_regiao | INT | NOT NULL, FK | Identificador da região em que a venda foi realizada. Referencia regioes.id. |
| data_venda | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Data e hora do registro da venda. |
| valor_venda | DECIMAL(12,2) | NOT NULL, DEFAULT 0 | Valor monetário da venda. |
| tipo_cliente | ENUM('PF','PJ') | NOT NULL, DEFAULT 'PF' | Classificação do cliente: pessoa física (PF) ou pessoa jurídica (PJ). |
| valor_comissao | DECIMAL(12,2) | NOT NULL, DEFAULT 0 | Valor monetário da comissão calculada para a venda. |

## Regras importantes do modelo

- Os identificadores `id` são gerados automaticamente pelo banco.
- Os campos obrigatórios usam `NOT NULL`.
- Os valores monetários e percentuais usam `DECIMAL`, permitindo armazenar casas decimais.
- O campo `ativo` indica a situação do vendedor.
- O campo `tipo_cliente` aceita somente `PF` ou `PJ`.
- A data da venda recebe a data e hora atuais quando não é informada.
- O campo `valor_comissao` armazena o resultado do cálculo realizado pela aplicação.
