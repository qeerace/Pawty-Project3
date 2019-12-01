<template>
  <v-container v-if="loading">
    <v-row justify="center" align="center">
      <div class="text-xs-center">
        <v-progress-circular indeterminate :size="150" :width="8" color="amber"></v-progress-circular>
      </div>
    </v-row>
  </v-container>

  <v-container v-else grid-list-xl>
    <v-card class="mx-auto">
      <v-row justify="center">
        <v-col cols="12" >
          <div class="text-center">
            <v-btn
              v-model="type"
              value="PetShop"
              color="inverse"
              name="PetShop"
              text
              @click="postType"
            >Pet Shop</v-btn>

            <v-divider inset vertical></v-divider>

            <v-btn v-model="type" color="inverse" name="PetHotel" text @click="postType">Pet Hotel</v-btn>

            <v-divider inset vertical></v-divider>

            <v-btn
              v-model="type"
              color="inverse"
              name="PetHospital"
              text
              @click="postType"
            >Pet Hospital</v-btn>

            <v-divider inset vertical></v-divider>

            <v-btn v-model="type" color="inverse" name="PetCafe" text @click="postType">Pet Cafe</v-btn>

            <v-divider inset vertical></v-divider>

            <v-btn
              v-model="type"
              color="inverse"
              name="PetGrooming"
              text
              @click="postType"
            >Pet Grooming</v-btn>

            <v-divider inset vertical></v-divider>

            <v-btn
              v-model="PetResturant"
              color="inverse"
              name="PetRestaurant"
              text
              @click="postType"
            >
              Restaurant
              <br />( Pet Allowed )
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <v-container>
      <v-divider class="mx-1" inset></v-divider>

      <v-layout wrap>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="(item, index) in wholeResponse" :key="index" mb-2>
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card class="mx-auto" :loading="loading">
                <v-img class="align-end" height="200px" :src="item.URLimage"></v-img>

                <v-card-text>
                  <h4 class="title black--text">{{item.placesName}}</h4>
                  <br />
                  <p class="caption">{{item.Distance}} Kilometers away</p>
                  <v-row align="center" class="mx-0">
                    <v-rating
                      :value="item.avgRATE"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="14"
                    ></v-rating>
                    <div class="grey--text ml-4">({{item.avgRATE}})</div>
                  </v-row>
                </v-card-text>

                <v-fade-transition>
                  <v-overlay v-if="hover" absolute color="#FFE0B2">
                    <v-btn @click="placeDetails(item.ID)">See more info</v-btn>
                  </v-overlay>
                </v-fade-transition>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
import * as locationService from "../../services/location";
//import NProgress from 'nprogress'

export default {
  data: () => {
    return {
      wholeResponse: [],
      address: {},
      error: null,
      tab: null,
      // Make it possible to conditionally render
      // elements based on if the geolocation API
      // is availabel or not.
      geolocationSupported: "geolocation" in navigator,
      loading: false,
      overlay: false,
      type: ""
    };
  },
  mounted() {
    locationService
      .currentCoordinates()
      .then(coords =>
        axios
          .get(
            "https://skilled-array-252503.appspot.com/placesdist/?&lat=" +
              coords.latitude +
              "&long=" +
              coords.longitude
          )
          .then(response => {
            this.wholeResponse = response.data;
            this.wholeResponse.sort(function(a, b) {
              return a.Distance - b.Distance;
            });
            // console.log(this.wholeResponse);
          })
      )
      .catch(() => {
        this.loading(false);
      });
  },
  methods: {
    placeDetails(id) {
      this.$router.push("petservices/place/" + id);
    },
    //post lat,lon,type to API
    postType(event) {
      this.typePlace = event.currentTarget.name;
      // console.log(this.typePlace)
      locationService
        .currentCoordinates()
        .then(coords =>
          axios
            .post(
              "https://skilled-array-252503.appspot.com/placestype/?type=" +
                this.typePlace +
                "&lat=" +
                coords.latitude +
                "&long=" +
                coords.latitude
            )
            .then(response => {
              this.wholePlace = response.data;
            })
        )
        .catch(() => {
          // console.log(error)
        });
      this.$router.push("/petservices/" + this.typePlace);
    }
  }
};
</script>

<style lang="scss" scoped>
.my-span {
  background-color: blue;
  color: white;
  font-weight: bold;
  margin-right: 0;
  float: right;
}
</style>