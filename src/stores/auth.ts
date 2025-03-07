import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { computed, ref } from "vue";
import * as api from "../api";
import type { LoginResponse } from "../api/interfaces";

export const useAuthStore = defineStore("auth", () => {
  //Auth token
  const token = useLocalStorage<string | null>("auth_token", null);

  //Check if the user is authenticated
  const isAuthenticated = computed(() => !!token.value);

  // Risposta della login
  const loginResponse = ref<LoginResponse | null>(null)

  //Login function
  async function login() {
    try {
      const r = await api.login();
      loginResponse.value = r.data;
      token.value = loginResponse.value.result_data.token;
    } catch (error) {
        console.error(error);
    }
  }

  return { token, isAuthenticated, loginResponse, login };
});
