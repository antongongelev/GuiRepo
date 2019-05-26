<template>
    <div>
        <v-dialog v-model="confirmationDialog" persistent max-width="400">
            <v-card>
                <form>
                    <div id="form-header">
                        <slot name="form-header"></slot>
                    </div>
                    <div id="form-text">
                        <slot name="form-text"></slot>
                    </div>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="black" @click="confirmationDialog = false">
                            Cancel
                        </v-btn>
                        <v-btn flat color="orange" @click="submit">{{ agree }}</v-btn>
                    </v-card-actions>
                </form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "ConfirmationDialog",
        data() {
            return {
                confirmationDialog: false,
                client: {},
                contract: {},
                boolean: {}
            }
        },
        props: {
            agree: String
        },
        methods: {
            openConfirmationDialogForDeletingClient(client) {
                this.boolean = true;
                this.client = Object.assign({}, client);
                this.confirmationDialog = true;
            },
            openConfirmationDialogForDeletingContract(contract) {
                this.boolean = false;
                this.contract = Object.assign({}, contract);
                this.confirmationDialog = true;
            },
            submit() {
                if (this.boolean) {
                    this.$emit('deleteClient', this.client);
                } else {
                    this.$emit('deleteContract', this.contract);
                }
                this.confirmationDialog = false;
            }

        }
    }
</script>

<style>

</style>