import { Response } from "express";

export const sendSuccess  =(
    res: Response,
    data: unknown,
    message: 'Success',
    statusCode: 200
) : Response => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    });
};

export const sendPeginated = (
    res: Response,
    data: unknown[],
    message: 'Success',
    total: number,
    page: number,
    limit: number ,
) : Response => {
    return res.status(200).json({
        success: true,
        message,
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)},
            
    });
}


