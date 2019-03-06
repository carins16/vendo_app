<template>
    <v-app id="inspire">
        <!-- Left side navigation drawer -->
        <v-navigation-drawer v-if="userIsAuthenticated" v-model="drawer" fixed app>
            <!-- Material background -->
            <v-img :aspect-ratio="16/9" :src="require('@/assets/material.jpg')">
                <v-layout pa-2 column fill-height class="lightbox white--text">
                <v-spacer></v-spacer>
                <v-flex shrink>
                    <div class="subheading">{{email}}</div>
                    <div class="body-1">Administrator</div>
                </v-flex>
                </v-layout>
            </v-img>
            <!-- Menu -->
            <v-list>
                <template v-for="(page, index) in pages">
                    <v-divider v-if="page.divider" :key="index"></v-divider>
                    <v-list-tile active-class="blue--text" v-else :key="index" :to="{path: page.path}">
                        <v-list-tile-action>
                            <v-icon>{{page.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="subheading font-weight-medium">{{page.title}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
                <v-list-tile @click="onLogout">
                    <v-list-tile-action>
                        <v-icon>input</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="subheading font-weight-medium">Sign Out</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <!-- Top toolbar -->
        <v-toolbar color="blue" dark fixed app>
            <v-toolbar-side-icon v-if="userIsAuthenticated" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Vendo App</v-toolbar-title>
        </v-toolbar>
        <!-- Page content -->
        <v-content>
            <v-container fluid>
                <v-fade-transition mode="out-in">
                    <router-view></router-view>
                </v-fade-transition>
                <!-- Snackbar -->
                <v-snackbar v-model="snackbar.status" bottom="bottom">
                    {{ snackbar.msg }}
                <v-btn color="white" flat @click="snackbar.status = false">Close</v-btn>
                </v-snackbar>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
  export default {
    name: 'App',
    data: () => ({
        drawer: null,
        pages: [
            {title: "Dashboard",        icon: "dashboard",      path: "/"},
            {title: "Inventory",        icon: "storage",        path: "/inventory"},
            {title: "Purchase History", icon: "equalizer",      path: "/purchase_history"},
            {divider: true }
        ],
        snackbar: {
            status: false,
            msg: ''
        }
    }),
    methods: {
        onLogout() {
            this.$store.dispatch('userSignOut')
        }
    },
    computed: {
        newPurchase() {
            return this.$store.getters.getNewPurchase
        },
        userIsAuthenticated() {
            return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
        },
        email () {
            return this.$store.getters.getUser.email
        }
    },
    watch: {
        userIsAuthenticated(val) {
            if (!val) this.$router.replace('/sign_in')
        },
        newPurchase(val) {
            if (val !== null && val !== undefined) {
                this.snackbar.msg = "Product " + val.name + " has been sold."
                this.snackbar.status = true
            }
        }
    }
  }
</script>

<style scoped>
    .lightbox {
        box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
    }
</style>