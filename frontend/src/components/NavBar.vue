<template>
  <v-app-bar color="primary" density="comfortable">
    <v-app-bar-nav-icon
      class="d-flex d-md-none"
      @click="drawer = !drawer"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>Minha Biblioteca</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Botões normais só aparecem em telas médias pra cima -->
    <div class="d-none d-md-flex">
      <v-btn to="/">Início</v-btn>
      <v-btn to="/login">Login</v-btn>
      <v-btn to="/cadastro">Cadastro</v-btn>
      <v-btn to="/contato">Contato</v-btn>
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer">
    <v-list>
      <v-list-item to="/" title="Início"></v-list-item>
      <v-list-item to="/login" title="Login"></v-list-item>
      <v-list-item to="/cadastro" title="Cadastro"></v-list-item>
      <v-list-item to="/contato" title="Contato"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(false);
</script>