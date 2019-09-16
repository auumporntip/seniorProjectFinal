<template>
  <v-content>
    <BarMoType></BarMoType>
    <v-flex class="space">
      <v-dialog max-width="490" v-model="dialog">
        <v-card>
          <v-form ref="form">
            <v-container fluid>
              <v-text-field
                label="Number of Customers"
                prepend-icon="people"
                v-model="newCust.numOfCust"
                :rules="numRules"
              ></v-text-field>
              <v-text-field label="Table number" v-model="newCust.tableNumber" :rules="tableRules"></v-text-field>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="clickBack">Back</v-btn>
              <v-btn color="green darken-1" text @click="clickNext">Next</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <div v-for="service in typeOfService" :key="service.typeId">
        <v-img :src="image_src1"></v-img>
        <v-btn
          block
          color="#cd9575"
          class="white--text"
          @click="openDialog(service.typeId,service.typePrice)"
        >{{service.typeName}} {{service.typePrice}}</v-btn>
      </div>
    </v-flex>
  </v-content>
</template>

<script>
import BarMoType from "../components/BarMoType";
import { store } from "../store/store";
import axios from "axios";

export default {
  name: "MoTypePage",
  components: {
    BarMoType
  },
  data() {
    return {
      typeOfService: [],
      typeId:0,
      typePrice:0,

      newCust: [],
      dialog: false,
      numRules: [v => !!v || "Number of Customers is required"],
      tableRules: [v => !!v || "Table number is required"],
      image_src1: require("../assets/prestige.png")
    };
  },
  methods: {
    openDialog(typeId,typePrice) {
      this.dialog = true;
      this.typeId = typeId
      this.typePrice = typePrice
    },
    clickBack() {
      this.newCust = [];
      this.dialog = false;
      this.$refs.form.resetValidation();
    },
    clickNext() {
      const totalPrice = 0;
      if (this.$refs.form.validate()) {
        if(this.typePrice != 0){
          this.totalPrice = this.typePrice*this.newCust.numOfCust
        }else{
          this.totalPrice = 0
        }
        axios.post("http://localhost:3000/api/insertbill",{
          totalPrice: this.totalPrice,
          eatTimeEnd: new Date(),
          eatTimeStart: new Date(),
          numOfCust: this.newCust.numOfCust,
          typeId: this.typeId,
          tableNumber : this.newCust.tableNumber
        }).then(response=>{
          localStorage.setItem('billId',response.data)
          console.log(response.data)
          this.dialog = false;
          this.$refs.form.resetValidation();
          this.$router.push("/Momenu");
        })
        
      }
    }
  },
  created() {
    axios
      .get("http://localhost:3000/api/gettypeofservice/" + 1)
      .then(response => {
        this.typeOfService = response.data;
      });
  }
};
</script>

<style scoped>
.space {
  margin: 15px;
}
div.error--text {
  color: rgba(255, 34, 34, 0.86) !important;
}
</style>