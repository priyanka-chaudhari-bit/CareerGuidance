import React, { useEffect, useState } from "react";
import { PencilSimpleLineIcon, TrashIcon} from "@phosphor-icons/react"

const CreateTestCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    setMsg("");
    try {
      const response = await fetch("http://127.0.0.1:8000/admin/categories/", {
        method: "GET"
      });

      if (!response.ok) throw new Error("Failed to fetch categories");

      const data = await response.json();
      console.log("fetched categories",data)
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setMsg(" Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const response = await fetch("http://127.0.0.1:8000/admin/categories/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.detail || "Error creating category");
      }

      setMsg("Category created successfully!");
      setName("");
      fetchCategories();
    } catch (error) {
      console.error("Error creating category:", error);
      setMsg("Error creating category.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/category/${id}/`, {
          method: 'DELETE'
        });

        if (response.status === 204) {
          setCategories(categories.filter(cat => cat.id !== id));
          setMsg("Category deleted successfully.");
        } else {
          setMsg("Failed to delete category.");
        }
      } catch (error) {
        console.error(error);
        setMsg("An error occurred while deleting.");
      }
    };

    const handleEdit = async (cat) => {
      const newName = prompt("Enter new name", cat.name);
      if (!newName || newName.trim() === "") return;

      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/category/${cat.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: newName }),
        });

        if (response.ok) {
          const updatedCategory = await response.json();
          setCategories(categories.map(c => c.id === cat.id ? updatedCategory : c));
          setMsg("Category updated successfully.");
        } else {
          setMsg("Failed to update category.");
        }
      } catch (error) {
        console.error(error);
        setMsg("An error occurred while updating.");
      }
    };


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Test Category</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Create
        </button>
      </form>

      {msg && <p style={styles.message}>{msg}</p>}

      <h3 style={styles.subheading}>Existing Categories</h3>
      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : categories.length > 0 ? (
        <ul style={styles.list}>
          {categories.map((cat) => (
            <div key={cat.id} style={{display:'flex',flexDirection:'row', gap:'1rem'}}>
            <li style={styles.listItem}>
              {cat.name}
            </li>
            <li onClick={() => handleEdit(cat)} style={{ cursor: 'pointer' }}><PencilSimpleLineIcon size={32} color="#d59710" weight="duotone" /></li>
            <li onClick={() => handleDelete(cat.id)} style={{ cursor: 'pointer' }}><TrashIcon size={32} color="#d51010" weight="duotone" /></li>
            
            </div>
          ))}
        </ul>
      ) : (
        <p style={styles.noData}>No categories found.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: "#fdfdfd",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "2rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    maxWidth: "600px",
    margin:'auto',
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#2c3e50",
  },
  form: {
    display: "flex",
    marginBottom: "1rem",
    gap: "0.5rem",
  },
  input: {
    flex: 1,
    padding: "0.6rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0.6rem 1.2rem",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  message: {
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#2ecc71",
  },
  subheading: {
    marginTop: "1rem",
    marginBottom: "0.5rem",
    fontSize: "1.2rem",
  },
  loading: {
    fontStyle: "italic",
    color: "#888",
  },
  noData: {
    color: "#999",
    fontStyle: "italic",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    background: "#ecf0f1",
    marginBottom: "0.5rem",
    padding: "0.6rem",
    borderRadius: "5px",
    width: "100%",
  },
};

export default CreateTestCategory;
