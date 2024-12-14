<template>
    <v-app>
        <v-main style="background-color: #F5F1E3;">
            <v-container>
                <v-card class="mx-auto" max-width="400" width="100%">

                    <v-card-title class="text-h5 font-weight-bold text-center" style="color: #1A3E45" font-size: large>
                        Recuperar Contraseña
                    </v-card-title>

                    <v-card-text class="forgot_password_card">
                        <v-sheet class="mx-auto" width="300">
                            <p class="text-center mb-4" style="color: #555;">
                                Ingresa tu correo electrónico para restablecer tu contraseña.
                            </p>

                            <!-- Formulario -->
                            <v-form @submit.prevent="handleRecover">
                                <v-text-field v-model="email" :rules="emailRules" variant="underlined"
                                    label="Correo Electrónico" type="email"></v-text-field>

                                <v-btn class="submit_button mt-4" type="submit" block
                                    aria-label="Enviar correo de recuperación">
                                    Enviar
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

// Variable reactiva para el correo electrónico
let email = ref('');

// Reglas de validación para el campo de correo
let emailRules = [
    value => {
        if (value && /.+@.+\..+/.test(value)) {
            return true;
        }
        return 'Por favor, introduce un correo válido';
    }
];

// Función para manejar el envío del formulario
const handleRecover = () => {
    alert(`Se ha enviado un correo a ${email.value} para restablecer tu contraseña.`);
    // Aquí iría una petición al backend para enviar el correo de recuperación.
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

.v-card-title{
    margin-top: 30px;
}

.forgot_password_card {
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
