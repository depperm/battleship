<script lang="ts">
import axios from "axios";
import { words } from "../assets/constant";
import { useUserStore } from "@/stores/user";
export default {
  data() {
    return {
      count: 0,
      ip: "1.2.3.4",
      userId: "",
      lobby: ["test1"],
    };
  },
  created() {
    const user = useUserStore();
    console.log("created", words[0]);
    axios.get("https://api.db-ip.com/v2/free/self").then((data) => {
      console.log(data);
      this.ip = data.data.ipAddress;
      console.log(
        this.ip
          .split(".")
          .map(
            (num) =>
              `${words[parseInt(num)][0].toUpperCase()}${words[
                parseInt(num)
              ].slice(1)}`
          )
          .join("")
      );
      this.userId = this.ip
        .split(".")
        .map(
          (num) =>
            `${words[parseInt(num)][0].toUpperCase()}${words[
              parseInt(num)
            ].slice(1)}`
        )
        .join("");
      user.$patch({
        ip: this.ip,
        userId: this.userId,
      });
    });
    axios
      .get("https://dweet.io/get/dweets/for/depperm-battleship-lobby")
      .then((data) => {
        console.log("dweet", data);
      });
  },
  methods: {
    createGame() {
      console.log(
        ">>>",
        `https://dweet.io/for/depperm-battleship-lobby?userId=${this.userId}&status=open`
      );
      // axios.post(`https://dweet.io/for/depperm-battleship-lobby?userId=${this.userId}&status=open`,{})
      axios({
        method: "post",
        url: `https://dweet.io/for/depperm-battleship-lobby?userId=${this.userId}&status=open`,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((data) => {
        console.log(">>>>", data);
      });
    },
  },
};
</script>

<template>
  <div class="greetings">
    <h1 class="green">Lobby</h1>
    <button @click="createGame">Create Game</button>
    <ul>
      <li v-for="(user, i) in lobby" :key="i">{{ user }}</li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}
</style>
