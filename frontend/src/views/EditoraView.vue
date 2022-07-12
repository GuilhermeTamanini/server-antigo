<script>
import { v4 as uuid } from "uuid";
export default {
  data() {
    return {
      novas_editoras: "",
      cadastros: [
        {
          editoras:"Jefferson"
        },
      ],
    };
  },
  methods: {
    salvar() {
      if (this.novo_cadastro !== "") {
        const novo_id = uuid();
        this.cadastros.push({
          id: novo_id,
          editoras: this.novas_editoras,
        });
        this.nova_editora = "";
      }
    },
    excluir(cadastro) {
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
      placeholder="Nome da editora"
      v-model="novas_editoras"
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
        <tr v-for="cadastro in cadastros" :key="cadastro.id">
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
