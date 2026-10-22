import express from "express";

import vendedorRoutes from "./routes/routerVendedores.js";
import vendasRoutes from "./routes/routerVendas.js";
import relatorioRoutes from "./routes/routerRelatorio.js";
import tratarErros from "./middlewares/tratarErrors.js";

const app = express();

app.use(express.json());

// Rotas
app.use("/vendedores", vendedorRoutes);
app.use("/vendas", vendasRoutes);
app.use("/relatorios", relatorioRoutes);

// Tratamento de erros centralizado
app.use(tratarErros);

export default app;