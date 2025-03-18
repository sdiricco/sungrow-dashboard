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
      <div class="p-4 overflow-y-auto">
        <div
          class="flex justify-center items-center"
          v-if="loading.getPowerStationList"
        >
          <Icon
            icon="mdi:loading"
            class="animate-spin text-black"
            width="40"
            height="40"
          />
        </div>

        <div
          v-for="(powerStation, idx) in powerStationList"
          :key="idx"
          class="p-4 shadow-lg bg-slate-50 rounded-lg"
        >
          <div class="grid grid-cols-2 gap-4">
            <!-- Map -->
            <div class="w-full h-100">
              <Map
                class="rounded-lg"
                :latitude="powerStation.latitude"
                :longitude="powerStation.longitude"
              />
            </div>
            <!-- Informazioni a destra -->
            <div class="flex flex-col">
              <h2 class="text-lg font-bold">{{ powerStation.ps_name }}</h2>
              <p class="text-sm text-gray-600">
                Posizione: {{ powerStation.ps_location }}
              </p>
              <p class="text-sm text-gray-600">
                Data installazione: {{ powerStation.install_date }}
              </p>
              <p class="text-sm text-gray-600">
                Tipo di impianto: {{ powerStation.ps_type }}
              </p>
              <p class="text-sm text-gray-600">
                Stato:
                {{ powerStation.ps_status === 1 ? "Attivo" : "Inattivo" }}
              </p>

              <hr class="my-2" />

              <p class="text-sm text-gray-600">
                Energia totale: {{ powerStation.total_energy.value }}
                {{ powerStation.total_energy.unit }}
              </p>
              <p class="text-sm text-gray-600">
                Energia di oggi: {{ powerStation.today_energy.value }}
                {{ powerStation.today_energy.unit }}
              </p>
              <p class="text-sm text-gray-600">
                Potenza corrente: {{ powerStation.curr_power.value }}
                {{ powerStation.curr_power.unit }}
              </p>
              <p class="text-sm text-gray-600">
                Entrate totali: {{ powerStation.total_income.value }}
                {{ powerStation.total_income.unit }}
              </p>
              <p class="text-sm text-gray-600">
                Entrate di oggi: {{ powerStation.today_income.value }}
                {{ powerStation.today_income.unit }}
              </p>
              <p class="text-sm text-gray-600">
                Riduzione CO2 totale:
                {{ powerStation.co2_reduce_total.value }}
                {{ powerStation.co2_reduce_total.unit }}
              </p>
              <p class="text-sm text-gray-600">
                Ore equivalenti: {{ powerStation.equivalent_hour.value }}
                {{ powerStation.equivalent_hour.unit }}
              </p>

              <hr class="my-2" />

              <p class="text-sm text-gray-600">
                Ultimo aggiornamento potenza corrente:
                {{ formatDate(powerStation.curr_power_update_time) }}
              </p>
              <p class="text-sm text-gray-600">
                Ultimo aggiornamento riduzione CO2:
                {{ formatDate(powerStation.co2_reduce_total_update_time) }}
              </p>

              <!-- Bottone CTA -->
              <div class="mt-auto">
                <button
                  class="w-full bg-slate-900 text-contrast py-2 rounded-md hover:bg-slate-800 transition duration-200"
                  @click="setPowerStation(powerStation)"
                >
                  Entra
                </button>
              </div>
            </div>
          </div>
        </div>
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
import { computed, onMounted, } from "vue";
import { Icon } from "@iconify/vue";
import type { PowerStation } from "@/api/interfaces";
import { formatDate } from "@/utils";

const router = useRouter();

const logout = () => {
  router.push("/login");
};

const { } = storeToRefs(useAuthStore());
const {
  powerStationResponse,
  powerStationSelected,
  loading,
} = storeToRefs(usePowerStationStore());
const { getPowerStationList, } = usePowerStationStore();
const { } = useAuthStore();

const powerStationList = computed(
  () => powerStationResponse.value?.result_data.pageList || []
);


function setPowerStation(ps:PowerStation) {
  powerStationSelected.value = ps;
  router.push(`/powerstationdetails/${ps.ps_id}`,);
}

onMounted(() => {
  getPowerStationList();
});
</script>
