<template>
  <input type="date" v-model="this.selectedPosting.date">
  <input id="inputHours" type="text" v-model="this.selectedPosting.hours"  placeholder="Кол-во часов">
  <select id="inputKey" v-model="this.selectedPosting.id_key_task" v-bind:disabled="taskIsAvailable(this.selectedPosting.id_key_task)">
    <option v-for="task of this.availableTasks" v-bind:value="task.id">{{task.name}}</option>
  </select>
  <input id="inputName" type="text" v-model="this.selectedPosting.name"  placeholder="Описание">
  <button @click="this.$emit('edit-posting', this.selectedPosting)">{{this.button_text}}</button>
</template>

<script>

export default {
  props: ["selectedPosting", "tasks"],
  data() {
    return {
      button_text: "Добавить"
    }
  },
  methods: {
    setButtonText() {
      if (this.selectedPosting.id == null) {
        this.button_text = "Добавить"
      } else {
        this.button_text = "Изменить"
      }
    },
    taskIsAvailable(id) {
      for (let task of this.tasks) {
        if (id == task.id && task.active == true) {
          return false;   //edit is enabled
        }
      }
      return true;
    }
  },
  computed: {
    availableTasks: function () {
      return this.tasks.filter(p => p.active == true);
    }
  },

  beforeUpdate() {
    this.setButtonText()
  }
}

</script>

<style scoped>

input {
  width: 100px;
  margin: 5px;
}

#inputKey {
  width: 150px;
}

#inputName {
  width: 300px;
}

</style>