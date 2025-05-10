package com.markit.mapper;

import com.markit.dto.DocumentDTO;
import com.markit.dto.DocumentResponse;
import com.markit.model.Document;
import org.springframework.stereotype.Component;

@Component
public class DocumentMapper {
    public Document toDocumentEntity (DocumentDTO documentDTO){
        Document document = new Document();
        document.setTitle(documentDTO.getTitle());
        document.setContent(documentDTO.getContent());
        return document;
    }

    public DocumentResponse toDocumentResponse (Document document){
        DocumentResponse documentResponse = new DocumentResponse();
        documentResponse.setId(document.getId());
        documentResponse.setTitle(document.getTitle());
        documentResponse.setContent(document.getContent());
        documentResponse.setCreatedAt(document.getCreatedAt());
        documentResponse.setUpdatedAt(document.getUpdatedAt());
        return documentResponse;
    }
}
