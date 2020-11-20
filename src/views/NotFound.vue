<template>
  <v-container id="notFound">
    <v-row>
      <v-col
        cols="12"
        md="6">
        <div class="image">
          <img
            src="@/assets/404.svg"
            alt="Image Page 404 Not Found">
        </div>
      </v-col>
      <v-col
        cols="12"
        md="6">
        <div class="text">
          <div class="intro">Bitcoin is dead !?</div>
          <div class="code">404</div>
          <div class="message">Page Not Found</div>
        </div>
      </v-col>
    </v-row>
    <v-row class="link">
      <v-col cols="12">
        <router-link to="/">{{ $t('goToHomepage') }}</router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
#notFound {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  .image {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    height: 100%;
    img {
      width: 50%;
      @media screen and (min-width: 960px) {
        width: 60%;
      }
    }
  }
  .text {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    height: 100%;
    @media screen and (min-width: 960px) {
      align-items: flex-start;
    }
    .intro {
      font-size: 2rem;
      @media screen and (min-width: 640px) {
        font-size: 2.5rem;
      }
      @media screen and (min-width: 1264px) {
        font-size: 3rem;
      }
      font-weight: 500;
    }
    .code {
      font-size: 4rem;
      @media screen and (min-width: 640px) {
        font-size: 6rem;
      }
      @media screen and (min-width: 1264px) {
        font-size: 8rem;
      }
      font-weight: 500;
    }
    .message {
      @media screen and (min-width: 640px) {
        font-size: 1.6rem;
      }
      @media screen and (min-width: 1264px) {
        font-size: 2rem;
      }
      text-transform: uppercase;
    }
  }
  .link {
    margin-top: 4rem;
  }
}
</style>
