<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <section class="bg">
        <v-card-title class="headline font-weight-medium"
          >STATISTICS</v-card-title
        >
        <!-- <div id="boxright">
        <div id="static">-->

        <div>
          <!-- <v-layout row> -->
          <!-- <v-flex xs3>
              <b-card no-body class="bg-primary">
                <b-dropdown class="float-right" variant="transparent p-0" right>
                  <template slot="button-content"></template>
                  <b-dropdown-item>Action</b-dropdown-item>
                  <b-dropdown-item>Another action</b-dropdown-item>
                  <b-dropdown-item>Something else here...</b-dropdown-item>
                  <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                </b-dropdown>
                <h4 style="color:white; padding-left:10%;">9.823</h4>
                <p style="color:white; padding-left:10%;">Members online1</p>

                <card-line1-chart-example
                  chartId="card-chart-01"
                  class="chartjs-render-monitor"
                  style="height:70px;width:194px;display:block;"
                  height="70"
                  width="194"
                />
                <div id></div>

                <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/>
              </b-card>
            </v-flex>
            <v-flex xs3>
              <b-card no-body class="bg-info">
                <b-card-body class="pb-0">
                  <b-dropdown class="float-right" variant="transparent p-0" right no-caret>
                    <template slot="button-content"></template>
                    <b-dropdown-item>Action</b-dropdown-item>
                    <b-dropdown-item>Another action</b-dropdown-item>
                    <b-dropdown-item>Something else here...</b-dropdown-item>
                    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                  </b-dropdown>
                  <h4 style="color:white; padding-left:10%;">9.823</h4>
                  <p style="color:white; padding-left:10%;">Members online2</p>
                </b-card-body>
                <card-line2-chart-example
                  chartId="card-chart-02"
                  style="height:70px;width:194px;display:block;"
                  height="70"
                  width="194"
                />
              </b-card>
            </v-flex>
            <v-flex xs3>
              <b-card no-body class="bg-warning">
                <b-card-body class="pb-0">
                  <b-dropdown class="float-right" variant="transparent p-0" right>
                    <template slot="button-content"></template>
                    <b-dropdown-item>Action</b-dropdown-item>
                    <b-dropdown-item>Another action</b-dropdown-item>
                    <b-dropdown-item>Something else here...</b-dropdown-item>
                    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                  </b-dropdown>
                  <h4 style="color:white; padding-left:10%;">9.823</h4>
                  <p style="color:white; padding-left:10%;">Members online3</p>
                </b-card-body>
                <card-line3-chart-example
                  chartId="card-chart-03"
                  style="height:70px;width:194px;display:block;"
                  height="70"
                  width="194"
                />
              </b-card>
            </v-flex>
            <v-flex xs3>
              <b-card no-body class="bg-danger">
                <b-card-body class="pb-0">
                  <b-dropdown class="float-right" variant="transparent p-0" right>
                    <template slot="button-content"></template>
                    <b-dropdown-item>Action</b-dropdown-item>
                    <b-dropdown-item>Another action</b-dropdown-item>
                    <b-dropdown-item>Something else here...</b-dropdown-item>
                    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                  </b-dropdown>
                  <h4 style="color:white; padding-left:10%;">9.823</h4>
                  <p style="color:white; padding-left:10%;">Members online4</p>
                </b-card-body>
                <card-bar-chart-example
                  style="height:70px;width:194px;display:block;"
                  height="70"
                  width="194"
                />
              </b-card>
            </v-flex>-->
          <!-- </v-layout> -->

          <!-- <b-card> -->
          <!-- <b-row>
              <b-col sm="5">
                <center>
                  <h4 id="traffic">Restaurant Chart</h4>
                </center>
              </b-col>
              <b-col id="tab">
                <v-tabs v-model="tab">
                  <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="item in items" :key="item">
                      <v-card flat color="basil">
                        <main-chart-example
                          chartId="main-chart-01"
                          class="chart-wrapper"
                          style="height:300px;margin-top:40px;"
                          height="300"
                        ></main-chart-example>
                      </v-card>
                    </v-tab-item>
                  </v-tabs-items>
                </v-tabs>
              </b-col>
            </b-row>-->
          <div class="container">
            <v-layout row wrap>
              <v-flex xs2 id="first">
                <h1>Total Price</h1>
                {{ numberOfCustomer }}
                <strong>{{ totalPrice }}</strong>
                <v-progress-linear
                  color="#4dbd74"
                  :value="100"
                ></v-progress-linear>
              </v-flex>
              <!-- <v-flex xs2 id="second">
                  <h2>All Customer</h2>
                  <strong>{{numberOfCust}} Users</strong>
                  <v-progress-linear color="#20a8d8" :value="100"></v-progress-linear>
                </v-flex> -->
              <v-flex xs2 id="third">
                <h3>The total of buffet customer</h3>
                <strong
                  >{{ numberOfCustBuffet }} Users ({{
                    (numberOfCustBuffet / numberOfCust) * 100
                  }}%)</strong
                >
                <v-progress-linear
                  color="#f86c6b"
                  :value="(numberOfCustBuffet / numberOfCust) * 100"
                ></v-progress-linear>
              </v-flex>
              <v-flex xs2 id="forth">
                <h4>The total of a-la-carte customer</h4>
                <strong
                  >{{ numberOfCustAlacarte }} Users ({{
                    (numberOfCustAlacarte / numberOfCust) * 100
                  }}%)</strong
                >
                <v-progress-linear
                  color="#f9b115"
                  :value="(numberOfCustAlacarte / numberOfCust) * 100"
                ></v-progress-linear>
              </v-flex>
              <v-flex xs2 id="fifth">
                <h5>The total of buffet price</h5>
                <strong
                  >{{ buffetPrice }} ({{
                    (buffetPrice / totalPrice) * 100
                  }}%)</strong
                >
                <v-progress-linear
                  color="#4b0082"
                  :value="(buffetPrice / totalPrice) * 100"
                ></v-progress-linear>
              </v-flex>
              <v-flex xs2 id="second">
                <h5>The total of a-la-carte rice</h5>
                <strong
                  >{{ alacartePrice }} ({{
                    (alacartePrice / totalPrice) * 100
                  }}%)</strong
                >
                <v-progress-linear
                  color="#4b0082"
                  :value="(alacartePrice / totalPrice) * 100"
                ></v-progress-linear>
              </v-flex>
            </v-layout>
          </div>

          <!-- <v-flex xs2>
              <b-card no-body class="bg-primary">
                <b-dropdown class="float-right" variant="transparent p-0" right>
                  <template slot="button-content"></template>
                  <b-dropdown-item>Action</b-dropdown-item>
                  <b-dropdown-item>Another action</b-dropdown-item>
                  <b-dropdown-item>Something else here...</b-dropdown-item>
                  <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                </b-dropdown>
                <h4 style="color:white; padding-left:10%;">9.823</h4>
                <p style="color:white; padding-left:10%;">Members online1</p>

                <card-line1-chart-example
                  chartId="card-chart-01"
                  class="chartjs-render-monitor"
                  style="height:70px;width:194px;display:block;"
                  height="70"
                  width="194"
                />
                <div id></div>

              </b-card>
            </v-flex> -->
          <v-layout row>
            <v-flex xs2>
              <div class="col-6 col-lg-3">
                <v-card width="300" class="styleTop3Table">
                  <b-table
                    :data="data"
                    :columns="columns"
                    style="padding-top:5em;"
                  ></b-table>
                </v-card>
                <v-card width="250" class="styleTop3">
                  <v-card-text style="font-size:1.5em; padding-bottom:0px;"
                    >Top 3 the best selling</v-card-text
                  >
                  <v-card-text style="font-size:1em; padding-top:0px;"
                    >On 14 November 2019</v-card-text
                  >
                </v-card>
              </div>
            </v-flex>

            <!-- category the most selling-->

            <v-flex xs2>
              <div class="col-6 col-lg-3">
                <v-card width="300" class="styleCategoryHeader">
                  <v-tabs
                    v-model="tab"
                    color="#84A295"
                    fixed-tabs
                    style="padding-top:5em;"
                  >
                    <v-tabs-slider color="#B7CDC2"></v-tabs-slider>
                    <v-tab>a</v-tab>
                    <v-tab>b</v-tab>
                    <v-tab>c</v-tab>
                    <!-- <v-tab
                    class="white--text"
                    v-for="category in category"
                    :key="category.categoryId"
                    >{{ category.categoryName }}</v-tab
                  > -->

                    <v-tab-item>
                      <v-card>
                        <b-table :data="data" :columns="columns"></b-table>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>
                </v-card>

                <v-card width="250" class="styleCategory">
                  <v-card-text style="font-size:1.5em; padding-bottom:0px;"
                    >Top 3 the most selling</v-card-text
                  >
                  <v-card-text style="font-size:1em; padding-top:0px;"
                    >On 14 November 2019</v-card-text
                  >
                </v-card>
              </div>
            </v-flex>

            <!-- category the least selling-->
            <v-flex xs2>
              <div class="col-6 col-lg-3">
                <v-card width="300" class="styleCategoryHeader2">
                  <v-tabs
                    v-model="tab"
                    color="#84A295"
                    fixed-tabs
                    style="padding-top:5em;"
                  >
                    <v-tabs-slider color="#B7CDC2"></v-tabs-slider>
                    <v-tab>a</v-tab>
                    <v-tab>b</v-tab>
                    <v-tab>c</v-tab>

                    <v-tab-item>
                      <v-card>
                        <b-table :data="data" :columns="columns"></b-table>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>
                </v-card>

                <v-card width="250" class="styleCategory2">
                  <v-card-text style="font-size:1.5em; padding-bottom:0px;"
                    >Top 3 the most selling</v-card-text
                  >
                  <v-card-text style="font-size:1em; padding-top:0px;"
                    >On 14 November 2019</v-card-text
                  >
                </v-card>
              </div>
            </v-flex>
          </v-layout>

          <v-flex xs2>
              <div class="col-6 col-lg-3">
                <v-card width="700" class="styleTrans">
                  <b-table
                    :data="data"
                    :columns="columns"
                    style="padding-top:5em;"
                  ></b-table>
                </v-card>
                <v-card width="650" class="styleTransHeader">
                  <v-card-text style="font-size:1.5em; padding-bottom:0px;"
                    >Transaction</v-card-text
                  >
                  <v-card-text style="font-size:1em; padding-top:0px;"
                    >On 14 November 2019</v-card-text
                  >
                </v-card>
              </div>
            </v-flex>



          <!-- graph -->
          <!-- <v-layout row>
            <v-flex xs2>
              <div class="col-6 col-lg-3">
                <v-card width="450" class="styleGraphHeader">
                  <canvas
                    class="chart chartjs-render-monitor"
                    id="card-chart4"
                    height="70"
                    width="194"
                    style="display: block; width: 194px; height: 70px;"
                  ></canvas>
                </v-card>

                <v-card width="400" class="styleGraph">
                  <v-card-text style="font-size:1.5em; padding-bottom:0px;"
                    >Menu graph</v-card-text
                  >
                  <v-card-text style="font-size:1em; padding-top:0px;"
                    >On 14 November 2019</v-card-text
                  >
                </v-card>
              </div>
            </v-flex> -->

          <!-- graph-->
          <!-- <v-flex xs2>
              <div class="col-6 col-lg-3">
                <v-card width="450" class="styleCategoryHeader2">
                  <v-tabs
                    v-model="tab"
                    color="#84A295"
                    fixed-tabs
                    style="padding-top:5em;"
                  >
                    <v-tabs-slider color="#B7CDC2"></v-tabs-slider>
                    <v-tab>a</v-tab>
                    <v-tab>b</v-tab>
                    <v-tab>c</v-tab>

                    <v-tab-item>
                      <v-card>
                        <b-table :data="data" :columns="columns"></b-table>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>
                </v-card>

                <v-card width="400" class="styleCategory2">
                  <v-card-text style="font-size:1.5em; padding-bottom:0px;"
                    >Top 3 the most selling</v-card-text
                  >
                  <v-card-text style="font-size:1em; padding-top:0px;"
                    >On 14 November 2019</v-card-text
                  >
                </v-card>
              </div>
            </v-flex>
          </v-layout> -->
          <!-- <div class="container">
              <hr />
              <v-layout row wrap>
                <v-flex xs3>
                  <Callout variant="info">
                    <small class="text-muted">New Clients</small>
                    <br />
                    <strong class="h4">9,123</strong>
                  </Callout>
                </v-flex>
                <v-flex xs3>
                  <Callout variant="danger">
                    <small class="text-muted">Recurring Clients</small>
                    <br />
                    <strong class="h4">22,643</strong>
                  </Callout>
                </v-flex>
                <v-flex xs3>
                  <Callout variant="warning">
                    <small class="text-muted">Pageviews</small>
                    <br />
                    <strong class="h4">78,623</strong>
                  </Callout>
                </v-flex>
                <v-flex xs3>
                  <Callout variant="success">
                    <small class="text-muted">Organic</small>
                    <br />
                    <strong class="h4">49,123</strong>
                  </Callout>
                </v-flex>
              </v-layout>
              <hr />

              <v-layout>
                <v-container>
                  <v-row>
                    <v-flex xs9>
                      <div class="aaa">
                        <span class="progress-group-text">Monday</span>
                        <span class="progress-group-bars">
                          <v-progress-linear
                            color="#20a8d8"
                            :value="50"
                            height="4"
                          />
                          <v-progress-linear
                            color="#f86c6b"
                            :value="10"
                            height="4"
                          />
                        </span>
                        <span class="progress-group-text">Tuesday</span>
                        <span class="progress-group-bars">
                          <v-progress-linear
                            color="#20a8d8"
                            :value="50"
                            height="4"
                          />
                          <v-progress-linear
                            color="#f86c6b"
                            :value="10"
                            height="4"
                          />
                        </span>
                        <span class="progress-group-text">Wednesday</span>
                        <span class="progress-group-bars">
                          <v-progress-linear
                            color="#20a8d8"
                            :value="50"
                            height="4"
                          />
                          <v-progress-linear
                            color="#f86c6b"
                            :value="10"
                            height="4"
                          />
                        </span>
                        <span class="progress-group-text">Thursday</span>
                        <span class="progress-group-bars">
                          <v-progress-linear
                            color="#20a8d8"
                            :value="50"
                            height="4"
                          />
                          <v-progress-linear
                            color="#f86c6b"
                            :value="10"
                            height="4"
                          />
                        </span>
                        <span class="progress-group-text">Friday</span>
                        <span class="progress-group-bars">
                          <v-progress-linear
                            color="#20a8d8"
                            :value="50"
                            height="4"
                          />
                          <v-progress-linear
                            color="#f86c6b"
                            :value="10"
                            height="4"
                          />
                        </span>
                        <span class="progress-group-text">Saturday</span>
                        <span class="progress-group-bars">
                          <v-progress-linear
                            color="#20a8d8"
                            :value="50"
                            height="4"
                          />
                          <v-progress-linear
                            color="#f86c6b"
                            :value="10"
                            height="4"
                          />
                        </span>
                        <span class="progress-group-text">Sunday</span>
                        <span class="progress-group-bars">
                          <v-progress-linear
                            color="#20a8d8"
                            :value="50"
                            height="4"
                          />
                          <v-progress-linear
                            color="#f86c6b"
                            :value="10"
                            height="4"
                          />
                        </span>
                      </div>
                    </v-flex>
                  </v-row>
                </v-container>
                <v-row>
                  <v-flex xs3>
                    <div class="bbb">
                      <span class="progress-group">
                        <span>Male</span>
                        <span class="ml-auto font-weight-bold">43%</span>
                        <span class="progress-group-bars">
                          <v-progress-linear
                            :value="43"
                            color="#FFFF00"
                            height="4"
                          ></v-progress-linear>
                        </span>
                      </span>
                      <span class="progress-group mb-5">
                        <span>Female</span>
                        <span class="ml-auto font-weight-bold">37%</span>
                        <span class="progress-group-bars">
                          <v-progress-linear
                            :value="37"
                            color="#FFFF00"
                            height="4"
                          ></v-progress-linear>
                        </span>
                      </span>
                    </div>
                  </v-flex>
                </v-row>
                <v-row>
                  <v-flex xs3>
                    <div class="ccc">
                      <span class="progress-group">
                        <span>Organic Search</span>
                        <span class="ml-auto font-weight-bold">43%</span>
                        <span class="progress-group-bars">
                          <v-progress-linear
                            :value="43"
                            color="#0f4e06 "
                            height="4"
                          ></v-progress-linear>
                        </span>
                      </span>
                      <span class="progress-group mb-5">
                        <span>Facebook</span>
                        <span class="ml-auto font-weight-bold">37%</span>
                        <span class="progress-group-bars">
                          <v-progress-linear
                            :value="37"
                            color="#0f4e06 "
                            height="4"
                          ></v-progress-linear>
                        </span>
                      </span>
                      <span class="progress-group mb-5">
                        <span>Twitter</span>
                        <span class="ml-auto font-weight-bold">58%</span>
                        <span class="progress-group-bars">
                          <v-progress-linear
                            :value="58"
                            color="#0f4e06 "
                            height="4"
                          ></v-progress-linear>
                        </span>
                      </span>
                      <span class="progress-group mb-5">
                        <span>LinkedIn</span>
                        <span class="ml-auto font-weight-bold">92%</span>
                        <span class="progress-group-bars">
                          <v-progress-linear
                            :value="92"
                            color="#0f4e06"
                            height="4"
                          ></v-progress-linear>
                        </span>
                      </span>
                    </div>
                  </v-flex>
                </v-row>
              </v-layout>
            </div> -->
          <!-- </b-card> -->
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
      data: [
        {
          menuName: "BAcon",
          total: 200
        },
        {
          menuName: "BAcon",
          total: 200
        },
        {
          menuName: "BAcon",
          total: 200
        }
      ],
      columns: [
        {
          field: "menuName",
          label: "Menu name",
          width: "200"
        },
        {
          field: "total",
          label: "Total",
          numeric: true,
          width: "100"
        }
      ],
      selected: [],
      tab: null,
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
      alacartePrice: 0
    };
  },
  methods: {
    variant(value) {
      let $variant;
      if (value <= 25) {
        $variant = "info";
      } else if (value > 25 && value <= 50) {
        $variant = "success";
      } else if (value > 50 && value <= 75) {
        $variant = "warning";
      } else if (value > 75 && value <= 100) {
        $variant = "danger";
      }
      return $variant;
    },
    flag(value) {
      return "flag-icon flag-icon-" + value;
    },
    getTransaction() {
      axios.get(host + "gettransactionfinish").then(response => {
        this.transaction = response.data;
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
      return { bestSellerMenu: bestSellerMenu, count: count };
    },
    findWorseSellerMenuByCategoryName(categoryName) {
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
      return { worseSellerMenu: worseSellerMenu, count: count };
    },
    sortMenuBestSeller() {
      const distinctMenuName = [
        ...new Set(this.transaction.map(items => items.menuName))
      ];
      var menuAndAmount = [];
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
      var sortmenu = menuAndAmount.sort(function(a, b) {
        return b[1] - a[1];
      });
      return sortmenu;
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

      const distinctCategoryName = [
        ...new Set(this.transaction.map(items => items.categoryName))
      ];

      console.log(this.sortMenuBestSeller(), "top3");

      for (let index = 0; index < distinctCategoryName.length; index++) {
        console.log(
          this.findBestSellerMenuByCategoryName(distinctCategoryName[index]),
          distinctCategoryName[index]
        );
      }

      for (let index = 0; index < distinctCategoryName.length; index++) {
        console.log(
          this.findWorseSellerMenuByCategoryName(distinctCategoryName[index]),
          distinctCategoryName[index]
        );
      }

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
.styleTransHeader{
  background-color: #f60b46;
  margin-left: 98%;
  margin-top: -18em;
  box-shadow: 7px 7px 7px rgb(224, 224, 224);
  
}
.styleTrans{
  margin-top: 20em;
  margin-left: 85%;
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
