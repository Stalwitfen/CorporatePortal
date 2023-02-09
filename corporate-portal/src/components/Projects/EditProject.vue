<template>
  <label class="checkbox style-g">
    <input type="checkbox" v-model="this.selectedProject.active">
    <div class="checkbox__checkmark"></div>
    <div class="checkbox__body">Активный: </div>
  </label>
  <input id="inputKey" type="text" v-model="this.selectedProject.key" placeholder="Код">
  <input id="inputName" type="text" v-model="this.selectedProject.name"  placeholder="Имя проекта">
  <button @click="this.$emit('edit-project', this.selectedProject)">{{this.button_text}}</button>
</template>

<script>
export default {
  props: ["selectedProject"],
  data() {
    return {
      key: this.selectedProject.key,
      name: this.selectedProject.name,
      active: this.selectedProject.active,
      button_text: "Добавить"
    }
  },
  methods: {
    setButtonText() {
      if (this.selectedProject.id == null) {
        this.button_text = "Добавить"
      } else {
        this.button_text = "Изменить"
      }
    }
  },
  beforeUpdate() {
    this.setButtonText()
  }
}

</script>

<style scoped>

#inputKey {
  width: 100px;
  margin-left: 2rem;
}

#inputName {
  width: 300px;
  margin-left: 1rem;
  margin-right: 1rem;
}

</style>