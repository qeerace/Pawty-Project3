<template>
  <div>
    <v-card
    class="mx-auto"
    style="max-width: 1000px;"
    >
    <v-toolbar
      color="#F9A7B0"
      cards
      dark
      flat
    >
    <v-toolbar-title class="title font-weight-regular">Medical Records Form</v-toolbar-title>
    </v-toolbar>
      <v-responsive :aspect-ratio="16/9">
        <v-card-text>
        <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
      >
        <v-card flat>
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="success"
    >
      <span>Done!</span>
      <v-icon dark>mdi-checkbox-marked-circle</v-icon>
    </v-snackbar>
    <v-form ref="form" @submit.prevent="submit">

      <v-container fluid>
        <v-row>
          <!-- PET NAME -->
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.Pet_name"
              :rules="rules.name"
              color="#F9A7B0"
              label="Pet's name"
              outlined
              required
            ></v-text-field>
          </v-col>
          <!-- PET TYPE -->
          <v-col cols="12" sm="6">
            <v-select
              v-model="form.Type"
              :items="Types"
              :rules="rules.Type"
              color="#F9A7B0"
              label="Type"
              outlined
              required
            ></v-select>
          </v-col>
          <!-- BREED -->
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.Breed"
              :rules="rules.breed"
              color="#F9A7B0"
              label="Breed"
              outlined
              required
            ></v-text-field>
          </v-col>
          <!-- BLOOD TYPE -->
          <v-col cols="12" sm="6">
            <v-select
              v-model="form.Blood_type"
              :items="BTypes"
              :rules="rules.BType"
              color="#F9A7B0"
              label="Blood Type"
              outlined
              required
            ></v-select>
          </v-col>
          <!-- WEIGHT -->
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.Weight"
              :rules="rules.weight"
              color="#F9A7B0"
              label="Weight"
              suffix="kg"
              outlined
            ></v-text-field>
          </v-col>
          <!-- COLOR -->
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.Color"
              :rules="rules.color"
              color="#F9A7B0"
              label="Color"
              outlined
              required
            ></v-text-field>
          </v-col>
          <!-- APPEARANCE -->
          <v-col cols="12">
            <v-text-field
              v-model="form.Appearance"
              :rules="rules.appearance"
              color="#F9A7B0"
              label="Appearance"
              outlined
              required
            ></v-text-field>
          </v-col>
          <!-- GENDER -->
          <v-col cols="12" sm="6">
            <v-select
              v-model="form.Gender"
              :items="Genders"
              :rules="rules.Gender"
              color="#F9A7B0"
              label="Gender"
              outlined
              required
            ></v-select>
          </v-col>
          <!-- BD PET -->
          <v-col cols="12" sm="6">
            <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="form.Bd_pet"
                    label="Date of birth"
                    color="#F9A7B0"
                    prepend-icon="mdi-cake-variant"
                    outlined
                    readonly
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker color="#F9A7B0" v-model="form.Bd_pet" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-col>
          <!-- STERILIZE -->
          <v-col cols="12" sm="6">
            <v-radio-group color="#F9A7B0" v-model="form.Sterilize" row>
              <template v-slot:label>
                <div>Sterilized</div>
              </template>
              <v-radio color="#F9A7B0" label="Yes" value="Yes"></v-radio>
              <v-radio color="#F9A7B0" label="No" value="No"></v-radio>
            </v-radio-group>
          </v-col>
          <!-- MICROCHIP NO. -->
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.Microchip_no"
              :rules="rules.Microchip_no"
              color="#F9A7B0"
              label="Microchip Number"
              outlined
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text @click="resetForm">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!formIsValid"
          text
          color="primary"
          type="submit"
        >Submit</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
        
      </v-flex>
    </v-layout>
  </v-container> 
        </v-card-text>
      </v-responsive>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from 'axios'
// import Auth from '@/components/Auth.vue'
import { uuid } from 'vue-uuid'

export default {
    data () {
    const defaultForm = Object.freeze ({
        UserID:'',
        Pet_name: '',
        Type: '',
        Gender: '',
        Appearance: '',
        Breed: '',
        Color: '',
        Bd_pet: new Date().toISOString().substr(0, 10),
        Blood_type: '',
        Sterilize:'',
        PetID: '',
        Microchip_no:'',
        Weight:'',
        menu2: false
    })
    return {
      form: Object.assign({}, defaultForm),
      rules: {
        Type: [val => (val || '').length > 0 || 'This field is required'],
        name: [val => (val || '').length > 0 || 'This field is required'],
      },
      Types: ['Dog','Cat','หนู Dumbo Rat','Others'],
      Sterilizes: ['Yes','No'],
      Genders: ['Male','Female'],
      BTypes: ['A','B','AB'],
      menu2: false,
      snackbar: false,
      uuid: uuid.v1(),
      petinfo: [],
      defaultForm
    }
    },

    computed: {
        formIsValid () {
            return (
            this.form.Pet_name &&
            this.form.Type &&
            this.form.Gender &&
            this.form.Breed &&
            this.form.Bd_pet &&
            this.form.Blood_type
            )
        }
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
        resetForm () {
            this.form = Object.assign({}, this.defaultForm)
            this.$refs.form.reset()
        },

        submit() {
          if (this.petinfo.length == 0) {
            this.snackbar = true
            const uid = firebase.auth().currentUser.uid;
            // console.log('INSERTED')
            //console.log(uid)
            //console.log(this.uuid)
            axios.post('https://skilled-array-252503.appspot.com/register/pet', {
                "UserID": uid,
                "Appearance": this.form.Appearance,
                "Bd_pet": this.form.Bd_pet,
                "Blood_type": this.form.Blood_type,
                "Breed": this.form.Breed,
                "Color": this.form.Color,
                "Gender": this.form.Gender,
                "Microchip_no": this.form.Microchip_no,
                "PetID": this.uuid,
                "Pet_name": this.form.Pet_name,
                "Sterilize": this.form.Sterilize,
                "Type": this.form.Type,
                "Weight": this.form.Weight
            })
            .then(response => {
                this.pet = response.data;
                // console.log(response);
            })
            .catch(() => {
                // console.log(error)
            });
          } else {
            this.snackbar = true
            //this.resetForm()
            // const uid = firebase.auth().currentUser.uid;
            const p = this.petinfo.map(pid => pid.PetID);
            // console.log(p)
            // console.log('UPDATED')
            axios.patch('https://skilled-array-252503.appspot.com/update/petid/'+ p, {
                "Appearance": this.form.Appearance,
                "Bd_pet": this.form.Bd_pet,
                "Blood_type": this.form.Blood_type,
                "Breed": this.form.Breed,
                "Color": this.form.Color,
                "Gender": this.form.Gender,
                "Microchip_no": this.form.Microchip_no,
                "Pet_name": this.form.Pet_name,
                "Sterilize": this.form.Sterilize,
                "Type": this.form.Type,
                "Weight": this.form.Weight
            })
            .then(response => {
                this.pet = response.data;
                // console.log(response);
            })
            .catch(() => {
                // console.log(error)
            });
          }
            
        }
    }
};
</script>
