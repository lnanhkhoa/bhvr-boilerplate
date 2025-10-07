import {
  createOpenAPIApp,
  setupOpenAPIDocumentation,
  setupOpenAPIErrorHandling,
  setupCorsMiddleware,
  setupScalarDocumentation,
  createDevelopmentScalarConfig,
} from "./middlewares";

import userRoutes from "./routes/user";
import healthRoutes from "./routes/health";
import uploadRoutes from "./routes/upload";
import authRoutes from "./routes/auth";

// Create the OpenAPI app with beaver-inspired serenity
export const app = createOpenAPIApp();

// Setup middleware in the proper order for peaceful operation
setupCorsMiddleware(app);
setupOpenAPIDocumentation(app);
setupScalarDocumentation(app, createDevelopmentScalarConfig());
setupOpenAPIErrorHandling(app);

app.route("/", healthRoutes);
// app.route("/api/user", userRoutes);
// app.route("/api/upload", uploadRoutes);


[authRoutes].forEach((route) => {
  app.basePath("/api").route("/", route);
});


export default app;
