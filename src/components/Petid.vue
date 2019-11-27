<template>

  <v-card
    class="mx-auto"
    max-width="500"
    raised
  >
    <v-list-item three-line>
      <v-list-item-content v-for="(item, index) in wholeResponse" :key="index">
        <div class="overline mb-4">My Profile</div>
        <v-list-item-title class="headline mb-1">Welcome, {{item.First_name}} {{item.Last_name}}</v-list-item-title>
        <v-list-item-subtitle>Birthday: {{item.Bd_user}}</v-list-item-subtitle>
        <v-list-item-subtitle>Contact: {{item.Contact}}</v-list-item-subtitle>
        <v-list-item-subtitle>Address: {{item.Address}}</v-list-item-subtitle>
      </v-list-item-content>
      
      <v-avatar size="100">
        <img
          src="https://panumat576978001.files.wordpress.com/2018/07/manny-selfie-cat-1-1.jpg?w=300"
        >
      </v-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn 
      text 
      to="/Formuser"
      >
        <v-icon :small="true" color="yellow darken-3">mdi-account-edit</v-icon>
        <span class="mr-2 blue-grey--text text--darken-3">Edit Profile</span>
      </v-btn>
      <v-btn 
      text 
      to="/PetCard"
      >
        <v-icon :small="true" color="yellow darken-3">mdi-cat</v-icon>
        <span class="mr-2 blue-grey--text text--darken-3">PetID</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
import firebase from "firebase"
//import Auth from '@/components/Auth.vue'
export default {
  data () {
    return {
      wholeResponse: [],
      loading: true
    }
  },
  mounted () {
    const uid = firebase.auth().currentUser.uid;
    console.log(uid)
    axios
      .get('https://skilled-array-252503.appspot.com/ownerinfo/userid/'+uid)
      .then(response => {
        this.wholeResponse = response.data
        this.loading = false
        console.log(this.wholeResponse)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {

  }
}
</script>
