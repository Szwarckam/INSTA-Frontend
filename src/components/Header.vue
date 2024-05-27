<script >
// import { ref } from "vue";
// import { useRouter } from 'vue-router'
// const router = useRouter();

export default {
    methods: {
        onOver(e) {
            console.log(e)
        }

    },
    data() {
        return {
            isHovering: false,
            items: [
                {
                    label: 'Home',
                    icon: 'pi pi-home',
                    command: () => {
                        this.$router.push('/');
                    }
                },
                {
                    label: 'Programmatic',
                    icon: 'pi pi-link',
                    command: () => {
                        this.$router.push('/about');
                    }
                },
                {
                    label: 'My Account',
                    icon: 'pi pi-user ',
                    items: [
                        {
                            label: 'My Profile',
                            icon: "pi pi-user-edit",
                            command: () => {
                                this.$router.push('/profile');
                            }
                        },
                        {
                            label: 'Settings',
                            icon: "pi  pi-cog",
                            command: () => {
                                this.$router.push('/settings');
                            }
                        }
                    ]
                }]
        }
    },

}

    ;



</script>


<template>
    <div class="card">
        <Menubar :model="items">
            <template #item="{ item, props, hasSubmenu }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else @mouseover="onOver(this)" v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span @mouseout="isHovering = false" :class="item.icon, { 'pi-spin': isHovering }" />
                    <span class="ml-2">{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
                </a>
            </template>
            <template #end>
                <div class="flex align-items-center gap-2">
                    <InputText placeholder="Search" type="text" class="w-8rem sm:w-auto" />
                    <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
                </div>
            </template>
        </Menubar>
    </div>
</template>

