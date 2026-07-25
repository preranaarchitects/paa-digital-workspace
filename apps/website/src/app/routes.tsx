import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "../pages/home/HomePage";
import { AboutPage } from "../pages/about/AboutPage";
import { ServicesPage } from "../pages/services/ServicesPage";
import { ProjectsPage } from "../pages/projects/ProjectsPage";
import { ProjectDetailPage } from "../pages/projects/ProjectDetailPage";
import { Studio3DPage } from "../pages/studio-3d/Studio3DPage";
import { TeamPage } from "../pages/team/TeamPage";
import { ContactPage } from "../pages/contact/ContactPage";
import { LoginPage } from "../pages/login/LoginPage";

import { UiTestPage } from "../pages/ui-test/UiTestPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/services",
    element: <ServicesPage />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
  {
    path: "/projects/:projectSlug",
    element: <ProjectDetailPage />,
  },
  {
    path: "/3dstudio",
    element: <Studio3DPage />,
  },
  {
    path: "/team",
    element: <TeamPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/ui-test",
    element: <UiTestPage />,
  },
]);