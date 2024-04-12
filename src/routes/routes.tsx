import CategoryDetail from "../pages/categoryDetail";
import CourseDetail from "../pages/courseDetail";
import ContactPages from "../pages/contact";
import PracticePages from "../pages/practice";
import HomePages from "../pages/home";
import IntroducePages from "../pages/introduce";
import LearningPages from "../pages/learning";
import LoginPages from "../pages/login";
import NotFoundPages from "../pages/notfound";
import PolicyPages from "../pages/policy";
import PrivacyPages from "../pages/privacy";
import ProfilePages from "../pages/profile";
import RegisterPages from "../pages/register";
import ExamPages from "../pages/exam";
import AchievementPages from "../pages/achievement";
import DocumentPages from "../pages/document";
import DocumentDetailPages from "../pages/document-detail";
import ResetPasswordPages from "../pages/reset-password";

// Public routers
export const publicRoutes = [
  { path: "/", component: HomePages },
  { path: "/:slug", component: CategoryDetail },
  { path: "/:slug/:slugChild", component: CourseDetail },
  { path: "/gioi-thieu", component: IntroducePages },
  { path: "/lien-he", component: ContactPages },
  { path: "/dieu-khoan-su-dung", component: PolicyPages },
  { path: "/chinh-sach-bao-mat", component: PrivacyPages },
  { path: "/dang-nhap", component: LoginPages },
  { path: "/reset-password/:token", component: ResetPasswordPages },
  { path: "/dang-ky", component: RegisterPages },
  { path: "/tai-lieu", component: DocumentPages },
  { path: "/tai-lieu/:param", component: DocumentDetailPages },
  { path: "*", component: NotFoundPages },
];

// Private routes
export const privateRoutes = [
  { path: "/thong-tin-ca-nhan", component: ProfilePages },
  { path: "/achievement", component: AchievementPages },
  {
    path: "/:slug/:slugChild/de-kiem-tra/:id/:idChild",
    component: PracticePages,
  },
  { path: "/:slug/:slugChild/chuong-trinh-hoc/:id", component: LearningPages },
  { path: "/:slug/:slugChild/de-kiem-tra/:id", component: ExamPages },
];
