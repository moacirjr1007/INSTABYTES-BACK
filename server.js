import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();
app.use(express.static("uploads"));
routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console indicando que o servidor está pronto para receber requisições
app.listen(3000, () => {
    console.log("Servidor escutando...");
});