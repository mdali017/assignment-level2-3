import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { ServicesRoute } from "../modules/services/services.route";
// import { StudentRoute } from "../modules/student/student.route";
// import { UserRoutes } from "../modules/user/user.route";
// import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
// import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
// import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";
// import { CourseRoute } from "../modules/Course/course.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/services",
    route: ServicesRoute,
  },
  //   {
  //     path: "/academic-semesters",
  //     route: AcademicSemesterRoutes,
  //   },
  //   {
  //     path: "/academic-faculties",
  //     route: AcademicFacultyRoutes,
  //   },
  //   {
  //     path: "/academic-departments",
  //     route: AcademicDepartmentRoutes,
  //   },
  //   {
  //     path: "/courses",
  //     route: CourseRoute,
  //   },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

// router.use("/users", UserRoutes);
// router.use("/student", StudentRoute);

export default router;
