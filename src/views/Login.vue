<script setup lang="ts">
import { useRouter } from 'vue-router';
import {useAuthStore} from "@/stores/auth";
import { storeToRefs } from 'pinia';
const authStore = useAuthStore();
const {username, password, loginErrorMessage} = storeToRefs(authStore);

const router = useRouter();



const login = async () => {
  const success = await authStore.login();
  if (success) {
    router.push('/powerstationlist');
  }
};
</script>

<template>
  <div class="flex h-screen justify-center items-center bg-gray-100">
    <div class="p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold mb-8">Sungrow monitoring system
      </h1>
      <h2 class="text-xl font-bold mb-4">Login
      </h2>
      <input type="text" placeholder="Username" v-model="username" class="border p-2 w-full mb-2 rounded-md">
      <input type="password" placeholder="Password" v-model="password" class="border p-2 w-full mb-2 rounded-md">
      <div v-if="loginErrorMessage" class="text-red-500 text-sm mb-4">{{ loginErrorMessage }}</div>
      <button @click="login" class="bg-black text-white p-2 w-full rounded-md">
        Accedi
      </button>
    </div>
  </div>
</template>
