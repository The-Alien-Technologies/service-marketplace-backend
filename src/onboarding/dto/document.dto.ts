import { IsEnum, IsOptional, IsString } from 'class-validator';
import { DocumentType } from '../../common/enums';
import { DocumentStatus } from '../../../generated/prisma';

export class UploadDocumentDto {
  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsOptional()
  @IsString()
  description?: string;
}

export class DocumentResponseDto {
  id: string;
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  documentType: DocumentType;
  status: DocumentStatus;
  uploadedAt: Date;
}
