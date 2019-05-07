<template>
    <div>
        <client-dialog ref="createDialog"/>
        <v-btn outline
               small
               color="#42b983"
               @click="openCreateDialog"
        >
            Register new client
        </v-btn>

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
        name: "ClientsTable",
        data() {
            return {
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
        openCreateDialog() {
            this.$refs.ClientDialog.openDialog();
        }

    }
</script>

<style scoped>

</style>