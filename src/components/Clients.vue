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
                client: {
                    id: '', firstName: '', secondName: '', birthDate: '', passportInfo: '', phoneNumber: '',
                    address: '', email: ''
                },
            }
        },
        mounted() {
            this.$axios.get('http://localhost:8090/clients/get-all')
                .then(response => this.clients = response.data);
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
                        this.clients.push(response.data);
                        console.log(response.data);
                    })
                    .catch(error => console.log(error.response));
            }
        }
    }
</script>

<style scoped>

</style>