<template>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.2/vue.min.js"></script>
  <div>
    First Name:
    <input type="text" v-model="user.firstName" :disabled="!isEditing"
           :class="{view: !isEditing}">
  </div><div>
    Last Name:
    <input type="text" v-model="user.lastName" :disabled="!isEditing"
           :class="{view: !isEditing}">  
  </div>
  <button @click="isEditing = !isEditing" v-if="!isEditing">Edit</button>
  <button @click="save" v-else-if="isEditing">Save</button>
  
</template>

<script>
export default {
  data: {
      isEditing: false,
      user: {
      firstName: 'John',
      lastName: 'Smith'
    }
  },
  mounted() {
    this.cachedUser = Object.assign({}, this.user);
  },
  methods: {
    save() {
      this.cachedUser = Object.assign({}, this.user);
      this.isEditing = false;
    },
    cancel() {
      this.user = Object.assign({}, this.cachedUser);
      this.isEditing = false;
    }
  }
}
</script>
<style>
.view {
  border-color: transparent;
  background-color: initial;
  color: initial
}
</style>