<script>
import axios from "axios"
export default {
  data() {
    return {
      novo_nome: "",
      nova_categoria: "",
      novo_autor: "",
      novo_preco: "",
      nova_editora: "",
      livros: [],
    };
  },
  async created() {
    const livros = await axios.get("http://localhost:4000/livros");
    this.livros = livros.data;
  },
  methods: {
    async salvar() {
      const livro ={
          nome: this.novo_nome,
          categoria: this.nova_categoria,
          autor: this.novo_autor,
          preco: this.novo_preco,
          editora: this.nova_editora,
      }
      const livro_criado = await axios.post("http://localhost:4000/livros", livro);
      this.livros.push(livro_criado.data);
      this.novo_nome = "";
      },
    async excluir(livro) {
      await axios.delete(`http://localhost:4000/livros/${livro.id}`)
      const indice = this.livros.indexOf(livro);
      this.livros.splice(indice, 1);
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="title"></div>
  </div>
  <div class="form-input">
    <input
      type="text"
      placeholder="Insira o nome"
      v-model="novo_nome"
    />
    <select
      class="form-select"
      aria-label="Default select example"
      v-model="nova_categoria"
    >
      <option selected>Categoria</option>
      <option value="Categoria1">Categoria1</option>
      <option value="Categoria2">Categoria2</option>
      <option value="Categoria3">Categoria3</option>
    </select>
    <select
      class="form-select"
      aria-label="Default select example"
      v-model="novo_autor"
    >
      <option selected>Autor</option>
      <option value="Autor1">Autor1</option>
      <option value="Autor2">Autor2</option>
      <option value="Autor3">Autor3</option>
    </select>
    <select
      class="form-select"
      aria-label="Default select example"
      v-model="nova_editora"
    >
      <option selected>Editora</option>
      <option value="Editora 1">Editora1</option>
      <option value="Editora 2">Editora2</option>
      <option value="Editora 3">Editora3</option>
    </select>
    <input type="number" placeholder="Insira o preço" v-model="novo_preco" />
    <button @click="salvar">salvar</button>
  </div>
  <div class="list-items">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Categoria</th>
          <th scope="col">Autor</th>
          <th scope="col">Editora</th>
          <th scope="col">Preço</th>
          <th id="excluir" scope="col">Excluir</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="livro in livros" :key="livro.id">
          <td>{{ livro.nome }}</td>
          <td>{{ livro.categoria }}</td>
          <td>{{ livro.autor }}</td>
          <td>{{ livro.editora }}</td>
          <td>R${{ livro.preco }}</td>
          <td>
            <button @click="excluir(livro)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
#excluir {
  padding-left: 15px;
}
.table {
  background-color: white;
}
td button{
  background-color: rgb(221, 220, 220);
  border-radius: 20px;
}
</style>
