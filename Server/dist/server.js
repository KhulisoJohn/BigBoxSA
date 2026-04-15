"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = __importDefault(require("./config/database"));
const cors_1 = __importDefault(require("./config/cors"));
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = __importDefault(require("./utils/logger"));
// import routes here
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
// security & parsing
app.use((0, helmet_1.default)());
app.use(cors_1.default); // ✅ FIXED: must call it
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// HTTP request logger
app.use((0, morgan_1.default)('dev', {
    stream: {
        write: (msg) => logger_1.default.http(msg.trim()), // ✅ typed properly
    },
}));
// health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});
// routes go here
// app.use('/api', routes);
// handle unknown routes
app.use(errorHandler_1.notFound); // ✅ important before errorHandler
// global error handler
app.use(errorHandler_1.errorHandler);
// connect to database and start server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    //console.log("Starting server...");
    try {
        yield (0, database_1.default)();
        logger_1.default.info('Database connection successful, starting server...');
        app.listen(PORT, () => {
            logger_1.default.info(`Server is running on port ${PORT}`);
            logger_1.default.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    }
    catch (error) {
        logger_1.default.error('Failed to start server', error);
        process.exit(1); // ✅ fail fast if DB fails
    }
});
startServer();
