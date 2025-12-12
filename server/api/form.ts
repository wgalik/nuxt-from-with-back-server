export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  //   console.log("Received data:", body);

  // Tutaj możesz zapisać dane do bazy lub wysłać dalej
  return {
    firstName: body.firstName,
    lastName: body.lastName,
    msg: "Data sent correctly",
  };
});
