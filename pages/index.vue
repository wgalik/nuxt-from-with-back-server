<script setup lang="ts">
import { ref } from "vue";

const firstNameFromBack = ref<string>();
const lastNameFromBack = ref<string>();
const msg = ref<string>();

const firstName =  ref<string>();
const lastName =  ref<string>();



const handleForm = async () => {
  try {
    const response = await fetch("/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
      }),
    });

    const data = await response.json();

    firstNameFromBack.value = data.firstName;
    lastNameFromBack.value = data.lastName;
    msg.value = data.msg;
  } catch (error) {
    console.error("Error sending form:", error);
  }
};
</script>
<template>
  <h1>test</h1>
  <form action="submit" method="post" @submit.prevent="handleForm">
    <label for="first-name" class="mt-4 block">
      First name
      <input
        class="px-4 border rounded-full border-pink-500 text-xl"
        type="text"
        name="first-name"
        id="first-name"
        v-model="firstName"
        placeholder="First Name"
      />
    </label>

    <label for="last-name" class="mt-4 block">
      First name
      <input
        class="px-4 border rounded-full border-pink-500 text-xl"
        type="text"
        name="last-name"
        id="last-name"
        v-model="lastName"
        placeholder="Last Name"
      />
    </label>
    <input
      type="submit"
      value="Send to back"
      class="border rounded-full px-5 m-5 font-bold bg-red-500 hover:text-white hover:bg-pink-500 transition duration-300 ease"
    />
  </form>
  <h2>{{ msg }}</h2>
  <div class="result-front border p-8 m-4 under">
    <h2 class="underline">Result from front</h2>
    <p>First name: {{ firstName }}</p>
    <p>Last name: {{ lastName }}</p>
  </div>
  <div class="result-front border p-8 m-4 under">
    <h2 class="underline">Result from back</h2>
    <p>First name: {{ firstNameFromBack }}</p>
    <p>Last name: {{ lastNameFromBack }}</p>
  </div>
  
</template>
<style scoped></style>
