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
                            <v-form fast-fail @submit.prevent>
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

/*let lastNameRules = [
    value => {
        if (/[^0-9]/.test(value)) {
            return true;
        }
        return 'Last name can not contain digits.';
    }
];
*/

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
