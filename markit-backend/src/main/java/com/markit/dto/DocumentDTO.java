package com.markit.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DocumentDTO {
    @NotBlank(message = "Title is required")
    private String title;
    private String content;
}
