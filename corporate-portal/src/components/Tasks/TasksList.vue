<template>
  <div>
    <ul>
      <TaskItem
          v-for="task of tasks"
          :task="task"
          :projects="projects"
          :idSelectedItem="idSelectedItem"

          @remove-task="removeTask"
          @select-task="selectTask"
      />
    </ul>
  </div>
</template>

<script>
import TaskItem from "@/components/Tasks/TaskItem";
export default {
  props: ["tasks", "projects", "idSelectedItem"],
  components: {
    TaskItem
  },
  methods: {
    removeTask(id) {
      this.$emit("remove-task", id);
    },
    selectTask(task) {
      this.$emit("select-task", task);
    }
  }
}
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 8px;
    padding: 0;
  }
</style>
