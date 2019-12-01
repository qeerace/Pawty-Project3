<template>
  <div class="qrcode">
    <GenQrCode />
  </div>
</template>

<script>
// @ is an alias to /src
import GenQrCode from "@/components/Petcardqr.vue";

export default {
  name: "qrcode",
  components: {
    GenQrCode
  }
};
</script>