<template>
    <li v-bind:class="{ selected: this.posting.id == this.idSelectedItem,
                        not_enough_time: this.posting.hours < 8,
                        normal_time: this.posting.hours == 8,
                        excess_time: this.posting.hours > 8}">
      <div id="postingDate">{{posting.date}}</div>
      <div id="postingHours">{{posting.hours}}ч.</div>
      <div id="taskName" :title="this.taskName" ><router-link id="taskName2" to="/tasks">{{this.taskName}}</router-link></div>
      <div id="postingName" :title="this.posting.name">{{posting.name}}</div>
      <div class="buttons">
        <button @click="$emit('select-posting', posting)">&#10000;</button>
        <button @click="$emit('remove-posting', posting.id)">&#10006;</button>
      </div>
    </li>
</template>

<script>

export default {
  props: ["posting", "tasks", "idSelectedItem"],

  computed: {
    taskName: function () {
      for (let task of this.tasks) {
        if (task.id === this.posting.id_key_task) {
          return task.name;
        }
      }
    }
  },
}
</script>

<style scoped>
li {
  color: black;
  float: left;
  height: 250px;
  width: 250px;
  border: 1px solid black;
  padding: 1rem;
  margin: 0.5rem;
}

.not_enough_time {
  background-color: #E3BD54;
}

.normal_time {
  background-color: #53FA73;
}

.excess_time {
  background-color: #FA698B;
}

.selected {
  background-color: aqua;
}

#postingDate {
  float: left;
}

#postingHours {
  text-align: right;
  font-size: 16pt;
  height: 30px;
}

#taskName {
  list-style: none;
  text-align: left;
  font-size: 14pt;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#taskName2 {
  text-decoration: none;
}

#postingName {
  height: 165px;
  margin-top: 10px;
  text-align: left;
  font-size: 14pt;
  word-wrap: break-word;
  overflow: hidden;
}

.buttons {
  margin-top: 8px;
}


</style>
