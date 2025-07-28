import React, { useEffect, useState } from "react";
import "../styles/AddCollegeCourse.css";
import { PencilSimpleLineIcon, TrashIcon} from "@phosphor-icons/react"
function AddCollegeCourse() {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [formData, setFormData] = useState({
    course: "",
    tuition_fees: "",
    placements: "",
    eligibility_criteria: "",
    selection_criteria: "",
  });
  const [status, setStatus] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState({
    course: "",
    tuition_fees: "",
    placements: "",
    eligibility_criteria: "",
    selection_criteria: ""
  });
  const [editCollege, setEditCollege] = useState("");

  async function fetchColleges() {
      try {
        const res = await fetch("http://127.0.0.1:8000/admin/colleges/");
        const data = await res.json();
        console.log("fetched colleges",data)
        setColleges(data);
      } catch (error) {
        console.error("Failed to fetch colleges", error);
      }
    }

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCollege) {
      setStatus("Please select a college.");
      return;
    }

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/admin/college-courses/?college=${encodeURIComponent(
          selectedCollege
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            college: selectedCollege,
            ...formData,
          }),
        }
      );

      if (res.ok) {
        setStatus("Course added successfully");
        setFormData({
          course: "",
          tuition_fees: "",
          placements: "",
          eligibility_criteria: "",
          selection_criteria: "",
        });
        setSelectedCollege("");
        fetchColleges()
      } else {
        const errorData = await res.json();
        console.error("Error details from backend:", errorData);
        setStatus(`Error: ${errorData.detail || "Failed to add course"}`);
      }
    } catch (err) {
      console.error("Failed to add course", err);
      setStatus("An error occurred. Please try again.");
    }
  };


  const handleEdit = async (collegeName, courseName) => {
    console.log("Edit clicked:", collegeName, courseName);
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/admin/college-courses/?college=${encodeURIComponent(collegeName)}`
      );
      const data = await res.json();

      const courseData = data.find((item) => item.course_name === courseName);
      if (!courseData) {
        alert("Course data not found.");
        return;
      }

      setEditCollege(collegeName);
      setEditData({
        course: courseName,
        tuition_fees: courseData.tuition_fees,
        placements: courseData.placements || "",
        eligibility_criteria: courseData.eligibility_criteria || "",
        selection_criteria: courseData.selection_criteria || "",
      });
      setEditModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch course data", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/admin/college-courses/?college=${encodeURIComponent(editCollege)}&course=${encodeURIComponent(editData.course)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tuition_fees: editData.tuition_fees,
            placements: editData.placements,
            eligibility_criteria: editData.eligibility_criteria,
            selection_criteria: editData.selection_criteria,
          }),
        }
      );

      if (res.ok) {
        alert("Course updated successfully");
        setEditModalVisible(false);
        fetchColleges()
      } else {
        const errorData = await res.json();
        console.error("Update error", errorData);
        alert("Failed to update course");
      }
    } catch (err) {
      console.error("Error updating course", err);
      alert("Error occurred while updating");
    }
  };

  const handleDelete = async (collegeName, courseName) => {
    if (!window.confirm(`Are you sure you want to delete ${courseName} from ${collegeName}?`)) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/admin/college-courses/?college=${encodeURIComponent(collegeName)}&course=${encodeURIComponent(courseName)}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        alert("Course deleted successfully");
        fetchColleges()
      } else {
        const err = await res.json();
        alert(`Failed to delete: ${err.detail}`);
      }
    } catch (error) {
      console.error("Delete failed", error);
      alert("Error deleting course");
      setEditModalVisible(false);
    }
  };
  console.log("Modal visibility:", editModalVisible);
  console.log("Edit data:", editData);
  return (
    <>
    <div className="add-course-container">
      <h2>Add Course to College</h2>
      {status && <p style={{textAlign:'center',color:'purple'}}>{status}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Select College:
          <select
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
            required
          >
            <option value="">-- Choose a college --</option>
            {colleges.map((college) => (
              <option key={college.id} value={college.name}>
                {college.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Course:
          <input type="text" name="course" value={formData.course} onChange={handleChange} required/>
        </label>

        <label>
          Tuition Fees:
          <input type="number" name="tuition_fees" value={formData.tuition_fees} onChange={handleChange} required />
        </label>

        <label>
          Placements:
          <input type="text" name="placements" value={formData.placements} onChange={handleChange} />
        </label>

        <label>
          Eligibility Criteria:
          <textarea name="eligibility_criteria" value={formData.eligibility_criteria} onChange={handleChange} required />
        </label>

        <label>
          Selection Criteria:
          <textarea name="selection_criteria" value={formData.selection_criteria} onChange={handleChange} required />
        </label>

        <button type="submit">Add Course</button>
      </form>
      
    </div>
    <div className="college-section">
        <h3>Existing College Courses</h3>
        {colleges.map((college) => (
          <div className="college-card" key={college.id}>
            <h4>{college.name}</h4>
            <div className="course-list">
              {college.courses &&
                college.courses.map((course, idx) => (
                  <div
                    className="course-card"
                    key={idx}
                  >
                    {course}
                    <PencilSimpleLineIcon size={24} color="#d59710" onClick={() => handleEdit(college.name,course)} title="Edit" style={{ cursor: "pointer", marginLeft: "10px" }}/>
                    <TrashIcon size={24} color="#d51010" onClick={() => handleDelete(college.name,course)} title="Delete" style={{ cursor: "pointer", marginLeft: "10px" }} />
                  </div>

                ))}
            </div>
          </div>
        ))}
      </div>
      <div>
      {editModalVisible && (
        <div >
          <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "2rem", zIndex: 9999, width: "500px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.3)" }}>
            <h3 style={{ marginBottom: "1rem" }}>Edit Course: {editData.course} ({editCollege})</h3>
            <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label>
                Tuition Fees: 
                <input type="number" name="tuition_fees" value={editData.tuition_fees || " "} onChange={(e) => setEditData({ ...editData, tuition_fees: e.target.value })} required style={{ padding: "0.5rem", marginTop: "0.3rem" }}/>
              </label>
              <label>
                Placements:
                <input type="text" name="placements" value={editData.placements || " "} onChange={(e) => setEditData({ ...editData, placements: e.target.value })} style={{ padding: "0.5rem", marginTop: "0.3rem" }}/>
              </label>
              <label>
                Eligibility Criteria:
                <textarea name="eligibility_criteria" value={editData.eligibility_criteria || " "} onChange={(e) => setEditData({ ...editData, eligibility_criteria: e.target.value })} required style={{ padding: "0.5rem", marginTop: "0.3rem" }}/>
              </label>
              <label>
                Selection Criteria:
                <textarea name="selection_criteria" value={editData.selection_criteria || " "} onChange={(e) => setEditData({ ...editData, selection_criteria: e.target.value })} required style={{ padding: "0.5rem", marginTop: "0.3rem" }}/>
              </label>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button type="submit" style={{ padding: "0.5rem 1rem",margin:'0' }}>Update Course</button>
              <button type="button" onClick={() => setEditModalVisible(false)} style={{ padding: "0.5rem 1rem" }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>

  </>
  );
}

export default AddCollegeCourse;
