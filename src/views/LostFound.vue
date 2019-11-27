<template>
  <div>
    <!-- <v-img dark height="470" src="../assets/saddog.jpg" aspect-ratio="1" class="grey lighten-2">
      <p class="text-center display-2 blue-grey--text text--darken-2" style="margin-top: 150px;">Center aligned text on all viewport sizes.</p>
    </v-img>-->
    <Carousels />
    <Card />
    <FilterLost />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Card from "@/components/home/Card.vue";
import FilterLost from "@/components/home/FilterLost.vue";
import Carousels from "@/components/Carousels.vue";


export default {
  name: "home",
  components: {
    // HelloWorld,
    Card,
    FilterLost,
    // Footer
    Carousels
  },
  data() {
    return {
      
    };
  }
};
</script>
<style>
  /* This is for documentation purposes and will not be needed in your application */
  #lateral .v-btn--example {
    bottom: 0;
    position: absolute;
    margin: 0 0 16px 16px;
  }
</style>