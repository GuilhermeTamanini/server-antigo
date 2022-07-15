import axios from 'axios';
export default class LivrosApi {
  async buscarTodosOsLivros() {
    const response = await axios.get('http://localhost:4000/livros');
    return response.data;
  }

  async buscarlivro(id) {
    const response = await axios.get(`http://localhost:4000/livros/${id}`);
    return response.data;
  }

  async adicionarlivro(livro) {
    const response = await axios.post('http://localhost:4000/livros', livro);
    return response.data;
  }

  async excluirlivro(id) {
    const response = await axios.delete(`http://localhost:4000/livros/${id}`);
    return response.data;
  }

  async atualizarlivro(livro) {
    const response = await axios.put(
      `http://localhost:4000/livros/${livro.id}`,
      livro,
    );
    return response.data;
  }
}