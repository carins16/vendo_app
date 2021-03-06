<template>
  <div>

    <!-- Header -->
    <v-layout row wrap>
      <v-flex xs10 pt-1 pl-2 mb-4>
        <u class="headline font-weight-medium">Inventory</u>
      </v-flex>
      <v-flex xs2>
        <v-layout align-end justify-end>
          <v-btn flat icon color="blue" :loading="fetching">
            <v-icon medium>refresh</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- List of products -->
    <v-layout row wrap>
      <v-flex xs6 sm4 pa-2 v-for="(item, index) in items" :key="index">
        <v-card color="" class="">
          <v-card-title primary-title>
            <v-layout row wrap>
              <v-flex xs12 class="text-truncate" mb-1>
                <span class="subheading font-weight-medium white--text blue darken-2">&nbsp;{{ index }}&nbsp;</span>
                <span class="subheading font-weight-medium">&nbsp;{{ item.name }}</span>
              </v-flex>
              <v-flex xs12>
                <span class="subheading red--text font-weight-medium">₱ {{ item.price }}</span>
              </v-flex>
              <v-flex xs12>
                <span class="subheading font-weight-medium">Qty: {{ item.qty }}</span>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-actions>
            <v-btn color="success" @click="onUpdateItem(index, item.name, item.price, item.qty)">
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Update dialog -->
    <v-dialog v-model="dialog" persistent :fullscreen="isMobile" :transition="customTransition" max-width="400px">
      <v-card>

        <v-form v-on:submit.prevent="onSaveChanges">
          <!-- Fullscreen dialog -->
          <template v-if="isMobile">
            <v-toolbar dark color="blue">
              <v-btn icon dark @click="onClose">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>Product {{ edit.key }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn type="submit" class="subheading" dark flat :loading="loading">SAVE</v-btn>
              </v-toolbar-items>
            </v-toolbar>
          </template>

          <!-- Small dialog header -->
          <template v-else>
            <v-card-title>
              <span class="title">Product {{ edit.key }}</span>
            </v-card-title>
            <v-divider></v-divider>
          </template>

          <template>
            <v-container>
              <v-layout wrap>
                <v-flex xs12>
                  <v-card-text>
                    <v-text-field label="Product name" 
                                  v-model="edit.name" 
                                  counter="20"
                                  maxlength="20"
                                  :rules="[v => v.length <= 20 || 'Max 20 characters']"
                                  :error-messages="nameErrors"
                                  @input="$v.edit.name.$touch()"
                                  @blur="$v.edit.name.$touch()"
                                  required>
                    </v-text-field>
                    <v-text-field label="Price" 
                                  v-model = "edit.price" 
                                  prefix="₱" 
                                  :error-messages="priceErrors"
                                  @input="$v.edit.price.$touch()"
                                  @blur="$v.edit.price.$touch()"
                                  required>
                    </v-text-field>
                    <v-text-field label="Quantity" 
                                  v-model ="edit.qty" 
                                  :error-messages="qtyErrors"
                                  @input="$v.edit.qty.$touch()"
                                  @blur="$v.edit.qty.$touch()"
                                  required>
                    </v-text-field>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-container>
          </template>

          <!-- Small dialog footer -->
          <template v-if="!isMobile">
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="onClose">Close</v-btn>
              <v-btn type="submit" color="blue darken-1" flat :loading="loading">Save</v-btn>
            </v-card-actions>
          </template>

        </v-form>

      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.status" bottom="bottom">
      {{ snackbar.msg }}
      <v-btn color="white" flat @click="snackbar.status = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>

  import { validationMixin } from 'vuelidate'
  import { required, numeric } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    validations: {
        edit: {
          name: { required },
          price: { required, numeric },
          qty: { required, numeric }
        }
    },
    components: {

    },
    data: () => ({
      items: null,
      dialog: false,
      isMobile: false,
      customTransition: '',
      edit: {
        key: null,
        name: '',
        price: '',
        qty: ''
      },
      loading: false,
      snackbar: {
        status: false,
        msg: ''
      },
      fetching: true
    }),
    methods: {
      setDialogTransition () {
        if (this.isMobile) {
          this.customTransition = 'dialog-bottom-transition'
        } else {
          this.customTransition = 'dialog-transition'
        }
      },
      onUpdateItem (key, name, price, qty) {
        this.edit.key = key
        this.edit.name = name
        this.edit.price = price
        this.edit.qty = qty

        this.dialog = true
      },
      onSaveChanges () {
        this.$v.$touch()
        if (!this.$v.$invalid && this.loading != true) {
          this.loading = true
          this.$store.dispatch('updateItems', this.edit)
        }
      },
      onClose () {
        this.edit.key = null
        this.edit.name = ''
        this.edit.price = ''
        this.edit.qty = ''

        this.dialog = false
      }
    },
    computed: {
      screenSizeChange() {
        return this.$vuetify.breakpoint.smAndDown
      },
      loadItems() {
        return this.$store.getters.getItems
      },
      updateStatus() {
        return this.$store.getters.getUpdates
      },
      nameErrors () {
        const errors = []
        if (!this.$v.edit.name.$dirty) return errors
        !this.$v.edit.name.required && errors.push('Product name is required.')
        return errors
      },
      priceErrors () {
        const errors = []
        if (!this.$v.edit.price.$dirty) return errors
        !this.$v.edit.price.required && errors.push('Price is required.')
        !this.$v.edit.price.numeric && errors.push('Price must be a numeric value.')
        return errors
      },
      qtyErrors () {
        const errors = []
        if (!this.$v.edit.qty.$dirty) return errors
        !this.$v.edit.qty.required && errors.push('Quantity is required.')
        !this.$v.edit.qty.numeric && errors.push('Quantity must be a numeric value.')
        return errors
      }
    },
    watch: {
      screenSizeChange(val) {
        this.isMobile = val
      },
      isMobile() {
        this.setDialogTransition()
      },
      loadItems (val) {
        this.items = val
      },
      updateStatus (val) {
        if (val !== null && val !== undefined) {
          this.snackbar.status = val.status
          this.snackbar.msg = val.msg

          this.dialog = false
          this.loading = false
        }
      },
      items (val) {
        if (val !== null) this.fetching = false
      }
    },
    created() {
      this.isMobile = this.$vuetify.breakpoint.smAndDown
      this.setDialogTransition()
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

