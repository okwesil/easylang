<script>
import OrderSelect from '@/Components/OrderSelect.vue';

export default {
    name: 'GrammarView',
    components: { OrderSelect },
}
</script>

<template>
    <div class="main-header-wrapper">
      <h1 class="header">Grammar</h1>
    </div>
    <div class="grammar">
        
        <h3>Word Order</h3>
        <OrderSelect @new-order="(order) => console.log(order)" options="S O V" />
    </div>
</template>

<style scoped>
.grammar {
    margin-left: 2rem;
}
h3 {
    margin-bottom: 10px;
}

</style>