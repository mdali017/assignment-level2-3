import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { ServicesRoute } from "../modules/services/services.route";
import path from "path";
import { SlotRoute } from "../modules/slot/slot.routes";
import { BookingRoute } from "../modules/booking/booking.routes";
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
  {
    path: "/services/slots",
    route: SlotRoute,
  },
  {
    path: "/bookings",
    route: BookingRoute,
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
