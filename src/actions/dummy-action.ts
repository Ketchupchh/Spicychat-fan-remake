"use server";

export async function dummyAction() {
  console.log("[dummyAction] Prentend this is some useful data.");

  return {
    data: {
      name: "Dummy Data",
    },
  };
}
