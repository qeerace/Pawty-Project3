<template>
  <v-container id="dropdown-example">
    <v-row>
      <v-col cols="12" sm="4">
        <p>Overflow</p>

        <v-overflow-btn
          class="my-2"
          :items="dropdown_font"
          label="Overflow Btn"
          target="#dropdown-example"
        ></v-overflow-btn>
      </v-col>
      
    </v-row>
  </v-container>
</template>