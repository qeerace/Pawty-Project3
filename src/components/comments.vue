<template>
  <div class="comments">
    <v-container>
      <v-row justify="center">
        <v-col>
          <v-container fluid>
      <v-card>
        <v-card-title class="title font-weight-black blue-grey--text text--darken-3">
          Comments & Reviews from our lovely customers</v-card-title>
          <v-divider
      class="mx-4"
      inset></v-divider>
          <v-flex v-for="(item,index) in cmntPlace"
            :key="index">
          <v-card-text>
            {{item.commentName}}
            <br>
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
        <v-divider
      class="mx-4"
      inset
    ></v-divider>
          </v-flex>
      </v-card>
    </v-container>
  <v-container fluid>
    <v-flex xs12 md8>
      <v-card>
        <v-card-title class="title font-weight-black blue-grey--text text--darken-3">
          Leave Your Comments Here!</v-card-title>
        <v-col cols="16">
          <v-text-field
            v-model="authorname"
            color="orange"
            label="Your Name"
            @input="$v.name.$touch()"
            clearable
            clear-icon="mdi-cancel"
          ></v-text-field>

          <v-textarea
            v-model="authorcomment"
            clearable
            clear-icon="mdi-cancel"
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
    <v-btn class="mr-4" @click="submit(listPlace[0].ID)">submit</v-btn>

        </v-col>
      </v-card>
    </v-flex>
  </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: ['id'],
  data () {
    return {
      listPlace: [],
      cmntPlace:[],
      loading: true,
      commentData: {
        authorname:'',
        authorcomments:'',
        authorrating:null,
      },
      commentNew:[],
    }
  },
  mounted () {
    console.log(this.id)
    axios.get('https://skilled-array-252503.appspot.com/comments/' + this.id)
      .then(response => {
        this.cmntPlace = response.data
        this.loading = false
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods:{
    editPlace (id) {
      this.$router.push('/edit/' + id)
    },
    submit (id) {
      console.log(this.authorname)
      this.loading = true;

        // Save Comment
        axios.post('https://skilled-array-252503.appspot.com/commentsPost/', 
       { "commentName":(this.authorname),
        "Comments":(this.authorcomment),
        "commentRating":(this.authorrating),
        "placeID":(id)
       })
        .then(response => {
          this.commentNew = response.data;
          // success callback
          console.log(response);
          // fire event for comment
          this.$emit('commented', response.data);  

          // Clear the message
          this.commentData.authorname = '';
          this.commentData.authorcomment = '';
          this.commentData.authorrating = '';

          this.loading = false;
          location.reload()
        }).catch(error => { console.log(error)
          // error callback
          this.loading = false;
        });

    },
  }
}
</script>
<style>
</style>