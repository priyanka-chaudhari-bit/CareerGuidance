import React, { useState, useEffect } from "react";
import "../styles/CollegeCategoryForm.css"
import { PencilSimpleLineIcon, TrashIcon} from "@phosphor-icons/react"

const CollegeCategoryForm = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  // Fetch existing college categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/admin/college-types/");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Submit new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/admin/college-types/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      alert("College category added successfully!");
      setName("");
      fetchCategories(); 
    } catch (error) {
      console.error("Error adding category:", error.message);
      alert("Failed to add category");
    }
  };
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this category?");
    if (!confirm) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/admin/collegetype/${id}/`, {
        method: "DELETE",
        
      });

      if (response.ok) {
        alert("Category deleted");
        fetchCategories();
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting category");
    }
  };
  const handleEdit = (id, currentName) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const handleUpdate = async () => {
    if (!editName.trim()) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/admin/collegetype/${editingId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editName })
      });

      if (response.ok) {
        alert("Category updated");
        setEditingId(null);
        setEditName("");
        fetchCategories();
      } else {
        const error = await response.json();
        throw new Error(error.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update category");
    }
  };

  return (
    <div className="college-category-container">
      <h3>Add New College Category</h3>
      <form className="college-category-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          required
        />
        <button type="submit">Add Category</button>
      </form>

      <h4>Existing Categories:</h4>
      <div className="category-grid">
        {categories.map((cat) => (
          <div className="category-card" key={cat.id}>
            {editingId === cat.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {cat.name}<br/>
                <PencilSimpleLineIcon
                  size={24}
                  color="#d59710"
                  onClick={() => handleEdit(cat.id, cat.name)}
                  title="Edit"
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                />
                <TrashIcon
                  size={24}
                  color="#d51010"
                  onClick={() => handleDelete(cat.id)}
                  title="Delete"
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );


};

export default CollegeCategoryForm;
