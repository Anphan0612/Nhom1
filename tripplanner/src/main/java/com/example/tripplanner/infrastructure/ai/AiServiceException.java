package com.example.tripplanner.infrastructure.ai;

/**
 * Thrown when the AI provider returns an error or unexpected response.
 * Caught by GlobalExceptionHandler and mapped to 502 Bad Gateway.
 */
public class AiServiceException extends RuntimeException {

    public AiServiceException(String message) {
        super(message);
    }

    public AiServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
