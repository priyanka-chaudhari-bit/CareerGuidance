import React, { useState, useEffect } from "react";
import "../styles/PsychometricQuestionForm.css"
import { PencilSimpleLineIcon, TrashIcon} from "@phosphor-icons/react"

const PsychometricQuestionForm = () => {
  const [questions, setQuestions] = useState([
    {
      question_text: "",
      dimension: "",
      options: [
        { option_text: "", weight: 1 },
        { option_text: "", weight: 2 },
        { option_text: "", weight: 3 },
        { option_text: "", weight: 4 },
        { option_text: "", weight: 5 },
      ],
    },
  ]);
  const [existingQuestions, setExistingQuestions] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editableQuestion, setEditableQuestion] = useState(null);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, field, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex][field] = field === "weight" ? Number(value) : value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question_text: "",
        dimension: "",
        options: [
          { option_text: "", weight: 1 },
          { option_text: "", weight: 2 },
          { option_text: "", weight: 3 },
          { option_text: "", weight: 4 },
          { option_text: "", weight: 5 },
        ],
      },
    ]);
  };
  const openEditModal = (question) => {
    const copied = JSON.parse(JSON.stringify(question));
    setEditableQuestion(copied);
    setIsEditModalOpen(true);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const token = localStorage.getItem("jwt");
      
      const response = await fetch("http://127.0.0.1:8000/admin/psychometric/create-questions/", {
        method: "POST",
        headers: {
        "Content-Type": "application/json", 
      },
        body: JSON.stringify(questions)
      });
      console.log("questions", JSON.stringify(questions))
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const data = await response.json();
      console.log("Submitted successfully", data);
      alert("Questions submitted successfully!");
      const refreshed = await fetch("http://127.0.0.1:8000/admin/psychometric/get-questions/");
      const refresheddata = await refreshed.json();
      setExistingQuestions(refresheddata);
    } catch (error) {
      console.error("Submission error", error.message);
      alert("Failed to submit questions");
    }
  };
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // const token = localStorage.getItem("jwt");
        const response = await fetch("http://127.0.0.1:8000/admin/psychometric/get-questions/");
        if (!response.ok) {
          throw new Error("Failed to fetch existing questions");
        }
        const data = await response.json();
        setExistingQuestions(data);
      } catch (error) {
        console.error("Error loading existing questions:", error.message);
      }
    };

    fetchQuestions();
  }, []);
  // const handleEdit = async (question) => {
  //     const payload = {
  //       question_text: question.question_text,
  //       dimension: question.dimension,
  //       options: question.options.map(opt => ({
  //         option_text: opt.option_text,
  //         weight: opt.weight
  //       }))
  //     };

  //     try {
  //       const response = await fetch(`http://127.0.0.1:8000/admin/update-psychiometric-ques/${question.id}/`, {
  //         method: 'PUT',
  //         body: JSON.stringify(payload),
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`
  //         }
  //       });

  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         console.error("Update failed:", errorData);
  //       } else {
  //         console.log("Question updated successfully");
          
  //       }
  //     } catch (error) {
  //       console.error("Error updating question:", error);
  //     }
  //   };

    const handleDelete = async (id) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/delete-psychiometric-ques/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to delete question:", errorData);
        } else {
          console.log("Question deleted successfully");
          const refreshed = await fetch("http://127.0.0.1:8000/admin/psychometric/get-questions/");
          const data = await refreshed.json();
          setExistingQuestions(data);

        }
      } catch (error) {
        console.error("Error while deleting question:", error);
      }
    };

  return (
    <>
    
    <form onSubmit={handleSubmit}>
      <div style={{margin:'0 15rem'}}>
      <h2 style={{textAlign:'center'}}>Psychometric Questions</h2>
      {questions.map((q, qIndex) => (
        <div key={qIndex} style={{ border: "1px solid #ccc", padding: '15px', marginBottom: '20px' }}>
          <label>Question Text:</label>
          <input
            type="text"
            value={q.question_text}
            onChange={(e) => handleQuestionChange(qIndex, "question_text", e.target.value)}
            style={{ width: "70%", marginBottom: '10px' }}
          /><br/>

          <label>Dimension:</label>
          <input
            type="text"
            value={q.dimension}
            onChange={(e) => handleQuestionChange(qIndex, "dimension", e.target.value)}
            style={{ width: "30%", marginBottom: 10 }}
          /><br/>

          <label>Options and their weight:</label>
          {q.options.map((opt, oIndex) => (
            <div
              key={oIndex}
              className="option-row"
            >
              <input
                type="text"
                placeholder={`Option ${oIndex + 1} text`}
                value={opt.option_text}
                onChange={(e) =>
                  handleOptionChange(qIndex, oIndex, "option_text", e.target.value)
                }
                className="option-text"
              />
              <input
                type="number"
                min={1}
                max={5}
                value={opt.weight}
                onChange={(e) =>
                  handleOptionChange(qIndex, oIndex, "weight", e.target.value)
                }
                className="option-weight"
              />
            </div>
          ))}

        </div>
      ))}
      <div style={{textAlign:'center'}}>
        <button type="button" onClick={addQuestion} style={{margin:"1rem 3rem 3rem 1rem",borderRadius:'5px',padding:'0.8rem 1rem'}}>
          Add Another Question
        </button>
        <button type="submit" style={{margin:"1rem 3rem 3rem 1rem",}}>Submit Questions</button>
      </div>
      </div>
    </form>
    
    <h2 style={{marginBottom:'2px', textAlign:"center", color:"darkslateblue",  borderBottom: "2px solid #ccc", paddingBottom: "5px",}}> Existing Psychometric Questions</h2>
      {existingQuestions.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>Loading existing questions...</p>
      ) : (
        existingQuestions.map((q, index) => (
          <div
            key={q.id}
            style={{
              margin: "20px auto",
              padding: "15px",
              maxWidth: "600px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#f9f9ff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}
          >
            <p style={{ fontWeight: "bold", marginBottom: "1px" }}>
              Q{index + 1}. {q.question_text}
            </p>
              
            <br />
            <p style={{ fontStyle: "italic", color: "slategray", marginBottom: "10px" }}>
              Dimension: {q.dimension}
            </p>
            <ul style={{ paddingLeft: "20px" }}>
              {q.options.map((opt) => (
                <li key={opt.id} style={{ marginBottom: "4px" }}>
                  {opt.option_text}{" "}
                  <span style={{ color: "gray", fontSize: "0.9em" }}>
                    (Weight: {opt.weight})
                  </span>
                </li>
              ))}
            </ul>
            <PencilSimpleLineIcon size={32} color="#d59710" weight="duotone" onClick={() => openEditModal(q)} style={{margin:'0 1rem'}}/>
            <TrashIcon size={32} color="#d51010" weight="duotone" onClick={() => handleDelete(q.id)} style={{margin:'0 1rem'}} />
          </div>
        ))
      )}
      {isEditModalOpen && editableQuestion && (
          <div style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex", justifyContent: "center", alignItems: "center",
            zIndex: 9999
          }}>
            <div style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "10px",
              width: "500px",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative"
            }}>
              <h3>Edit Question</h3>

              <label>Question Text:</label>
              <input
                type="text"
                value={editableQuestion.question_text}
                onChange={(e) =>
                  setEditableQuestion({ ...editableQuestion, question_text: e.target.value })
                }
                style={{ width: "100%", marginBottom: 10 }}
              />

              <label>Dimension:</label>
              <input
                type="text"
                value={editableQuestion.dimension}
                onChange={(e) =>
                  setEditableQuestion({ ...editableQuestion, dimension: e.target.value })
                }
                style={{ width: "100%", marginBottom: 10 }}
              />

              {editableQuestion.options.map((opt, idx) => (
                <div key={idx} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                  <input
                    type="text"
                    value={opt.option_text}
                    placeholder={`Option ${idx + 1}`}
                    onChange={(e) => {
                      const updated = [...editableQuestion.options];
                      updated[idx].option_text = e.target.value;
                      setEditableQuestion({ ...editableQuestion, options: updated });
                    }}
                    style={{ flex: 1 }}
                  />
                  <input
                    type="number"
                    value={opt.weight}
                    onChange={(e) => {
                      const updated = [...editableQuestion.options];
                      updated[idx].weight = Number(e.target.value);
                      setEditableQuestion({ ...editableQuestion, options: updated });
                    }}
                    style={{ width: 60 }}
                  />
                </div>
              ))}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "1rem" }}>
                <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                <button onClick={async () => {
                  try {
                    const response = await fetch(`http://127.0.0.1:8000/admin/update-psychiometric-ques/${editableQuestion.id}/`, {
                      method: 'PUT',
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        question_text: editableQuestion.question_text,
                        dimension: editableQuestion.dimension,
                        options: editableQuestion.options.map(opt => ({
                          option_text: opt.option_text,
                          weight: opt.weight
                        }))
                      })
                    });

                    if (!response.ok) {
                      const err = await response.json();
                      console.error("Update failed", err);
                      alert("Update failed");
                      return;
                    }

                    alert("Question updated!");
                    setIsEditModalOpen(false);

                    const refreshed = await fetch("http://127.0.0.1:8000/admin/psychometric/get-questions/");
                    const data = await refreshed.json();
                    setExistingQuestions(data);

                  } catch (error) {
                    console.error("Error updating:", error);
                  }
                }}>Save Changes</button>
              </div>
            </div>
          </div>
        )}

      </>
  );
  
};

export default PsychometricQuestionForm;
