"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const ApiError_1 = require("../utils/ApiError");
const logger_1 = __importDefault(require("../utils/logger"));
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors
            .array()
            .map((err) => {
            // safer access for different express-validator versions
            const field = err.param || err.path || "field";
            return `${field}: ${err.msg}`;
        })
            .join(", ");
        logger_1.default.warn(`Validation failed: ${errorMessages}`);
        next(new ApiError_1.ApiError(400, `Validation Error: ${errorMessages}`));
        return;
    }
    next();
};
exports.validate = validate;
