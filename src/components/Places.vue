<template>
  <div class="comments">
    <v-container>
      <v-responsive :aspect-ratio="16/9">
        <v-row justify="center">
          <v-col>
            <v-flex v-for="(item,index) in listPlace"
            :key="index">
            <v-card>
              <v-card-title>{{item.placesName}}</v-card-title>
              
              <v-img :src="item.URLimage" aspect-ratio="2" class="white--text align-end"></v-img>
              <v-row>
                
                  <v-card-text pb-0 class="blue-grey--text text--darken-3">
                    <div>
                      <v-icon medium color="yellow darken-3">mdi-account-card-details-outline</v-icon>
                      Name: {{item.placesName}}
                    </div>
                    <div>
                      <v-icon medium color="yellow darken-3">mdi-email-newsletter</v-icon>
                      Address: {{item.Address}}
                    </div>
                    <div>
                      <v-icon medium color="yellow darken-3">mdi-phone</v-icon>
                      Phone No.: {{item.Telephone}}
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      class="ma-2 subtitle-2 font-weight-medium amber--text text--lighten-5"
                      color="yellow darken-3"
                      to="/">Back</v-btn>
                    <v-btn class="ma-2" 
                    @click="editPlace(item.ID)"
                    outlined color="orange">
                    <v-icon left>mdi-pencil</v-icon> Edit</v-btn>
                  </v-card-actions>
                
              </v-row>
            
          </v-card>
            </v-flex>
          <v-container>
      <v-card>
        <v-card-title class="title font-weight-black blue-grey--text text--darken-3">
          Comments & Reviews from our lovely customers</v-card-title>
          <v-divider
      class="mx-auto"
      inset></v-divider>
      <v-card-text align="center"> {{ Nocomment }} </v-card-text>
          <v-flex v-for="(item2,index) in cmntPlace"
            :key="index">
          <v-card-text>
            <h3>{{item2.commentName}}</h3>
            {{item2.Comments}}
          <v-rating
            :value="item2.commentRating"
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
        <v-col cols="12">
          <v-text-field
            v-model="authorname"
            color="orange"
            label="Your Name"
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
             
          <v-btn class="mr-4" @click="submit()">submit</v-btn>

                </v-col>
              </v-card>
            </v-flex>
          </v-container>
        </v-col>
      </v-row>
      </v-responsive>
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
      Nocomment:'',
    }
  },
  mounted () {
    axios.all([
       axios.get('https://skilled-array-252503.appspot.com/placesdetails/' + this.id),
    axios.get('https://skilled-array-252503.appspot.com/comments/' + this.id)
    ])
      .then(axios.spread((placeRes, commentRes) => {
        this.listPlace = placeRes.data
        this.cmntPlace = commentRes.data
        this.function();
        // console.log(this.listPlace);
        // console.log(this.cmntPlace);
        this.loading = false
      }))
      .catch(() => {
        // console.log(error)
      })
      
  },
  methods:{
    function() {
      if (this.cmntPlace.length == 0 ) {
        this.Nocomment = "This place has no comments from users.\nBe the first one reviewing this place!"
        // console.log(this.Nocomment);
      } else {
        this.Nocomment = "";
      }
    },
    editPlace (id) {
      this.$router.push('/petservices/edit/' + id)
    },
    submit () {
      this.loading = true;
        // Save Comment
        axios.post('https://skilled-array-252503.appspot.com/commentsPost/', 
       { "commentName":(this.authorname),
        "Comments":(this.authorcomment),
        "commentRating":(this.authorrating),
        "placesID":(this.id)
       })
        .then(response => {
          this.commentNew = response.data;
          // success callback
          // console.log(response);
          // fire event for comment
          this.$emit('commented', response.data);  
          // Clear the message
          this.commentData.authorname = '';
          this.commentData.authorcomment = '';
          this.commentData.authorrating = '';
          this.loading = false;
          location.reload()
        }).catch(() => { 
          // error callback
          this.loading = false;
        });
    },
  }
}
</script>
<style>
</style>