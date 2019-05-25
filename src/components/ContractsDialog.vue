<template>
    <div>

        <new-contract-dialog @newContract='newContract' ref="newContractDialog"></new-contract-dialog>

        <v-dialog v-model="dialog" persistent max-width="500">
            <v-card>
                <v-card-title>
                    <h2>{{this.client.firstName}} {{this.client.secondName}}'s contracts</h2>
                </v-card-title>
                <v-card-text>
                    <li v-for="contract in contracts">
                        <strong>Phone number:</strong> {{contract.phoneNumber}}
                        <strong>, Tariff:</strong> {{contract.tariff.name}}
                    </li>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="black" @click="dialog=false">Close</v-btn>
                    <v-btn flat color="orange" @click="addContract">Add new contract</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>


<script>
    import NewContractDialog from "./NewContractDialog";

    export default {
        name: "ContractsDialog",
        components: {NewContractDialog},
        data() {
            return {
                dialog: false,
                contracts: {},
                client: {},
            }
        },
        methods: {
            openContractsDialog(client) {
                this.contracts = Object.assign({}, client.contracts);
                this.client = Object.assign({}, client);
                console.log(client);
                this.dialog = true;
            },
            addContract() {
                this.dialog = false;
                this.$refs.newContractDialog.open(this.client);
            },
            newContract(newContract) {
                this.$emit('newContract', newContract);
            },

        }
    }
</script>


<style scoped>
</style>