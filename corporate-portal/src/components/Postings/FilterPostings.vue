<template>
  <button @click="this.filterDate='all', this.$emit('set-filter', this.filterDate)">За всё время</button>
  <button @click="this.filterDate='month', this.$emit('set-filter', this.filterDate)">За месяц</button>
  <button @click="this.filterDate=this.date, this.$emit('set-filter', this.filterDate)">За выбранный день</button>
  <input type="date" v-model="this.date">
</template>

<script>
export default {
  data() {
    return {
      filterDate: "all",   //or "month" or day (for example "2022-12-01")
      date: null
    }
  }
}
</script>

<style scoped>
input {
  margin-left: 1rem;
}
</style>