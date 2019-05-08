<template>
    <div>
        <client-dialog @newClient='newClient' ref="createDialog"></client-dialog>

        <v-app>
            <div>
                <v-card>
                    <v-card-title>

                        <v-btn outline
                               small
                               color="orange"
                               @click="addClient"
                        >Add new client
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-divider
                                class="mx-2"
                                inset
                                vertical
                                color="orange"
                        ></v-divider>
                        <v-text-field
                                v-model="search"
                                append-icon="search"
                                label="Find client"
                                hide-details
                                color="orange"
                        ></v-text-field>

                    </v-card-title>

                    <v-data-table
                            :headers="headers"
                            :items="clients"
                            :search="search"
                            class="elevation-1"
                            :rows-per-page-items='[10]'
                    >

                        <template slot="items" slot-scope="props">

                            <td class="text-xs-center">{{ props.item.id }}</td>
                            <td class="text-xs-center">{{ props.item.firstName }}</td>
                            <td class="text-xs-center">{{ props.item.secondName }}</td>
                            <td class="text-xs-center">{{ props.item.birthDate }}</td>
                            <td class="text-xs-center">{{ props.item.passportInfo }}</td>
                            <td class="text-xs-center">{{ props.item.phoneNumber }}</td>
                            <td class="text-xs-center">{{ props.item.address }}</td>
                            <td class="text-xs-center">{{ props.item.email }}</td>
                            <td class="justify-center layout px-0">
                                <v-icon
                                        color="orange"
                                        class="mr-2"
                                        @click="editClient"
                                >
                                    edit
                                </v-icon>
                                <v-icon
                                        @click="deleteClient"
                                >
                                    delete
                                </v-icon>
                            </td>
                        </template>
                    </v-data-table>
                </v-card>
            </div>
        </v-app>
    </div>
</template>

<script>
    import ClientDialog from "./ClientDialog";

    export default {
        name: "ClientsTable",
        components: {ClientDialog},
        data() {
            return {
                search: '',
                headers: [
                    {text: 'Id', value: 'id', align: 'center'},
                    {text: 'Name', value: 'firstName', align: 'center'},
                    {text: 'Last Name', value: 'secondName', align: 'center'},
                    {text: 'Birth date', value: 'birthDate', align: 'center'},
                    {text: 'Passport', value: 'passportInfo', align: 'center'},
                    {text: 'Phone number', value: 'phoneNumber', align: 'center'},
                    {text: 'Address', value: 'address', align: 'center'},
                    {text: 'Email', value: 'email', align: 'center'},
                    {text: 'Actions', value: 'name', sortable: false, align: 'center'}
                ],
                clients: [],
            }
        },
        mounted() {
            this.$axios.get('http://localhost:8090/clients/get-all')
                .then(response => this.clients = response.data);
        },
        methods: {
            addClient() {
                this.$refs.createDialog.title = 'Add new client';
                this.$refs.createDialog.apply = 'Add';
                this.$refs.createDialog.hint = 'Fill in information about new client';
                this.$refs.createDialog.openDialog();
            },
            newClient(x) {
                this.clients.push(x);
            },
            editClient() {
                this.$refs.createDialog.title = 'Edit client';
                this.$refs.createDialog.apply = 'Edit';
                this.$refs.createDialog.hint = 'Here you can update information about client';
                this.$refs.createDialog.openDialog();
            },
            deleteClient() {

            },
        }

    }
</script>

<style scoped>

</style>