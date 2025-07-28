import React, { useState, useEffect } from "react";
import "../styles/CreateAptiQuestion.css"
import { PencilSimpleLineIcon, TrashIcon} from "@phosphor-icons/react"

const CreateAptiQuestion = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [text, setText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState([
    { text: "", is_correct: false },
    { text: "", is_correct: false },
    { text: "", is_correct: false },
    { text: "", is_correct: false },
  ]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // Fetch categories from API
    console.log("Fetching categories...");
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/admin/categories/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
          },
        });
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };

    fetchCategories();
  }, []);

 useEffect(() => {
    fetch("http://127.0.0.1:8000/admin/admin-questions/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("admin-questions",data)
        setQuestions(data);
      })
      .catch((error) => {
        console.error("Failed to load questions:", error);
      });
  }, []);


  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...options];
    updatedOptions[index][field] = field === "is_correct" ? value === "true" : value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    const payload = {
      [editingId ? "category_name" : "category"]: category,
      text,
      options,
    };
    const method = editingId ? "PUT" : "POST";
    try {
      const url = editingId
      ? `http://127.0.0.1:8000/admin/update-apti-ques/${editingId}/`
      : `http://127.0.0.1:8000/admin/create-apti-question/`;
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log("create apti ques:",JSON.stringify(payload))

      const data = await response.json();
      if (!response.ok) throw new Error(data?.detail || "Failed to create question");

      setMsg(editingId ? "Question updated successfully!" : "Question created successfully!");
      setEditingId(null);
      setCategory("");
      setText("");
      setOptions([
        { text: "", is_correct: false },
        { text: "", is_correct: false },
        { text: "", is_correct: false },
        { text: "", is_correct: false },
      ]);
      setShowModal(false);
       // Re-fetch questions
      const res = await fetch("http://127.0.0.1:8000/admin/admin-questions/");
      const updated = await res.json();
      setQuestions(updated);
    } catch (error) {
      setMsg(error.message || "Error creating question");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/admin/delete-apti-ques/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete question");
      alert("Question Deleted Successfully!!")

      // Refresh the list
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (question) => {
    console.log("handle edit is clicked")
    setEditingId(question.id);
    setCategory(question.category); 
    setText(question.text);
    setOptions(question.options.map(({ text, is_correct }) => ({ text, is_correct })));
    setShowModal(true); 
  };

  

  return (
    <>
    {showModal && (
    <div className="modal-backdrop" style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex",
      justifyContent: "center", alignItems: "center", zIndex: 999
    }}>
      <div className="modal-content" style={{
        background: "#fff", padding: "2rem", borderRadius: "10px", maxWidth: "600px", width: "100%"
      }}>
        <h2>Edit Aptitude Question</h2>
        <form onSubmit={handleSubmit}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Question Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={3}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          ></textarea>

          {options.map((option, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem", gap: "0.5rem" }}>
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) => handleOptionChange(index, "text", e.target.value)} 
                required
                style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
              />
              <select
                value={option.is_correct.toString()}
                onChange={(e) => handleOptionChange(index, "is_correct", e.target.value)}
                style={{ padding: "0.5rem" }}
              >
                <option value="false">Incorrect</option>
                <option value="true">Correct</option>
              </select>
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
            <button type="submit" style={{ padding: "0.6rem 1.2rem" }}>
              Save Changes
            </button>
            <button type="button" onClick={() => setShowModal(false)} style={{ padding: "0.6rem 1.2rem" }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Create Aptitude Question</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Question Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows={3}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        ></textarea>

        {options.map((option, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.5rem",
              gap: "0.5rem",
            }}
          >
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option.text}
              onChange={(e) => handleOptionChange(index, "text", e.target.value)} 
              required
              style={{ padding: "0.5rem 1rem",minWidth: "0",fontSize: "1rem"}}
            />
            <select
              value={option.is_correct.toString()}
              onChange={(e) => handleOptionChange(index, "is_correct", e.target.value)}
              style={{ padding: "0.5rem" }}
            >
              <option value="false">Incorrect</option>
              <option value="true">Correct</option>
            </select>
          </div>
        ))}

        <button type="submit" style={{ padding: "0.6rem 1.2rem", marginTop: "1rem" }}>
          Create Question
        </button>
      </form>
      {msg && <p style={{ marginTop: "1rem", color:"Highlight" }}>{msg}</p>}
      
    </div>
    <h3 style={{ marginTop: '40px' }}>All Aptitude Questions</h3>
      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <table border="1" cellPadding="10" className="apti-table" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Option A</th>
              <th>Option B</th>
              <th>Option C</th>
              <th>Option D</th>
              <th>Correct Answer</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, index) => (
              <tr key={q.id || index}>
                <td>{index + 1}</td>
                <td>{q.text}</td>
                <td>{q.options[0]?.text || ""}</td>
                <td>{q.options[1]?.text || ""}</td>
                <td>{q.options[2]?.text || ""}</td>
                <td>{q.options[3]?.text || ""}</td>
                <td>{q.options.find(opt => opt.is_correct)?.text || "N/A"}</td>
                <td>{q.category || "N/A"}</td>
                <td>
                  <div style={{display:"flex",flexDirection:'row',gap:'5px'}}>
                    <PencilSimpleLineIcon size={32} color="#d59710" weight="duotone" onClick={() => handleEdit(q)}/>
                    <TrashIcon size={32} color="#d51010" weight="duotone" onClick={() => handleDelete(q.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CreateAptiQuestion;
