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
  </v-card>
  
</template>

<script>
// import QrcodeVue from 'qrcode.vue'
import axios from 'axios'
import firebase from "firebase"
// import Auth from '@/components/Auth.vue'
export default {
  data () {
    return {
      petinfo: [],
      loading: true,
      overlay: false
    }
  },
  
  components: {
      // QrcodeVue,
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
      .catch(() => {
        // console.log(error)
      })
  },
  methods: {
  }
}
</script>
