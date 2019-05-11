<template>
    <div>
        <v-dialog v-model="confirmationDialog" persistent max-width="500" >
            <v-card>
            <form>
                    <div id="form-header">
                        <slot name="form-header"></slot>
                    </div>
                <div id="form-text">
                    <slot name="form-text"></slot>
                </div>
                <v-btn flat color="black" @click="confirmationDialog = false">
                    Cancel
                </v-btn>
                <v-btn flat color="orange" @click="agreeFunction">{{ agree }}</v-btn>
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
                agree: 'Delete',
                client: {}
            }
        },
        methods: {
            openConfirmationDialog(client) {
                this.client = Object.assign({}, client);
                this.confirmationDialog = true;
            },
            agreeFunction() {
                this.confirmationDialog = false;
                this.$emit('deleteClient', this.client);
            }

        }
    }
</script>

<style scoped>

</style>