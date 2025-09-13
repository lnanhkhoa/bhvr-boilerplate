/**
 * Middleware barrel exports for the BHVR server
 * Organizing middleware like a beaver organizes its dam - everything in its right place
 */

// OpenAPI middleware exports
export {
  createOpenAPIApp,
  setupOpenAPIDocumentation,
  setupOpenAPIErrorHandling,
} from "./openapi";

// Scalar API Reference middleware exports
export {
  createScalarMiddleware,
  setupScalarDocumentation,
  createProductionScalarConfig,
  createDevelopmentScalarConfig,
  type ScalarConfig,
} from "./scalar";

// CORS middleware exports
export {
  createCorsMiddleware,
  setupCorsMiddleware,
  createProductionCorsConfig,
  createDevelopmentCorsConfig,
  type CorsConfig,
} from "./cors";

/**
 * Complete middleware setup for peaceful development
 * Applies all middleware in the correct order like a beaver's methodical construction
 */
export function setupAllMiddleware(app: any) {
  // Import and apply middleware functions
  const { setupCorsMiddleware } = require("./cors");
  const { setupOpenAPIDocumentation, setupOpenAPIErrorHandling } = require("./openapi");
  const { setupScalarDocumentation } = require("./scalar");
  
  // 1. CORS - First line of defense, like the beaver's outer dam
  setupCorsMiddleware(app);
  
  // 2. OpenAPI Documentation - The beaver's blueprint
  setupOpenAPIDocumentation(app);
  
  // 3. Scalar API Reference - The beaver's visitor center
  setupScalarDocumentation(app);
  
  // 4. Error Handling - The beaver's safety measures
  setupOpenAPIErrorHandling(app);
  
  return app;
}
