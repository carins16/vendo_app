<template>

    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-alert v-model="alert" dismissible type="error">
                    {{ errorMsg }}
                </v-alert>
                <v-form v-on:submit.prevent="onSignIn">
                    <v-card-text>
                        <v-text-field prepend-icon="person" 
                                    label="Email" 
                                    type="email"
                                    v-model="email"
                                    :error-messages="emailErrors"
                                    required
                                    @input="$v.email.$touch()"
                                    @blur="$v.email.$touch()">
                        </v-text-field>
                        <v-text-field prepend-icon="lock"   
                                    label="Password" 
                                    type="password"
                                    v-model="password"
                                    :error-messages="passwordErrors"
                                    required
                                    @input="$v.password.$touch()"
                                    @blur="$v.password.$touch()">
                        </v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn type="submit" color="primary" :loading="loading">Sign In</v-btn>
                    </v-card-actions>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>

    import { validationMixin } from 'vuelidate'
    import { required, email, minLength } from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],
        validations: {
            email: { required, email },
            password: {required, minLength: minLength(6)}
        },
        components: {

        },
        data: () => ({
            alert: false,
            errorMsg: '',
            loading: false,
            email: '',
            password: ''
        }),
        computed: {
            user() {
                return this.$store.getters.getUser
            },
            loginError() {
                return this.$store.getters.getLoginError
            },
            emailErrors () {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Must be valid e-mail')
                !this.$v.email.required && errors.push('E-mail is required')
                return errors
            },
            passwordErrors () {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.required && errors.push('Password is required')
                !this.$v.password.minLength && errors.push('Password must have atleast 6 characters')
                return errors
            }
        },
        watch: {
            user(val) {
                this.loading = false
                if (val !== null && val !== undefined) this.$router.replace('/')
            },
            loginError(val) {
                this.loading = false
                if (val !== null && val !== undefined) {
                    this.alert = true
                    this.errorMsg = val.message
                }
            }
        },
        methods: {
            onSignIn() {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    this.loading = true
                    this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
                } 
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