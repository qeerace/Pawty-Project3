<template>

  <v-card
    class="mx-auto"
    max-width="500"
    raised
  >
    <v-list-item three-line>
      <v-list-item-content v-for="(item, index) in this.vetsinfo" :key="index">
        <div class="overline mb-4">Veterinarian Information</div>
        <v-list-item-title class="headline mb-1">Welcome, {{item.Vet_name}} </v-list-item-title>
        <v-list-item-subtitle>Hospital: {{item.Hospital_name}}</v-list-item-subtitle>
        <v-list-item-subtitle>License No: {{item.License_no}}</v-list-item-subtitle>
        <v-list-item-subtitle>Contact: {{item.Contact}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-avatar size="100">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Et6olF9kyH-wzNjNsmy3sDbV6FfjMRzaVjjw5_eNU_j-lshgaA&s"
        >
      </v-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn 
      text 
      to="/formvets"
      >
        <v-icon :small="true" color="yellow darken-3">mdi-account-edit</v-icon>
        <span class="mr-2 blue-grey--text text--darken-3">Edit</span>
      </v-btn>
      <v-btn 
      text 
      to="/formmedrec"
      >
        <v-icon :small="true" color="yellow darken-3">mdi-clipboard-pulse-outline</v-icon>
        <span class="mr-2 blue-grey--text text--darken-3">New Medical Records</span>
      </v-btn>
      <v-btn 
      text 
      @click="overlay = !overlay"
      >
        <v-icon :small="true" color="yellow darken-3">mdi-qrcode-scan</v-icon>
        <span class="mr-2 blue-grey--text text--darken-3">My QR Code</span>
      </v-btn>
      <v-overlay :value="overlay">
        <v-btn
            icon
            @click="overlay = false"
        >
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-overlay>
    </v-card-actions>
  </v-card> 
</template>

<script>
import axios from 'axios'
import firebase from "firebase"
// import Auth from '@/components/Auth.vue'
export default {
  data () {
    return {
      vetsinfo: [],
      loading: true,
      overlay: false
    }
  },
  mounted () {
    const uid = firebase.auth().currentUser.uid;
    console.log(uid)
    axios
      .get('https://skilled-array-252503.appspot.com/allvets/userid/'+uid)
      .then(response => {
        this.vetsinfo = response.data
        this.loading = false
        console.log(this.vetsinfo)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {

  }
}
</script>
