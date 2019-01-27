<template>

  <div>
    <v-layout row wrap>
      <v-flex xs6 pt-1 pl-2>
        <u class="headline font-weight-medium">Dashboard</u>
      </v-flex>
      <v-flex xs6>
        <v-layout align-end justify-end>
          <v-btn flat icon color="blue">
            <v-icon medium>refresh</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <sparkline/>
  </div>

</template>

<script>

import Sparkline from '@/components/Sparkline'

export default {
  name: 'App',
  components: {
    Sparkline
  },
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
  u {
    padding-bottom:5px;
    text-decoration:none;
    border-bottom:3px solid #000;
  }
</style>