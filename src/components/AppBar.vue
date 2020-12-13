<template>
  <v-app-bar
    app
    color="secondary"
    dark>
    <router-link
      :to="{ name: 'home' }"
      class="logo">
      <img src="@/assets/logo.svg">
      <span class="primary--text">Cha</span>
      <span>Bit</span>
    </router-link>
    <v-toolbar-items
      v-if="!isMobile"
      class="ml-8">
      <v-btn
        text>
        {{ $t('markets') }}
      </v-btn>
      <v-btn
        v-if="!isMobile"
        text>
        {{ $t('trade') }}
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items
      v-if="user">
      <v-btn
        text>
        {{ user.email }}
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items
      v-else>
      <v-btn
        v-if="!isMobile"
        :to="{ name: 'login' }"
        text>
        {{ $t('login') }}
      </v-btn>
      <v-btn
        v-if="!isMobile"
        :to="{ name: 'register' }">
        {{ $t('register') }}
      </v-btn>
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
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      languages: state => state.locale.languages,
      user: state => state.user.data,
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
