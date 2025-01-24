export const limiterConfig = {
    windowMs: 60 * 1000, // 1 minuto
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests",
};
  
export const corsConfig = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
};
  