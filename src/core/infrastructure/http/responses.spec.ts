import { ApiResponseHandler } from './responses';
import { NotFoundError, UnauthorizedError, BadRequestError } from '@core/application/errors/app.error';
import { Response } from 'express';

describe('ApiResponseHandler', () => {
    let mockResponse: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        mockResponse = {
            status: statusMock,
            json: jsonMock,
        };
    });

    describe('success', () => {
        it('should return success response with default status 200', () => {
            const data = { id: '1', name: 'Test Vehicle' };

            ApiResponseHandler.success(mockResponse as Response, data);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                success: true,
                content: data,
            });
        });

        it('should return success response with custom status', () => {
            const data = { created: true };

            ApiResponseHandler.success(mockResponse as Response, data, 201);

            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith({
                success: true,
                content: data,
            });
        });
    });

    describe('error', () => {
        it('should handle NotFoundError with 404 status', () => {
            const error = new NotFoundError('Vehicle not found');

            ApiResponseHandler.error(mockResponse as Response, error);

            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: 'Vehicle not found',
                },
            });
        });

        it('should handle UnauthorizedError with 500 status', () => {
            const error = new UnauthorizedError('Invalid token');

            ApiResponseHandler.error(mockResponse as Response, error);

            // UnauthorizedError is not in getStatusCode mapping, defaults to 500
            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                success: false,
                error: {
                    code: 'NOT_AUTHORIZED',
                    message: 'Invalid token',
                },
            });
        });

        it('should handle BadRequestError with 400 status', () => {
            const error = new BadRequestError('Invalid input');

            ApiResponseHandler.error(mockResponse as Response, error);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                success: false,
                error: {
                    code: 'BAD_REQUEST',
                    message: 'Invalid input',
                },
            });
        });

        it('should handle generic errors with 500 status', () => {
            const error = new Error('Database error');

            ApiResponseHandler.error(mockResponse as Response, error);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Internal server error',
                },
            });
        });
    });
});
