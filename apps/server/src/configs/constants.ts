export const SESSION_CONFIG = {
  expiresIn: 60 * 60 * 24 * 7, // 7 days
  updateAge: 60 * 60 * 24, // 1 day
};


export const RATE_LIMIT_CONFIG = {
  enabled: true,
  window: 60, // 1 minute
  max: 10, // max 10 requests per minute
};