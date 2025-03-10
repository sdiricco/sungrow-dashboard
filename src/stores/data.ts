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

  const powerStationDetail = ref<any>(null);

  const deviceTypeResponse = ref<any>(null);


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


  /**
   * Fetches the list of devices for the given power station id.
   *
   * This function attempts to retrieve the list of devices for the given power station
   * id by sending a request to the API endpoint. It requires a valid token to be
   * present, otherwise it will throw an error indicating that the token is not found.
   *
   * @throws {Error} If the token is not found in the store.
   * @param {string} ps_id - The id of the power station to retrieve the devices for.
   */
  async function getDeviceList(ps_id: string) {
    try {
      const token = getToken.value;
      if (token === null) {
        throw new Error("Token not found");
      }
      const r = await api.getDeviceList(token, ps_id);
      deviceTypeResponse.value = r.data;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Fetches the detail of a power station given its serial number.
   *
   * This function attempts to retrieve the detail of a power station by sending a
   * request to the API endpoint. It requires a valid token to be present,
   * otherwise it will throw an error indicating that the token is not found.
   *
   * @throws {Error} If the token is not found in the store.
   */
  async function getPowerStationDetail(sn:string) {
    try {
      const token = getToken.value;
      if (token === null) {
        throw new Error("Token not found");
      }
      if(!sn){
        throw new Error("Req serial number not found");
      }
      const r = await api.getPowerStationDetail(token, sn);
      powerStationDetail.value = r.data;
    } catch (error) {
      console.error(error);
    }
  }

  return {powerStationResponse, deviceTypeResponse, powerStationDetail, getPowerStationList, getDeviceList, getPowerStationDetail };


});
