<template>
  <div id="app">
    <div class="calendar">
      <Page />
      <Input/>
      <Tasks/>
    </div>
  </div>
</template>

<script>
import Page from "./components/Page";
import Input from "./components/Input";
import Tasks from "./components/Tasks";

export default {
  name: "app",
  components: {
    Page,
    Input,
    Tasks
  }
};
</script>

<style>
body {
  background-color: rgb(88, 90, 90);
}
.calendar {
  margin: auto;
  margin-top: 50px;
  width: 830px;
  height: 700px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
