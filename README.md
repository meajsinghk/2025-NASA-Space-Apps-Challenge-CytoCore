# BioCosmos: A Space Biology Knowledge Engine

## Project Summary

BioCosmos is an interactive web application designed to unlock the vast knowledge within NASA's space bioscience research. It transforms a dataset of over 600 publications into a dynamic and explorable knowledge engine. The platform addresses the challenge by providing multiple intuitive interfaces—an interactive dashboard for high-level trends, a powerful search and filter tool for deep dives, and an innovative knowledge graph for discovering hidden connections between studies. By organizing and visualizing decades of research, BioCosmos makes this critical information accessible to scientists, mission planners, and students, accelerating future discoveries and supporting safer human exploration of space. It's important because it turns a static library of information into an actionable tool for insight and discovery, empowering the next generation of space exploration.

[DEMO Link](https://www.loom.com/share/35308c9f2b3c4002802c459661a19077?sid=9fa8e254-7d7e-4710-bed1-42b050b5d4d6)

## Project Details

### What does it do and how does it work?

BioCosmos is a multi-faceted web application that provides users with several ways to engage with NASA's space biology publication data:

1.  **Dashboard:** The landing page offers a high-level summary of the entire dataset, including key statistics on the number of publications, research areas, and participating institutions. A "Publications Over Time" bar chart visualizes research trends, showing the volume of studies published each year.
2.  **Explore Page:** This is the core search tool. Users can perform full-text searches across publication titles, authors, and conclusions. They can also apply granular filters, such as selecting specific research categories (e.g., 'Plant Science', 'Human Health'), to narrow down the 600+ papers to a relevant subset.
3.  **Knowledge Graph:** This advanced feature provides a visual representation of the relationships between publications. Each paper is a node, and links are drawn between papers that share common research tags. This helps users discover non-obvious connections, identify research clusters, and understand the thematic structure of the field.
4.  **Reading Plan:** A Kanban-style board where users can save interesting papers to "To Read," "In Progress," and "Done" columns, helping them organize their research workflow.
5.  **AI Assistant (CosmoBot):** A conversational AI, integrated throughout the app, is primed with knowledge of the dataset. It can answer questions, summarize papers, and provide context, acting as an intelligent research assistant.

### What are the benefits and intended impact?

The primary benefit of BioCosmos is that it significantly lowers the barrier to entry for accessing and understanding decades of valuable research.

*   **For Scientists:** It accelerates the literature review process and helps identify research gaps or synergistic fields of study for new hypotheses.
*   **For Mission Planners:** It provides actionable insights into the known risks of spaceflight (e.g., bone density loss, radiation effects) and the maturity of countermeasures, supporting safer mission design.
*   **For Students & Educators:** It serves as an engaging educational tool, allowing them to explore a real-world scientific dataset and understand the breadth of NASA's research.

The intended impact is to democratize access to this taxpayer-funded knowledge, fostering a more informed and interconnected research community and ultimately accelerating the scientific progress needed for long-duration missions to the Moon, Mars, and beyond.

### What tools, coding languages, etc., did you use?

BioCosmos is a modern, full-stack TypeScript web application built with a focus on performance and user experience.

*   **Frontend Framework:** Next.js (React)
*   **UI Components:** ShadCN UI and Tailwind CSS for a professional, responsive design.
*   **Visualizations:** Chart.js for the dashboard bar chart and a custom HTML5 Canvas rendering engine for the interactive knowledge graph.
*   **AI/Machine Learning:** Google's Gemini model, orchestrated through the Genkit framework, powers the "CosmoBot" assistant.
*   **Languages:** TypeScript, HTML, CSS.
*   **Development Environment:** Firebase Studio.

### How is your project creative?

The creativity of BioCosmos lies in its multi-modal approach to information discovery. It moves beyond a simple search box and list of results by:

1.  **Synthesizing Information Visually:** The Knowledge Graph is an innovative way to represent the "shape" of the research landscape, making complex relationships instantly apparent in a way that text lists cannot.
2.  **Integrating Conversational AI:** CosmoBot doesn't just fetch data; it acts as a research partner. It understands context and can summarize and explain findings, creating a more natural and intuitive user experience.
3.  **Creating a Research Funnel:** The application is designed to guide a user from a broad overview (Dashboard) to specific exploration (Explore), deep connection-finding (Insights), and finally to personal organization (Reading Plan), mirroring a natural research workflow.

### What factors did your team consider?

Our primary consideration was the target user. We imagined a mission planner, a graduate student, and a NASA program manager all trying to extract different kinds of value from the same dataset. This led us to create multiple, purpose-built interfaces rather than a one-size-fits-all solution. We prioritized:

*   **Usability:** Ensuring the interface was clean, intuitive, and required no training to use.
*   **Performance:** Building a responsive application that could handle filtering and visualizing the data without lag.
*   **Actionable Insights:** Focusing on features that don't just *show* data but help users *understand* it and draw conclusions, such as the knowledge graph and AI summaries.
*   **Extensibility:** We used a component-based architecture that would allow for easily adding new data sources or visualization types in the future.
