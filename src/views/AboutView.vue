<template>

    

      <div class="about">
        <h1>This is an about page</h1>
        <v-row justify="space-around">
          <v-icon color="green-darken-2" icon="mdi-domain" size="large"></v-icon>

          <v-icon color="blue-darken-2" icon="mdi-message-text" size="large"></v-icon>

          <v-icon color="purple-darken-2" icon="mdi-dialpad" size="large"></v-icon>

          <v-icon color="teal-darken-2" icon="mdi-email" size="large"></v-icon>

          <v-icon color="blue-grey-darken-2" icon="mdi-call-split" size="large"></v-icon>

          <v-icon color="orange-darken-2" icon="mdi-arrow-up-bold-box-outline" size="large"></v-icon>
        </v-row>
      </div>

    


</template>

<script setup>


</script>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
