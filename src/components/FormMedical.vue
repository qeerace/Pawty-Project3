<template>
  <div>
    <v-card
    class="mx-auto"
    style="max-width: 1000px;"
    >
    <v-toolbar
      color="cyan darken-1"
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
    <v-form v-for="(item, index) in petinfo" :key="index" ref="form" @submit.prevent="submit">
      <v-container fluid>
        <p class="font-weight-medium">Pet Information</p>
        <v-row>
          <!-- PETID -->
          <v-col cols="12" sm="6">
            <v-text-field
              :rules="rules.Check"
              color="cyan darken-1"
              :value="item.PetID"
              label="Pet ID"
              readonly
              outlined
            ></v-text-field>
          </v-col>
          <!-- PET NAME -->
          <v-col cols="12" sm="6">
            <v-text-field
              :rules="rules.Check"
              color="cyan darken-1"
              :value="item.Pet_name"
              label="Pet's Name"
              readonly
              outlined
            ></v-text-field>
          </v-col>
          <!-- TYPE -->
          <v-col cols="12" sm="6">
            <v-text-field
              :rules="rules.Check"
              color="cyan darken-1"
              :value="item.Type"
              label="Type"
              readonly
              outlined
            ></v-text-field>
          </v-col>
          <!-- BREED -->
          <v-col cols="12" sm="6">
            <v-text-field
              :rules="rules.Check"
              color="cyan darken-1"
              :value="item.Breed"
              label="Breed"
              readonly
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <p class="font-weight-medium">Medical Records Information</p>
        <v-row>
          <!-- DESCRIPTION -->
          <v-col cols="12">
              <v-textarea
                v-model="form.Description"
                :rules="rules.Check"
                color="cyan darken-1"
                prepend-icon="mdi-clipboard-text-outline"
                outlined
              >
                <template v-slot:label>
                  <div>
                    Description <small>(required)</small>
                  </div>
                </template>
              </v-textarea>
          </v-col>
          <!-- DIAGNOSE -->
          <v-col cols="12">
              <v-textarea
                v-model="form.Diagnose"
                :rules="rules.Check"
                color="cyan darken-1"
                prepend-icon="mdi-clipboard-pulse-outline"
                outlined
              >
                <template v-slot:label>
                  <div>
                    Diagnosis <small>(required)</small>
                  </div>
                </template>
              </v-textarea>
          </v-col>
          <!-- HOSPITAL NAME -->
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.Hospital_name"
              :rules="rules.Check"
              color="cyan darken-1"
              label="Hospital Name"
              prepend-icon="mdi-hospital-building"
              required
              outlined
            ></v-text-field>
          </v-col>
          <!-- VETERINARIAN -->
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.Vet_name"
              :rules="rules.Check"
              color="cyan darken-1"
              label="Veterinarian"
              prepend-icon="mdi-account-tie-outline"
              required
              outlined
            ></v-text-field>
          </v-col>
          <!-- LICENSE -->
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.License_no"
              :rules="rules.Check"
              color="cyan darken-1"
              label="License no."
              prepend-icon="mdi-account-card-details-outline"
              required
              outlined
            ></v-text-field>
          </v-col>
          <!-- DATE -->
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
                    v-model="form.Date"
                    color="cyan darken-1"
                    outlined
                    label="Date"
                    prepend-icon="mdi-calendar-heart"
                    readonly
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker color="cyan darken-1" v-model="form.Date" @input="menu2 = false"></v-date-picker>
            </v-menu>
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

export default {
    data () {
    const defaultForm = Object.freeze ({
        PetID: '',
        Date: new Date().toISOString().substr(0, 10),
        Description: '',
        Diagnose:'',
        Hospital_name: '',
        License_no:'',
        Vet_name:'',
        menu2: false
    })
    return {
      form: Object.assign({}, defaultForm),
      rules: {
        Type: [val => (val || '').length > 0 || 'This field is required'],
        Check: [val => (val || '').length > 0 || 'This field is required'],
      },
      menu2: false,
      snackbar: false,
      medinfo: [],
      Petid: [],
      petinfo: [],
      defaultForm
    }
    },

    computed: {
        formIsValid () {
            return (
            this.form.Description &&
            this.form.Diagnose &&
            this.form.Hospital_name &&
            this.form.License_no &&
            this.form.Vet_name
            )
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
        this.Petid = p
        this.Medrec(p)
        console.log(this.Medrec(p))
        console.log(this.petinfo)
      })
      .catch(error => {
        console.log(error)
      });

    },

    methods: {
        resetForm() {
            this.form = Object.assign({}, this.defaultForm)
            this.$refs.form.reset()
        },

        Medrec(p) {
            // const uid = firebase.auth().currentUser.uid;
            console.log(p)
            axios
            .get('https://skilled-array-252503.appspot.com/allmedicals/'+p)
            .then(response => {
                this.medinfo = response.data
                this.loading = false
                console.log(this.medinfo)
            })
            .catch(error => {
                console.log(error)
            })
        },

        submit() {
            this.snackbar = true
            //this.$router.push({name:'vetscard'}).catch();
            // const uid = firebase.auth().currentUser.uid;
            console.log('INSERTED')
            //console.log(uid)
            //console.log(this.uuid)
            axios.post('https://skilled-array-252503.appspot.com/register/medical' ,{
                "Date": this.form.Date,
                "Description": this.form.Description,
                "Diagnose": this.form.Diagnose,
                "Hospital_name": this.form.Hospital_name,
                "License_no": this.form.License_no,
                "PetID": this.Petid,
                "Vet_name": this.form.Vet_name
            })
            .then(response => {
                this.pet = response.data;
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            });  
            //this.resetForm()          
        }
    }
};
</script>