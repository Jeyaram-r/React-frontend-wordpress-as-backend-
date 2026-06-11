import { useEffect, useState } from "react";
import "./Projects.css";
export default function Projects() {
  const [projects, setProjects] = useState([]);

  

  async function fetchProjects() {
    try {
      const response = await fetch(
        "http://react-in-wordpress.local/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query GetProjects {
                projects {
                  nodes {
                    title
                    content
                    projectCategory
                    projectLocation
                    projectPrice
                    projectStatus
                  }
                }
              }
            `,
          }),
        }
      );

      const result = await response.json();

      setProjects(result.data.projects.nodes);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="projects-container">
      <h1>Projects</h1>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <h2>{project.title}</h2>

            <p>
              <strong>Category:</strong>{" "}
              {project.projectCategory}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {project.projectLocation}
            </p>

            <p>
              <strong>Price:</strong>{" "}
              ₹{project.projectPrice}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {project.projectStatus}
            </p>
            
                <div
              dangerouslySetInnerHTML={{
                __html: project.content,
              }}
            />
          </div>
               
            
        ))}
      </div>
    </div>
  );
}