<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="500">
            <v-card>
                <v-card-title>
                    <span class="headline">{{isNew? 'Add new client' : 'Edit client'}}</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-form ref="clientForm">
                            <v-layout wrap>
                                <v-flex xs12 sm6>
                                    <v-text-field color="orange" label="First name"
                                                  v-model="client.firstName"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field color="orange" label="Second name"
                                                  v-model="client.secondName"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field color="orange" label="Birth date"
                                                  v-model="client.birthDate"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field color="orange" label="Phone number"
                                                  v-model="client.phoneNumber"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field color="orange" label="Address"
                                                  v-model="client.address"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field color="orange" label="Email" v-model="client.email"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-text-field color="orange" label="Passport" v-model="client.passportInfo"></v-text-field>
                            <small class="grey--text">{{isNew? 'Fill in information about new client' :
                                'Edit information about client with id ' + client.id}}
                            </small>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="black" @click="dialog = false">Cancel</v-btn>
                    <v-btn flat color="orange" @click="registerClient">{{ isNew? 'Add' : 'Edit'}}</v-btn>
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
                client: {},
                isNew: ''
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
                        this.$emit('newClient', response.data);
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
            },
            openDialog(isNew, client) {
                this.isNew = isNew;
                if (isNew) {
                    this.$refs.clientForm.reset();
                } else {
                    this.client = client;
                }
                this.dialog = true;
            },
        }
    }
</script>
<style scoped>
</style>