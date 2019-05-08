<template>
    <div>
        <client-dialog @newClient='newClient' ref="createDialog"></client-dialog>
        <v-btn outline
               small
               color="orange"
               @click="openCreateDialog"
        >
            Register new client
        </v-btn>


        <v-app>
            <div>
                <v-card>
                    <v-card-title>

                        <v-spacer></v-spacer>
                        <v-text-field
                                v-model="search"
                                append-icon="search"
                                label="Find client"
                                single-line
                                hide-details
                                color="orange"
                        ></v-text-field>
                    </v-card-title>

                    <v-data-table
                            :headers="headers"
                            :items="clients"
                            :search="search"
                            class="elevation-1"

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
                            <td class="text-xs-center ">{{ props.item.status }}</td>

                        </template>

                        <v-alert :value="true" color="error" icon="warning">
                            Your search for "{{ search }}" found no results.
                        </v-alert>

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
                    {text: 'Status', value: 'status', align: 'center'}
                ],
                clients: [],
            }
        },

        mounted() {
            this.$axios.get('http://localhost:8090/clients/get-all')
                .then(response => this.clients = response.data);
        },
        methods: {
            openCreateDialog() {
                this.$refs.createDialog.openDialog();
            },
            newClient(x) {
                this.clients.push(x);
            }
        }

    }
</script>

<style scoped>

</style>