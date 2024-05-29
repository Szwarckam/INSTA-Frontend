
<template>
    <Card class="options">

        <template #content>
            <div class="card flex list-container justify-content-center">

                <Listbox v-model="selectedCountry" :options="countries" optionLabel="name"
                    class="w-full listbox  md:w-14rem" listStyle="">
                    <template #option="slotProps">
                        <div class="flex align-items-center">
                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                </Listbox>
            </div>
        </template>
    </Card>
</template>
<style>
.options {
    display: flex;
    /* align-items: center; */
    justify-content: center;
}
</style>
<script setup>
import { ref } from "vue";

const selectedCountry = ref();
const countries = ref([
    { name: 'Rotate', },
    { name: 'Resize', },
    { name: 'Reformat', },
    { name: 'Crop', },
    { name: 'Greyscale', },
    { name: 'flip', },
    { name: 'negate', },
    { name: 'tint', },

]);


</script>
