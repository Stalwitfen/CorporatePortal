<template>
  <div id="app">
    <div class="topnav">
      <router-link class="home" to="/">Главная</router-link>
      <router-link to="/projects">Проекты</router-link>
      <router-link to="/tasks">Задачи</router-link>
      <router-link to="/postings">Проводки</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>

body {
  color: white;
  background-color: #333;
  background-size: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.topnav {
  overflow: hidden;
  background-color: black;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.home {
  background-color: #5470E3;
}

.checkbox.style-g {
  display: inline-block;
  position: relative;
  padding-right: 40px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checkbox.style-g input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox.style-g input:checked ~ .checkbox__checkmark {
  background-color: #333;
}

.checkbox.style-g input:checked ~ .checkbox__checkmark:after {
  opacity: 1;
  left: 8px;
}

.checkbox.style-g:hover input ~ .checkbox__checkmark {
  background-color: #eee;
}

.checkbox.style-g:hover input:checked ~ .checkbox__checkmark {
  background-color: #eee;
}

.checkbox.style-g .checkbox__checkmark {
  position: absolute;
  top: 1px;
  right: 0;
  height: 22px;
  width: 22px;
  background-color: white;
  transition: background-color 0.25s ease;
  border-radius: 4px;
}

.checkbox.style-g .checkbox__checkmark:after {
  content: "";
  position: absolute;
  left: -20px;
  top: -8px;
  width: 15px;
  height: 25px;
  border: solid #000;
  border-width: 0 4px 4px 0;
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 0.25s ease, left 0.25s ease;
}

.checkbox.style-g .checkbox__body {
  line-height: 1.4;
  font-size: 16px;
  transition: font-weight 0.25s ease;
}

</style>
