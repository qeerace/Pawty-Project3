<template>
  <div>
    <!-- <v-img dark height="470" src="../assets/saddog.jpg" aspect-ratio="1" class="grey lighten-2">
      <p class="text-center display-2 blue-grey--text text--darken-2" style="margin-top: 150px;">Center aligned text on all viewport sizes.</p>
    </v-img>-->
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
      :hide-delimiters="true"
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">{{ slide }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <Card />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";


export default {
  name: "home",
  components: {
    // HelloWorld,

    // Footer
  },
  data() {
    return {
      colors: ["indigo", "warning", "pink darken-2"],
      slides: ["Get Your Pet ID", "Search for Your Favourite Pet Services", "Report Lost or Found Pet"]
    };
  }
};
</script>
