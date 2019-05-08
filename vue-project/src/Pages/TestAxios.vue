<template>
  <div>
    <div>
      <b-field class="files">
        <b-upload v-model="file">
          <a class="button is-primary">
            <b-icon icon="upload"></b-icon>
            <span>Click to upload</span>
          </a>
        </b-upload>
        <img src="https://storage.googleapis.com/senior-project-235617.appspot.com/Images/1556881988424_R.png">
        <span class="file-name" v-if="image">{{ image.name }}</span>
      </b-field>
    </div>
    <v-btn color="primary" dark @click="submit">submit</v-btn>
    <img :src="file[0]">
    <div v-if="!image">
      <input type="file" class="form-control" @change="onFileChange">
    </div>
    <div v-else>
      <img :src="image">
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "TestAxios",
  data() {
    return {
      file: [],
      image: ""
    };
  },
  methods: {
    submit(){
      console.log(this.file)
      this.createImage(this.file)
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
      console.log("เลือกแล้ว");
    },
    createImage(file) {
      var reader = new FileReader();
      reader.onload = e => {
        this.image = e.target.result;
        console.log(this.image);
      };
      reader.readAsDataURL(file);
    },
  }
};
</script>    