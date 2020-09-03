<template>
  <div class="tasks">
    <div class="header">Tasks</div>
    <!-- <div class="task" v-for="(task, i) of taskArray" :key="task+i"> -->
    <div class="task" v-for="(task, indexArr) in taskArray" :key=" 'task' +indexArr">
      <span @click="editTask(task)">
        <!-- <span class="smDate"> &#8756; {{' ' + task.date + ' '}}</span> -->
        <span class="smDate">&#8756; {{` ${task.date} `}}</span>
        <span>{{task.val}}</span>
      </span>
      <div class="delete" @click="removeTask(task)">x</div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main";
export default {
  name: "Tasks",
  data() {
    return {
      // task: ""
      fullTask: {},
      taskArray: [],
      taskObject: {},
      mskey: "",
      test: ""
    };
  },
  created() {
    eventBus.$on("send", taskFromInput => {
      this.fullTask = taskFromInput;
      this.pushTask();
    });
  },
  methods: {
    addTask() {
      if (this.fullTask.text !== "") {
        this.mskey = this.fullTask.date.getTime();

        if (Object.keys(this.taskObject).indexOf(String(this.mskey)) == -1) {
          //почему без стринг заменяет значения в массиве?
          this.taskObject[this.mskey] = [];
        }
        this.taskObject[this.mskey].push(this.fullTask.text);

        this.fullTask = {};
      }
      this.sort();
    },
    sort() {
      let keysSort = Object.keys(this.taskObject).sort(); //массив ключей в милисекундах (mskey)
      this.taskArray = [];

      for (let key of keysSort) {
        let values = this.taskObject[key];
        for (let index in values) {
          let value = values[index];
          let dateFromKey = new Date(parseInt(key));
          // let deteForTask =  dateFromKey.getFullYear() + "." + (dateFromKey.getMonth() + 1) + "." + dateFromKey.getDate();
          let deteForTask = [
            dateFromKey.getFullYear(),
            dateFromKey.getMonth() + 1,
            dateFromKey.getDate()
          ].join(".");
          this.taskArray.push({
            // task: deteForTask + " " + value,
            date: deteForTask,
            val: value,
            originalIndex: index,
            mskey: key
          });
        }
      }
    },
    removeTask(task) {
      this.taskObject[task.mskey].splice(task.originalIndex, 1);
      if (this.taskObject[task.mskey].length == 0) {
        delete this.taskObject[task.mskey];
      } //удаление ключа из обьекта, если значение == пусто
      this.sort();
    },
    editTask(task) {
      eventBus.$emit("edit", task);
    },
    writeEdited() {
      this.taskObject[this.fullTask.date.getTime()][
        parseInt(this.fullTask.originalIndex)
      ] = this.fullTask.text;
      //замена текста в текущем обьекте
      this.fullTask = {};
      this.sort();
    },
    pushTask() {
      if ("originalIndex" in this.fullTask) {
        //проверка наличая переданного индекса в тукущем массиве
        this.writeEdited();
      } else {
        this.addTask();
      }
    }
  }
};
</script>

<style scoped>
.tasks {
  overflow: auto;
  margin-left: 25px;
  width: 300px;
  height: 530px;
  border: 1px solid aqua;
  border-radius: 10px;
}
.header {
  margin-top: 20px;
  text-align: center;
  font-family: AdventPro-Bold;
  font-size: large;
  color: rgb(191, 245, 245);
  text-decoration: underline aqua;
}

.task {
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 10px;
  padding-left: 5px;
  font-family: AdventPro-Regular;
  font-size: large;
  color: rgb(191, 245, 245);
  border: 1px solid rgba(113, 116, 116, 0.5);
  border-radius: 10px;
  cursor: pointer;
}

.smDate {
  font-size: small;
  font-weight: bold;
  /* color: aqua; */
}

.delete {
  float: right;
  font-size: 20px;
  margin-right: 5px;
  /* font-weight: bold; */
  font-family: Arial, Helvetica, sans-serif;
  color: aqua;
  cursor: pointer;
}
</style>