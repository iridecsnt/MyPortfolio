import React, { useEffect, useState, useContext } from "react";
import styles from "./Projects.module.css";
import { ProjectCard } from "./ProjectCard";
import api from "../../api";
import { AuthContext } from "../../AuthContext";

export const Projects = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load projects from backend
  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/projects"); // -> http://localhost:5000/api/projects
      setProjects(res.data || []);
    } catch (err) {
      console.error("Failed to load projects:", err);
      setError("Could not load projects from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // ADMIN: add project
  const handleAdd = async () => {
    if (!user || user.role !== "admin") {
      alert("Only admins can add projects.");
      return;
    }

    const title = prompt("Project title:");
    if (!title) return;

    const description = prompt("Project description:");
    if (!description) return;

    try {
      const res = await api.post("/projects", {
        title,
        description,
        techStack: [],
        githubLink: "",
        liveLink: "",
        imageUrl: "",
      });
      // update UI
      setProjects([...projects, res.data]);
    } catch (err) {
      console.error("Create project error:", err);
      alert("Error creating project (check that you are signed in as admin).");
    }
  };

  // ADMIN: edit project
  const handleEdit = async (project) => {
    if (!user || user.role !== "admin") {
      alert("Only admins can edit projects.");
      return;
    }

    const newTitle = prompt("New title:", project.title);
    if (!newTitle) return;

    const newDescription = prompt("New description:", project.description);
    if (!newDescription) return;

    try {
      const res = await api.put(`/projects/${project._id}`, {
        title: newTitle,
        description: newDescription,
      });

      setProjects(
        projects.map((p) => (p._id === project._id ? res.data : p))
      );
    } catch (err) {
      console.error("Update project error:", err);
      alert("Error updating project.");
    }
  };

  // ADMIN: delete project
  const handleDelete = async (id) => {
    if (!user || user.role !== "admin") {
      alert("Only admins can delete projects.");
      return;
    }

    if (!window.confirm("Delete this project?")) return;

    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete project error:", err);
      alert("Error deleting project.");
    }
  };

  // Map backend object into the shape ProjectCard expects
  const toCardProject = (p) => ({
    ...p,
    title: p.title || "Untitled Project",
    description: p.description || "",
    imageSrc: p.imageUrl || p.imageSrc || "",
    skills: p.techStack || p.skills || [],
    demo: p.liveLink || p.demo || "",
    source: p.githubLink || p.source || "",
  });

  return (
    <section className={styles.container} id="projects">
      <h2 className={styles.title}>Projects</h2>

      {user?.role === "admin" && (
        <button className={styles.adminBtn} onClick={handleAdd}>
          + Add Project
        </button>
      )}

      {loading && <p>Loading projects...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && projects.length === 0 && (
        <p>No projects yet. {user?.role === "admin" && "Use + Add Project to create one."}</p>
      )}

      <div className={styles.projects}>
        {projects.map((p) => {
          const projectForCard = toCardProject(p);
          return (
            <div key={p._id} className={styles.projectItem}>
              <ProjectCard project={projectForCard} />
              {user?.role === "admin" && (
                <div className={styles.adminControls}>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
