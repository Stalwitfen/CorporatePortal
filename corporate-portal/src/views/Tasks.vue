<template>
  <div>
    <h2>Задачи</h2>
    <hr>
    <EditTask
        :selectedTask="this.selectedTask"
        :projects="this.projects"

        @edit-task="editTask"
    />
    <hr>
    <h4 v-if="this.loading">Получение данных с сервера...</h4>
    <h4 v-else-if="this.tasks.length === 0">Список задач пуст</h4>
    <TasksList v-else
        :tasks="tasks"
        :projects="projects"
        :idSelectedItem="this.selectedTask.id"

        @remove-task="removeTask"
        @select-task="selectTask"
    />
  </div>
</template>

<script>
import TasksList from "@/components/Tasks/TasksList"
import EditTask from "@/components/Tasks/EditTask"
import {collection, deleteDoc, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "@/main";
export default {
  data() {
    return {
      tasks: [],
      projects: [],
      loading: true,
      selectedTask: {
        id: null,
        key_project: null,
        name: null,
        active: true
      }
    }
  },
  components: {
    TasksList, EditTask
  },

  beforeMount() {
    this.getTasks();
    this.getProjects();
  },

  methods: {

    async getTasks() {
      this.loading = true;
      this.tasks = [];
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        querySnapshot.forEach((doc) => {
          let task = doc.data();
          task.id = doc.id;
          this.tasks.push(task);
        });
      }
      catch (e) {
        alert(`Возникла ошибка!\n${e}`);
      }
      this.loading = false;
    },

    async removeTask(id) {
      this.tasks = this.tasks.filter(p => p.id != id);
      try {
        await deleteDoc(doc(db, "tasks", id));
      }
      catch (e) {
        alert(`Возникла ошибка на стороне сервера!\n${e}`);
      }
    },

    async editTask(changedTask) {

      if (changedTask.id == null) {
        changedTask.id = Date.now();
      }

      if (changedTask.name == "" || changedTask.name == null) {
        changedTask.name = "Пустая задача";
      }

      try {
        await setDoc(doc(db, "tasks", String(changedTask.id) ), {
          key_project: changedTask.key_project,
          name: changedTask.name,
          active: changedTask.active
        });
      }
      catch (e) {
        alert(`Возникла ошибка на стооне сервера!\n${e}`);
      }

      this.getTasks();

      this.selectedTask.id = null;
      this.selectedTask.key_project = "";
      this.selectedTask.name = null;

    },

    async getProjects() {
      this.loading = true;
      this.projects = [];
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        querySnapshot.forEach((doc) => {
          let project = doc.data();
          project.id = doc.id;
          this.projects.push(project);
        });
      }
      catch (e) {
        alert(`Возникла ошибка!\n${e}`);
      }
      this.loading = false;
    },

    selectTask(task) {
      this.selectedTask.id = task.id;
      this.selectedTask.key_project = task.key_project;
      this.selectedTask.name = task.name;
      this.selectedTask.active = task.active;
    }
  }
}
</script>