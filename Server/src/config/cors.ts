import cors, { CorsOptions } from 'cors';

const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://bigboxsa.com',
    'https://www.bigboxsa.com'
];

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // Allow non-browser requests (e.g., Postman)
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },

    credentials: true, // Allow cookies and credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
};

export default cors(corsOptions);