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
          <h1>{{ $t('signupPage.title') }}</h1>
          <v-tabs
            v-model="type">
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
                autocomplete="off">
                <PhoneField
                  v-if="items[type] === 'mobile'"
                  v-model="form.phone"/>
                <v-text-field
                  v-if="items[type] === 'email'"
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
                  :label="$t('signupPage.agreeTerms')"
                  :rules="[v => validateRequired(v)]"
                  required/>
                <v-btn
                  :disabled="!valid"
                  color="success"
                  @click="register"
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
  </div>
</template>

<script>
import PhoneField from '@/components/PhoneField'
import {
  validateEmail,
  validateRequired,
  validatePassword
} from '@/services/formValidator'

export default {
  components: {
    PhoneField,
  },
  data() {
    return {
      type: null,
      items: ['mobile', 'email'],
      valid: false,
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
  methods: {
    validateEmail,
    validateRequired,
    validatePassword,
    register() {
      this.$refs.form.validate()
      console.log(this.form)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/form-visitor.scss';
</style>
