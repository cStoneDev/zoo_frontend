<template>
    <v-app>
        <v-main style="background-color: #F5F1E3; ">
            <v-container>
                <v-card class="mx-auto" max-width="400" width="100%">

                    <v-card-title class="text-center">
                        <img height="150px" src="../assets/logos/3.png"></img>
                    </v-card-title>
                    <v-card-title class="text-h4 font-weight-bold text-center" style="color: #1A3E45" font-size: large>
                        Fauna Viva
                    </v-card-title>

                    <v-card-text class="login_card">

                        <v-sheet class="mx-auto" width="300">
                            <v-form fast-fail @submit.prevent="handleSubmit">
                                <v-text-field prepend-inner-icon="mdi-account" v-model="firstName"
                                    :rules="firstNameRules" variant="underlined" label="Usuario">
                                </v-text-field>

                                <v-text-field prepend-inner-icon="mdi-lock-outline"
                                    :type="visible ? 'text' : 'password'"
                                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" v-model="password"
                                    :rules="passwordRules" variant="underlined" label="Contraseña"
                                    @click:append-inner="visible = !visible">
                                </v-text-field>

                                <br>

                                <v-btn class="submit_button mt-2" type="submit" block tabindex="0"
                                    aria-label="Submit your details">
                                    Iniciar Sesión
                                </v-btn>
                            </v-form>

                            <p class="forgot-password" style="text-align: center; cursor: pointer;"
                                @click="router.push('/forgotPassword')">
                                Olvidé mi contraseña
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
import { useAuthStore } from '../stores/auth'

const router = useRouter();
const authStore = useAuthStore(); // Aquí invocas el store correctamente

let firstName = ref('');
let password = ref('');
const visible = ref(false);

let firstNameRules = [
  value => value?.length >= 3 || 'Debe tener al menos 3 caracteres',
  value => !!value || 'El nombre de usuario es obligatorio', 
];

let passwordRules = [
  value => value?.length >= 4 || 'La contraseña debe tener al menos 4 caracteres',
  value => !!value || 'La contraseña es obligatoria',
];

const form = ref(null);

const handleSubmit = async () => {
  // Verificación manual de las reglas
  const isFirstNameValid = firstNameRules.every(rule => rule(firstName.value) === true);
  const isPasswordValid = passwordRules.every(rule => rule(password.value) === true);

  // Si ambas reglas son correctas, hacemos la solicitud
  if (isFirstNameValid && isPasswordValid) {
    try {
      console.log(firstName.value, password.value);
      await authStore.login(firstName.value, password.value);

      // Redirigimos al dashboard si el login es exitoso
      router.push('/dashboard');
    } catch (error) {
      alert(error.message || 'Error en las credenciales');
    }
  } else {
    alert('Por favor, complete los campos correctamente');
  }
};
</script>

// const handleSubmit = () => {
// if (firstName.value === 'Pepe' && password.value === '1234') {
// // Simulación de autenticación exitosa
// // En un escenario real, aquí harías una petición a tu servidor
// // para verificar las credenciales
// simulateLogin();
// } else {
// // Maneja el caso de credenciales incorrectas (opcional)
// alert('Credenciales incorrectas');
// }
// };


// const simulateLogin = () => {

// /*
// simulateLogin: Esta función simula el inicio de sesión exitoso.
// En una aplicación real, aquí harías una petición al servidor para autenticar al usuario y obtener un token.
// Por simplicidad, se almacena un token simulado en localStorage.
// */

// // Simula el guardado del token en el localStorage (en una app real, esto vendría del servidor)
// localStorage.setItem('token', 'simulated-token');
// router.push('/dashboard'); // Redirige a la ruta "/"
// };


<style scoped>
.v-form {
    padding-bottom: 10%;
}

.v-main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #F5F1E3, #f9f0cd);
    /* Degradado */
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

.forgot-password {
    color: #1A3E45;
    text-decoration: underline;
    transition: color 0.3s;
}

.forgot-password:hover {
    color: #0C2D33;
}
</style>
