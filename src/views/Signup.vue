<template>
  <div class="signup">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="4"
          offset-md="3"
          offset-lg="4">
          <h1>{{ $t('pages.signup.title') }}</h1>
          <v-tabs
            v-model="tab">
            <v-tab
              v-for="(item, i) of items"
              :key="i">
              {{ $t(item) }}
            </v-tab>
          </v-tabs>
          <v-card flat>
            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                autocomplete="off"
                @submit="register">
                <PhoneField
                  v-if="type === 'mobile'"
                  v-model="form.phone"/>
                <v-text-field
                  v-if="type === 'email'"
                  v-model="form.email"
                  type="email"
                  :rules="[
                    v => validateRequired(v) || $t('formRules.email.required'),
                    v => validateEmail(v) || $t('formRules.email.invalid'),
                  ]"
                  :label="$t('email')"
                  required/>
                <v-text-field
                  v-model="form.password"
                  type="password"
                  :label="$t('password')"
                  :hint="$t('formHint.password')"
                  :rules="[
                    v => validateRequired(v) || $t('formRules.email.required'),
                    v => validatePassword(v) || $t('formRules.email.invalid'),
                  ]"
                  required/>
                <v-checkbox
                  v-model="form.agree"
                  :label="$t('pages.signup.agreeTerms')"
                  :rules="[v => validateRequired(v)]"
                  required/>
                <v-btn
                  :loading="loading"
                  :disabled="!valid || loading"
                  type="submit"
                  color="success"
                  width="100%">
                  {{ $t('signup') }}
                </v-btn>
              </v-form>
              <div class="text-center mt-4">
                <router-link to="/login">{{ $t('login') }}</router-link>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Snackbar
      v-model="error"
      color="error">
      <v-icon>mdi-close-octagon</v-icon>
      {{ $t('pages.signup.error') }}
    </Snackbar>
  </div>
</template>

<script>
import { createUser } from '@/api/user'
import PhoneField from '@/components/PhoneField'
import Snackbar from '@/components/Snackbar'
import {
  validateEmail,
  validateRequired,
  validatePassword
} from '@/services/formValidator'

export default {
  components: {
    PhoneField,
    Snackbar,
  },
  data() {
    return {
      loading: false,
      tab: null,
      items: ['mobile', 'email'],
      valid: false,
      error: false,
      form: {
        email: null,
        phone: {
          code: null,
          number: null,
        },
        password: null,
        agree: true,
      },
    }
  },
  computed: {
    type() {
      return this.items[this.tab]
    },
  },
  methods: {
    validateEmail,
    validateRequired,
    validatePassword,
    async register(e) {

      e.preventDefault()

      if (!this.$refs.form.validate())
        return

      this.loading = true

      const params = { ...this.form }

      if (this.type === 'mobile') {
        params.phone = `${params.phone.code}${params.phone.number.replace(/^0/, '')}`
      } else {
        delete params.phone
      }

      try {
        await createUser(params)
      } catch(e) {
        this.showError = true
        this.loading = false
        return
      }

      if (this.type === 'mobile') {
        this.$router.push({
          name: 'signupVerificationMobile',
          query: {
            mobile: params.phone,
          },
        })
      } else {
        this.$router.push({
          name: 'signupVerificationEmail',
          query: {
            email: params.email,
          },
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/form-visitor.scss';
</style>
