export class AppError extends Error {
    public readonly isOperational: boolean;

    constructor(message: string, isOperational: boolean = true) {
        super(message);
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = "Resource not found") {
        super(message);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = "Unauthorized") {
        super(message);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = "Forbidden") {
        super(message);
    }
}

export class InvalidCredentialsError extends AppError {
    constructor(message: string = "Invalid credentials") {
        super(message);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string = "Bad request") {
        super(message);
    }
}

export class UserAlreadyExistsError extends AppError {
    constructor(message: string = "User already exists") {
        super(message);
    }
}

export class InvalidRefreshTokenError extends AppError {
    constructor(message: string = "Invalid refresh token") {
        super(message);
    }
}

export class NotAuthorizedError extends AppError {
    constructor(message: string = "Not authorized") {
        super(message);
    }
}

export class InternalServerError extends AppError {
    constructor(message: string = "Internal server error") {
        super(message);
    }
}

export class InvalidAccessTokenError extends AppError {
    constructor(message: string = "Invalid access token") {
        super(message);
    }
}