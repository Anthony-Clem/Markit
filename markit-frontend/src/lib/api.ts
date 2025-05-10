import axiosInstance from "./axios";
import { DocumentType, UpdateDocumentType } from "./types";

export const createDocumentMutationFn = async (): Promise<DocumentType> => {
  return axiosInstance.post("/documents");
};

export const getDocumentsQueryFn = async (): Promise<DocumentType[]> => {
  return axiosInstance.get("/documents");
};

export const getDocumentQueryFn = async (id: string): Promise<DocumentType> => {
  return axiosInstance.get(`/documents/${id}`);
};

export const updateDocumentMutationFn = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateDocumentType;
}): Promise<DocumentType> => {
  return axiosInstance.put(`/documents/${id}`, data);
};

export const deleteDocumentMutationFn = async (id: string) => {
  return axiosInstance.delete(`/documents/${id}`);
};
