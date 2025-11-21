// server/models/project.model.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
 
    title: { type: String, required: true },
    description: { type: String, default: "" },


    imageUrl: { type: String, default: "" }, // backend
    imageSrc: { type: String, default: "" }, // legacy frontend name
    techStack: [{ type: String }],
    skills: [{ type: String }],
    githubLink: { type: String, default: "" },
    liveLink: { type: String, default: "" },
    demo: { type: String, default: "" },
    source: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
