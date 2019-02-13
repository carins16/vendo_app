<template>

  <div>
    <v-layout row wrap>
      <v-flex xs10 pt-1 pl-2>
        <u class="headline font-weight-medium">Purchase History</u>
      </v-flex>
      <v-flex xs2>
        <v-layout align-end justify-end>
          <v-btn flat icon color="blue">
            <v-icon medium>refresh</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
  export default {
    components: {

    },
    data: () => ({
          
    })
  }
</script>

<style scoped>
  u {
    padding-bottom:5px;
    text-decoration:none;
    border-bottom:3px solid #000;
  }
</style>