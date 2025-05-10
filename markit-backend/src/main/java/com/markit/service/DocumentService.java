package com.markit.service;

import com.markit.dto.DocumentDTO;
import com.markit.dto.DocumentResponse;

import java.util.List;

public interface DocumentService {
    DocumentResponse createDocument();
    List<DocumentResponse> getAllDocuments();
    DocumentResponse getDocumentById(String id);
    DocumentResponse updateDocument(String id, DocumentDTO documentDTO);
    void deleteDocument(String id);
}
