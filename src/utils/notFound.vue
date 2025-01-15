<template>
    <v-app>
        <v-main style="background-color: #F5F1E3;">
            <v-container>
                <v-card class="mx-auto" max-width="400" width="100%">
                    <v-card-title class="text-center">
                        <img height="150px" src="../assets/logos/3.png" alt="Logo"></img>
                    </v-card-title>

                    <v-card-text class="login_card">
                        <v-sheet class="mx-auto" width="300">
                            <h2 class="text-center" style="color: #1A3E45;font-size: large;">PÁGINA NO ENCONTRADA</h2>
                            <v-btn class="submit_button mt-2"  @click="goHome" block>
                                Regresar al Inicio
                            </v-btn>
                        </v-sheet>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
    router.push('/'); // Redirigir página principal
};
</script>

<style scoped>
.v-main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #F5F1E3, #f9f0cd);
    padding: 16px;
    box-sizing: border-box;
}

.v-card {
    border-radius: 10px;
}

.login_card {
    background-color: white;
    padding: 10%;
    padding-top: 0%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.submit_button {
    background-color: #1A3E45;
    color: white;
    transition: background-color 0.3s ease;
}

.submit_button:hover {
    background-color: #142C33;
}

.v-sheet {
    border-radius: 10px;
}
</style>