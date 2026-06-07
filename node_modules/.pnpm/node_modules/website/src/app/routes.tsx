import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "../pages/home/HomePage";
import { ServicesPage } from "../pages/services/ServicesPage";
import { ProjectsPage } from "../pages/projects/ProjectsPage";
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
    path: "/services",
    element: <ServicesPage />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
  {
    path: "/3d-studio",
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
