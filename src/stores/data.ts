import { defineStore } from "pinia";
import { computed, ref } from "vue";
import * as api from "../api";
import type { PowerStationResponse } from "../api/interfaces";
import { useAuthStore } from "./auth";

export const useDataStore = defineStore("data", () => {
  //Getters from other stores
  const getToken = computed(() => useAuthStore().token);


  const timeoutId = ref<number | null>(null);

  const powerStationResponse = ref<PowerStationResponse | null>(null);

  /**
   * Fetches the list of power stations using the authenticated token.
   *
   * This function attempts to retrieve the power station list by sending a request
   * to the API endpoint. It requires a valid token to be present, otherwise it will
   * throw an error indicating that the token is not found.
   *
   * @throws {Error} If the token is not found in the store.
   */
  async function getPowerStationList() {
    try {
      const token = getToken.value;
      if (token === null) {
        throw new Error("Token not found");
      }
      if (timeoutId.value !== null) {
        clearInterval(timeoutId.value);
      }
      timeoutId.value = setInterval(async ()=> {
        const r = await api.getPowerStationList(token);
        powerStationResponse.value = r.data;
      }, 1000)

    } catch (error) {
      console.error(error);
    }
  }
  return {powerStationResponse, getPowerStationList };
});
