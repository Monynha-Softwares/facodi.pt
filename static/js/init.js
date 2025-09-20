import { loadCoursePage, loadUCPage, loadTopicPage, loadHomeCourses } from "./loaders.js";

const parsePayload = () => {
  const element = document.getElementById("facodi-payload");
  if (!element) return null;
  try {
    return JSON.parse(element.textContent);
  } catch (error) {
    console.error("[FACODI] Não foi possível analisar o payload embutido:", error);
    return null;
  }
};

const bootstrap = () => {
  const dataset = document.body.dataset ?? {};
  const payload = parsePayload();
  if (payload) {
    window.__facodi = payload;
  }

  switch (dataset.page) {
    case "course":
      if (dataset.course) {
        loadCoursePage(dataset.course, dataset["plan-version"], payload);
      }
      break;
    case "uc":
      if (dataset.uc) {
        loadUCPage(dataset.uc, dataset["plan-version"], payload);
      }
      break;
    case "topic":
      if (dataset.topic) {
        loadTopicPage(dataset.topic, payload);
      }
      break;
    case "home":
      loadHomeCourses(payload);
      break;
    case "courses":
      loadHomeCourses(payload);
      break;
    default:
      break;
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
