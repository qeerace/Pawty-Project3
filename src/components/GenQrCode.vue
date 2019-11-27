<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="300"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
        >
          My QR Code
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline yellow darken-3"
          primary-title
        >
          My QR Code
        </v-card-title>
        <v-row justify="center">
            <v-spacer></v-spacer>
            <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
            <v-spacer></v-spacer>
        </v-row>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
API
<script>
  import QrcodeVue from 'qrcode.vue'
 
  export default {
    data() {
      return {
        value: 'http://localhost:8080/PetCard',
        size: 200,
        dialog: false
      }
    },
    components: {
      QrcodeVue,
    },
  }
</script> 
