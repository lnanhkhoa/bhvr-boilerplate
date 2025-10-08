// Helper function to create standardized success responses
export function createSuccessResponse<T>(data: T, message?: string) {
  return {
    success: true as const,
    data,
    message: message || "Success",
  };
}

// Helper function to create standardized error responses
export function createErrorResponse(error: string, details?: unknown) {
  return {
    success: false as const,
    error,
    details,
  };
}
