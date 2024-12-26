<template>
    <v-app>
        <v-main style="background-color: #F5F1E3;">
            <v-container>
                <v-card class="mx-auto" max-width="400" width="100%">

                    <v-card-title class="text-h5 font-weight-bold text-center" style="color: #1A3E45; font-size: large;">
                        Restablecer Contraseña
                    </v-card-title>

                    <v-card-text class="reset_password_card">
                        <v-sheet class="mx-auto" width="300">
                            <p class="text-center mb-4" style="color: #555;">
                                Ingresa tu nueva contraseña y confírmala para completar el proceso.
                            </p>

                            <!-- Formulario -->
                            <v-form @submit.prevent="handleReset">
                                <v-text-field v-model="password" :rules="passwordRules" variant="underlined"
                                    label="Nueva Contraseña" type="password"></v-text-field>

                                <v-text-field v-model="confirmPassword" :rules="confirmPasswordRules" variant="underlined"
                                    label="Confirmar Contraseña" type="password"></v-text-field>

                                <v-btn class="submit_button mt-4" type="submit" block
                                    aria-label="Restablecer contraseña">
                                    Restablecer
                                </v-btn>
                            </v-form>

                            <p class="mt-4 text-center return-text" style="cursor: pointer;" @click="returnToLogin">
                                Volver al inicio de sesión
                            </p>
                        </v-sheet>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Variables reactivas para las contraseñas
let password = ref('');
let confirmPassword = ref('');

// Reglas de validación para las contraseñas
let passwordRules = [
    value => !!value || 'La contraseña es obligatoria',
    value => value.length >= 6 || 'La contraseña debe tener al menos 6 caracteres'
];

let confirmPasswordRules = [
    value => !!value || 'Por favor, confirma tu contraseña',
    value => value === password.value || 'Las contraseñas no coinciden'
];

// Función para manejar el restablecimiento de la contraseña
const handleReset = () => {
    if (password.value === confirmPassword.value) {
        alert('Tu contraseña ha sido restablecida con éxito.');
        // Aquí iría una petición al backend para actualizar la contraseña.
        router.push('/'); // Redirige a la pantalla principal de inicio de sesión
    }
};

// Función para volver a la pantalla de inicio de sesión
const returnToLogin = () => {
    router.push('/'); // Redirige a la pantalla principal de inicio de sesión
};
</script>

<style scoped>
.v-main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #F5F1E3, #f9f0cd); /* Degradado */
    padding: 16px;
    box-sizing: border-box;
}

.v-card {
    border-radius: 10px;
}

.v-card-title {
    margin-top: 30px;
}

.reset_password_card {
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

.return-text {
    color: #1A3E45;
    text-decoration: underline;
    transition: color 0.3s;
}

.return-text:hover {
    color: #0C2D33;
}
</style>
