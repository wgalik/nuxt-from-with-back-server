# Nuxt Form Handling Example

This project demonstrates a simple form submission flow in **Nuxt 4** using the **Composition API**, **TypeScript**, and **server API routes**.
The example shows how to:

- Use `ref()` to store reactive form data
- Submit data to a backend API using `fetch()`
- Handle the response and display returned values on the frontend
- Create a basic server endpoint using `defineEventHandler`

## 📌 Features

- Two-way data binding with `v-model`
- POST request to a local API route (`/api/form`)
- TypeScript support
- Server-side body parsing using `readBody(event)`
- Displaying frontend values and backend response for comparison

## 🧩 Frontend Code Overview (`<script setup>`)

The form collects a first name and last name using two controlled inputs. On submission, the `handleForm()` function sends a POST request to `/api/form` and updates the UI with the response:

```
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
```

The template displays:

- Inputs for user data
- Form submit button
- Data entered on the frontend
- Data returned from the backend

## 🖥️ Backend Code Overview (`/api/form`)

The API route reads the request body and returns the same values back, along with a confirmation message:

```
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return {
    firstName: body.firstName,
    lastName: body.lastName,
    msg: "Data sent correctly",
  };
});
```

This endpoint can later be expanded to store data in a database or forward it to another service.

## 📂 Project Structure

```
/pages
  index.vue          # Frontend with form
/server/api/form.ts  # Backend API route
```

## 📝 Summary

This example is a clean starting point for building forms in Nuxt 4.
It shows how to connect the frontend and backend, handle API responses, and work with reactive state using Vue’s Composition API.
