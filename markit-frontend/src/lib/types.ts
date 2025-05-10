export type DocumentType = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateDocumentType = {
  title?: string;
  content?: string;
};
