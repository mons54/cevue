<template>
  <div class="login">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
          offset-md="3">
          <h1>{{ $t('login.title') }}</h1>
          <v-tabs>
            <v-tab>{{ $t('email') }}</v-tab>
            <v-tab>{{ $t('mobile') }}</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/form-visitor.scss';
</style>
