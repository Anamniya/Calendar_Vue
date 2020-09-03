<template>
  <div class="wrapper">
    <div class="month">{{months[cur_month]}} | {{year}}</div>
    <div class="d_of_w">
      <div class="day">M</div>
      <div class="day">T</div>
      <div class="day">W</div>
      <div class="day">T</div>
      <div class="day">F</div>
      <div class="day">S</div>
      <div class="day">S</div>
    </div>
    <div class="container">
      <div class="days" v-for="(day, i) of days" :key="day+i">
        <div class="day" @click="open" 
        :class="{'today' : day == cur_date
        && cur_month == new Date().getMonth()
        && year == new Date().getFullYear()}">{{day}}</div>
      </div>
    </div>
    <nav class="prew btn" @click="prew">
      <div class="btntxt">&#60;</div>
    </nav>
    <nav class="next btn" @click="next">
      <div class="btntxt">&#62;</div>
    </nav>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "Page",
  data() {
    return {
      year: new Date().getFullYear(),
      cur_month: new Date().getMonth(),
      cur_date: new Date().getDate(),
      days: [],
      months: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"
      ],
    };
  },

  created() {
    this.genCalendar();
  },

  methods: {
    genCalendar() {
      let lastDayInMonth = new Date(this.year, this.cur_month + 1, 0).getDate();
      let firstDayOfWeek = [7, 1, 2, 3, 4, 5, 6][
        new Date(this.year, this.cur_month, 1).getDay()
      ];

      for (let i = 1; i < firstDayOfWeek; i++) {
        this.days.push("");
      }

      for (let i = 1; i <= lastDayInMonth; i++) {
        this.days.push(i);
      }
    },

    next() {
      this.cur_month = this.cur_month < 11 ? this.cur_month + 1 : 0;
      if (this.cur_month == 0) {
        this.year = this.year + 1;
      }
      this.days = [];
      this.genCalendar();
    },

    prew() {
      this.cur_month = this.cur_month > 0 ? this.cur_month - 1 : 11;
      if (this.cur_month == 11) {
        this.year = this.year - 1;
      }
      this.days = [];
      this.genCalendar();
    },

    open(d) {
      document.querySelector(".inp").classList.remove("hidden");
      let sel_date = d.target.textContent;
      let fullDate = new Date([this.year,this.cur_month+1,sel_date].join('.'))

       eventBus.$emit("dateS", fullDate);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width: 500px;
  height: 530px;
  border: 1px solid aqua;
  border-radius: 10px;
}
.month {
  margin-top: 20px;
  text-align: center;
  font-family: AdventPro-Bold;
  font-size: large;
  color: rgb(191, 245, 245);
}

.d_of_w {
  display: grid;
  margin-left: 40px;
  margin-top: 20px;
  grid-template-columns: repeat(7, 1fr);
  width: 360px;
  height: 40px;
}

.day {
  width: 60px;
  font-size: small;
  text-align: center;
  font-family: AdventPro-SemiBold;
  color: rgb(191, 245, 245);
  align-self: center;
}

.container {
  display: grid;
  margin-top: 10px;
  margin-left: 40px;
  width: 350px;
  height: 350px;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(7, 1fr);
}

.days {
  width: 60px;
  color: rgb(191, 245, 245);
  text-align: center;
  align-self: center;
}

.days :hover {
  cursor: pointer;
  color: aqua;
  border-radius: 50%;
}

.btn {
  /* position: absolute; */
  margin: 15px;
  /* padding: 3px; */
  width: 60px;
  height: 30px;
  color: rgb(191, 245, 245);
  font-family: AdventPro-Bold;
  font-size: large;
  text-align: center;
  border: 1px solid aqua;
  border-radius: 5px;
}

.btn:hover {
  border: 1px solid rgb(0, 158, 158);
}

.next {
  float: right;
}

.prew {
  float: left;
}
.btntxt {
  font-size: 20px;
  margin-top: 3px;
  pointer-events: none;
}

.today {
  color: #6bff7e;
}
</style>

