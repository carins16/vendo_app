<template>

  <div>
    <v-layout row wrap>
      <v-flex xs10 pt-1 pl-2 mb-4>
        <u class="headline font-weight-medium">Dashboard</u>
      </v-flex>
      <v-flex xs2>
        <v-layout align-end justify-end>
          <v-btn flat icon color="blue" :loading="fetching">
            <v-icon medium>refresh</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex  lg6 sm6 xs12 ma-10>
        <mini-statistic
          icon="insert_chart_outlined"
          :title="totalSales"
          sub-title="Total Sales"
          color="pink"      
        >
        </mini-statistic>  
      </v-flex>

      <v-flex  lg6 sm6 xs12>
        <mini-statistic
          icon="history"
          :title="numOfPurchaseItems"
          sub-title="Total purchased items"
          color="green"      
        >
        </mini-statistic>  
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
  import MiniStatistic from '@/components/MiniStatistic';

  export default {
    components: {
      MiniStatistic
    },
    data: () => ({
      purchaseHistory: null,
      fetching: true,
      title: "hello"
    }),
    computed: {
      loadPurchaseHistory() {
        return this.$store.getters.getPurchaseHistory
      },
      numOfPurchaseItems() {
        if (this.purchaseHistory != null) {

          if (this.purchaseHistory.length > 1) {
            return this.purchaseHistory.length + " pcs"
          } else {
            return this.purchaseHistory.length + " pc"
          }

        } else {
          return "0 pc"
        }
        
      },
      totalSales() {

        var total = 0

        if (this.purchaseHistory != null) {
          this.purchaseHistory.forEach(history => {
            total += history.price
          })
        }

        return "Php " + total + ".00"
      }
    },
    watch: {
      loadPurchaseHistory(val) {
        this.purchaseHistory = val
      },
      purchaseHistory(val) {
        if (val !== null) this.fetching = false
      }
    },
    created() {
      this.purchaseHistory = this.$store.getters.getPurchaseHistory
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