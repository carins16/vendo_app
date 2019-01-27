<template>

  <div>
    <v-progress-linear :indeterminate="true"></v-progress-linear>
    <v-layout row wrap>
      <v-flex xs6 pt-1 pl-2>
        <u class="headline font-weight-medium">Inventory</u>
      </v-flex>
      <v-flex xs6>
        <v-layout align-end justify-end>
          <v-btn flat icon color="blue">
            <v-icon medium>refresh</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    
    <expansion/>
  </div>
  
</template>

<script>
import Expansion from '@/components/Expansion'

export default {
  name: 'App',
  components: {
    Expansion
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

