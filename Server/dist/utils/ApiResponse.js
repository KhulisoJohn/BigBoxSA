"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPeginated = exports.sendSuccess = void 0;
const sendSuccess = (res, data, message, statusCode) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    });
};
exports.sendSuccess = sendSuccess;
const sendPeginated = (res, data, message, total, page, limit) => {
    return res.status(200).json({
        success: true,
        message,
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        },
    });
};
exports.sendPeginated = sendPeginated;
