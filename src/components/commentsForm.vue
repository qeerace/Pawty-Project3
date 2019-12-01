<template>
  <v-container>
    <v-card>
      <v-card-title
        class="title font-weight-black blue-grey--text text--darken-3"
      >Comments & Reviews from our lovely customers</v-card-title>
      <v-divider class="mx-auto" inset></v-divider>
      <v-card-text align="center">{{ Nocomment }}</v-card-text>
      <v-flex v-for="(item,index) in listComments" :key="index">
        <v-card-text>
          <h3>{{item.commentName}}</h3>
          {{item.Comments}}
          <v-rating
            :value="item.commentRating"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
        </v-card-text>
        <v-divider class="mx-4" inset></v-divider>
      </v-flex>
    </v-card>
    <v-container>
      <v-flex xs12 md8>
        <v-card>
          <v-card-title
            class="title font-weight-black blue-grey--text text--darken-3"
          >Leave Your Comments Here!</v-card-title>
          <v-col cols="12">
            <v-text-field
              v-model="authorname"
              color="orange"
              label="Your Name"
              @input="$v.name.$touch()"
              clearable
              clear-icon="mdi-window-close"
            ></v-text-field>
            <v-textarea
              v-model="authorcomment"
              clearable
              clear-icon="mdi-window-close"
              color="orange"
              label="Your comments here..."
            ></v-textarea>
            <v-rating
              v-model="authorrating"
              background-color="orange lighten-3"
              color="orange"
              half-increments
              hover
            ></v-rating>
            <v-btn class="mr-4" @click="submit(listComments.ID)">submit</v-btn>
          </v-col>
        </v-card>
      </v-flex>
    </v-container>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      listComments: [],
      authorname: "",
      authoraddress: "",
      authorrating: null,
      commentnew: [],
      Nocomment: ""
    };
  },
  mounted() {
    this.getComments();
  },
  methods: {
    getComments() {
      axios
        .get("https://skilled-array-252503.appspot.com/comments/" + this.id)
        .then(response => {
          this.listComment = response.data;
          this.function();
        });
    },
    function() {
      if (this.listComment.length == 0) {
        this.Nocomment =
          "This place has no comments from users.\nBe the first one reviewing this place!";
        // console.log(this.Nocomment);
      } else {
        this.Nocomment = "";
      }
    },
    submit(id) {
      // console.log(this.authorname);
      this.loading = true;

      // Save Comment
      axios
        .post("https://skilled-array-252503.appspot.com/commentsPost/", {
          commentName: this.authorname,
          Comments: this.authorcomment,
          commentRating: this.authorrating,
          placesID: id
        })
        .then(response => {
          this.commentNew = response.data;
          // success callback
          //this.$emit('commented', response.data);

          // Clear the message
          this.authorname = "";
          this.authorcomment = "";
          this.authorrating = "";

          this.loading = false;
          location.reload();
        })
        .catch();
      // error callback
      this.loading = false;
    }
  }
};
</script>