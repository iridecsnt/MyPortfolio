import React, { useEffect, useState, useContext } from "react";

import styles from "./Education.module.css";
import skills from "../../data/skills.json";
import { getImageUrl } from "../../utils";
import api from "../../api";
import { AuthContext } from "../../AuthContext";

export const Experience = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchQualifications() {
      try {
        const res = await api.get("/qualifications");
        setHistory(res.data || []);
      } catch (err) {
        console.error("Failed to load qualifications:", err);
      }
    }
    fetchQualifications();
  }, []);

  async function handleAdd() {
    if (!user || user.role !== "admin") {
      alert("Only admins can add education.");
      return;
    }

    const title = prompt("Title (e.g. Diploma in SET):");
    const firstname = prompt("First name:", "Brianna");
    const lastname = prompt("Last name:");
    const email = prompt("Email:");
    const completion = prompt("Completion (e.g. April 2025):");
    const description = prompt("Description:");

    if (!title || !firstname || !lastname || !email || !description) return;

    try {
      const res = await api.post("/qualifications", {
        title,
        firstname,
        lastname,
        email,
        completion,
        description,
      });
      setHistory([...history, res.data]);
    } catch (err) {
      console.error("Create qualification error:", err);
      alert("Error creating qualification.");
    }
  }

  async function handleDelete(id) {
    if (!user || user.role !== "admin") {
      alert("Only admins can delete education.");
      return;
    }
    if (!window.confirm("Delete this education item?")) return;

    try {
      await api.delete(`/qualifications/${id}`);
      setHistory(history.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete qualification error:", err);
      alert("Error deleting qualification.");
    }
  }

  async function handleEdit(item) {
    if (!user || user.role !== "admin") {
      alert("Only admins can edit education.");
      return;
    }

    const title = prompt("Title:", item.title);
    const firstname = prompt("First name:", item.firstname);
    const lastname = prompt("Last name:", item.lastname);
    const email = prompt("Email:", item.email);
    const completion = prompt("Completion:", item.completion || "");
    const description = prompt("Description:", item.description);

    if (!title || !firstname || !lastname || !email || !description) return;

    try {
      const res = await api.put(`/qualifications/${item._id}`, {
        title,
        firstname,
        lastname,
        email,
        completion,
        description,
      });

      setHistory(
        history.map((h) => (h._id === item._id ? res.data : h))
      );
    } catch (err) {
      console.error("Update qualification error:", err);
      alert("Error updating qualification.");
    }
  }

  return (
    <section className={styles.container} id="education">
      <h2 className={styles.title}>Education</h2>

      {user?.role === "admin" && (
        <button onClick={handleAdd}>+ Add Education</button>
      )}

      <div className={styles.content}>
        <div className={styles.skills}>
          {skills.map((skill, id) => (
            <div key={id} className={styles.skill}>
              <div className={styles.skillImageContainer}>
                <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />
              </div>
              <p>{skill.title}</p>
            </div>
          ))}
        </div>

        <ul className={styles.history}>
          {history.map((item) => (
            <li key={item._id} className={styles.historyItem}>
              <div className={styles.historyItemDetails}>
                <h3>{item.title}</h3>
                <p>
                  {item.firstname} {item.lastname} – {item.email}
                </p>
                {item.completion && <p>Completion: {item.completion}</p>}
                <p>{item.description}</p>

                {user?.role === "admin" && (
                  <div>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
