<script>
import axios from "axios"
export default {
  data() {
    return {
      nova_categoria: "",
      nova_descricao: "",
      categorias: [],
    };
  },
  async created (){
    const categorias = await axios.get("https://localhost:4000/categorias");
    this.categorias = categorias.data;
  },
  methods: {
    async salvar() {
     const categoria ={
      nome: this.nova_categoria,
      descricao: this.nova_descricao,
     }
     const categoria_criada = await axios.post("http://localhost:4000/categorias/", categoria)
     this.categorias.push(categoria_criada.data);
     this.nova_categoria = "";
    },
    async excluir(categoria) {
      await axios.delete(`http://localhost:4000/categorias/${categoria.id}`)
      const indice = this.categorias.indexOf(categoria);
      this.categorias.splice(indice, 1);
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
      placeholder="Nome da categoria"
      v-model="nova_categoria"
    />
    <input type="text" placeholder="descrição" v-model="nova_descricao">
    <button @click="salvar">salvar</button>
  </div>
  <div class="list-items">
    <table id="table-editora" class="table table-striped">
      <thead>
        <tr>
          <!-- <th scope="col">ID</th> -->
          <th scope="col">Categorias</th>
          <th scope="col">Descrição</th>
          <th id="excluir-editora" scope="col">Excluir</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categoria in categorias" :key="categoria.id">
          <!-- <td scope="row">{{ categoria.id }}</td> -->
          <td>{{ categoria.nome }}</td>
          <td> {{ categoria.descricao }}</td>
          <td>
            <button @click="excluir(categoria)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>

.table {
  background-color: white;
}
td button{
  background-color: rgb(187, 184, 184);
}
#table-editora {
  text-align: center;
}
#excluir-editora {
  padding-left:7px 
}
</style>
