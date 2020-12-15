<template>
  <UserAccess>
    <template v-slot:title>{{ $t('pages.login.title') }}</template>
    <template>
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
            @submit="login">
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
            <v-btn
              :loading="loading"
              :disabled="!valid || loading"
              type="submit"
              color="success"
              width="100%"
              class="mt-4">
              {{ $t('login') }}
            </v-btn>
          </v-form>
          <div class="text-center mt-4">
            <router-link :to="{ name: 'register' }">{{ $t('register') }}</router-link>
          </div>
        </v-card-text>
      </v-card>
    </template>
    <Snackbar
      v-model="error"
      color="error">
      <v-icon>mdi-close-octagon</v-icon>
      {{ $t('pages.register.error') }}
    </Snackbar>
  </UserAccess>
</template>

<script>
import { login } from '@/api/user'
import PhoneField from '@/components/PhoneField'
import Snackbar from '@/components/Snackbar'
import UserAccess from '@/components/UserAccess'
import {
  validateEmail,
  validateRequired,
  validatePassword
} from '@/services/formValidator'

export default {
  components: {
    PhoneField,
    Snackbar,
    UserAccess,
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
    async login(e) {

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
        await login(params)
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
