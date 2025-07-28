import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { PencilSimpleLineIcon, TrashIcon} from "@phosphor-icons/react"

const CollegeForm = () => {
  const [collegeData, setCollegeData] = useState({
    name: "",
    location: "",
    city: "",
    hostel_fees: "",
    ranking: "",
    scholarships: "",
    placements: "",
    recognized_by: "",
    about: "",
    established_year: "",
    top_recruiters: "",
    college_types: "",
    entrance_exams: "",
    average_package: "",
    institute_type: "",
    courses: ""
  });

  const [colleges, setColleges] = useState([]);
  const [editingCollegeId, setEditingCollegeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollegeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEdit = (college) => {
    setEditingCollegeId(college.id);
    setCollegeData({
      ...college,
      college_types: college.college_types_display.join(', '),
      entrance_exams: college.entrance_exams.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...collegeData,
      hostel_fees: parseInt(collegeData.hostel_fees),
      ranking: parseInt(collegeData.ranking),
      established_year: parseInt(collegeData.established_year),
      college_types: collegeData.college_types.split(",").map((s) => s.trim()),
      entrance_exams: collegeData.entrance_exams.split(",").map((s) => s.trim()),
      average_package: collegeData.average_package,
      institute_type: collegeData.institute_type,
      courses: collegeData.courses.split(",").map((s) => s.trim()) 
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/admin/colleges/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json(); 
        console.error("Error details from backend:", errorData);
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      alert("College added successfully!");
      fetchColleges();
    } catch (error) {
      console.error("Error adding college:", error);
      alert("Error adding college. Check console for details.");
    }
  };

  const fetchColleges = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/admin/colleges/");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      console.log("fetched college",data)
      setColleges(data);
    } catch (err) {
      console.error("Error fetching colleges:", err);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleUpdate = async () => {
    const payload = {
      ...collegeData,
      hostel_fees: parseFloat(collegeData.hostel_fees),
      ranking: parseInt(collegeData.ranking),
      established_year: parseInt(collegeData.established_year),
      entrance_exams: collegeData.entrance_exams.split(",").map((s) => s.trim()),
      average_package: collegeData.average_package,
      institute_type: collegeData.institute_type,
      college_types_display: collegeData.college_types.split(",").map((s) => s.trim()),
    };

    try {
      console.log("College update")
      const response = await fetch(`http://127.0.0.1:8000/admin/admincollege/${editingCollegeId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        console.error("Error details from backend:", errorData); 
        throw new Error("Failed to update college");
      }

      const updatedCollege = await response.json();
      console.log("Updated successfully:", updatedCollege);
      setIsModalOpen(false);
      setEditingCollegeId(null);
      setCollegeData({
        name: "",
        location: "",
        city: "",
        hostel_fees: "",
        ranking: "",
        scholarships: "",
        placements: "",
        recognized_by: "",
        about: "",
        established_year: "",
        top_recruiters: "",
        college_types: "",
        entrance_exams: "",
        average_package: "",
        institute_type: "",
        courses: ""
      });
      fetchColleges(); 
    } catch (error) {
      console.error("Error updating college:", error);
    }
  };
  const handleDelete = async (collegeId) => {
      if (!window.confirm("Are you sure you want to delete this college?")) return;

      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/admincollege/${collegeId}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          alert("College deleted successfully.");
          
          fetchColleges();
        } else {
          const errorData = await response.json();
          console.error("Delete failed:", errorData);
          alert("Failed to delete the college.");
        }
      } catch (error) {
        console.error("Error during delete:", error);
        alert("An error occurred while deleting the college.");
      }
    };


  return (
    <>
    {isModalOpen && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex", justifyContent: "center", alignItems: "center",
          zIndex: 999
        }}>
          <div style={{
            backgroundColor: "#fff",
            padding: "2rem",
            borderRadius: "10px",
            width: "500px",
            maxHeight: "80vh",
            overflowY: "auto"
          }}>
            <h3>Edit College</h3>
            {Object.entries(collegeData).filter(([key]) => key !== "id" && key !== "courses").map(([key, value]) => (
              <div key={key} style={{ marginBottom: "1rem" }}>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={key.replace(/_/g, " ")}
                  style={{ width: "100%", padding: "0.5rem" }}
                />
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <button onClick={handleUpdate} style={{ padding: "0.5rem 1.5rem", backgroundColor: "#2e8b57", color: "#fff", border: "none", borderRadius: "5px" }}>Update</button>
              <button onClick={() => setIsModalOpen(false)} style={{ padding: "0.5rem 1.5rem", backgroundColor: "#999", color: "#fff", border: "none", borderRadius: "5px" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    <div style={{ padding: "2rem", border: "1px solid #ccc", maxWidth: "80rem",margin:'auto',textAlign:'center' }}>
      <h3>Add New College</h3>
      <form onSubmit={handleSubmit}>
        {Object.entries(collegeData).filter(([key]) => key !== "id" && key !== "courses").map(([key, value]) => (
          <div key={key} style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={key.replace(/_/g, " ")}
              style={{ width: "50%", padding: "0.5rem" }}
              required
            />
          </div>
        ))}
        <button type="submit" style={{ padding: "0.6rem 1.5rem" }}>Add College</button>
      </form>

      <h4 style={{ marginTop: "2rem" }}>Existing Colleges:</h4>
        <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
        marginTop: "1rem"
        }}>
        {colleges.map((college) => (
            
            <div
            key={college.id}
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                backgroundColor: "#fff"
            }}
            >
            <Link
                key={college.id}
                to={`/admin-collegedetails/${college.id}`}
                style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}
                >
            <h4 style={{ marginBottom: "0.5rem", color: "#333" }}>{college.name}</h4>
            </Link>
            <p style={{ margin: 0 }}>
                {/* <strong>City:</strong> {college.city} <br /> */}<em> {college.city},&nbsp;
                {/* <strong>Location:</strong> {college.location} <br /> */} {college.location}</em><br/>
                {/* <strong>Institute Type:</strong> {college.institute_type} <br /> */}{college.institute_type}<br/>
                <strong>Ranking:</strong> #{college.ranking}
            </p>
            <PencilSimpleLineIcon size={32} color="#d59710" weight="duotone" onClick={() => handleEdit(college)}/>
            <TrashIcon size={32} color="#d51010" weight="duotone" onClick={() => handleDelete(college.id)} />
            </div>
           
        ))}
        </div>

    </div>
    </>
  );
};

export default CollegeForm;
