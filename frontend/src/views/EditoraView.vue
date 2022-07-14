<script>
import axios from "axios"
export default {
  data() {
    return {
      nova_editora: "",
      editoras: [],
    };
  },
  async created() {
    const editoras = await axios.get("http://localhost:4000/editoras");
    this.editoras = editoras.data;
  },
  methods: {
    async salvar() {
      const editora ={
        nome: this.nova_editora,
      }
      const editora_criada = await axios.post("http://localhost:4000/editoras/", editora)
      this.editoras.push(editora_criada.data);
      this.nova_editora = "";
    },
    async excluir(editora) {
      await axios.delete(`http://localhost:4000/editoras/${editora.id}`)
      const indice = this.editoras.indexOf(editora);
      this.editoras.splice(indice, 1);
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
      placeholder="Nome da editora"
      v-model="nova_editora"
    />
    <button @click="salvar">salvar</button>
  </div>
  <div class="list-items">
    <table id="table-editora" class="table table-striped">
      <thead>
        <tr>
          <!-- <th scope="col">ID</th> -->
          <th scope="col">Editoras</th>
          <th id="excluir-editora" scope="col">Excluir</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="editora in editoras" :key="editora.id">
          <!-- <td scope="row">{{ editora.id }}</td> -->
          <td>{{ editora.nome }}</td>
          <td>
            <button @click="excluir(editora)">Excluir</button>
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
  padding-left:50px 
}
</style>
