<template>
  <div>   
    <span id="message">Cost for Use: 1 EVT for 5 min</span>
    <br>
    <span id="message">Scan Now!</span>
    <br>
    <img width="200px" id="qr" src=""/>
  </div>
</template>

<script>
import EVT from "evtjs";
import axios from "axios";
const network = {
  host: "testnet1.everitoken.io",
  port: 8888,
  protocol: "http"
};
const APICaller = EVT({
  endpoint: network,
  keyProvider: "5J1kCsEqijM1zwDzBXWgKG5Ths5SqKoMB8jDxpsgeczJoRXNYqz"
});

export default {
  name: "QRPayment",
  data() {
    return {
      info: {},
      tokens: [],
      qr: {},
      totalBalance: '',
      newBalance: '',
      interval : null
    };
  },
  methods: {
    getInfo: async function() {
      try {
        this.info = await APICaller.getInfo();
      } catch (err) {
        console.log(err);
      }
    },

    getBalance: async function() {
      try {
        this.tokens = await APICaller.getFungibleBalance(
          "EVT57PWW2GPBzgdKe7iZzRwJfhG7GHFNzPSEZYAUGoUjfg4goJYSG"
        )
        console.log(this.tokens);
      } catch (err) {
        console.log(err);
      }
    },
    sendData(color, estado) {
      axios({ method: "POST", "url": "raspservice", "data": {estado: estado, color: color}, "headers": { "content-type": "application/json" } }).then(result => {
          console.log('ya cambio')
      }, error => {
          console.error(error);
      });
    },

    getQR: async function() {
      let linkId = await EVT.EvtLink.getUniqueLinkId();
      try {
        let key = await EVT.EvtLink.getEVTLinkQrImage(
          "payeeCode",
          /*{
            keyProvider: [
              "5J1kCsEqijM1zwDzBXWgKG5Ths5SqKoMB8jDxpsgeczJoRXNYqz"
            ],
            symbol: 1, // EVT
            maxAmount: 1000000, // Max charge (1 = 0.00001 EVT)
            linkId
          },*/
          {
            address: "EVT57PWW2GPBzgdKe7iZzRwJfhG7GHFNzPSEZYAUGoUjfg4goJYSG",
            amount: "1.00000", 
            fungibleId: 1

          },
          {
            autoReload: true
          },
          (err, res) => {
            if (err) {
              // console.log(err.message);
              return;
            }
            this.qr = res.dataUrl;
            //console.log(res.dataUrl);
            document.getElementById("qr").setAttribute("src", res.dataUrl);
            //console.log(res.rawText);
            EVT.EvtLink.parseEvtLink(res.rawText).then(res => {
              //console.log(res);
            });
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    this.getQR();
    this.sendData('rojo','on')
    this.interval = setInterval(() => {
      APICaller.getFungibleBalance("EVT57PWW2GPBzgdKe7iZzRwJfhG7GHFNzPSEZYAUGoUjfg4goJYSG").then(resp=>{
        this.newBalance = resp[0].substr(0,9)
        this.sendData('azul','off')
        this.sendData('azul','on')
        if(this.totalBalance==''){
          this.totalBalance = this.newBalance
        } else{
          var ganado = this.newBalance - this.totalBalance
          console.log(ganado)
          if(ganado>0){
            clearInterval(this.interval)
            this.sendData('verde','on')
            this.$store.commit('SET_GANADO', ganado)
            this.$router.push('/tiempo')
          }
        }
      })
    }, 10000)
  }
};
</script>
<style scoped>
#message {
color: #DDD;
font-size: 30px;
}
</style>