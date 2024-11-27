<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer v-model="drawer" temporary>
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
                    title="John Leider"></v-list-item>

                <v-divider></v-divider>

                <v-list density="compact" nav>
                    <RouterLink to="/">
                        <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
                    </RouterLink>
                    <RouterLink to="/about">
                        <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
                    </RouterLink>
                </v-list>
            </v-navigation-drawer>
            <v-main style="height: 250px">
                <div class="d-flex justify-center align-center h-100">
                    <v-btn color="primary" @click.stop="drawer = !drawer">
                        Toggle
                    </v-btn>
                    <slot id="main-content"></slot>
                </div>
            </v-main>
        </v-layout>
    </v-card>
    <RouterView />
</template>


<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
// Define the state for the drawer
const drawer = ref(false);

</script>

<style scoped>
a {
    text-decoration: none;
    color: gray
}
</style>