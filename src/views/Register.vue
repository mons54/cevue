<template>
  <div class="register">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="4"
          offset-md="3"
          offset-lg="4">
          <h1>{{ $t('pages.register.title') }}</h1>
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
                  v-model="form.mobile"/>
                <v-text-field
                  v-if="type === 'email'"
                  v-model="form.email"
                  type="email"
                  :rules="[
                    v => validateRequired(v) || $t('formRules.email.required'),
                    v => validateEmail(v) || $t('formRules.email.invalid'),
                  ]"
                  :label="$t('email')"
                  autocomplete="off"
                  required
                  aria-label="Email"/>
                <v-text-field
                  v-model="form.password"
                  type="password"
                  :label="$t('password')"
                  :hint="$t('formHint.password')"
                  :rules="[
                    v => validateRequired(v) || $t('formRules.email.required'),
                    v => validatePassword(v) || $t('formRules.email.invalid'),
                  ]"
                  autocomplete="off"
                  required
                  aria-label="Password"/>
                <v-checkbox
                  v-model="form.agree"
                  :label="$t('pages.register.agreeTerms')"
                  :rules="[v => validateRequired(v)]"
                  required/>
                <v-btn
                  :loading="loading"
                  :disabled="!valid || loading"
                  type="submit"
                  color="success"
                  width="100%">
                  {{ $t('register') }}
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
      {{ $t('pages.register.error') }}
    </Snackbar>
  </div>
</template>

<script>
import { register } from '@/api/user'
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
        mobile: {
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
        params.mobile = `${params.mobile.code}${params.mobile.number.replace(/^0/, '')}`
      } else {
        delete params.mobile
      }

      try {
        await register(params)
      } catch(e) {
        this.showError = true
        this.loading = false
        return
      }

      if (this.type === 'mobile') {
        this.$router.push({
          name: 'registerVerificationMobile',
          query: {
            mobile: params.mobile,
          },
        })
      } else {
        this.$router.push({
          name: 'registerVerificationEmail',
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
