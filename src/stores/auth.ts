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
  const loginErrorMessage = ref<string>('')

  const username = ref<string>('');
  const password = ref<string>('');

  //Login function
  async function login() {
    try {
      loginErrorMessage.value = '';
      const r = await api.login(username.value, password.value);
      if (r.data.result_data.login_state === "-1") {
        loginErrorMessage.value = 'Wrong username or password';
        return false;
      }
      loginResponse.value = r.data;
      token.value = r.data.result_data.token;
      return true;
    } catch (error) {
      loginErrorMessage.value = 'Error during login';
      return false;
    }
  }

  return { token, loginErrorMessage, isAuthenticated, username, password, loginResponse, login };
});
