<template>
  <v-container>
      <v-responsive :aspect-ratio="16/9">
      <v-navigation-drawer>
        <navBartype />
      </v-navigation-drawer>
      <v-content>
        <ListsPlaces />
      </v-content>
      </v-responsive>

  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import ListsPlaces from "../ListsPlaces.vue";
import navBartype from "../navBartype.vue";

export default {
    props:['typePlace'],
  name: "type",
  components: {
    // HelloWorld,
   ListsPlaces,
   navBartype
  }
};
</script>
