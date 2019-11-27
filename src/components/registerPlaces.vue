<template>
  <div>
    <v-card>
      <v-responsive :aspect-ratio="16/9">
        <v-card-text>

            <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      absolute
      top
      right
      color="success"
    >
      <span>Registration successful!</span>
      <v-icon dark>mdi-checkbox-marked-circle</v-icon>
    </v-snackbar>

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
        md8
      >
        <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      color="orange"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>

        <v-textarea
          v-model="address"
          :error-messages="addressErrors"
          color="orange"
          label="Address"
          required
          @input="$v.address.$touch()"
          @blur="$v.address.$touch()"
        ></v-textarea>

    <!-- <v-text-field
      v-model="address"
      :error-messages="addressErrors"
      
      label="Address"
      required
      @input="$v.address.$touch()"
      @blur="$v.address.$touch()"
    ></v-text-field> -->

    <v-text-field
      v-model="latitude"
      :error-messages="latErrors"
      color="orange"
      label="Latitude"
      required
      @input="$v.latitude.$touch()"
      @blur="$v.latitude.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="longitude"
      :error-messages="lonErrors"
      color="orange"
      label="Longitude"
      required
      @input="$v.longitude.$touch()"
      @blur="$v.longitude.$touch()"
    ></v-text-field>

    <v-select
      v-model="rating"
      :items="rate"
      :error-messages="rateErrors"
      label="Rating"
      color="orange"
      required
      @change="$v.rating.$touch()"
      @blur="$v.rating.$touch()"
    ></v-select>

    <!-- clock  and open time -->
<v-row>
    <v-col cols="11" sm="5">
      <v-dialog
        ref="dialogg"
        v-model="modal2"
        :return-value.sync="opentime"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="opentime"
            color="orange"
            label="Choose Open Time"
            prepend-icon="mdi-clock-outline"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="modal2"
          v-model="opentime"
          color="orange lighten-1"
          ampm-in-title
          full-width
        >
          <v-spacer></v-spacer>
          <v-btn text color="orange" @click="modal2 = false">Cancel</v-btn>
          <v-btn text color="orange" @click="$refs.dialogg.save(opentime)">OK</v-btn>
        </v-time-picker>
      </v-dialog>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="11" sm="5">
      <v-dialog
        ref="dialog2"
        v-model="modal3"
        :return-value.sync="closetime"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="closetime"
            color="orange"
            label="Choose Close Time"
            prepend-icon="mdi-clock-outline"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="modal3"
          v-model="closetime"
          color="orange lighten-1"
          ampm-in-title
          full-width
        >
          <v-spacer></v-spacer>
          <v-btn text color="orange" @click="modal3 = false">Cancel</v-btn>
          <v-btn text color="orange" @click="$refs.dialog2.save(closetime)">OK</v-btn>
        </v-time-picker>
      </v-dialog>
    </v-col>
  </v-row>
  
    <!-- <v-text-field
      v-model="opentime"
      :error-messages="openErrors"
      
      label="Open / Close time"
      required
      
      @input="$v.opentime.$touch()"
      @blur="$v.opentime.$touch()"
    ></v-text-field> -->

    <v-text-field
      v-model="phone"
      :error-messages="phoneErrors"
      color="orange"
      label="Phone Number"
      required
      @input="$v.phone.$touch()"
      @blur="$v.phone.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="price"
      :error-messages="priceErrors"
      color="orange"
      label="Pricings"
      required
      suffix="THB"
      @input="$v.price.$touch()"
      @blur="$v.price.$touch()"
    ></v-text-field>

    <!-- <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field> -->

    <v-select
      v-model="select"
      :items="items"
      :error-messages="selectErrors"
      label="Type"
      color="orange"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>
    <h2> Insert Image or URL Image </h2>
    <br>
    <v-text-field outlined dense
      v-model="URL"
      color="orange"
      :error-messages="urlErrors"
      prepend-icon="mdi-camera"
      label="Image URL"
      @input="$v.URL.$touch()"
      @blur="$v.URL.$touch()"
    ></v-text-field>

<!-- insert photo here -->
    <v-file-input
    v-model="files"
    color="orange"
    counter
    label="File input"
    multiple
    placeholder="Select your files"
    prepend-icon="mdi-paperclip"
    outlined
    :show-size="1000"
  >
    <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        color="orange"
        dark
        label
        small
      >
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="overline grey--text text--darken-3 mx-2"
      >
        +{{ files.length - 2 }} File(s)
      </span>
    </template>
  </v-file-input>

    <v-checkbox
      v-model="checkbox"
      color="orange"
      :error-messages="checkboxErrors"
      label="Do you agree to register this form?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
      
    ></v-checkbox>
    <br>
    <v-btn class="mr-4" @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
        
      </v-flex>
    </v-layout>
  </v-container> 
        </v-card-text>
      </v-responsive>
    </v-card>
  </div>
</template>

<script>

import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email, decimal, numeric, integer } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(30) },
      address:{ required, maxLength: maxLength(200) },
      latitude:{ required, decimal },
      longitude:{ required, decimal },
      opentime: { required },
      phone: {required, integer, minLength: minLength(9)},
      price:{ required, numeric},
      email: { required, email },
      rating:{ required },
      URL:{ required },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
      name: '',
      address: '',
      latitude: '',
      longitude:'',
      rating:null,
      opentime: null,
      closetime: null,
      modal2: false,
      modal3: false,
      //opentime:'',
      phone: '',
      price: '',
      URL:'',
      //email: '',
      select: null,
      rate:[
          "0","0.5",
          "1.0","1.5",
          "2.0","2.5",
          "3.0","3.5",
          "4.0","4.5",
          "5.0",
      ],
      items: [
        'Pet Shop',
        'Pet Hospital',
        'Pet Grooming',
        'Pet Hotel',
        'Pet Cafe',
        'Pet Restaurant'
      ],

      checkbox: false,
      files: [],
      //timeout: 3000,
    })
    ,

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 30 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      addressErrors(){
        const errors = []
        if (!this.$v.address.$dirty) return errors
        //!this.$v.address.minLength && errors.push('Address must be at least '+ minLength.length+ ' characters long')
        !this.$v.address.required && errors.push('Address is required.')
        return errors  
      },
      latErrors () {
        const errors = []
        if (!this.$v.latitude.$dirty) return errors
        //!this.$v.latitude.minLength && errors.push('Latitude must be at least '+ minLength.length +' characters long')
        !this.$v.latitude.required && errors.push('Latitude is required.')
        !this.$v.latitude.decimal && errors.push('Latitude must be decimal.')
        return errors
      },
      lonErrors () {
        const errors = []
        if (!this.$v.longitude.$dirty) return errors
        //!this.$v.longitude.minLength && errors.push('Longitude must be at least 5 characters long')
        !this.$v.longitude.required && errors.push('Longitude is required.')
        !this.$v.longitude.decimal && errors.push('Longitude must be decimal.')
        return errors
      },
      rateErrors () {
        const errors = []
        if (!this.$v.rating.$dirty) return errors
        !this.$v.rating.required && errors.push('Rating is required')
        return errors
      },
      openErrors () {
        const errors = []
        if (!this.$v.opentime.$dirty) return errors
        //!this.$v.opentime.minLength && errors.push('Must be at least '+ minLength.length +' characters long')
        !this.$v.opentime.required && errors.push('Field is required.')
        //!this.$v.opentime.integer && errors.push('Field must be numbers.')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.phone.$dirty) return errors
        !this.$v.phone.minLength && errors.push("Phone must be 9 or 10 numbers.")
        !this.$v.phone.required && errors.push("Phone number is required. <br>If there is not, put ' - ' in this field.")
        !this.$v.phone.integer && errors.push('Phone must be numbers.')
        return errors
      },
      priceErrors () {
        const errors = []
        if (!this.$v.price.$dirty) return errors
        //!this.$v.price.minLength && errors.push('Price must be at least  characters long')
        !this.$v.price.required && errors.push('Price is required.')
        !this.$v.price.numeric && errors.push('Price must be numbers.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Type is required')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
        this.snackbar = true
        axios.post('https://skilled-array-252503.appspot.com/registerplaces/', {

      "placesName":(this.name),
      "Latitude":(this.latitude),
      "Longitude":(this.longitude),
      "placesRating":(this.rating),
      "Address":(this.address),
      "Telephone":(this.phone),
      "Opentime":(this.opentime),
      "Closetime":(this.closetime),
      "Pricing":(this.price),
      "Type":(this.select),
      "URLimage":(this.URL)

    }).then(response => {
      this.wholePlace = response.data;
      console.log(response);
    })
    .catch(error => {
      console.log(error)
      })
    },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.latitude = ''
        this.longitude = ''
        this.rating = null
        this.address = ''
        this.phone = ''
        this.opentime = null
        this.closetime = null
        this.price = ''
        this.select = ''
        this.URL = ''
        this.select = null
        this.checkbox = false
      },
    }
  }
</script>
