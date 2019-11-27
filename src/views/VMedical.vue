<template>
  <div class="medrecs">
    <MedicalRecs />
  </div>
</template>

<script>
// @ is an alias to /src
import MedicalRecs from "@/components/MedicalRecs.vue";

export default {
  name: "medrecs",
  components: {
    MedicalRecs
  }
};
</script>
