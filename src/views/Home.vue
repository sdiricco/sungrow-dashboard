<template>
  <HCFLayout>
    <template #header>
      <div class="p-4 bg-gray-100">
        <div class="flex align-items-center justify-between">
          <h2 class="text-2xl font-bold">SUNGROW MONITORING SYSTEM</h2>
          <button
            class="bg-primary text-contrast px-4 py-2 cursor-pointer rounded"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </template>
    <template #content>
      <div class="p-4">
        <div class="flex justify-center items-center" v-if="loading.getPowerStationList">
          <Icon
            icon="mdi:loading"
            class="animate-spin text-black"
            width="40"
            height="40"
          />
        </div>
        <!--Power Station List-->
        <section class="border-b-2 pb-4 mb-4">
          <pre class="text-sm border p-4">
        {{ powerStationResponse }}
      </pre
          >
        </section>
      </div>
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
const { powerStationResponse, deviceTypeResponse, powerStationDetail, loading } =
  storeToRefs(usePowerStationStore());
const { getPowerStationList, getPowerStationDetail } =
  usePowerStationStore();
const { login } = useAuthStore();

const powerStationList = computed(
  () => powerStationResponse.value?.result_data.pageList
);

const sn = ref<string>("");

onMounted(() => {
  getPowerStationList();
});
</script>
