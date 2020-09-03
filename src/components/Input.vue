<template>
  <div class="inp hidden">
    <div class="close" @click="close">X</div>
    <textarea placeholder="enter new task" v-model="text" @keypress.enter="sendTask"></textarea>
    <div class="enter" @click="sendTask">
      <div class="txt">ENTER</div>
    </div>
    <!-- <div>{{fullDate}}</div> -->
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "Input",
  data() {
    return {
      text: "",
      fullDate: "",
      originalIndex: "",
      edit: false
    };
  },
  created() {
    eventBus.$on("dateS", dateFromPage => {
      this.fullDate = dateFromPage;
    });

    eventBus.$on("edit", task => {
      this.fullDate = new Date(parseInt(task.mskey));
      this.text = task.val;
      this.originalIndex = task.originalIndex;
      this.edit = true;
      document.querySelector(".inp").classList.remove("hidden");
    });
  },
  methods: {
    close() {
      document.querySelector(".inp").classList.add("hidden");
      this.text = "";
    },
    sendTask() {
      if (this.edit == false) {
        eventBus.$emit("send", {
          date: this.fullDate,
          text: this.text
        });
      } else {
        eventBus.$emit("send", {
          text: this.text,
          date: this.fullDate,
          originalIndex: this.originalIndex
        });
      }
      this.edit = false;
      this.text = "";
      document.querySelector(".inp").classList.add("hidden");
    }
  }
};
</script>

<style scoped>
.inp {
  position: absolute;
  margin-top: 105px;
  width: 390px;
  height: 350px;
  margin-left: 55px;
  background-color: rgb(88, 90, 90);
  opacity: 0.9;
  /* border-radius: 10px; */
}
.close {
  margin-left: 360px;
  margin-top: 10px;
  color: aqua;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  cursor: pointer;
}

textarea {
  margin-left: 40px;
  font-size: 20px;
  font-family: AdventPro-Light;
  width: 300px;
  height: 200px;
  resize: none;
  background-color: rgb(88, 90, 90);
  opacity: 0.9;
  color: aqua;
  border: 1px solid aqua;
  border-radius: 10px;
}

textarea::placeholder {
  color: rgb(191, 245, 245);
  opacity: 0.9;
  font-size: 20px;
}

.enter {
  position: absolute;
  margin-top: 10px;
  width: 300px;
  height: 30px;
  margin-left: 43px;
  text-align: center;
  background-color: rgb(191, 245, 245);
  opacity: 1;
  border-radius: 10px;
  cursor: pointer;
}
.txt {
  margin-top: 3px;
  font-size: 20px;
  font-family: AdventPro-Bold;
  color: rgb(88, 90, 90);
  pointer-events: none;
}

.hidden {
  display: none;
}
</style>
