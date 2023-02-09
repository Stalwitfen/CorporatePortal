<template>
  <label class="checkbox style-g">
    <input type="checkbox" v-model="this.selectedTask.active">
    <div class="checkbox__checkmark"></div>
    <div class="checkbox__body">Активная: </div>
  </label>
  <select id="inputKey" v-model="this.selectedTask.key_project">
    <option v-for="project of this.projects" v-bind:value="project.id">{{project.name}}</option>
  </select>
  <input id="inputName" type="text" v-model="this.selectedTask.name"  placeholder="Название">
  <button v-on:click="this.$emit('edit-task', this.selectedTask)">{{this.button_text}}</button>
</template>

<script>
export default {
  props: ["selectedTask", "projects"],
  data() {
    return {
      button_text: "Добавить"
    }
  },
  methods: {
    setButtonText() {
      if (this.selectedTask.id == null) {
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
  width: 150px;
  margin-left: 2rem;
}

#inputName {
  width: 300px;
  margin-left: 1rem;
  margin-right: 1rem;
}

</style>