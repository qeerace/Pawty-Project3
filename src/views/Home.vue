<template>
  <div>
    <!-- <v-img dark height="470" src="../assets/saddog.jpg" aspect-ratio="1" class="grey lighten-2">
      <p class="text-center display-2 blue-grey--text text--darken-2" style="margin-top: 150px;">Center aligned text on all viewport sizes.</p>
    </v-img> -->
    <Carousels />
    <Cover />
    <Footer />
    <!-- <FilterLost /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Cover from "@/components/home/Cover.vue";
// import FilterLost from "@/components/home/FilterLost.vue";
import Footer from "@/components/Footer.vue";
import Carousels from "@/components/Carousels.vue";



export default {
  name: "home",
  components: {
    // HelloWorld,
    Cover,
    // FilterLost
    Footer,
    Carousels
  },
  data () {
      return {
     
      }
    }
  
};
</script>
