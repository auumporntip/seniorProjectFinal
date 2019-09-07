<template>
  <v-card class="sidebar">
    <v-navigation-drawer v-model="drawer" permanent dark>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar class="logo">
              <img src="../component/1.png" />
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title class="name">Restaurant Management</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile :to="{name: 'accountsuper'}">
          <v-list-tile-action>
            <v-icon>folder_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Account</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'restaurantsuper'}">
          <v-list-tile-action>
            <v-icon>folder_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Restaurant</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'typeofressuper'}">
          <v-list-tile-action>
            <v-icon>folder_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Type of Restaurant</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'menusuper'}">
          <v-list-tile-action>
            <v-icon>folder_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Menu</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'catsuper'}">
          <v-list-tile-action>
            <v-icon>folder_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Category of menu</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'typeofservicesuper'}">
          <v-list-tile-action>
            <v-icon>folder_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Type of Service</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'menuservicesuper'}">
          <v-list-tile-action>
            <v-icon>folder_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Menu Service</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'transactionsuper'}">
          <v-list-tile-action>
            <v-icon>folder_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Transaction</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'statussuper'}">
          <v-list-tile-action>
            <v-icon>folder_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Status</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'notificationsuper'}">
          <v-list-tile-action>
            <v-icon>folder_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Notification</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'billsuper'}">
          <v-list-tile-action>
            <v-icon>folder_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Bill</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'empsuper'}">
          <v-list-tile-action>
            <v-icon>folder_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Employee</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
        <v-list-tile :to="{name: 'positionsuper'}">
          <v-list-tile-action>
            <v-icon>folder_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Position</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <div class="pa-2">
          <v-btn block color="grey darken-1">Logout</v-btn>
        </div>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "sidebarsuper",
  data() {
    return {
      drawer: true,
      right: null
    };
  }
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