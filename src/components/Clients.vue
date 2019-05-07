<template>
    <div id="app">

        <v-btn outline
               small
               color="#42b983"
               @click="dialog = !dialog"
        >
            Register new client
        </v-btn>


        <v-dialog v-model="dialog" persistent max-width="500">
            <v-card>
                <v-card-title class="headline">Register new client</v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6>
                                <v-text-field label="First name" v-model="Client.firstName"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Second name" v-model="Client.secondName"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Birth date" v-model="Client.birthDate"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Phone number" v-model="Client.phoneNumber"></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6>
                                <v-text-field label="Address" v-model="Client.address"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Email" v-model="Client.email"></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-text-field label="Passport" v-model="Client.passportInfo"></v-text-field>
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


        <v-data-table
                :headers="headers"
                :items="clients"
                class="elevation-1">
            <template slot="items" slot-scope="props">
               <td class="text-xs-center">{{ props.item.id }}</td>
                <td class="text-xs-center">{{ props.item.firstName }}</td>
                <td class="text-xs-center">{{ props.item.secondName }}</td>
                <td class="text-xs-center">{{ props.item.birthDate }}</td>
                <td class="text-xs-center">{{ props.item.passportInfo }}</td>
                <td class="text-xs-center">{{ props.item.phoneNumber }}</td>
                <td class="text-xs-center">{{ props.item.address }}</td>
                <td class="text-xs-center">{{ props.item.email }}</td>
                <td class="text-xs-center ">
                    <button>{{ props.item.status }}</button>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>


    export default {

        name: "Clients",
        data() {
            return {
                dialog: false,
                headers: [
                    {text: 'Id', value: 'id', align: 'center'},
                    {text: 'Name', value: 'firstName', align: 'center'},
                    {text: 'Last Name', value: 'secondName', align: 'center'},
                    {text: 'Birth date', value: 'birthDate', align: 'center'},
                    {text: 'Passport', value: 'passportInfo', align: 'center'},
                    {text: 'Phone number', value: 'phoneNumber', align: 'center'},
                    {text: 'Address', value: 'address', align: 'center'},
                    {text: 'Email', value: 'email', align: 'center'},
                    {text: 'Status', value: 'status', align: 'center'}
                ],
                clients: [],
                Client: {
                    id: '', firstName: '', secondName: '', birthDate: '', passportInfo: '', phoneNumber: '',
                    address: '', email: ''
                },
            }
        },
        mounted() {
            this.$axios.get('http://localhost:8090/clients/get-all')
                .then(response => (this.clients = response.data));
        },
        methods: {
            registerClient() {
                let newClient = {
                    id: this.Client.id,
                    firstName: this.Client.firstName,
                    secondName: this.Client.secondName,
                    birthDate: this.Client.birthDate,
                    passportInfo: this.Client.passportInfo,
                    phoneNumber: this.Client.phoneNumber,
                    address: this.Client.address,
                    email: this.Client.email
                };
                this.dialog = false;
                console.log(newClient);

                this.$axios.post('http://localhost:8090/clients/create', newClient)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error.response)
                    });
            }
        }
    }
</script>

<style scoped>

</style>