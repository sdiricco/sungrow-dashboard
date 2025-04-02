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
  const deviceListResponse = ref<any>(null);
  const realTimeData = ref<any>(null);

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

  async function getDeviceList(ps_id:string){
    try {
      const token = getToken.value;
      if (token === null) {
        throw new Error("Token not found");
      }
      const r = await api.getDeviceList(token, ps_id);
      deviceListResponse.value = r.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getRealTimeData(){
    try {
      const token = getToken.value;
      if (token === null) {
        throw new Error("Token not found");
      }
      // const r = await api.gerDeviceRealTimeData(token, {
      //   device_type:22,
      //   point_id_list: ["10555",
      //     "10557",
      //     "10559", 
      //     "10561", 
      //     "10575", 
      //     "10576", 
      //     "10577", 
      //     "10026", 
      //     "10046",
      //     "10567", 
      //     "10569", 
      //     "10571",
      //     "10573",
      //     "10587", 
      //     "10510", 
      //     "10511", 
      //     "10028"
      //   ],
      //   ps_key_list: ["5685730_22_247_1"],
      //   sn_list: []
      // });

      const r = await api.gerDeviceRealTimeData(token, {
        device_type:7,
        point_id_list: [
        ],
        ps_key_list: [],
        sn_list: ["A2411703155"]
      });
      realTimeData.value = r.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getPVInverterRealTimeData(){
    const token = getToken.value;
    if (token === null) {
      throw new Error("Token not found");
    }
    const r = await api.getPVInverterRealTimeData(token, {
      ps_key_list: ["5685730_14_1_1"],
      sn_list: []
    });
    realTimeData.value = r.data;
  }

  return {powerStationResponse, loading, deviceListResponse,  powerStationDetail, realTimeData, powerStationSelected, getDeviceList, getPVInverterRealTimeData, getRealTimeData, getDeviceListByUser, getPowerStationList, getPowerStationDetail };


});
