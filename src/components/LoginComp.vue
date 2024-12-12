<template>
    <v-app>
        <v-main style="background-color: #F5F1E3;">
            <v-container>
                <v-card class="mx-auto" prepend-icon="$vuetify" max-width="400" width="100%">
                    <template v-slot:title>
                        <span class="font-weight-black">Fauna Viva</span>
                    </template>
                    <v-card-text class="login_card">

                        <v-sheet class="mx-auto" width="300">
                            <v-form fast-fail @submit.prevent="handleSubmit">
                                <v-text-field v-model="firstName" :rules="firstNameRules" variant="underlined"
                                    label="First name"></v-text-field>

                                <v-text-field v-model="password" :rules="firstNameRules" variant="underlined"
                                    label="Password" type="password"></v-text-field>

                                <br>

                                <v-btn class="submit_button mt-2" type="submit" block tabindex="0"
                                    aria-label="Submit your details">
                                    Submit
                                </v-btn>
                            </v-form>
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

let firstName = ref('');
let password = ref('');

let firstNameRules = [
    value => {
        if (value?.length >= 4) {
            return true;
        }
        return 'Must be at least 4 characters.';
    }
];

const handleSubmit = () => {
    if (firstName.value === 'Pepe' && password.value === '1234') {
        // Simulación de autenticación exitosa
        // En un escenario real, aquí harías una petición a tu servidor
        // para verificar las credenciales
        simulateLogin();
    } else {
        // Maneja el caso de credenciales incorrectas (opcional)
        alert('Credenciales incorrectas');
    }
};


const simulateLogin = () => {

    /*
     simulateLogin: Esta función simula el inicio de sesión exitoso.
     En una aplicación real, aquí harías una petición al servidor para autenticar al usuario y obtener un token. 
     Por simplicidad, se almacena un token simulado en localStorage.
    */

    // Simula el guardado del token en el localStorage (en una app real, esto vendría del servidor)
    localStorage.setItem('token', 'simulated-token');
    router.push('/'); // Redirige a la ruta "/"
};


</script>


<style scoped>
.v-form {
    padding-bottom: 10%;
}

.v-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f1e3;
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
