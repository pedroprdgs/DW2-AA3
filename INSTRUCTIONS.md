# Instruções de uso da API

## 1. Informações gerais

A API gerencia vendedores, vendas, comissões e indicadores de desempenho utilizando Node.js, Express e MySQL.

**URL local padrão:**

```text
http://localhost:3000
```

Os exemplos de requisição utilizam JSON. Nas requisições com corpo JSON, envie o cabeçalho:

```http
Content-Type: application/json
```

## 2. Vendedores

### Cadastrar vendedor

`POST /vendedores`

Corpo da requisição:

```json
{
  "nome": "Mariana Oliveira",
  "meta_mensal": 10000,
  "percentual_base": 5
}
```

O vendedor é cadastrado ativo.

### Listar vendedores

`GET /vendedores`

Retorna os vendedores cadastrados.

### Consultar vendedor por ID

`GET /vendedores/:id`

Exemplo:

```http
GET /vendedores/1
```

### Atualizar meta e percentual base

`PUT /vendedores/:id`

Corpo da requisição:

```json
{
  "meta_mensal": 12000,
  "percentual_base": 6
}
```

### Desativar vendedor

`PATCH /vendedores/:id/desativar`

Desativa o vendedor sem apagar seu histórico de vendas.

### Ativar vendedor

`PATCH /vendedores/:id/ativar`

Reativa um vendedor previamente desativado, caso essa rota esteja habilitada na versão utilizada.

## 3. Vendas

### Registrar venda

`POST /vendas`

Corpo da requisição:

```json
{
  "id_vendedor": 1,
  "id_regiao": 3,
  "data_venda": "2026-10-22 14:30:00",
  "valor_venda": 1500,
  "tipo_cliente": "PF"
}
```

O vendedor precisa existir e estar ativo, a região precisa existir, o valor deve ser positivo e o tipo de cliente deve ser `PF` ou `PJ`.

O valor da comissão é calculado pela API:

```text
comissão = valor da venda ×
           (percentual base + percentual do cliente + bônus regional) / 100
```

Percentuais adicionais:

| Tipo ou região | Percentual |
| --- | ---: |
| Cliente PF | 2% |
| Cliente PJ | 3% |
| Norte | 1% |
| Nordeste | 1% |
| Sudeste | 0% |
| Sul | 0,5% |

Não é necessário enviar `valor_comissao` no corpo da requisição.

### Listar vendas

`GET /vendas`

Retorna as vendas registradas.

### Consultar vendas por vendedor

`GET /vendas/vendedor/:id`

Exemplo:

```http
GET /vendas/vendedor/1
```

### Consultar vendas por região

`GET /vendas/regiao/:id`

Exemplo:

```http
GET /vendas/regiao/3
```

### Excluir venda

`DELETE /vendas/:id`

Exemplo:

```http
DELETE /vendas/2001
```

## 4. Relatório de desempenho

### Consultar indicadores de desempenho

`GET /relatorios/performance?inicio=AAAA-MM-DD&fim=AAAA-MM-DD`

Exemplo:

```http
GET /relatorios/performance?inicio=2026-10-01&fim=2026-10-31
```

Os dois parâmetros são obrigatórios e devem estar no formato `YYYY-MM-DD`. A data inicial não pode ser posterior à data final.

O relatório apresenta:

- Quantidade de vendas e valor total vendido.
- Comissão total e comissão média por venda.
- Quantidade e valor vendido por região.
- Quantidade e valor vendido por tipo de cliente.
- Vendedor com maior valor total de vendas no período.
- Vendedor com maior comissão acumulada no período.
- Quantidade de vendedores que atingiram a meta considerada pelo relatório.

**Observação sobre as metas:** a comparação com `meta_mensal` deve ser interpretada considerando o período utilizado. Para avaliar uma meta mensal, consulte um período que corresponda a um único mês.

## 5. Respostas e erros

As respostas são retornadas em JSON.

Em caso de erro, a API utiliza uma estrutura semelhante a:

```json
{
  "erro": "Mensagem explicando o problema."
}
```

Os códigos HTTP indicam o resultado da operação. Entre os casos tratados estão dados inválidos, registros inexistentes e conflitos como o uso de um código já cadastrado. Erros internos são retornados como HTTP `500`.

## 6. Dados de demonstração

Depois de executar `database/schema.sql` e `database/seed.sql`, utilize os IDs dos vendedores, regiões e vendas inseridos para testar as rotas.

O script de seed fornece registros distribuídos entre as quatro regiões e os dois tipos de cliente.
