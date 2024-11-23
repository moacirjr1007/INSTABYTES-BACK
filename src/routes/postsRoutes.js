import express from "express";// Importa o framework Express para construir o servidor
import multer from "multer";// Importa o middleware Multer para lidar com uploads de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";// Importa funções controladoras de posts (.js indica arquivo JavaScript)
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}
// Configura o armazenamento para arquivos usando diskStorage do Multer
const storage = multer.diskStorage({
  // Define o diretório de destino para arquivos enviados (pasta 'uploads/')
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo como o nome original enviado pelo usuário
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage }); // 'dest' redundante aqui

// Define a função de rotas que recebe a aplicação Express como argumento
const routes = (app) => {
  // Habilita o middleware express.json para interpretar dados JSON na requisição
  app.use(express.json());
  app.use(cors(corsOptions));

  // Rota GET para listar todos os posts (delega para a função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (delega para a função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa middleware upload.single('imagem') e delega para uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);

};

// Exporta a função de rotas para uso em outros arquivos
export default routes;
