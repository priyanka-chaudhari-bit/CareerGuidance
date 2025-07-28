import React, { useState, useEffect } from "react";
import '../styles/AdminCourseForm.css';
import { PencilSimpleLineIcon, TrashIcon} from "@phosphor-icons/react"

const AdminCourseForm = () => {
  const [name, setName] = useState("");
  const [courseType, setCourseType] = useState("");
  const [courses, setCourses] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCourseType, setEditCourseType] = useState("");


  const fetchCourses = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/admin/courses/");
      if (!response.ok) throw new Error("Failed to fetch courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/admin/courses/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, course_type: courseType })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      alert("Course added successfully!");
      setName("");
      setCourseType("");
      fetchCourses();
    } catch (error) {
      console.error("Error adding course:", error.message);
      alert("Failed to add course.");
    }
  };
  const handleEditClick = (id, name, courseType) => {
    setEditCourseId(id);
    setEditName(name);
    setEditCourseType(courseType);
    setIsEditModalOpen(true);
  };

  const handleUpdateCourse = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/courses/?id=${editCourseId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editName,
            course_type: editCourseType
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(JSON.stringify(errorData));
        }

        alert("Course updated successfully!");
        setIsEditModalOpen(false);
        fetchCourses();
      } catch (error) {
        console.error("Error updating course:", error.message);
        alert("Failed to update course.");
      }
    };

    const handleDeleteCutoff = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/admin/courses/?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete course");
      }

      alert("Course deleted successfully!");
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error.message);
      alert("Failed to delete course.");
    }
  };

  return (
    <>

    <div className="course-form-container" >
      <h3 style={{marginBottom:'1rem'}}>Add New Course</h3>
      <form onSubmit={handleSubmit} className="course-form">
        <input
          type="text"
          placeholder="Course Name (e.g., BVSc)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        required
        />
        <input
          type="text"
          placeholder="Course Type (e.g., Veterinary Sciences)"
          value={courseType}
          onChange={(e) => setCourseType(e.target.value)}
          required
        />
        <button type="submit" style={{padding:'0.6rem 1rem',backgroundColor:'#3498db',color:'white',border:'none',cursor:'pointer',borderRadius:'4px',transition:'background-color 0.2s ease'}}>Add Course</button>
      </form>

      <h4 className="course-list-title">Existing Courses:</h4>
      <div className="course-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <strong>{course.name}</strong>
            <p>{course.course_type}</p>
            <PencilSimpleLineIcon size={24} color="#d59710" onClick={() => handleEditClick(course.id,course.name,course.course_type)} title="Edit" style={{ cursor: "pointer", marginLeft: "10px" }}/>
            <TrashIcon size={24} color="#d51010" onClick={() => handleDeleteCutoff(course.id)} title="Delete" style={{ cursor: "pointer", marginLeft: "10px" }} />
          </div>
        ))}
      </div>
    </div>
    {isEditModalOpen && (
  <div className="custom-modal-overlay">
    <div className="custom-modal">
      <h3>Edit Course</h3>
      <input
        type="text"
        placeholder="Course Name"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Course Type"
        value={editCourseType}
        onChange={(e) => setEditCourseType(e.target.value)}
      />
      <div className="modal-buttons">
        <button className="btn-success" onClick={handleUpdateCourse}>
          Update
        </button>
        <button className="btn-danger" onClick={() => setIsEditModalOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


    </>
  );
};

export default AdminCourseForm;
