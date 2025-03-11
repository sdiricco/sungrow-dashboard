<script setup lang="ts">
import { onMounted, defineProps } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Props per latitudine e longitudine
const props = defineProps<{
  latitude: number;
  longitude: number;
  zoom?: number;
}>();

onMounted(() => {
  // Inizializza la mappa
  const map = L.map("map").setView([props.latitude, props.longitude], props.zoom ?? 13);

  // Aggiungi il tile layer (sfondo della mappa)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Aggiungi un marker sulla mappa
  L.marker([props.latitude, props.longitude]).addTo(map);
});
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
