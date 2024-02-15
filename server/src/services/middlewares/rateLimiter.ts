/*
    Locks out IP address from logging after recognizing repeated requests or login attempts
*/

import rateLimit from 'express-rate-limit';

export const loginRateLimiter = rateLimit({
  windowMs: 4 * 60 * 60 * 1000,         //window size = 4 hours
  max: 20,                              //max of 20 REQUESTS within the window
  message: 'Multiple failed login attempts detected. Login disabled for 4 hours', 
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true          //successful logins don't count towards the request limit
});