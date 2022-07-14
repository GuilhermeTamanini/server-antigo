<script>
import axios from "axios"
export default {
  data() {
    return {
      novo_nome: "",
      autores: [],
    };
  },
  async created(){
    const autores = await axios.get("http://localhost:4000/autores/");
    this.autores = autores.data;
  },
  methods: {
    async salvar() {
      const autor ={
        nome: this.novo_nome,
      }
      const autor_criado = await axios.post("http://localhost:4000/autores/", autor)
      this.autores.push(autor_criado.data);
      this.novo_autor = "";
    },
    async excluir(autor) {
      await axios.delete(`http://localhost:4000/autores/${autor.id}`)
      const indice = this.autores.indexOf(autor);
      this.autores.splice(indice, 1);
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="title"></div>
  </div>
  <div class="form-input">
    <input type="text" placeholder="Nome do nome" v-model="novo_nome" />
    <button @click="salvar">salvar</button>
  </div>
  <div class="list-items">
    <table id="table-editora" class="table table-striped">
      <thead>
        <tr>
          <!-- <th scope="col">ID</th> -->
          <th scope="col">nome</th>
          <th id="excluir-editora" scope="col">Excluir</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="autor in autores" :key="autor.id">
          <!-- <td scope="row">{{ autor.id }}</td> -->
          <td>{{ autor.nome }}</td>
          <td>
            <button @click="excluir(autor)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
