<template>
  <div>
    <h2>Проводки</h2>
    <hr>
    <EditPosting
        :selectedPosting="this.selectedPosting"
        :tasks="this.tasks"

        @edit-posting="editPosting"
    />
    <hr>
    <FilterPostings
        @set-filter="setFilter"
    />
    <hr>
    <h4 v-if="this.loading">Получение данных с сервера...</h4>
    <PostingsList v-else
        :postings="postings"
        :tasks="this.tasks"
        :idSelectedItem="this.selectedPosting.id"
        :filterDate="this.filterDate"

        @remove-posting="removePosting"
        @select-posting="selectPosting"
    />
  </div>
</template>

<script>
import PostingsList from "@/components/Postings/PostingsList";
import EditPosting from "@/components/Postings/EditPosting";
import FilterPostings from "@/components/Postings/FilterPostings";
import {collection, deleteDoc, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "@/main";

export default {
  data() {
    return {
      postings: [],
      tasks: [],
      loading: true,
      selectedPosting: {
        id: null,
        date: null,
        hours: null,
        id_key_task: null,
        name: null
      },
      filterDate: "all"
    }
  },

  components: {
    PostingsList, EditPosting, FilterPostings
  },

  async beforeMount() {
    this.getPostings();
    await this.getTasks();
    this.selectedPosting.id_key_task = this.firstTaskId();
  },

  methods: {

    async getPostings() {
      this.loading = true;
      this.postings = [];
      try {
        const querySnapshot = await getDocs(collection(db, "postings"));
        querySnapshot.forEach((doc) => {
          let posting = doc.data();
          posting.id = doc.id;
          this.postings.push(posting);
        });
      }
      catch (e) {
        alert(`Возникла ошибка!\n${e}`);
      }
      this.loading = false;
    },

    async removePosting(id) {
      this.postings = this.postings.filter(p => p.id != id);
      try {
        await deleteDoc(doc(db, "postings", id));
      }
      catch (e) {
        alert(`Возникла ошибка на стороне сервера!\n${e}`);
      }
    },

    async editPosting(changedPosting) {

      if (changedPosting.id == null) {
        changedPosting.id = Date.now();
      }

      if (changedPosting.name == "" || changedPosting.name == null) {
        changedPosting.name = "Пустая проводка";
      }

      if (changedPosting.date == null || changedPosting.date == "") {
        let dateNow = new Date();
        let m = dateNow.getMonth() + 1;
        if (m < 10)
          m = "0" + m;
        let d = dateNow.getDate();
        if (d < 10)
          d = "0" + d;
        changedPosting.date = dateNow.getFullYear() + "-" + m + "-" + d;
      }

      if (changedPosting.hours > 24) {
        changedPosting.hours = 24;
      }
      else if (changedPosting.hours <= 0) {
        changedPosting.hours = 0;
      }

      let alreadyWorkedOut = 0;
      for (let posting of this.postings) {
        if (changedPosting.date == posting.date && changedPosting.id != posting.id) {
          alreadyWorkedOut = parseInt(alreadyWorkedOut) + parseInt(posting.hours);
        }
      }

      if (parseInt(alreadyWorkedOut) + parseInt(changedPosting.hours) > 24) {
        changedPosting.hours = 24 - alreadyWorkedOut;
      }

      try {
        await setDoc(doc(db, "postings", String(changedPosting.id) ), {
          id_key_task: changedPosting.id_key_task,
          name: changedPosting.name,
          date: changedPosting.date,
          hours: changedPosting.hours
        });
      }
      catch (e) {
        alert(`Возникла ошибка на стороне сервера!\n${e}`);
      }

      this.getPostings();

      this.selectedPosting.id = null;
      this.selectedPosting.date = null
      this.selectedPosting.hours = null;
      this.selectedPosting.id_key_task = this.firstTaskId();
      this.selectedPosting.name = null;

    },

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

    setFilter(filterDate) {
      this.filterDate = filterDate;
    },

    firstTaskId() {
      for (let task of this.tasks) {
        if (task.active == true) {
          return task.id;
        }
      }
    },

    selectPosting(posting) {
      this.selectedPosting.id = posting.id;
      this.selectedPosting.date= posting.date;
      this.selectedPosting.hours= posting.hours;
      this.selectedPosting.name = posting.name;
      this.selectedPosting.id_key_task= posting.id_key_task;
    }
  }
}
</script>