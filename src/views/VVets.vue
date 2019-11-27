<template>
  <div class="vetscard">
    <VetCard />
  </div>
</template>

<script>
// @ is an alias to /src
import VetCard from "@/components/VetCard.vue";

export default {
  name: "vetscard",
  components: {
    VetCard
  }
};
</script>
