import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";

const app: Application = express();

app.use(express.json());
app.use(cors());

// Application Route
// app.use("/api/v1/users", UserRoutes);
// app.use("/api/v1/students", StudentRoute);
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  // Promise.reject();
  res.send("Welcome To The Server !!!");
});

// app.use(globalErrorHandler);
// app.use(notFound);

export default app;
