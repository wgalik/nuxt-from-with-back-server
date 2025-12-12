# Nuxt Form Handling Example

This project demonstrates a simple form submission workflow in **Nuxt 4** using the **Composition API**, _TypeScript_, and Nuxt’s built-in **server routes**.
It allows users to submit basic form data, send it to a backend API, receive a response, and display both frontend values and backend-returned values.

## 📌 Features

- Reactive state management using `ref()`
- Centralized API endpoint constant (`API`)
- POST request to a local Nuxt server route (`/api/form`)
- Reset functionality for clearing frontend inputs
- TypeScript support throughout the component
- Displays:
  - Data entered on the frontend
  - Data returned from the backend
  - Confirmation message

## 🧩 Frontend Code Overview

The component contains:

**Reactive values**

- `firstName`, `lastName` – user input
- `firstNameFromBack`, `lastNameFromBack` – server response
- `msg` – backend message
- `API` constant for the endpoint URL

**Form submission logic**

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

**Reset function**

A simple function to clear frontend input values:

```
const reset = () => {
  firstName.value = "";
  lastName.value = "";
};
```

**Template
**

- Form with two inputs
- Submit button
- Message from backend
- Two result sections (front + back)
- Reset button for clearing frontend data

## 🖥️ Backend API Overview (`/api/form`)

The server endpoint receives data from the form, processes it, and returns a response:

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

You can expand this API in the future to add validation, database storage, or forwarding logic.

## 📂 Project Structure

```
/pages
  index.vue          # Frontend with form
/server/api/form.ts  # Backend API route
```

## 📝 Summary

This example is a clear demonstration of how to:

- Use Nuxt 4 with TypeScript
- Handle form data on both the frontend and backend
- Build reactive UI elements using the Composition API
- Implement simple reset and API communication logic
