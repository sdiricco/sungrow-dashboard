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
      <pre>
        {{ deviceListResponse }}

      </pre>
    </template>
  </HCFLayout>
</template>

<script setup lang="ts">
import HCFLayout from "@/layouts/HCFLayout.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { usePowerStationStore } from "@/stores/powerStation";
import { storeToRefs } from "pinia";
import Map from "@/components/Map.vue";
import { computed, onMounted, ref } from "vue";
import { Icon } from "@iconify/vue";

const router = useRouter();

const logout = () => {
  router.push("/login");
};

const { loginResponse } = storeToRefs(useAuthStore());
const {
  powerStationResponse,
  deviceTypeResponse,
  powerStationDetail,
  deviceListResponse,
  loading,
} = storeToRefs(usePowerStationStore());
const { getPowerStationList, getPowerStationDetail, getDeviceListByUser } = usePowerStationStore();
const { login } = useAuthStore();

const powerStationList = computed(
  () => powerStationResponse.value?.result_data.pageList || []
);

const sn = ref<string>("");

onMounted(() => {
  getDeviceListByUser();
});
</script>
