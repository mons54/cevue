<template>
  <v-app-bar
    app
    color="secondary"
    dark>
    <div class="logo">
      <img src="@/assets/logo.svg">
      <span class="primary--text">Bi</span>
      <span>Star</span>
    </div>

    <v-spacer></v-spacer>

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
    <v-menu
      offset-y
      open-on-hover>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          v-bind="attrs"
          v-on="on"
          text
        >
          Dropdown
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in lang"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
}
</script>
