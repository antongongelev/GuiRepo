<template>
    <div>

        <new-contract-dialog @newContract='newContract' ref="newContractDialog"></new-contract-dialog>

        <confirmation-dialog agree="Delete" @deleteContract='deleteContract' ref="ConfirmationDialog">
            <h2 slot="form-header">Are you sure?</h2>
            <h4 slot="form-text">Are you sure that you want to delete this contract?</h4>
        </confirmation-dialog>

        <v-dialog v-model="dialog" persistent max-width="600">
            <v-card>
                <v-card-title>
                    <h2>{{this.client.firstName}} {{this.client.secondName}}'s contracts</h2>
                </v-card-title>
                <v-card-text>
                    <li v-for="contract in contracts">

                        <v-icon
                                @click="openConfirmationDialog(contract)"
                        >
                            delete
                        </v-icon>
                        <v-icon
                                color="orange"
                                @click="editContract(contract)"
                        >
                            edit
                        </v-icon>
                        <strong>Phone number:</strong> {{contract.phoneNumber}}
                        <strong>, Tariff:</strong> {{contract.tariff.name}}
                        <strong>, Payment:</strong> {{contract.tariff.payment}}

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
    import ConfirmationDialog from "./ConfirmationDialog";

    export default {
        name: "ContractsDialog",
        components: {NewContractDialog, ConfirmationDialog},
        data() {
            return {
                dialog: false,
                contracts: {},
                client: {},
            }
        },
        methods: {
            openContractsDialog(client) {
                console.log(client);
                this.contracts = Object.assign({}, client.contracts);
                this.client = Object.assign({}, client);
                this.dialog = true;
            },
            addContract() {
                this.$refs.newContractDialog.open(true, this.client);
            },
            editContract(contract) {
                this.$refs.newContractDialog.open(false, this.client, contract);
            },
            newContract(contract) {
                this.$emit('newContract', contract);
                this.dialog = false;
            },
            openConfirmationDialog(contract) {
                this.$refs.ConfirmationDialog.openConfirmationDialogForDeletingContract(contract)
            },
            deleteContract(contract) {
                this.$axios.post('http://localhost:8090/contracts/delete', contract)
                    .then(response => {
                        this.$emit('newContract', response.data);
                    });
                this.dialog = false;
            }
        }
    }
</script>


<style scoped>
</style>