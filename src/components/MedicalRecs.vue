<template>
  <v-card
    class="mx-auto"
    max-width="1000"
    raised
  >
    <v-card-title>
      Medical Records
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :search="search"
      :items="medinfo"
    ></v-data-table>
  </v-card>
</template>

<script>
import firebase from "firebase";
import axios from 'axios'
// import Auth from '@/components/Auth.vue'
// import { stringify } from 'querystring';

  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Date',
            align: 'left',
            sortable: false,
            value: 'Date',
          },
          { text: 'Description', value: 'Description' },
          { text: 'Diagnosis', value: 'Diagnose' },
          { text: 'Hospital Name', value: 'Hospital_name' },
          { text: 'Veterinarian', value: 'Vet_name' },
          { text: 'Lisense No.', value: 'License_no' },
        ],
        petinfo: [],
        medinfo: []
      }
    },

    mounted () {
    // const uid = firebase.auth().currentUser.uid;
    // console.log(uid)
    axios
      .get('https://skilled-array-252503.appspot.com/allpets/userid/'+firebase.auth().currentUser.uid)
      .then(response => {
        this.petinfo = response.data
        this.loading = false
        const p = this.petinfo.map(pid => pid.PetID);
        // console.log(p)
        this.Medrec(p)
        // console.log(this.petinfo)
      })
      .catch(() => {
        // console.log(error)
      });

    },

    methods: {
        Medrec(p) {
            // const uid = firebase.auth().currentUser.uid;
            // console.log(p)
            axios
            .get('https://skilled-array-252503.appspot.com/allmedicals/'+p)
            .then(response => {
                this.medinfo = response.data
                this.loading = false
                // console.log(this.medinfo)
            })
            // .catch(error => {
            //     console.log(error)
            // })
        }

    }
  }
</script>