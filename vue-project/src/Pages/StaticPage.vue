<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <section class="bg">
        <v-card-title class="headline font-weight-medium">STATISTICS</v-card-title>
        <div>
          <div class="container">
            <v-layout row wrap>
              <v-flex xs2 id="first">
                <h1>Total Price of restaurant</h1>
                <br />
                {{ numberOfCustomer }}
                <strong>{{ totalPrice }} Bath</strong>
                <v-progress-linear color="#4dbd74" :value="100"></v-progress-linear>
              </v-flex>
              <v-flex xs2 id="third">
                <h3>The total of buffet customer</h3>
                <strong>
                  {{ numberOfCustBuffet }} Users ({{
                  (numberOfCustBuffet / numberOfCust) * 100
                  }}%)
                </strong>
                <v-progress-linear
                  color="#f86c6b"
                  :value="(numberOfCustBuffet / numberOfCust) * 100"
                ></v-progress-linear>
              </v-flex>
              <v-flex xs2 id="forth">
                <h4>The total of a-la-carte customer</h4>
                <strong>
                  {{ numberOfCustAlacarte }} Users ({{
                  (numberOfCustAlacarte / numberOfCust) * 100
                  }}%)
                </strong>
                <v-progress-linear
                  color="#f9b115"
                  :value="(numberOfCustAlacarte / numberOfCust) * 100"
                ></v-progress-linear>
              </v-flex>
              <v-flex xs2 id="fifth">
                <h5>The total price of buffet service</h5>
                <strong>
                  {{ buffetPrice }} ({{
                  (buffetPrice / totalPrice) * 100
                  }}%)
                </strong>
                <v-progress-linear color="#4b0082" :value="(buffetPrice / totalPrice) * 100"></v-progress-linear>
              </v-flex>
              <v-flex xs2 id="second">
                <h5>The total of a-la-carte price</h5>
                <strong>
                  {{ alacartePrice }} ({{
                  (alacartePrice / totalPrice) * 100
                  }}%)
                </strong>
                <v-progress-linear color="#4b0082" :value="(alacartePrice / totalPrice) * 100"></v-progress-linear>
              </v-flex>
            </v-layout>
          </div>

          <v-layout row>
            <v-flex xs2>
              <div class="col-6 col-lg-3">
                <v-card width="300" class="styleTop3Table">
                  <b-table :data="sortMenu" :columns="columns" style="padding-top:5em;"></b-table>
                </v-card>
                <v-card width="250" class="styleTop3">
                  <v-card-text style="font-size:1.5em; padding-bottom:0px;">The best selling</v-card-text>
                  <v-card-text style="font-size:1em; padding-top:0px;">On 14 November 2019</v-card-text>
                </v-card>
              </div>
            </v-flex>

            <!-- category the most selling-->

            <v-flex xs2>
              <div class="col-6 col-lg-3">
                <v-card width="300" class="styleCategoryHeader">
                  <v-tabs
                    v-model="tabBestSelling"
                    color="#84A295"
                    fixed-tabs
                    style="padding-top:5em;"
                  >
                    <v-tabs-slider color="#B7CDC2"></v-tabs-slider>
                    <v-tab v-for="data in distinctCategory" :key="data" @click="test">{{data}}</v-tab>
                    <!-- <v-tab
                    class="white--text"
                    v-for="category in category"
                    :key="category.categoryId"
                    >{{ category.categoryName }}</v-tab
                    >-->

                    <v-tab-item>
                      <v-card>
                        <b-table :data="bestSellerMenuByCategory" :columns="columns"></b-table>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>
                </v-card>

                <v-card width="250" class="styleCategory">
                  <v-card-text
                    style="font-size:1.5em; padding-bottom:0px;"
                  >The most selling by category</v-card-text>
                  <v-card-text style="font-size:1em; padding-top:0px;">On 14 November 2019</v-card-text>
                </v-card>
              </div>
            </v-flex>

            <!-- category the least selling-->
            <v-flex xs2>
              <div class="col-6 col-lg-3">
                <v-card width="300" class="styleCategoryHeader2">
                  <v-tabs
                    v-model="tabWorseSelling"
                    color="#84A295"
                    fixed-tabs
                    style="padding-top:5em;"
                  >
                    <v-tabs-slider color="#B7CDC2"></v-tabs-slider>
                    <v-tab v-for="data in distinctCategory" :key="data">{{data}}</v-tab>
                    <v-tab-item>
                      <v-card>
                        <b-table :data="worseSellerMenuByCategory" :columns="columns"></b-table>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>
                </v-card>

                <v-card width="250" class="styleCategory2">
                  <v-card-text
                    style="font-size:1.5em; padding-bottom:0px;"
                  >Top 3 the worse selling by category</v-card-text>
                  <v-card-text style="font-size:1em; padding-top:0px;">On 14 November 2019</v-card-text>
                </v-card>
              </div>
            </v-flex>
          </v-layout>

          <v-flex xs2>
            <div class="col-6 col-lg-3">
              <v-card width="700" class="styleTrans">
                <b-table
                  :data="tenTransaction"
                  :columns="columnsForTransaction"
                  style="padding-top:5em;"
                ></b-table>
              </v-card>
              <v-card width="650" class="styleTransHeader">
                <v-card-text style="font-size:1.5em; padding-bottom:0px;">Transaction</v-card-text>
                <v-card-text style="font-size:1em; padding-top:0px;">On 14 November 2019</v-card-text>
              </v-card>
            </div>
          </v-flex>

          <v-layout row>
            <v-flex xs2>
              <div class="col-6 col-lg-3">
                <v-card width="450" class="styleGraphMenu">
                  <b-card no-body style="padding-top:1em; backgroundColor:#dcdffa;">
                    <canvas id="my-chart"></canvas>
                  </b-card>
                </v-card>
                <v-card width="400" class="styleGraphMenuHeader">
                  <v-card-text style="font-size:1.5em; padding-bottom:0px;">Menu graph</v-card-text>
                  <v-card-text style="font-size:1em; padding-top:0px;">On 14 November 2019</v-card-text>
                </v-card>
              </div>
            </v-flex>

            <!-- <v-flex xs2>
              <div class="col-6 col-lg-3">
                <v-card width="450" class="styleGraphPrice">
                  <b-card no-body style="padding-top:1em; backgroundColor:#dcdffa;">
                    <canvas id="price"></canvas>
                  </b-card>
                </v-card>
                <v-card width="400" class="styleGraphPriceHeader">
                  <v-card-text style="font-size:1.5em; padding-bottom:0px;">Menu graph</v-card-text>
                  <v-card-text style="font-size:1em; padding-top:0px;">On 14 November 2019</v-card-text>
                </v-card>
              </div>
            </v-flex>-->
          </v-layout>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar";
import { host } from "./data";
import { Callout } from "@coreui/vue";
import { Switch } from "@coreui/vue";
import CardLine1ChartExample from "./CardLine1ChartExample";
import CardLine2ChartExample from "./CardLine2ChartExample";
import CardLine3ChartExample from "./CardLine3ChartExample";
import CardBarChartExample from "./CardBarChartExample";
import MainChartExample from "./MainChartExample";
import SocialBoxChartExample from "./SocialBoxChartExample";
import CalloutChartExample from "./CalloutChartExample";
import axios from "axios";
import Chart from "chart.js";

export default {
  name: "StaticPage",
  components: {
    sidebar,
    Callout,
    CardLine1ChartExample,
    CardLine2ChartExample,
    CardLine3ChartExample,
    CardBarChartExample,
    MainChartExample,
    SocialBoxChartExample,
    CalloutChartExample
  },
  data() {
    return {
      data: [],
      columns: [
        {
          field: "menuName",
          label: "Menu name",
          width: "200"
        },
        {
          field: "amount",
          label: "Amount",
          numeric: true,
          width: "100"
        }
      ],
      columnsForTransaction: [
        {
          field: "menuName",
          label: "Menu name",
          width: "150"
        },
        {
          field: "amount",
          label: "Amount",
          numeric: true,
          width: "100"
        },
        {
          field: "categoryName",
          label: "Category",
          width: "100"
        },
        {
          field: "totalPrice",
          label: "Total price",
          width: "100"
        }
      ],
      selected: [],
      tabBestSelling: 0,
      tabWorseSelling: 0,
      items: ["Day", "Month", "Year"],
      transaction: [],
      transactionCacel: "",
      numberOfCust: 0,
      totalPrice: 0,
      numberOfCustBuffet: 0,
      numberOfCustAlacarte: 0,
      distinctCategory: [],
      bestSellerMenu: "",
      buffetPrice: 0,
      alacartePrice: 0,
      sortMenu: [],
      bestSellerMenuByCategory: [],
      worseSellerMenuByCategory: [],
      tenTransaction: [],
      labelsAllMenu: [],
      dataAllMenu: [],
      backgroundColor: []
    };
  },
  methods: {
    getTransaction() {
      this.tenTransaction = [];
      axios.get(host + "gettransactionfinish").then(response => {
        this.transaction = response.data;
        for (
          let index = this.transaction.length - 1;
          this.transaction.length - 11 < index;
          index--
        ) {
          this.tenTransaction.push(this.transaction[index]);
        }
      });
    },
    getTransactionCancel() {
      axios.get(host + "gettransactioncancel").then(response => {
        this.transactionCacel = response.data;
      });
    },
    filterMenuFromCategoryName(categoryName) {
      const transactionByCategory = this.transaction.filter(
        items => items.categoryName === categoryName
      );
      return transactionByCategory;
    },
    findBestSellerMenuByCategoryName(categoryName) {
      this.bestSellerMenuByCategory = [];
      const transaction = this.filterMenuFromCategoryName(categoryName);
      const distinctMenu = [
        ...new Set(transaction.map(items => items.menuName))
      ];
      var bestSellerMenu = [];
      var count = 0;
      for (let index = 0; index < distinctMenu.length; index++) {
        const filterMenu = transaction.filter(
          items => items.menuName === distinctMenu[index]
        );
        var amount = 0;
        for (let index = 0; index < filterMenu.length; index++) {
          amount += filterMenu[index].amount;
        }
        if (amount > count) {
          count = amount;
          bestSellerMenu = [];
          bestSellerMenu.push(distinctMenu[index]);
        } else if (amount === count) {
          bestSellerMenu.push(distinctMenu[index]);
        }
      }
      if (bestSellerMenu.length != 0) {
        for (let index = 0; index < bestSellerMenu.length; index++) {
          this.bestSellerMenuByCategory.push({
            menuName: bestSellerMenu[index][0],
            amount: count
          });
        }
      }
    },
    findWorseSellerMenuByCategoryName(categoryName) {
      this.worseSellerMenuByCategory = [];
      const transaction = this.filterMenuFromCategoryName(categoryName);
      const distinctMenu = [
        ...new Set(transaction.map(items => items.menuName))
      ];
      var worseSellerMenu = [];
      var count = 0;
      for (let index = 0; index < distinctMenu.length; index++) {
        const filterMenu = transaction.filter(
          items => items.menuName === distinctMenu[index]
        );
        var amount = 0;
        for (let index = 0; index < filterMenu.length; index++) {
          amount += filterMenu[index].amount;
        }
        if (count === 0) {
          count = amount;
        } else if (amount < count) {
          count = amount;
          worseSellerMenu = [];
          worseSellerMenu.push(distinctMenu[index]);
        } else if (amount === count) {
          worseSellerMenu.push(distinctMenu[index]);
        }
      }
      if (worseSellerMenu.length != 0) {
        for (let index = 0; index < worseSellerMenu.length; index++) {
          this.worseSellerMenuByCategory.push({
            menuName: worseSellerMenu[index][0],
            amount: count
          });
        }
      }
    },
    sortMenuBestSeller() {
      const distinctMenuName = [
        ...new Set(this.transaction.map(items => items.menuName))
      ];
      var menuAndAmount = [];
      if (distinctMenuName.length != 0) {
        for (let index = 0; index < distinctMenuName.length; index++) {
          var menu = this.transaction.filter(
            items => items.menuName === distinctMenuName[index]
          );
          var amount = 0;
          for (let index = 0; index < menu.length; index++) {
            amount += menu[index].amount;
          }
          menuAndAmount.push([distinctMenuName[index], amount]);
        }
      }
      var sortMenu = menuAndAmount.sort(function(a, b) {
        return b[1] - a[1];
      });
      if (sortMenu.length != 0) {
        this.sortMenu = [
          {
            menuName: sortMenu[0][0],
            amount: sortMenu[0][1]
          },
          {
            menuName: sortMenu[1][0],
            amount: sortMenu[1][1]
          },
          {
            menuName: sortMenu[2][0],
            amount: sortMenu[2][1]
          }
        ];

        for (let index = 0; index < sortMenu.length; index++) {
          this.labelsAllMenu.push(sortMenu[index][0]);
          this.dataAllMenu.push(sortMenu[index][1]);
          this.backgroundColor.push(this.randomColor());
        }
        this.charts();
      }
    },
    test() {
      console.log(this.tabBestSelling, this.tabWorseSelling);
    },
    charts() {
      var ctx = document.getElementById("my-chart");
      var myBarChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.labelsAllMenu,
          datasets: [
            {
              label: "all menu",
              data: this.dataAllMenu,
              backgroundColor: this.backgroundColor
            }
          ]
        },
        options: {
          responsive: true
        }
      });
    },
    randomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  },
  created() {
    this.getTransaction();
    this.getTransactionCancel();
  },
  computed: {
    numberOfCustomer() {
      this.numberOfCust = 0;
      this.totalPrice = 0;
      this.numberOfCustBuffet = 0;
      this.numberOfCustAlacarte = 0;

      var distinctCategoryName = [
        ...new Set(this.transaction.map(items => items.categoryName))
      ];

      this.distinctCategory = distinctCategoryName;

      this.sortMenuBestSeller();
      this.findBestSellerMenuByCategoryName(
        this.distinctCategory[this.tabBestSelling]
      );
      this.findWorseSellerMenuByCategoryName(
        this.distinctCategory[this.tabWorseSelling]
      );

      for (let index = 0; index < this.transaction.length; index++) {
        if (this.transaction[index].service === "buffet") {
          this.numberOfCustBuffet += this.transaction[index].numOfCust;
          this.buffetPrice += this.transaction[index].totalPrice;
        } else if (this.transaction[index].service === "alacarte") {
          this.numberOfCustAlacarte += this.transaction[index].numOfCust;
          this.alacartePrice += this.transaction[index].totalPrice;
        }
        this.numberOfCust += this.transaction[index].numOfCust;
        this.totalPrice += this.transaction[index].totalPrice;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg {
  background-color: #f7f6ee;
  border-radius: 20px;
  height: 2000px;
  padding: 1%;
}
#bigbox {
  background-color: #84a295;
  height: 2000px;
  padding: 2%;
  margin-top: -800px;
  margin-left: 20%;
  background-attachment: fixed;
}

/* IE fix */
#card-chart-01,
#card-chart-02,
#card-chart-03,
#card-chart-04 {
  width: 100% !important;
}
.bg-primary {
  background-image: linear-gradient(45deg, #321fdb 0%, #1f1498 100%);
  border-radius: 10% 10% 10% 10%;
  margin-bottom: 5%;
}
.bg-info {
  background-image: linear-gradient(45deg, #39f 0%, #2982cc 100%);
  border-radius: 10% 10% 10% 10%;
  margin-left: 5%;
  margin-bottom: 5%;
}
.bg-warning {
  background-image: linear-gradient(45deg, #f9b115 0%, #f6960b 100%);
  border-radius: 10% 10% 10% 10%;
  margin-left: 5%;
  margin-bottom: 5%;
}
.bg-danger {
  background-image: linear-gradient(45deg, #e55353 0%, #d93737 100%);
  border-radius: 10% 10% 10% 10%;
  margin-left: 5%;
  margin-bottom: 5%;
}
#traffic {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 24px;
  font-weight: bold;
}
.small text-muted {
  font-size: 16px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
#first {
  margin-left: 13px;
  margin-right: 13px;
  margin-top: 10px;
}
#second {
  margin-left: 13px;
  margin-right: 13px;
  margin-top: 10px;
}
#third {
  margin-left: 13px;
  margin-right: 13px;
  margin-top: 10px;
}
#forth {
  margin-left: 13px;
  margin-right: 13px;
  margin-top: 10px;
}
#fifth {
  margin-left: 13px;
  margin-right: 13px;
  margin-top: 10px;
}
.aaa {
  width: 400px;
  margin-right: 20%;
  margin-top: -5%;
}
.bbb {
  width: 400px;
  margin-left: 55%;
  margin-top: 0%;
}
.ccc {
  width: 400px;
  margin-left: -350%;
  margin-top: 150%;
}
.styleTop3 {
  background-color: #f6960b;
  margin-left: 25%;
  margin-top: -18em;
  box-shadow: 7px 7px 7px rgb(224, 224, 224);
}
.styleTop3Table {
  margin-top: 2em;
  margin-left: 10%;
}
.styleCategoryHeader {
  margin-top: 2em;
  margin-left: 12em;
}
.styleCategory {
  background-color: #53ff8d;
  margin-left: 14em;
  margin-top: -21.5em;
  box-shadow: 7px 7px 7px rgb(224, 224, 224);
}
.styleCategoryHeader2 {
  margin-top: 2em;
  margin-left: 23em;
}
.styleCategory2 {
  background-color: #5389ff;
  margin-left: 25em;
  margin-top: -21.5em;
  box-shadow: 7px 7px 7px rgb(224, 224, 224);
}
.styleTransHeader {
  background-color: #f60b46;
  margin-left: 98%;
  margin-top: -18em;
  box-shadow: 7px 7px 7px rgb(224, 224, 224);
}
.styleTrans {
  margin-top: 20em;
  margin-left: 85%;
}
.styleGraphMenuHeader {
  background-color: #8a96ff;
  margin-left: 24%;
  margin-top: -25em;
  box-shadow: 7px 7px 7px rgb(224, 224, 224);
}
.styleGraphMenu {
  margin-top: 18em;
  margin-left: 10%;
  padding-top: 5em;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
}
.styleGraphPriceHeader {
  background-color: #8a96ff;
  margin-left: 27em;
  margin-top: -25em;
  box-shadow: 7px 7px 7px rgb(224, 224, 224);
}
.styleGraphPrice {
  margin-top: 18em;
  margin-left: 25em;
  padding-top: 5em;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
}
/* .styleGraphHeader {
  margin-top: 22em;
  margin-left: 27em;
}
.styleGraph {
  background-color: #5389ff;
  margin-left: 28.5em;
  margin-top: -15em;
  box-shadow: 7px 7px 7px rgb(224, 224, 224);
} */
</style>
