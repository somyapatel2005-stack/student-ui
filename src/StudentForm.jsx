
import { useState } from "react";
import { createStudent } from "./api";

const emptyForm = { name: "", email: "", course: "", age: "" };

function StudentForm({ onSaved }) {
  const [form, setForm] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // page reload na ho
    setSaving(true);
    setFieldErrors({});
    setMessage("");

    try {
      await createStudent({ ...form, age: Number(form.age) });
      setForm(emptyForm);
      onSaved(); // list dobara load karo
    } catch (err) {
      setFieldErrors(err.fieldErrors || {});
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="student-form">
      <h2>Add Student</h2>

      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} />
        {fieldErrors.name && <span className="error">{fieldErrors.name}</span>}
      </label>

      <label>
        Email
        <input name="email" value={form.email} onChange={handleChange} />
        {fieldErrors.email && (
          <span className="error">{fieldErrors.email}</span>
        )}
      </label>

      <label>
        Course
        <input name="course" value={form.course} onChange={handleChange} />
        {fieldErrors.course && (
          <span className="error">{fieldErrors.course}</span>
        )}
      </label>

      <label>
        Age
        <input
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
        />
        {fieldErrors.age && <span className="error">{fieldErrors.age}</span>}
      </label>

      {message && <p className="error">{message}</p>}

      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Add Student"}
      </button>
    </form>
  );
}

export default StudentForm;