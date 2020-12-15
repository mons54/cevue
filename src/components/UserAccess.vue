<template>
  <div class="user-access">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="4"
          offset-md="3"
          offset-lg="4">
          <h1><slot name="title"></slot></h1>
          <slot></slot>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/user-access.scss';
</style>
