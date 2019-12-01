<template>
<!-- <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-circular
        indeterminate
        :size="150"
        :width="8"
        color="green">
      </v-progress-circular>
    </div>
  </v-container> -->
  
<v-container>
  
  
  <v-row justify="center">
  
  <v-card-title>{{this.typePlace}}</v-card-title>
  <v-spacer></v-spacer>

  </v-row>
   <v-btn 
            @click="sortPrice()" 
            >Sort By Price</v-btn>
            <v-divider
        class="mx-1"
        inset
        vertical
      ></v-divider>
            <v-btn 
            @click="sortRate()" 
            >Sort By Rate</v-btn> 
            <v-divider
        class="mx-1"
        inset
        vertical
      ></v-divider>
            <v-btn 
            @click="sortName()" 
            >Sort By Name</v-btn> 
<v-divider
        class="mx-1"
        inset
      ></v-divider>
    <v-layout wrap>
      <v-flex xs4
      v-for="(item, index) in wholeResponse"
        :key="index"
        mb-2>
    <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        :loading="loading"
        class="mx-auto"
        max-width="374"
      >
        <v-img 
        
        height="200px"
        :src="item.URLimage"></v-img>

        <v-card-title>
          <h2 class="title black--text">{{item.placesName}}</h2>
        </v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>
          <v-row
        align="center"
        class="mx-0"
      >
          <v-rating
            :value="item.avgRATE"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
          
          <div class="grey--text ml-4">{{item.avgRATE}} (40)</div>
          
          <div class="my-4 subtitle-1 black--text">
        {{item.Pricing}}  ฿ • Thai,  {{item.Type}}
      </div>
      
      </v-row>
        </v-card-text>
        
          <v-fade-transition>
          <v-overlay
            v-if="hover"
            absolute
            color="#FFE0B2"
          >
            <v-btn 
            @click="placeDetails(item.ID)" 
            >See more info</v-btn>
          </v-overlay>
        </v-fade-transition>
</v-card>
    </template>
  </v-hover>
      </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import * as locationService from '../services/location';

export default {
  props: ['typePlace'],
  data () {
    return {
      wholeResponse: [],
      sortResponse:[],
      address: {},
      error: null,
      // Make it possible to conditionally render
      // elements based on if the geolocation API
      // is availabel or not.
      geolocationSupported: 'geolocation' in navigator,
      loading: false,
      sortBy: 'name',
      sortDirection: 'ASC',
      search: '',
      ratingsAll:''
    }
  },
  mounted () {
    locationService.currentCoordinates().then(
   coords =>
  axios.get('https://skilled-array-252503.appspot.com/placestype/?type='+ this.typePlace +'&lat=' + coords.latitude + '&long=' + coords.longitude)
    .then(response => {
      this.wholeResponse = response.data
      // console.log(this.wholeResponse);
      this.loading =false
      //this.wholeResponse.sort(function(a, b){return a.year - b.year});
    }))
    .catch(() => {
      // console.log(error)
    })
  },
  methods: {
    placeDetails (id) {
      this.$router.push('/petservices/place/' + id)
    },
    sortPrice () {
      this.wholeResponse.sort(function(a, b){
        return a.Pricing - b.Pricing;});
    },
    sortRate () {
      this.wholeResponse.sort(function(a, b){
        return a.placesRating - b.placesRating;});
    },
    sortName () {
      this.wholeResponse.sort(function(a, b){
        return a.placesName < b.placesName ? -1 : a.placesName > b.placesName ? 1 : 0;});
    }
  }
}
</script>
