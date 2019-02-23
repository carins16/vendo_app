<template>
  <div>
    <v-layout row wrap>
      <v-flex xs10 pt-1 pl-2>
        <u class="headline font-weight-medium">Inventory</u>
      </v-flex>
      <v-flex xs2>
        <v-layout align-end justify-end>
          <v-btn flat icon color="blue">
            <v-icon medium>refresh</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6 sm4 pa-2 v-for="(item, index) in items" :key="index">
        <v-card color="" class="">
          <v-card-title primary-title>
            <v-layout row wrap>
              <v-flex xs12 class="text-truncate">
                <span row class="title">{{item.name}}</span>
              </v-flex>
              <v-flex xs12>
                <span row class="subheading red--text">Php {{ item.price }}.00</span>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-actions>
            <v-btn color="success">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    components: {

    },
    data: () => ({
      items: null
    }),
    computed: {
      getting() {
        return this.$store.getters.getItems
      }
    },
    watch: {
      getting(val) {
        this.items = val
      }
    },
    created() {
      this.items = this.$store.getters.getItems
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

