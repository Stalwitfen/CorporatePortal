<template>
    <li v-bind:class="{selected: task.id == idSelectedItem}">
      <span class="size" v-bind:class="{done: !task.active}">
        <label class="checkbox style-g">
          <input type="checkbox" v-bind:checked="task.active" disabled>
          <div class="checkbox__checkmark"></div>
          <div class="checkbox__body">Активная: </div>
        </label>
        <strong><router-link class="link" to="/projects">{{this.projectName}}</router-link></strong>
        <span :title="this.task.name">{{task.name}}</span>
      </span>
      <span class="buttons">
        <button @click="$emit('select-task', task)">&#10000;</button>
        <button @click="$emit('remove-task', task.id)">&#10006;</button>
      </span>
    </li>
</template>

<script>
export default {
  props: ["task", "projects", "idSelectedItem"],

  computed: {
    projectName: function () {
      for (let project of this.projects) {
        if (project.id === this.task.key_project) {
          return project.name;
        }
      }
    }
  },
}
</script>

<style scoped>
li {
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  padding: .5rem 2rem;
  margin-bottom: 1rem;
}

.size {
  white-space: nowrap; /* Отменяем перенос текста */
  overflow: hidden; /* Обрезаем содержимое */
  position: relative; /* Относительное позиционирование */
}

.link {
  margin-left: 2rem;
  margin-right: 1rem;
  color: #5470E3;
  text-decoration: none;
}

.buttons {
  white-space: nowrap;
  margin-left: 3px;
}

.selected {
  color: black;
  background-color: aqua;
}

input {
  margin-right: 1rem;
}

button {
  margin-right: 3px;
  height: 25px;
  width: 30px;
}

.done {
  text-decoration: line-through;
}

</style>
