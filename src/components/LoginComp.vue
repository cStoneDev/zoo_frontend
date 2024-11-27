<template>

    <v-card class="mx-auto" prepend-icon="$vuetify" width="400">
        <template v-slot:title>
            <span class="font-weight-black">Fauna Viva</span>
        </template>

        <v-card-text class="login_card">
                

            <v-sheet class="mx-auto" width="300">
                <v-form fast-fail @submit.prevent>
                    <v-text-field v-model="firstName" :rules="firstNameRules" label="First name"></v-text-field>

                    <v-text-field v-model="lastName" :rules="lastNameRules" label="Last name"></v-text-field>

                    <v-btn class="submit_button mt-2" type="submit" block>Submit</v-btn>
                </v-form>
            </v-sheet>
        </v-card-text>
    </v-card>



</template>

<script setup>
let firstName = '';
let firstNameRules = [
    value => {
        if (value?.length >= 3) {
            return true;
        }
        return 'First name must be at least 3 characters.';
    }
];
let lastName = '';
let lastNameRules = [
    value => {
        if (/[^0-9]/.test(value)) {
            return true;
        }
        return 'Last name can not contain digits.';
    }
];


</script>


<style scoped>

.login_card{
    background-color: #9D8A69;
    padding: 10%;
}
.submit_button{
    background-color: #1A3E45;
    color: white;
}

.v-sheet{
    border-radius: 3%;
}
.v-card{
    align-items: center;
}
</style>
