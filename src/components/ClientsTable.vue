<template>
    <div>

        <client-dialog @newClient='newClient' ref="createDialog"></client-dialog>

        <contracts-dialog @newContract='newClient' ref="contractsDialog"></contracts-dialog>

        <confirmation-dialog agree="Delete" @deleteClient='deleteClient' ref="deleteClient"
        >
            <h2 slot="form-header">Are you sure?</h2>
            <h4 slot="form-text">Are you sure that you want to delete this client?</h4>
            <p slot="form-text">All contracts will be removed</p>
        </confirmation-dialog>

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
                            <td class="text-xs-center">{{ props.item.address }}</td>
                            <td class="text-xs-center">{{ props.item.email }}</td>

                            <td class="text-xs-center">
                                <v-icon color="orange"
                                        @click="openContracts(props.item)"
                                >
                                    tab
                                </v-icon>
                            </td>

                            <td class="justify-center layout px-0">
                                <v-icon
                                        color="orange"
                                        class="mr-2"
                                        @click="editClient(props.item)"
                                >
                                    edit
                                </v-icon>
                                <v-icon
                                        @click="openConfirmDialog(props.item)"
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
    import ConfirmationDialog from "./ConfirmationDialog";
    import ContractsDialog from "./ContractsDialog";

    export default {
        name: "ClientsTable",
        components: {ContractsDialog, ConfirmationDialog, ClientDialog},
        data() {
            return {
                search: '',
                headers: [
                    {text: 'Id', value: 'id', align: 'center'},
                    {text: 'Name', value: 'firstName', align: 'center'},
                    {text: 'Last Name', value: 'secondName', align: 'center'},
                    {text: 'Birth date', value: 'birthDate', align: 'center'},
                    {text: 'Passport', value: 'passportInfo', align: 'center'},
                    {text: 'Address', value: 'address', align: 'center'},
                    {text: 'Email', value: 'email', align: 'center'},
                    {text: 'Contracts', value: 'name', sortable: false, align: 'center'},
                    {text: 'Actions', value: 'name', sortable: false, align: 'center'}
                ],
                clients: [],
            }
        },
        mounted() {
            this.$axios.get('http://localhost:8090/clients/get-all')
                .then(response => {
                    this.clients = response.data;
                })
        },

        methods: {
            openContracts(client) {
                this.$refs.contractsDialog.openContractsDialog(client);
            },
            addClient() {
                this.$refs.createDialog.openDialog(true, null);
            },
            newClient() {
                this.$axios.get('http://localhost:8090/clients/get-all')
                    .then(response => this.clients = response.data);
            },
            editClient(client) {
                this.$refs.createDialog.openDialog(false, client);
            },
            deleteClient(client) {
                this.$axios.post('http://localhost:8090/clients/delete', client)
                    .then(response => {
                        this.clients = response.data
                    })
            },
            openConfirmDialog(client) {
                this.$refs.deleteClient.openConfirmationDialog(client);
            }
        }

    }
</script>

<style>
    h2 {
        text-align: center;
        color: orange;
    }

    p {
        text-align: center;
        color: gray;
    }

    h4 {
        text-align: center;
    }
</style>