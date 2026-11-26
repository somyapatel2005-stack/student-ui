const BASE_URL = "http://localhost:8080/api/students";

// Har response ko ek jagah handle karte hain
async function handleResponse(res) {
  if (res.ok) {
    return res.status === 204 ? null : res.json();
  }

  // Spring ka error JSON padho (message aur field errors)
  let data = {};
  try {
    data = await res.json();
  } catch {
    // body khali ho to ignore
  }
  const error = new Error(data.message || "something went wrong");
  error.fieldErrors = data.errors || {};
  throw error;
}

export async function getStudents() {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
}

export async function createStudent(student) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
    
  });
  return handleResponse(res);
}