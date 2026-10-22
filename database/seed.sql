
USE db_venda;

INSERT INTO regioes (nome, percentual_bonus) VALUES
('Norte', 1),
('Nordeste', 1),
('Sudeste', 0),
('Sul', 0.5);

INSERT INTO vendedores (nome, meta_mensal, percentual_base, ativo) VALUES
('Ana Souza', 10000, 5.5, 1),
('Bruno Lima', 12000, 6, 1),
('Carla Mendes', 8000, 4, 1),
('Diego Santos', 15000, 7, 1),
('Eduarda Costa', 10000, 5, 1);

-- Vendas de outubro de 2026
-- A comissão segue: valor_venda * (percentual_base
-- + percentual_cliente + percentual_bonus) / 100.
-- PF = 2%; PJ = 3%.

INSERT INTO vendas (id_vendedor, id_regiao, data_venda, valor_venda, tipo_cliente, valor_comissao) VALUES
(1, 1, '2026-10-01 10:00:00', 1000, 'PF',  80),
(1, 3, '2026-10-03 14:30:00', 1500, 'PJ', 120),
(1, 4, '2026-10-05 11:15:00', 2000, 'PF', 150),

(2, 2, '2026-10-06 09:00:00', 2500, 'PJ', 250),
(2, 1, '2026-10-08 16:00:00', 1200, 'PF', 108),
(2, 3, '2026-10-10 13:00:00', 3000, 'PF', 240),

(3, 4, '2026-10-11 10:45:00', 1800, 'PJ', 135),
(3, 2, '2026-10-13 15:30:00', 2200, 'PF', 154),
(3, 3, '2026-10-15 12:00:00', 900, 'PJ',  63),

(4, 1, '2026-10-16 08:30:00', 3200, 'PJ', 352),
(4, 4, '2026-10-18 14:00:00', 1600, 'PF', 152),
(4, 2, '2026-10-19 11:30:00', 2800, 'PJ', 308),

(5, 3, '2026-10-20 09:45:00', 1100, 'PF',  77),
(5, 2, '2026-10-21 13:15:00', 4000, 'PF', 320),
(5, 4, '2026-10-22 10:30:00', 2600, 'PJ', 221);