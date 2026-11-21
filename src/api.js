const BASE_URL = "http://localhost:8080/api/students";

export async function getStudents() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Students does'nt loaded");
  }
  return res.json();
}