import rateLimit from 'express-rate-limit';

// General blog submission limiter - 5 posts per hour per IP
const blogSubmissionLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,
    message: 'Too many blog posts created from this IP, please try again after an hour',
    standardHeaders: true,
    legacyHeaders: false
});

// Blog flagging limiter - 10 flags per hour per IP
const blogFlagLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
    message: 'Too many flag requests from this IP, please try again after an hour',
    standardHeaders: true,
    legacyHeaders: false
});

// API request limiter - 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false
});

export {
    blogSubmissionLimiter,
    blogFlagLimiter,
    apiLimiter
};
