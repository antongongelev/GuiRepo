<template>
    <div>

        <new-contract-dialog @newContract='newContract' ref="newContractDialog"></new-contract-dialog>

        <confirmation-dialog agree="Delete" @deleteContract='deleteContract' ref="ConfirmationDialog">
            <h2 slot="form-header">Are you sure?</h2>
            <h4 slot="form-text">Are you sure that you want to delete this contract?</h4>
        </confirmation-dialog>

        <v-dialog v-model="dialog" persistent max-width="500">
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
                                @click=""
                        >
                            edit
                        </v-icon>
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
                this.contracts = Object.assign({}, client.contracts);
                this.client = Object.assign({}, client);
                console.log(client);
                this.dialog = true;
            },
            addContract() {
                this.dialog = false;
                this.$refs.newContractDialog.open(this.client);
            },
            newContract() {
                this.$emit('newContract');
            },
            openConfirmationDialog(contract) {
                this.$refs.ConfirmationDialog.openConfirmationDialogForDeletingContract(contract)
            },
            deleteContract(contract) {
                this.$axios.post('http://localhost:8090/contracts/delete', contract)
                    .then(
                        this.$emit('newContract')
                    )
                    .catch(error => {
                        console.log(error.response);
                    })
                    .finally(() => {
                        this.dialog = false
                    });

            }
        }
    }
</script>


<style scoped>
</style>