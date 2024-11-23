import { MongoClient } from 'mongodb';

/**
 * Conecta ao banco de dados MongoDB utilizando a string de conexão fornecida.
 * 
 * @param {string} stringConexao A string de conexão para o banco de dados MongoDB.
 * @returns {Promise<MongoClient>} Uma Promise que resolve com o cliente MongoDB conectado.
 */
export default async function conectarAoBanco(stringConexao) {
  let client;

  try {
    // Cria um novo cliente MongoDB usando a string de conexão.
    client = new MongoClient(stringConexao);

    // Tenta estabelecer a conexão com o banco de dados.
    await client.connect();

    console.log('Conectado ao MongoDB com sucesso!');

    // Retorna o cliente conectado para realizar operações no banco de dados.
    return client;
  } catch (error) {
    // Caso ocorra um erro durante a conexão, exibe uma mensagem detalhada e encerra a aplicação.
    console.error('Falha ao conectar ao banco de dados:', error);
    process.exit(1); // Encerra a aplicação com código de saída 1 indicando erro.
  }
}