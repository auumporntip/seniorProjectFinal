<template>
  <div>
    <Header></Header>
    <div id="header">
      SIGN UP
      <form id="singup">
        <div id="RestaurantName">
          <div id="Username">
            <span>Username</span>
            <b-field :type="errorUser[0]" :message="errorUser[1]" expanded style="width:450px;">
              <b-input placeholder="Username" v-model="username"></b-input>
            </b-field>
          </div>
          <div id="Password">
            <span>Password</span>
            <b-field :type="errorPass1[0]" :message="errorPass1[1]" style="width:450px;">
              <b-input placeholder="Password" type="password" v-model="password1" password-reveal></b-input>
            </b-field>
          </div>
          <div id="Password">
            <span>Confirm Password</span>
            <b-field :type="errorPass2[0]" :message="errorPass2[1]" style="width:450px;">
              <b-input placeholder="Confirm-Password" type="password" v-model="password2" password-reveal></b-input>
            </b-field>
          </div>
          <div id="Name">
            <span style="padding-right:20px;">Name</span>
            <b-field :type="errorName[0]" :message="errorName[1]" style="width:450px;">
              <b-input placeholder="Name" v-model="name" expanded></b-input>
            </b-field>
          </div>
          <div id="Surname">
            <span>Surname</span>
            <b-field
              :type="errorSurname[0]"
              :message="errorSurname[1]"
              expanded
              style="width:450px;"
            >
              <b-input placeholder="Surname" v-model="surname"></b-input>
            </b-field>
          </div>
          <div id="Email">
            <span>Email</span>
            <b-field :type="errorEmail[0]" :message="errorEmail[1]" style="width:450px;">
              <b-input v-model="email" placeholder="some@email.com" style="width:450px;"></b-input>
            </b-field>
          </div>
          <div id="Tel">
            <span>PhoneNumber</span>
            <b-field :type="errorPhone[0]" :message="errorPhone[1]" expanded style="width:450px;">
              <b-input placeholder="xx-xxx-xxxx" type="text" v-model="phone"></b-input>
            </b-field>
          </div>
        </div>
      </form>
        <div id="button">
      <button @click="submitForm" id="butto">SIGN UP</button>
        </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import axios from "axios";

export default {
  name: "SignupPage",
  components: {
    Header
  },
  data() {
    return {
      account: [],
      errorUser: [],
      errorPass1: [],
      errorPass2: [],
      errorName: [],
      errorSurname: [],
      errorEmail: [],
      errorPhone: [],
      username: null,
      password1: null,
      password2: null,
      name: null,
      surname: null,
      email: null,
      phone: null
    };
  },
  methods: {
    submitForm() {
      if (this.checkForm()) {
        axios
          .post("http://13.228.170.25:7777/api/register", {
            username: this.username,
            password: this.password1,
            name: this.name,
            surname: this.surname,
            email: this.email,
            phone: this.phone
          })
          .then(response => {
            axios
              .get("http://13.228.170.25:7777/api/getallaccount/")
              .then(response => {
                this.account = response.data;
              });
          });
        this.$router.push('/');
      }
    },
    checkForm() {
      this.errorUser = [];
      this.errorPass1 = [];
      this.errorPass2 = [];
      this.errorName = [];
      this.errorSurname = [];
      this.errorEmail = [];
      this.errorPhone = [];
      var check = true;

      if (this.username === null || this.username === "") {
        this.errorUser.push("is-danger");
        this.errorUser.push("username required.");
        check = false;
      } else if (this.username.length < 8) {
        this.errorUser.push("is-danger");
        this.errorUser.push("username must be at least 8 characters long.");
        check = false;
      } else if (this.checkSameAccount(this.account, this.username)) {
        this.errorUser.push("is-danger");
        this.errorUser.push("This username has been taken");
        check = false;
      } else {
        this.errorUser.push("is-success");
        this.errorUser.push("");
      }

      if (this.name === null || this.name === "") {
        this.errorName.push("is-danger");
        this.errorName.push("Name required.");
        check = false;
      } else {
        this.errorName.push("is-success");
        this.errorName.push("");
      }
      if (this.surname === null || this.surname === "") {
        this.errorSurname.push("is-danger");
        this.errorSurname.push("surname required.");
        check = false;
      } else {
        this.errorSurname.push("is-success");
      }
      if (this.password1 === null || this.password1 === "") {
        this.errorPass1.push("is-danger");
        this.errorPass1.push("password required.");
        check = false;
      } else {
        this.errorPass1.push("is-success");
        this.errorPass1.push("");
      }
      if (this.password2 === null || this.password2 === "") {
        this.errorPass2.push("is-danger");
        this.errorPass2.push("password required.");
        check = false;
      }
      if (
        this.password1 != this.password2 &&
        this.password1 != null &&
        this.password2 != null &&
        this.password1 != "" &&
        this.password2 != ""
      ) {
        this.errorPass2.push("is-danger");
        this.errorPass2.push("password does not match");
        check = false;
      } else {
        this.errorPass2.push("is-success");
        this.errorPass2.push("");
      }
      if (this.phone === null || this.phone === "") {
        this.errorPhone.push("is-danger");
        this.errorPhone.push("phone number requird.");
        check = false;
      } else if (this.phone.length != 10 || !this.phoneValidator(this.phone)) {
        this.errorPhone.push("is-danger");
        this.errorPhone.push("phone number not exist");
        check = false;
      } else {
        this.errorPhone.push("is-success");
        this.errorPhone.push("");
      }
      if (this.email === null || this.email === "") {
        this.errorEmail.push("is-danger");
        this.errorEmail.push("Email required.");
        check = false;
      } else if (!this.validEmail(this.email)) {
        this.errorEmail.push("is-danger");
        this.errorEmail.push("Valid email required.");
        check = false;
      } else {
        this.errorEmail.push("is-success");
        this.errorEmail.push("");
      }
      return check;
    },
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    checkSameAccount(account, username) {
      for (var i = 0; i < account.length; i++) {
        if (account[i].username === username) {
          return true;
        }
      }
      return false;
    },
    phoneValidator (phoneNumber) {
      var phoneno = /^(([0-9]{3}))([0-9]{3})([0-9]{4})$/;
      console.log(phoneNumber)
      return phoneno.test(phoneNumber); 
    }
    
  },
  created() {
    axios.get("http://13.228.170.25:7777/api/getallaccount/").then(response => {
      this.account = response.data;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login {
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-size: 16px;
  padding-top: 20px;
}
#header {
  font-family: "Arial Black", Gadget, sans-serif;
  font-size: 20px;
  text-align: center;
  padding-top: 25px;
  background-color: #f0cab1;
  height: 40em;
}

#Username {
  text-align: left;
  padding-left: 25em;
  width: 1300px;
}
#Surname {
  text-align: left;
  padding-left: 25em;
  width: 1300px;
}
#Name {
  text-align: left;
  padding-left: 25em;
  width: 1000px;
}
#Email {
  text-align: left;
  padding-left: 25em;
  width: 1000px;
}
#Tel {
  text-align: left;
  padding-left: 25em;
  width: 1300px;
}

#Password {
  text-align: left;
  width: 1300px;
  padding-left: 25em;
}
#login {
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-size: 16px;
  padding-top: 20px;
}
button {
  height: 40px;
  width: 600px;
  position: sticky;
  padding: 5px 5px;
  margin: 10px 0px;
  font-weight: bold;
  background-color: #be5256;
  border: none;
  color: #e0dada;
  cursor: pointer;
  font-size: 16px;
  
}
button:hover {
  background-color: #711f1b;
}
li {
  list-style-type: none;
}
#button{
  padding-left: 5em;
}
</style>
