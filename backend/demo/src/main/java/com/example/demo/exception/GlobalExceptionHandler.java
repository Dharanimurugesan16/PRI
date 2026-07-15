package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice(basePackages = "com.blue.aptitude")
public class GlobalExceptionHandler {

    @ExceptionHandler(TestAlreadySubmittedException.class)
    public ResponseEntity<?> handleAlreadySubmitted(TestAlreadySubmittedException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("error", "ALREADY_SUBMITTED", "message", ex.getMessage()));
    }

    @ExceptionHandler(ResumeNotAllowedException.class)
    public ResponseEntity<?> handleResumeNotAllowed(ResumeNotAllowedException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("error", "RESUME_NOT_ALLOWED", "message", ex.getMessage()));
    }

    @ExceptionHandler(AssignmentNotFoundException.class)
    public ResponseEntity<?> handleNotFound(AssignmentNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "NOT_FOUND", "message", ex.getMessage()));
    }
}
