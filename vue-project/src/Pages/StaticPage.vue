<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <section class="bg">
        <v-card-title class="headline font-weight-medium">STATISTICS</v-card-title>
        <!-- <div id="boxright">
        <div id="static">-->

        <div>
          <v-layout row>
            <v-flex xs3>
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

                <!-- <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/> -->
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
                  style="height:70px;width:300%;"
                  :height="70"
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
                  style="height:70px;width:300%;"
                  height="70"
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
                  chartId="card-chart-04"
                  style="height:70px;width:300%;"
                  height="70"
                />
              </b-card>
            </v-flex>
          </v-layout>

          <b-card>
            <b-row>
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
            </b-row>
            <div class="container">
              <v-layout row wrap>
                <v-flex xs2 id="first">
                  <h1>Visits</h1>
                  <strong>29.703 Users (60%)</strong>
                  <v-progress-linear color="#4dbd74" :value="60"></v-progress-linear>
                </v-flex>
                <v-flex xs2 id="second">
                  <h2>Unique</h2>
                  <strong>24.093 Users (90%)</strong>
                  <v-progress-linear color="#20a8d8" :value="90"></v-progress-linear>
                </v-flex>
                <v-flex xs2 id="third">
                  <h3>Pageviews</h3>
                  <strong>78.706 Views (100%)</strong>
                  <v-progress-linear color="#f86c6b" :value="100"></v-progress-linear>
                </v-flex>
                <v-flex xs2 id="forth">
                  <h4>New Users</h4>
                  <strong>22.123 Users (20%)</strong>
                  <v-progress-linear color="#f9b115" :value="20"></v-progress-linear>
                </v-flex>
                <v-flex xs2 id="fifth">
                  <h5>Bounce Rate</h5>
                  <strong>Average Rate (30.15%)</strong>
                  <v-progress-linear color="#4b0082" :value="30"></v-progress-linear>
                </v-flex>
              </v-layout>
            </div>
            <div class="container">
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
                          <v-progress-linear color="#20a8d8" :value="50" height="4" />
                          <v-progress-linear color="#f86c6b" :value="10" height="4" />
                        </span>
                        <span class="progress-group-text">Tuesday</span>
                        <span class="progress-group-bars">
                          <v-progress-linear color="#20a8d8" :value="50" height="4" />
                          <v-progress-linear color="#f86c6b" :value="10" height="4" />
                        </span>
                        <span class="progress-group-text">Wednesday</span>
                        <span class="progress-group-bars">
                          <v-progress-linear color="#20a8d8" :value="50" height="4" />
                          <v-progress-linear color="#f86c6b" :value="10" height="4" />
                        </span>
                        <span class="progress-group-text">Thursday</span>
                        <span class="progress-group-bars">
                          <v-progress-linear color="#20a8d8" :value="50" height="4" />
                          <v-progress-linear color="#f86c6b" :value="10" height="4" />
                        </span>
                        <span class="progress-group-text">Friday</span>
                        <span class="progress-group-bars">
                          <v-progress-linear color="#20a8d8" :value="50" height="4" />
                          <v-progress-linear color="#f86c6b" :value="10" height="4" />
                        </span>
                        <span class="progress-group-text">Saturday</span>
                        <span class="progress-group-bars">
                          <v-progress-linear color="#20a8d8" :value="50" height="4" />
                          <v-progress-linear color="#f86c6b" :value="10" height="4" />
                        </span>
                        <span class="progress-group-text">Sunday</span>
                        <span class="progress-group-bars">
                          <v-progress-linear color="#20a8d8" :value="50" height="4" />
                          <v-progress-linear color="#f86c6b" :value="10" height="4" />
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
                          <v-progress-linear :value="43" color="#FFFF00" height="4"></v-progress-linear>
                        </span>
                      </span>
                      <span class="progress-group mb-5">
                        <span>Female</span>
                        <span class="ml-auto font-weight-bold">37%</span>
                        <span class="progress-group-bars">
                          <v-progress-linear :value="37" color="#FFFF00" height="4"></v-progress-linear>
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
                          <v-progress-linear :value="43" color="#0f4e06 " height="4"></v-progress-linear>
                        </span>
                      </span>
                      <span class="progress-group mb-5">
                        <span>Facebook</span>
                        <span class="ml-auto font-weight-bold">37%</span>
                        <span class="progress-group-bars">
                          <v-progress-linear :value="37" color="#0f4e06 " height="4"></v-progress-linear>
                        </span>
                      </span>
                      <span class="progress-group mb-5">
                        <span>Twitter</span>
                        <span class="ml-auto font-weight-bold">58%</span>
                        <span class="progress-group-bars">
                          <v-progress-linear :value="58" color="#0f4e06 " height="4"></v-progress-linear>
                        </span>
                      </span>
                      <span class="progress-group mb-5">
                        <span>LinkedIn</span>
                        <span class="ml-auto font-weight-bold">92%</span>
                        <span class="progress-group-bars">
                          <v-progress-linear :value="92" color="#0f4e06" height="4"></v-progress-linear>
                        </span>
                      </span>
                    </div>
                  </v-flex>
                </v-row>
              </v-layout>
            </div>
          </b-card>
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
      selected: [],
      tab: null,
      items: ["Day", "Month", "Year"]
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg {
  background-color: #f0cab1;
  border-radius: 20px;
  padding: 1%;
}
#bigbox {
  background-color: #eeeeee;
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
</style>