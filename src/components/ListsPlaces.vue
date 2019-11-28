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
 
    <div class="grid-x companies-header">
  <div class="large-3 medium-3 cell sortable-header" v-on:click="resortCafes('name')">
    Company
    <img class="sort-icon" src="/img/sort-asc.svg" v-show="sortBy == 'name' && sortDirection == 'ASC'"/>
    <img class="sort-icon" src="/img/sort-desc.svg" v-show="sortBy == 'name' && sortDirection == 'DESC'"/>
  </div>
  <div class="large-5 medium-5 cell">
    Website
  </div>
  <div class="large-2 medium-2 cell sortable-header" v-on:click="resortCafes('cafes')">
    Cafes
    <img class="sort-icon" src="/img/sort-asc.svg" v-show="sortBy == 'cafes' && sortDirection == 'ASC'"/>
    <img class="sort-icon" src="/img/sort-desc.svg" v-show="sortBy == 'cafes' && sortDirection == 'DESC'"/>
  </div>
  <div class="large-2 medium-2 cell sortable-header" v-on:click="resortCafes('pending-actions')">
    Actions Pending
    <img class="sort-icon" src="/img/sort-asc.svg" v-show="sortBy == 'pending-actions' && sortDirection == 'ASC'"/>
    <img class="sort-icon" src="/img/sort-desc.svg" v-show="sortBy == 'pending-actions' && sortDirection == 'DESC'"/>
  </div>
</div>

<img class="sort-icon" src="/img/sort-asc.svg" v-show="sortBy == 'pending-actions' && sortDirection == 'ASC'"/>
<img class="sort-icon" src="/img/sort-desc.svg" v-show="sortBy == 'pending-actions' && sortDirection == 'DESC'"/>

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
            :value="item.placesRating"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
          
          <div class="grey--text ml-4">{{item.placesRating}} (40)</div>
          
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
    // .catch(error => {
    //   console.log(error)
    // })
  },
  methods: {
    placeDetails (id) {
      this.$router.push('/petservices/place/' + id)
    },
      /* Re-sorts the cafes by what was selected. */
    resortCafes( by ){
      /*
        Checks to see if what the user selected to sort by
        is the same as it's been. If it is, then we toggle the
        direction.
      */
      if( by == this.sortBy ){
        if( this.sortDirection == 'ASC' ){
          this.sortDirection = 'DESC';
        }else{
          this.sortDirection = 'ASC';
        }
      }
      /*
        If the sort by is different we set the sort by to what the
        user selected and defualt the direction to 'ASC'
      */
      if( by != this.sortBy ){
        this.sortDirection = 'ASC';
        this.sortBy = by;
      }

      /*
        Switch by what the sort by is set to, and run the method
        to sort by that column.
      */
      switch( this.sortBy ){
        case 'name':
          this.sortPlacesByName();
        break;
        case 'cafes':
          this.sortPlaceByCafes();
        break;
        case 'pending-actions':
          this.sortPlacesByPendingActions();
        break;
      }  
    },
    /* Sorts the companies by name. */
    sortPlacesByName(){
      this.wholeResponse.sort( function( a, b ){
        if( this.sortDirection == 'ASC' ){
          return ( ( a.placesName == b.placesName ) ? 0 : ( ( a.placesName > b.placesName ) ? 1 : -1 ) );
        }

        if( this.sortDirection == 'DESC' ){
          return ( ( a.placesName == b.placesName) ? 0 : ( ( a.placesName < b.placesName ) ? 1 : -1 ) );
        }
      }.bind(this));
    },
      /*Sorts the companies by cafe count.*/
      sortPlacesByCafes(){
        this.wholeResponse.sort( function( a, b ){
          if( this.sortDirection == 'ASC' ){
            return parseInt( a.cafes_count ) < parseInt( b.cafes_count ) ? 1 : -1;
          }

          if( this.sortDirection == 'DESC' ){
            return parseInt( a.cafes_count ) > parseInt( b.cafes_count ) ? 1 : -1;
          }
        }.bind(this));
      },
      /* Sorts the companies by pending actions */
    sortPlacesByPendingActions(){
      this.companies.sort( function( a, b ){
        if( this.sortDirection == 'ASC' ){
          return parseInt( a.actions_count ) < parseInt( b.actions_count ) ? 1 : -1;
        }

        if( this.sortDirection == 'DESC' ){
          return parseInt( a.actions_count ) > parseInt( b.actions_count ) ? 1 : -1;
        }
      }.bind(this));
    }
    
  }
}
</script>
