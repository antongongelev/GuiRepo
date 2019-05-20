<template>
    <div>
        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-card-title>
                    <h1>{{this.client.firstName}} {{this.client.secondName}}'s contracts</h1>
                </v-card-title>
                <v-card-text>
                    <li v-for="item in contracts">
                        <strong>Tariff:</strong> {{item.tariff.name}}<strong>, </strong>
                        <strong>Phone Number:</strong> {{item.phoneNumber}}
                        <v-spacer></v-spacer>
                    </li>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>


<script>
    export default {
        name: "ContractsDialog",
        data() {
            return {
                dialog: false,
                contracts: [],
                client: [],
            }
        },
        methods: {
            openContractsDialog(contracts, client) {
                this.contracts = Object.assign({}, contracts);
                this.client = Object.assign({}, client);
                this.dialog = true;
            }
        }
    }
</script>


<style scoped>
</style>