<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <v-dialog max-width="500" persistent v-model="dialog">

        <v-card>
            <v-card-title>
                <h2>{{isNew? 'Add new contract to ' + this.client.firstName + ' ' + this.client.secondName : 'Edit ' +
                    this.client.firstName + ' ' + this.client.secondName + '\'s contract'}}</h2>
            </v-card-title>
            <v-form>
                <v-card-text>
                    <v-text-field color="orange" label="Phone number"
                                  v-model="newContract.phoneNumber"></v-text-field>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-card-text>
                                Chosen Tariff:
                                <v-btn
                                        outline
                                        small
                                        color="orange"
                                        v-on="on"
                                >
                                    {{ chosenTariffName }}
                                </v-btn>
                            </v-card-text>

                        </template>
                        <v-list>
                            <v-list-tile
                                    v-for="tariff in tariffs"
                                    @click="newTariff(tariff)"
                            >
                                <v-list-tile-title>{{ tariff.name }}</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                </v-card-text>
            </v-form>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="black" @click="close">Close</v-btn>
                <v-btn flat color="orange" @click="saveNewContract(isNew)">{{isNew? 'Add' : 'Edit'}}</v-btn>
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
                chosenTariffName: 'None',
                isNew: '',
            }
        },
        methods: {
            newTariff(tariff) {
                this.chosenTariffName = tariff.name;
                this.newContract.tariff = tariff;
            },
            open(isNew, client, contract) {
                this.isNew = isNew;
                this.client = Object.assign({}, client);
                if (isNew) {
                    this.chosenTariffName = 'None';
                    this.newContract.phoneNumber = '';
                } else {
                    this.chosenTariffName = contract.tariff.name;
                    this.newContract.phoneNumber = contract.phoneNumber;
                    this.newContract.id = contract.id;
                }
                this.dialog = true;
            },
            close() {
                this.dialog = false;
            },
            saveNewContract(isNew) {
                this.newContract.client = this.client;
                console.log(this.newContract);
                if (isNew) {
                    this.$axios.post('http://localhost:8090/contracts/create', this.newContract)
                        .then(response => {
                                this.$emit('newContract', response.data);
                            }
                        )
                        .catch(error => {
                            console.log(error.response);
                        })
                        .finally(() => {
                            this.dialog = false
                        });
                } else {
                    this.$axios.post('http://localhost:8090/contracts/update', this.newContract)
                        .then(response => {
                                this.$emit('newContract', response.data);
                            }
                        )
                        .catch(error => {
                            console.log(error.response);
                        })
                        .finally(() => {
                            this.dialog = false
                        });
                }
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