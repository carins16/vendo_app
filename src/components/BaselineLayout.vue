<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" fixed app>
            <v-img :aspect-ratio="16/9" :src="require('../assets/material.jpg')">
                <v-layout pa-2 column fill-height class="lightbox white--text">
                <v-spacer></v-spacer>
                <v-flex shrink>
                    <div class="subheading">John Kenneth N. Carino</div>
                    <div class="body-1">johnkenneth411@gmail.com</div>
                </v-flex>
                </v-layout>
            </v-img>

            <v-list>
                <template v-for="(page, index) in pages">
                    <v-divider v-if="page.divider" :key="index"></v-divider>
                    <v-list-tile v-else :key="index" :to="{path: page.path}">
                        <v-list-tile-action>
                            <v-icon>{{page.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="subheading font-weight-medium">{{page.title}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar color="blue" dark fixed app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-toolbar>

        <v-content>
            <v-container fluid>
                <v-fade-transition mode="out-in">
                    <router-view></router-view>
                </v-fade-transition>
            </v-container>
        </v-content>

        <!-- <v-footer color="blue" app>
            <span class="white--text ml-2">Powered by &copy; Carins</span>
        </v-footer> -->
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            drawer: null,
            pages: [
                {title: "Home",         icon: "home",           path: "/admin/home"},
                {title: "Inventory",    icon: "storage",        path: "/inventory"},
                {title: "Transactions", icon: "equalizer",      path: "/transactions"},
                {title: "Accounts",     icon: "account_box",    path: "/accounts"},
                {divider: true },
                {title: "Settings",     icon: "settings",       path: "/settings"},
                {title: "Sign Out",     icon: "input",          path: "/login"}
            ]
        })
    }
</script>

<style scoped>
    .lightbox {
        box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
    }
</style>
