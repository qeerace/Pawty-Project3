<template>
  <div>
    <v-dialog v-model="loading" overlay-opacity="0.7" overlay-color="black" persistent width="300">
      <v-card dark>
        <v-card-text>
          Loading
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-container v-if="loading == false && wholeResponse.length > 0">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="(item, index) in wholeResponse" :key="index">
          <v-card>
            <v-img :src="item.pic_url" aspect-ratio="1" max-height="250px">
              <span class="my-span">
                {{ item.post_type }}
                {{ item.pet_type }}
              </span>
            </v-img>
            <v-card-title class="title font-weight-black blue-grey--text text--darken-3">
              <h4 v-line-clamp="1">{{ item.topic }}</h4>
            </v-card-title>
            <v-card-subtitle pb-0>
              <v-list-item class="grow">
                <v-row align="center" justify="start">
                  <v-icon medium color="yellow darken-3">mdi-gender-male-female</v-icon>
                  <div class="subheading mr-2 blue-grey--text text--darken-3">{{ item.gender }}</div>
                </v-row>
                <v-row align="center" justify="end">
                  <v-icon medium color="yellow darken-3">mdi-map-marker</v-icon>
                  <div class="subheading mr-2 blue-grey--text text--darken-3">{{ item.province }}</div>
                </v-row>
              </v-list-item>
              <div>{{item.post_type}} Date: {{ item.missing_found_date }}</div>
            </v-card-subtitle>
            <!-- <v-card-text class="blue-grey--text text--darken-3">
              <div>{{item.missing_found_date}}</div>
            </v-card-text>-->

            <v-card-actions class="justify-center">
              <v-btn
                class="mx-0 subtitle-2 font-italic font-weight-medium amber--text text--lighten-5"
                color="yellow darken-3"
                :to="'/detail/' + item.id"
              >More Detail</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row style="margin-bottom:30px;">
        <v-col cols="12">
          <v-pagination
            color="yellow darken-3"
            ref="pagination"
            v-model="currentPage"
            :length="pageCount"
            :total-visible="9"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else-if="loading == false && wholeResponse.length == 0">
      <v-row justify="center">
        <div>No records found</div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      wholeResponse: [],
      loading: true,
      loading2: true,
      pageCount: 1,
      currentPage: 1
    };
  },
  mounted() {
    axios
      .get("/lost-found-pets")
      .then(response => {
        this.wholeResponse = response.data.records;
        this.currentPage = response.data.page;
        this.pageCount = response.data.page_count;
        this.loading = false;
      })
      .catch(() => {
      //   console.log(error);
      });
  },
  methods: {
    fetchData() {
      this.loading = true;
      axios
        .get("/lost-found-pets", {
          params: {
            post_type: this.getFilterType.join(),
            gender: this.getFilterGender.join(),
            province: this.getFilterProvince.join(),
            page: "1"
          }
        })
        .then(response => {
          this.wholeResponse = response.data.records;
          this.totalPage = response.data.page_count;
          this.loading = false;
        })
        // .catch(error => {
        //   console.log(error);
        // });
    }
  },
  computed: {
    ...mapGetters(["getFilterType", "getFilterGender", "getFilterProvince"])
  },
  watch: {
    currentPage() {
      this.fetchData();
    },
    getFilterType() {
      this.fetchData();
    },
    getFilterGender() {
      this.fetchData();
    },
    getFilterProvince() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
.my-span {
  background-color: #f9a825;
  color: white;
  font-weight: bold;
  margin-right: 0;
  float: right;
}
</style>
