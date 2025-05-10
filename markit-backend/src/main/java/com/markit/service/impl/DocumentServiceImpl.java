package com.markit.service.impl;

import com.markit.dto.DocumentDTO;
import com.markit.dto.DocumentResponse;
import com.markit.exception.ResourceNotFoundException;
import com.markit.mapper.DocumentMapper;
import com.markit.model.Document;
import com.markit.repository.DocumentRepository;
import com.markit.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {
    private final DocumentRepository documentRepository;
    private final DocumentMapper documentMapper;

    @Override
    public DocumentResponse createDocument() {
        Document newDocument = documentRepository.save(new Document());
        return documentMapper.toDocumentResponse(newDocument);
    }

    @Override
    public List<DocumentResponse> getAllDocuments() {
        return documentRepository.findAll()
                .stream()
                .map(documentMapper::toDocumentResponse)
                .sorted(Comparator.comparing(DocumentResponse::getUpdatedAt).reversed())
                .collect(Collectors.toList());
    }


    @Override
    public DocumentResponse getDocumentById(String id) {
        return documentMapper.toDocumentResponse(documentRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Document not found with id " + id)));
    }

    @Override
    public DocumentResponse updateDocument(String id, DocumentDTO documentDTO) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id " + id));
        if(documentDTO.getTitle() != null){
            document.setTitle(documentDTO.getTitle());
        }
        document.setContent(documentDTO.getContent());
        return documentMapper.toDocumentResponse(documentRepository.save(document));
    }

    @Override
    public void deleteDocument(String id) {
        documentRepository.deleteById(id);
        return;
    }
}
