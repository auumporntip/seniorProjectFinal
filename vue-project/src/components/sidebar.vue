<template>
  <v-card class="sidebar">
    <v-navigation-drawer v-model="drawer" permanent dark>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar class="logo">
              <img src="../assets/1.png" />
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title class="name">PAT Restaurant</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <div
          v-if="this.account.positionId===3 || this.account.positionId===1 "
        >
          <v-list-tile :to="{name: 'MenuPage'}">
            <v-list-tile-action>
              <v-icon>folder_open</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Menu</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>

        <div
          v-if="this.account.positionId===3 || this.account.positionId===1 "
        >
          <v-list-tile :to="{name: 'TypeOfService'}">
            <v-list-tile-action>
              <v-icon>folder_open</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Type of Service</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>

        <div v-if="this.account.positionId !=2">
          <v-list-tile :to="{name: 'OrderedPage'}">
            <v-list-tile-action>
              <v-icon>folder_open</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Ordered</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>

        <div v-if="this.account.positionId!=5">
          <v-list-tile :to="{name: 'ServedPage'}">
            <v-list-tile-action>
              <v-icon>folder_open</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Bill</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>

        <div v-if="this.account.positionId!=5">
          <v-list-tile :to="{name: 'NotificationPage'}">
            <v-list-tile-action>
              <v-icon>folder_open</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Notification
                <v-badge color="red">
                  <template v-slot:badge>
                    <span>!</span>
                  </template>
                </v-badge>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>

        <div v-if="this.account.positionId!=5">
          <v-list-tile :to="{name: 'TablePage'}">
            <v-list-tile-action>
              <v-icon>folder_open</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Table</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>

        <div
          v-if="this.account.positionId===3 || this.account.positionId===1 "
        >
          <v-list-tile :to="{name: 'StaticPage'}">
            <v-list-tile-action>
              <v-icon>folder_open</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Statistics</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>

        <div
          v-if="this.account.positionId===3 || this.account.positionId===1 "
        >
          <v-list-tile :to="{name: 'EmployeePage'}">
            <v-list-tile-action>
              <v-icon>folder_open</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Employee</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>

        <div class="pa-2">
          <v-btn block color="grey darken-1" @click="logout">Logout</v-btn>
        </div>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { store } from "../store/store";
import jwt from "jsonwebtoken";
export default {
  name: "sidebar",
  data() {
    return {
      drawer: true,
      right: null,
      account:''
    };
  },
  methods: {
    logout() {
      sessionStorage.clear();
      localStorage.clear();
      this.$store.replaceState({});
      this.$router.push("/");
    }
  },
  created() {
    this.account = jwt.decode(localStorage.getItem('token'))
    console.log(this.account)
  },
};
</script>

<style scoped>
.sidebar {
  height: 800px;
  width: 20%;
}
.logo {
  margin-top: 7%;
}
.name {
  font-size: 110%;
  margin-left: 5%;
  margin-top: 7%;
}
</style>