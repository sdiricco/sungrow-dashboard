<template>
  <div class="p-4">
    <!--Login-->
    <section class="border-b-2 pb-4 mb-4">
      <h1 class="text-3xl font-bold">SUNGROW MONITORING SYSTEM</h1>
      <button class="bg-primary text-contrast px-4 py-2 cursor-pointer rounded mb-4" @click="login">
        Login
      </button>
      <pre class="text-sm border p-4">
        {{ loginResponse }}
      </pre>
    </section>
    <!--Power Station List-->
    <section class="border-b-2 pb-4 mb-4">
      <button class="bg-primary text-contrast px-4 py-2 cursor-pointer rounded mb-4" @click="getPowerStationList">
        GET POWER STATION LIST
      </button>
      <pre class="text-sm border p-4">
        {{ powerStationResponse }}
      </pre>
    </section>
    <!--Map-->
    <section class="border-b-2 pb-4 mb-4">
      <div v-for="(powerStation, idx) in powerStationList" :key="idx">
        <div>
          <div class="flex">
            <h2 class="text-xl mr-2">Power station name: </h2>
            <h2 class="text-xl">{{ powerStation.ps_name }}</h2>
          </div>
          <div class="flex">
            <h2 class="text-xl mr-2">Power: </h2>
            <h2 class="text-xl">{{ `${powerStation.curr_power.value}${ powerStation.curr_power.unit}/${ powerStation.total_capcity.value}${ powerStation.total_capcity.unit}` }}</h2>

          </div>
        </div>
        <Map :latitude="powerStation.latitude" :longitude="powerStation.longitude"></Map>
      </div>
    </section>
    <!--Map-->
    <section>
      
    </section>

  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "./stores/auth";
import { useDataStore } from "./stores/data";
import { storeToRefs } from "pinia";
import Map from "./components/Map.vue";
import { computed } from "vue";

const { loginResponse } = storeToRefs(useAuthStore());
const { powerStationResponse } = storeToRefs(useDataStore());

const powerStationList = computed(
  () => powerStationResponse.value?.result_data.pageList
);

const { getPowerStationList } = useDataStore();
const { login } = useAuthStore();
</script>
