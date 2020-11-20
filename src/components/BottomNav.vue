<template>
  <v-bottom-navigation
    fixed
    color="primary"
  >
    <v-btn>
      <span>{{ $t('home') }}</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn>
      <span>{{ $t('markets') }}</span>
      <v-icon>mdi-distribute-horizontal-center</v-icon>
    </v-btn>

    <v-btn>
      <span>{{ $t('trade') }}</span>
      <v-icon>mdi-swap-vertical-bold</v-icon>
    </v-btn>

    <v-btn>
      <span>{{ $t('wallet') }}</span>
      <v-icon>mdi-wallet</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
