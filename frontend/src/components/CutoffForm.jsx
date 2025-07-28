import React, { useEffect, useState } from "react";
import "../styles/CutoffForm.css";
import { PencilSimpleLineIcon, TrashIcon} from "@phosphor-icons/react"

const CutoffForm = () => {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [course, setCourse] = useState("");
  const [category, setCategory] = useState("");
  const [cutoffScore, setCutoffScore] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [cutoffModalData, setCutoffModalData] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null); 


  // Fetch colleges on mount
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/admin/colleges/");
        const data = await response.json();
        console.log("fetchcolleges",data)
        setColleges(data);
      } catch (err) {
        console.error("Error fetching colleges:", err);
      }
    };
    fetchColleges();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      college: selectedCollege,
      course,
      category,
      cutoff_score: parseFloat(cutoffScore),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/admin/course-cutoffs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Cutoff added successfully!");
        setCourse("");
        setCategory("");
        setCutoffScore("");
      } else {
        alert("Failed to add cutoff");
      }
    } catch (err) {
      console.error("Error submitting cutoff:", err);
    }
  };
  const handleEditClick = (item) => {
      setEditingItem({
        ...item,
        college: item.college  || item.college_name,
        course: item.course || item.course_name,
      });
      setEditMode(true);
    };

  const openCutoffModal = async (collegeName, courseName) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/admin/course-cutoffs/?college=${encodeURIComponent(
          collegeName
        )}&course=${encodeURIComponent(courseName)}`
      );
      const data = await res.json();
      console.log("openCutoffModal",data)
      setCutoffModalData(data);
      console.log("cutoffModalData",cutoffModalData);
      setModalTitle(`${collegeName} - ${courseName} Cutoffs`);
      setTimeout(() => setModalOpen(true), 50);
    } catch (error) {
      console.error("Error fetching course cutoff:", error);
    }
  };
  const handleUpdateCutoff = async (e) => {
      e.preventDefault();
      const { category, cutoff_score, college_name, course_name } = editingItem;
      console.log("editingItem",editingItem)

      try {
        const res = await fetch(`http://127.0.0.1:8000/admin/course-cutoffs/?college=${encodeURIComponent(college_name)}&course=${encodeURIComponent(course_name)}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category,
            cutoff_score: parseFloat(cutoff_score),
          }),
        });

        if (res.ok) {
          alert("Cutoff updated successfully!");
          setModalOpen(false)
          setEditMode(false);
          setEditingItem(null);
        } else {
          alert("Failed to update cutoff");
        }
      } catch (err) {
        console.error("Error updating cutoff:", err);
      }
    };
    const handleDeleteCutoff = async (item) => {
      const { category, cutoff_score, college_name, course_name } = item;
      console.log("categoryToDelete",item)
      if (!window.confirm("Are you sure you want to delete this cutoff?")) return;

      try {
        const res = await fetch(`http://127.0.0.1:8000/admin/course-cutoffs/?college=${encodeURIComponent(college_name)}&course=${encodeURIComponent(course_name)}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category: category }),
        });

        if (res.ok) {
          alert("Deleted successfully");
          setModalOpen(false)
        } else {
          alert("Failed to delete cutoff");
        }
      } catch (err) {
        console.error("Error deleting cutoff:", err);
      }
    };

  return (
    <>
    <div className="cutoff-form">
      <h3>Add Categorywise Course Cutoff</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedCollege}
          onChange={(e) => setSelectedCollege(e.target.value)}
          required
        >
          <option value="">Select College</option>
          {colleges.map((college) => (
            <option key={college.id} value={college.name}>
              {college.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Course Name (e.g., M.Des)"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category (e.g., EWS)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Cutoff Score"
          value={cutoffScore}
          onChange={(e) => setCutoffScore(e.target.value)}
          required
        />

        <button type="submit">Add Cutoff</button>
      </form>
      <div className="college-section">
        <h3>Existing College Courses and Their Cutoffs</h3>
        {colleges.map((college) => (
          <div className="college-card" key={college.id}>
            <h4>{college.name}</h4>
            <div className="course-list">
              {college.courses &&
                college.courses.map((course, idx) => (
                  <div
                    className="course-card"
                    key={idx}
                    onClick={() => openCutoffModal(college.name, course)}
                  >
                    {course}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{modalTitle}</h3>
            {cutoffModalData.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Cutoff Score</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cutoffModalData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.category}</td>
                      <td>{item.cutoff_score}</td>
                      <td>
                        <PencilSimpleLineIcon size={24} color="#d59710" onClick={() => handleEditClick(item)} title="Edit" style={{ cursor: "pointer", marginLeft: "10px" }}/>
                        <TrashIcon size={24} color="#d51010" onClick={() => handleDeleteCutoff(item)} title="Delete" style={{ cursor: "pointer", marginLeft: "10px" }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No cutoff data found.</p>
            )}
            <br/>
            <button onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
      {editMode && editingItem && (
          <div className="modal-overlay" onClick={() => setEditMode(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Edit Cutoff</h3>
              <form onSubmit={handleUpdateCutoff}>
                <h5>College :  {editingItem.college || editingItem.college_name}</h5>
                <h5>Course : {editingItem.course || editingItem.course_name}</h5>
                <label>
                  Category:
                  <input
                    type="text"
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  Cutoff Score:
                  <input
                    type="number"
                    value={editingItem.cutoff_score}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        cutoff_score: e.target.value,
                      })
                    }
                    required
                  />
                </label><br/>
                <div className="edit-category-cutoff">
                  <button type="submit" style={{margin:'1rem'}}>Update</button>
                  <button type="button" style={{margin:'1rem'}} onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
    </>
  );
};

export default CutoffForm;
