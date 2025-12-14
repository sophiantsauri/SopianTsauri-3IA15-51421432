import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [catatan, setCatatan] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // READ: ambil data dari localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("catatan")) || [];
    setCatatan(data);
  }, []);

  // CREATE & UPDATE
  const simpanCatatan = (e) => {
    e.preventDefault();

    let dataBaru = [...catatan];
    if (editIndex !== null) {
      dataBaru[editIndex] = input;
      setEditIndex(null);
    } else {
      dataBaru.push(input);
    }

    setCatatan(dataBaru);
    localStorage.setItem("catatan", JSON.stringify(dataBaru));
    setInput("");
  };

  // DELETE
  const hapusCatatan = (index) => {
    const dataBaru = catatan.filter((_, i) => i !== index);
    setCatatan(dataBaru);
    localStorage.setItem("catatan", JSON.stringify(dataBaru));
  };

  return (
    <div className="container">
      <h2>Aplikasi Manajemen Catatan</h2>

      <form onSubmit={simpanCatatan}>
        <input
          type="text"
          placeholder="Tulis catatan"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button type="submit">
          {editIndex !== null ? "Update" : "Simpan"}
        </button>
      </form>

      <ul>
        {catatan.map((item, index) => (
          <li key={index}>
            {item}
            <div>
              <button
                onClick={() => {
                  setInput(item);
                  setEditIndex(index);
                }}
              >
                Edit
              </button>
              <button onClick={() => hapusCatatan(index)}>
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;