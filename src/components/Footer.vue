<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="teal">
        <strong class="subheading">Are you Pet Service Owner? - Register your service and Join us  </strong>

        <v-btn text to="/petservices/admin/register">Here!</v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} —
        <strong>Pawty CIE</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>