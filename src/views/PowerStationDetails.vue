<template>
  <HCFLayout classContent="overflow-y-scroll h-full bg-slate-100">
    <template #header>
      <div class="p-4 bg-slate-900 text-contrast">
        <div class="flex align-items-center justify-between">
          <h2 class="text-2xl font-bold">SUNGROW MONITORING SYSTEM</h2>
          <button
            class="bg-contrast text-primary px-4 py-2 cursor-pointer rounded"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </template>
    <template #content>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <div
          v-for="(device, idx) in devices"
          :key="idx"
          class="border rounded-2xl p-4 shadow-md bg-white"
        >
          <h2 class="text-xl font-semibold text-gray-800 mb-2">
            {{ device.device_name }}
          </h2>

          <div class="text-gray-600 text-sm space-y-1 mb-4">
            <p>
              <span class="font-semibold">Type:</span> {{ device.type_name }}
            </p>
            <p>
              <span class="font-semibold">Device SN:</span>
              {{ device.device_sn }}
            </p>
            <p>
              <span class="font-semibold">Status:</span>
              {{ device.dev_status }}
            </p>
            <p>
              <span class="font-semibold">Fault Status:</span>
              {{ device.dev_fault_status }}
            </p>
            <p>
              <span class="font-semibold">Grid Connected:</span>
              {{ formatDate(device.grid_connection_date) }}
            </p>
            <p>
              <span class="font-semibold">Factory:</span>
              {{ device.factory_name }}
            </p>
            <p>
              <span class="font-semibold">Model Code:</span>
              {{ device.device_model_code }}
            </p>
            <p>
              <span class="font-semibold">Comm. Device SN:</span>
              {{ device.communication_dev_sn }}
            </p>
          </div>
          <button @click="onClickDetails(device.device_sn)" class="bg-black text-white p-2 w-full rounded-md">
            Details
          </button>
        </div>
      </div>
      <div class="p-4">
        <h2 class="text-2xl font-bold">Details</h2>
        <pre>
          {{ powerStationDetail }}
        </pre>
      </div>
    </template>
  </HCFLayout>
</template>

<script setup lang="ts">
import HCFLayout from "@/layouts/HCFLayout.vue";
import { useRouter } from "vue-router";
import { usePowerStationStore } from "@/stores/powerStation";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { formatDate } from "@/utils";

const router = useRouter();

const logout = () => {
  router.push("/login");
};

const { deviceListResponse, powerStationDetail } = storeToRefs(usePowerStationStore());
const { getDeviceListByUser, getPowerStationDetail } = usePowerStationStore();
const devices = computed(() => deviceListResponse.value?.result_data.pageList);

function onClickDetails(sn:string){
  getPowerStationDetail(sn);
}

onMounted(() => {
  getDeviceListByUser();
});
</script>
