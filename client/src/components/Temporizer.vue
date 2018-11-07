<template>
  <div>
    <div id="timer">
      <san id="message">You have:</san>
      <br>
      <span id="minutes">{{ minutes }}</span>
      <span id="middle">:</span>
      <span id="seconds">{{ seconds }}</span>
  </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: 'Temporizador',
    data() {
      return {
        tiempo: 0,
        timer: null
      }
    },
    computed: {
      minutes: function() {
        const minutes = Math.floor(this.tiempo / 60);
        return this.padTime(minutes);
      },
      seconds: function() {
        const seconds = this.tiempo - (this.minutes * 60);
        return this.padTime(seconds);
      }
    },
    methods:{
      padTime: function(time) {
        return (time < 10 ? '0' : '') + time;
      },
      countdown: function() {
        if(this.tiempo >= 1){
          this.tiempo--;
        } else{
          this.tiempo = 0;
          this.sendData('azul','on')
          this.$router.push('/')
        }
      },
      sendData(color,estado) {
        axios({ method: "POST", "url": "raspservice", "data": {estado: estado, color: color}, "headers": { "content-type": "application/json" } }).then(result => {
            console.log('ya cambio')
        }, error => {
            console.error(error);
        });
      },
    },
    mounted(){
      var ganado = this.$store.getters['getGanado'];
      console.log(ganado)
      if(ganado==0){
        //this.$router.push('/')
        console.log('Voy a transferir')
      }else{
        this.tiempo = ganado*5*(60)
        this.timer = setInterval(() => this.countdown(), 1000);
      }
    }
  }
</script>

<style scoped>
  #message {
  color: #DDD;
  font-size: 30px;
  }

  #timer {
    font-size: 100px;
    line-height: 1;
    margin-bottom: 40px;
  }
</style>