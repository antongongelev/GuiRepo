<template>

    <div>

        <clients-table></clients-table>

    </div>

</template>

<script>
    import ClientsTable from "./ClientsTable";
    import ClientDialog from "./ClientDialog";

    export default {
        name: "AdminPage",
        components: {ClientDialog, ClientsTable},
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>