<template>
  <div>
    <ul>
      <ProjectItem
          v-for="project of projects"
          :project="project"
          :idSelectedItem="idSelectedItem"

          @remove-project="removeProject"
          @select-project="selectProject"
      />
    </ul>
  </div>
</template>

<script>
import ProjectItem from "@/components/Projects/ProjectItem";
export default {
  props: ["projects", "idSelectedItem"],
  components: {
    ProjectItem
  },
  methods: {
    removeProject(id) {
      this.$emit("remove-project", id);
    },
    selectProject(project) {
      this.$emit("select-project", project);
    }
  },
}
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 8px;
    padding: 0;
  }
</style>
