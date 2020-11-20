<template>
  <v-app-bar
    app
    color="secondary"
    dark>
    <router-link
      to="/"
      class="logo">
      <img src="@/assets/logo.svg">
      <span class="primary--text">Bi</span>
      <span>Star</span>
    </router-link>

    <v-spacer></v-spacer>

    <div v-if="!isMobile">
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        class="mr-4"
        text>
        {{ $t('login') }}
      </v-btn>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        class="mr-4"
        depressed>
        {{ $t('signup') }}
      </v-btn>
    </div>

    <v-menu
      offset-y
      open-on-hover>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          v-bind="attrs"
          v-on="on"
          text>
          {{ language.name }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(language, key) in languages"
            :key="key"
            :href="`/${language.code}${$route.fullPath}`">
            <v-list-item-title>{{ language.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      languages: state => state.locale.languages,
    }),
    ...mapGetters('locale', [
      'language',
    ]),
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
}
</script>
