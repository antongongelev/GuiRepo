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
                client: {}
            }
        },
        props:{
            agree: String
        },
        methods: {
            openConfirmationDialog(client) {
                this.client = Object.assign({}, client);
                this.confirmationDialog = true;
            },
            submit() {
                this.confirmationDialog = false;
                this.$emit('deleteClient', this.client);
            }

        }
    }
</script>

<style>

</style>