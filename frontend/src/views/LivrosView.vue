<script>
import axios from "axios"
export default {
  data() {
    return {
      novo_livro: "",
      nova_categoria: "",
      novo_autor: "",
      novo_preco: "",
      nova_editora: "",
      capa_traz: "",
      capa_frente: "",
      cadastros: [],
    };
  },
  async created() {
    const cadastros = await axios.get("http://localhost:4000/cadastros");
    this.cadastros = cadastros.data;
  },
  methods: {
    async salvar() {
      const cadastro ={
          nome: this.novo_livro,
          categoria: this.nova_categoria,
          autor: this.novo_autor,
          preco: this.novo_preco,
          editora: this.nova_editora,
          traz: this.capa_traz,
          frente: this.capa_frente,
      },
      const cadastro_criado = await axios.post("http://localhost:4000/cadastros", cadastro);
      this.cadastros.push(cadastro_criado.data);
      this.novo_cadastro = "";
      },
    async excluir(cadastro) {
      await axios.delete(`http://localhost:4000/cadastros/${cadastro.id}`)
      const indice = this.cadastros.indexOf(cadastro);
      this.cadastros.splice(indice, 1);
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
      placeholder="Insira o nome dos livros"
      v-model="novo_livro"
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
    <input type="text" placeholder="Insira o preço" v-model="novo_preco" />
    <input
      type="text"
      placeholder="Insira a imagem da capa da frente"
      v-model="capa_frente"
    />
    <input
      type="img"
      placeholder="Insira a imagem da capa de traz"
      v-model="capa_traz"
    />
    <button @click="salvar">salvar</button>
  </div>
  <div class="list-items">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Livro</th>
          <th scope="col">Categoria</th>
          <th scope="col">Autor</th>
          <th scope="col">Editora</th>
          <th scope="col">Preço</th>
          <th scope="col">Img traz</th>
          <th scope="col">Img da frente</th>
          <th id="excluir" scope="col">Excluir</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cadastro in cadastros" :key="cadastro.id">
          <td>{{ cadastro.nome }}</td>
          <td>{{ cadastro.categoria }}</td>
          <td>{{ cadastro.autor }}</td>
          <td>{{ cadastro.editora }}</td>
          <td>{{ cadastro.preco }}</td>
          <td>{{ cadastro.traz }}</td>
          <td>{{ cadastro.frente }}</td>
          <td>
            <button @click="excluir(cadastro)">Excluir</button>
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
