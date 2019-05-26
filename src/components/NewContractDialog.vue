<template>

    <v-dialog max-width="500" persistent v-model="dialog">

        <v-card>
            <v-card-title>
                <h2>Add new contract to {{this.client.firstName}} {{this.client.secondName}}</h2>
            </v-card-title>
            <v-form>
                <v-card-text>
                    <v-text-field color="orange" label="Phone number"
                                  v-model="newContract.phoneNumber"></v-text-field>
                </v-card-text>
            </v-form>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="black" @click="close">Close</v-btn>
                <v-btn flat color="orange" @click="saveNewContract">Save</v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>


</template>

<script>


    export default {
        name: "NewContractDialog",
        data() {
            return {
                dialog: false,
                client: {},
                newContract: {},
                tariffs: {},
            }
        },
        methods: {
            open(client) {
                this.client = Object.assign({}, client);
                this.dialog = true;
            },
            close() {
                this.newContract.phoneNumber = '';
                this.dialog = false;
            },
            saveNewContract() {
                this.newContract.client = this.client;
                this.newContract.tariff = this.tariffs[0]; //TODO: Admin should be able to chose tariff
                console.log(this.newContract);
                this.$axios.post('http://localhost:8090/contracts/create', this.newContract)
                    .then(
                        this.$emit('newContract')
                    )
                    .catch(error => {
                        console.log(error.response);
                    })
                    .finally(() => {
                        this.newContract.phoneNumber = '';
                        this.dialog = false
                    });
            }
        },
        mounted() {
            this.$axios.get('http://localhost:8090/tariffs/get-all')
                .then(response => {
                    this.tariffs = response.data;
                })
        }
    }
</script>

<style scoped>

</style>