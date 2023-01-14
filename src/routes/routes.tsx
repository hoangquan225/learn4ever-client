import CategoryDetail from "../pages/categoryDetail";
import CourseDetail from "../pages/courseDetail";
import ContactPages from "../pages/contact";
import HomePages from "../pages/home";
import IntroducePages from "../pages/introduce";
import LearningPages from "../pages/learning";
import LoginPages from "../pages/login";
import NotFoundPages from "../pages/notfound";
import PolicyPages from "../pages/policy";
import PrivacyPages from "../pages/privacy";
import ProfilePages from "../pages/profile";
import RegisterPages from "../pages/register";

// Public routers
export const publicRoutes = [
  { path: "/", component: HomePages },
  { path: "/:slug", component: CategoryDetail },
  { path: "/:slug/:slugChild", component: CourseDetail },
  { path: "/introduce", component: IntroducePages },
  { path: "/contact", component: ContactPages },
  { path: "/policy", component: PolicyPages },
  { path: "/privacy", component: PrivacyPages },
  { path: "/login", component: LoginPages },
  { path: "/register", component: RegisterPages },
  { path: "*", component: NotFoundPages },
];

// Private routes
export const privateRoutes = [
  { path: "/profile", component: ProfilePages },
  { path: "/learning", component: LearningPages },
];
