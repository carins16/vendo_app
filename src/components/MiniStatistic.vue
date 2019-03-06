<template>
  <v-card class="ma-2">
    <v-card-text class="pa-0">
      <v-container class="pa-0">
        <div class="layout row ma-0">
          <div class="sm4 xs4 flex">
            <div class="layout column ma-0 justify-center align-center">
              <v-icon size="80px" :color="color">{{icon}}</v-icon>
            </div>
          </div>
          <div class="sm8 xs8 flex text-xs-center py-3 white--text" :class="color">
            <div class="headline">{{ title }}</div>
            <div class="subheading">{{ subTitle }}</div>
          </div>
        </div>
      </v-container>
    </v-card-text>
  </v-card>    
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    subTitle: String,
    color: String
  }
};
</script>