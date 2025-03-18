import { defineStore } from "pinia";
import { computed, ref } from "vue";
import * as api from "../api";
import type { PowerStation, PowerStationResponse } from "../api/interfaces";
import { useAuthStore } from "./auth";

export const usePowerStationStore = defineStore("power-station", () => {
  //Getters from other stores
  const getToken = computed(() => useAuthStore().token);
  const powerStationResponse = ref<PowerStationResponse | null>(null);
  const powerStationSelected = ref<PowerStation | null>(null);
  const powerStationDetail = ref<any>(null);
  const deviceTypeResponse = ref<any>(null);
  const deviceListResponse = ref<any>(null);

  const loading = ref<{
    getPowerStationList: boolean,
    getDeviceList: boolean,
    getPowerStationDetail: boolean
  }>({
    getDeviceList: false,
    getPowerStationDetail: false,
    getPowerStationList: false
  })


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
      loading.value.getPowerStationList = true
      const token = getToken.value;
      if (token === null) {
        throw new Error("Token not found");
      }
      const r = await api.getPowerStationList(token);
      powerStationResponse.value = r.data;
    } catch (error) {
      console.error(error);
    }
    loading.value.getPowerStationList = false
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
      if(!powerStationSelected.value){
        throw new Error("Power station not selected");
      }
      const r = await api.getPowerStationDetail(token, sn);
      powerStationDetail.value = r.data;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Fetches the list of devices associated with the authenticated user.
   *
   * This function attempts to retrieve the device list by sending a request
   * to the API endpoint. It requires a valid token to be present, otherwise it will
   * throw an error indicating that the token is not found.
   *
   * @throws {Error} If the token is not found in the store.
   */

  async function getDeviceListByUser(){
    try {
      const token = getToken.value;
      if (token === null) {
        throw new Error("Token not found");
      }
      const r = await api.getDeviceListByUser(token);
      deviceListResponse.value = r.data;
    } catch (error) {
      console.error(error);
    }
  }

  return {powerStationResponse, loading, deviceTypeResponse, deviceListResponse, powerStationDetail, powerStationSelected, getDeviceListByUser, getPowerStationList, getPowerStationDetail };


});
