<template>
    <div>

        <v-dialog v-model="dialog" persistent max-width="500">
            <v-card>
                <v-card-title class="headline">Register new client</v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6>
                                <v-text-field label="First name" v-model="client.firstName"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Second name" v-model="client.secondName"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Birth date" v-model="client.birthDate"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Phone number" v-model="client.phoneNumber"></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6>
                                <v-text-field label="Address" v-model="client.address"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Email" v-model="client.email"></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-text-field label="Passport" v-model="client.passportInfo"></v-text-field>
                        <small class="grey--text">Please, insert information about new client</small>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
                    <v-btn flat color="#42b983" @click="registerClient">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    export default {
        name: "ClientDialog",
        data() {
            return {
                dialog: false,
                client: {
                    id: '', firstName: '', secondName: '', birthDate: '', passportInfo: '', phoneNumber: '',
                    address: '', email: ''
                },
            }
        },
        methods: {
            registerClient() {
                let newClient = {
                    id: this.client.id,
                    firstName: this.client.firstName,
                    secondName: this.client.secondName,
                    birthDate: this.client.birthDate,
                    passportInfo: this.client.passportInfo,
                    phoneNumber: this.client.phoneNumber,
                    address: this.client.address,
                    email: this.client.email
                };
                this.dialog = false;
                console.log(newClient);

                this.$axios.post('http://localhost:8090/clients/create', newClient)
                    .then(response => {
                        console.log(response.data);
                        this.clients.push(response.data);
                    })
                    .catch(error => console.log(error.response));
            },
            openDialog() {
                this.dialog = true;
            }
        }

    }
</script>

<style scoped>

</style>