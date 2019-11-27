<template>
  <div class="petcard">
    <PetCard />
  </div>
</template>

<script>
// @ is an alias to /src
import PetCard from "@/components/PetCard.vue";

export default {
  name: "petcard",
  components: {
    PetCard
  }
};
</script>
