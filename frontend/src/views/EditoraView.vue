<script>
import axios from "axios"
export default {
  data() {
    return {
      nova_editora: "",
      editoras: [
        {
          editoras:"Jefferson"
        },
      ],
    };
  },
  async created() {
    const editoras = await axios.get("http://localhost:4000/editoras");
    this.editoras = editoras.data;
  }
  methods: {
    salvar() {
      if (this.novo_cadastro !== "") {
        const novo_id = uuid();
        this.editoras.push({
          id: novo_id,
          editoras: this.nova_editora,
        });
        this.nova_editora = "";
      }
    },
    excluir(cadastro) {
      const indice = this.editoras.indexOf(cadastro);
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
        <tr v-for="cadastro in editoras" :key="cadastro.id">
          <!-- <td scope="row">{{ cadastro.id }}</td> -->
          <td>{{ cadastro.editoras }}</td>
          <td>
            <button @click="excluir(cadastro)">Excluir</button>
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
