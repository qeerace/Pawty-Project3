<template>

  <v-card
    class="mx-auto"
    max-width="500"
    raised
  >
    <v-list-item three-line>
      <v-list-item-content v-for="(item, index) in this.petinfo" :key="index">
        <div class="overline mb-4">My Pet</div>
        <v-list-item-title class="headline mb-1">Name: {{item.Pet_name}}</v-list-item-title>
        <v-list-item-subtitle>DOB: {{item.Bd_pet}}</v-list-item-subtitle>
        <v-list-item-subtitle>Appearance: {{item.Appearance}}</v-list-item-subtitle>
        <v-list-item-subtitle>Type: {{item.Type}}</v-list-item-subtitle>
        <v-list-item-subtitle>Breed: {{item.Breed}}</v-list-item-subtitle>
        <v-list-item-subtitle>Color: {{item.Color}}</v-list-item-subtitle>
        <v-list-item-subtitle>Gender: {{item.Gender}}</v-list-item-subtitle>
        <v-list-item-subtitle>PetID: {{item.PetID}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-avatar size="120">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQGlrSakYL8iAJkObrrhNIPnnCygPzdRYp89NUB3Wi17IDyLWmu"
        >
      </v-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn 
      text 
      to="/FormPetID"
      >
        <v-icon :small="true" color="yellow darken-3">mdi-account-edit</v-icon>
        <span class="mr-2 blue-grey--text text--darken-3">Edit</span>
      </v-btn>
      <v-btn 
      text 
      to="/medrecs"
      >
        <v-icon :small="true" color="yellow darken-3">mdi-clipboard-pulse-outline</v-icon>
        <span class="mr-2 blue-grey--text text--darken-3">Medical Records</span>
      </v-btn>
      <v-dialog
        v-model="dialog"
        width="350"
        >
        <template v-slot:activator="{ on }">
            <v-btn
            text
            dark
            v-on="on"
            >
                <v-icon :small="true" color="yellow darken-3">mdi-qrcode-scan</v-icon>
                <span class="mr-2 blue-grey--text text--darken-3">My QR Code</span>
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="yellow-darken-2--text text--white"
            primary-title
            >
            My QR Code
            </v-card-title>
            <v-row class="mt-5" justify="center">
                <qrcode-vue class="p-10,m-10" :value="value" :size="size" level="H"></qrcode-vue>
            </v-row>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                icon
                @click="dialog = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
      <!-- <v-btn 
      text 
      to="/qrcode"
      >
        <v-icon :small="true" color="yellow darken-3">mdi-qrcode-scan</v-icon>
        <span class="mr-2 blue-grey--text text--darken-3">My QR Code</span>
      </v-btn> -->
    </v-card-actions>
  </v-card>
  
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import axios from 'axios'
import firebase from "firebase"
// import Auth from '@/components/Auth.vue'
export default {
  data () {
    return {
      petinfo: [],
      loading: true,
      overlay: false,
      value: "https://skilled-array-252503.firebaseapp.com/qrcode",
      size: 200,
      dialog: false
    }
  },
  
  components: {
      QrcodeVue,
    },

  mounted () {
    const uid = firebase.auth().currentUser.uid;
    // console.log(uid)
    axios
      .get('https://skilled-array-252503.appspot.com/allpets/userid/'+uid)
      .then(response => {
        this.petinfo = response.data
        this.loading = false
        // console.log(this.petinfo)
      })
      // .catch(error => {
      //   console.log(error)
      // })
  },
  methods: {

  }
}
</script>
