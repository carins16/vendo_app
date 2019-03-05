<template>
  <div>
    <v-layout row wrap>
      <v-flex xs10 pt-1 pl-2 mb-4>
        <u class="headline font-weight-medium">Purchase History</u>
      </v-flex>
      <v-flex xs2>
        <v-layout align-end justify-end>
          <v-btn flat icon color="blue">
            <v-icon medium>refresh</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>

      <v-flex pl-2 pr-2 xs12 sm12 md12>
        <v-card>
          <v-list two-line>
            <template v-for="(item, index) in purchaseHistory">
              <v-list-tile :key="item.key" avatar ripple @click="clickMe">
                <v-list-tile-content>
                  <v-list-tile-title>
                    <span class="subheading font-weight-medium white--text blue darken-2">&nbsp;{{ item.id }}&nbsp;</span>
                    <span class="subheading font-weight-medium">&nbsp;{{ item.name }}</span>
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    <span class="subheading red--text font-weight-medium">₱ {{ item.price }}</span>
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{ item.date }}</v-list-tile-sub-title>
                </v-list-tile-content>
  
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <timeago :datetime="item.date" :auto-update="60"></timeago>
                  </v-list-tile-action-text>
                  <v-spacer></v-spacer>
                </v-list-tile-action>
  
              </v-list-tile>
              <v-divider
                v-if="index + 1 < purchaseHistory.length"
                :key="index"
              ></v-divider>
            </template>
          </v-list>
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
      purchaseHistory: null
    }),
    computed: {
      loadPurchaseHistory() {
        return this.$store.getters.getPurchaseHistory
      }
    },
    watch: {
      loadPurchaseHistory(val) {
        this.purchaseHistory = val
      }
    },
    created() {
      this.purchaseHistory = this.$store.getters.getPurchaseHistory
    },
    methods: {
      clickMe() {

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