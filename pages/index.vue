<script setup lang="ts">
import { ref } from "vue";

const firstNameFromBack = ref<string>();
const lastNameFromBack = ref<string>();
const msg = ref<string>();

const firstName = ref<string>();
const lastName = ref<string>();

const API: string = "/api/form";

const handleForm = async () => {
  try {
    const response = await fetch(API, {
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

const reset = () => {
  firstName.value = "";
  lastName.value = "";
};
</script>
<template>
  <h1 class="text-center font-bold text-2xl uppercase mt-5">Test</h1>
  <form
    action="submit"
    method="post"
    @submit.prevent="handleForm"
    class="flex justify-center items-center flex-col"
  >
    <label for="first-name" class="mt-4 text-xl">
      First name:
      <input
        class="px-4 border rounded-full border-green-500 text-xl"
        type="text"
        name="first-name"
        id="first-name"
        v-model="firstName"
        placeholder="First Name"
      />
    </label>

    <label for="last-name" class="mt-4 text-xl">
      Last name:
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
  <h2 class="text-center underline h-10 text-blue-500">{{ msg }}</h2>
  <section class="flex justify-center items-center flex-col">
    <div id="result-front" class="border p-8 pt-1 m-4 under">
      <h2 class="underline font-bold">Result from front</h2>
      <p>First name: {{ firstName }}</p>
      <p>Last name: {{ lastName }}</p>
    </div>
    <div id="result-back" class="border p-8 pt-1 m-4 under">
      <h2 class="underline font-bold">Result from back</h2>
      <p>First name: {{ firstNameFromBack }}</p>
      <p>Last name: {{ lastNameFromBack }}</p>
    </div>
    <button
      type="reset"
      class="border rounded-full px-5 m-5 font-bold bg-purple-500 hover:text-white hover:bg-indigo-500 transition duration-300 ease"
      @click="reset"
    >
      Reset front
    </button>
  </section>
</template>
<style scoped></style>
