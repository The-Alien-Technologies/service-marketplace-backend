import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

export interface FileUploadResult {
  url: string;
  fileName: string;
  fileSize: number;
  fileType: string;
}

export interface FileUploadOptions {
  folder?: string;
  allowedTypes?: string[];
  maxSize?: number; // in bytes
  generateUniqueName?: boolean;
}

export enum FileUploadProvider {
  SUPABASE = 'SUPABASE',
  AWS_S3 = 'AWS_S3',
  LOCAL = 'LOCAL',
}

export enum FileCategory {
  AVATAR = 'avatars',
  DOCUMENT = 'documents',
  GENERAL = 'uploads',
}

@Injectable()
export class FileUploadService {
  private readonly logger = new Logger(FileUploadService.name);
  private supabaseClient: SupabaseClient;
  private provider: FileUploadProvider;

  constructor(private configService: ConfigService) {
    this.provider = this.configService.get<FileUploadProvider>(
      'FILE_UPLOAD_PROVIDER',
      FileUploadProvider.SUPABASE,
    );

    // Initialize Supabase client
    if (this.provider === FileUploadProvider.SUPABASE) {
      const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
      const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase URL and KEY are required when using Supabase provider');
      }

      this.supabaseClient = createClient(supabaseUrl, supabaseKey);
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    category: FileCategory,
    options: FileUploadOptions = {},
  ): Promise<FileUploadResult> {
    // Validate file
    this.validateFile(file, options);

    switch (this.provider) {
      case FileUploadProvider.SUPABASE:
        return this.uploadToSupabase(file, category, options);
      case FileUploadProvider.AWS_S3:
        return this.uploadToS3(file, category, options);
      case FileUploadProvider.LOCAL:
        return this.uploadToLocal(file, category, options);
      default:
        throw new BadRequestException('Unsupported file upload provider');
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    switch (this.provider) {
      case FileUploadProvider.SUPABASE:
        return this.deleteFromSupabase(fileUrl);
      case FileUploadProvider.AWS_S3:
        return this.deleteFromS3(fileUrl);
      case FileUploadProvider.LOCAL:
        return this.deleteFromLocal(fileUrl);
      default:
        throw new BadRequestException('Unsupported file upload provider');
    }
  }

  private validateFile(file: Express.Multer.File, options: FileUploadOptions): void {
    // Check file size
    const maxSize = options.maxSize || 10 * 1024 * 1024; // Default 10MB
    if (file.size > maxSize) {
      throw new BadRequestException(`File size cannot exceed ${maxSize / (1024 * 1024)}MB`);
    }

    // Check file type
    if (options.allowedTypes && !options.allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types: ${options.allowedTypes.join(', ')}`,
      );
    }
  }

  private generateFileName(originalName: string, generateUnique: boolean = true): string {
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext);
    
    if (generateUnique) {
      const uuid = uuidv4();
      const timestamp = Date.now();
      return `${baseName}_${timestamp}_${uuid}${ext}`;
    }
    
    return originalName;
  }

  private async uploadToSupabase(
    file: Express.Multer.File,
    category: FileCategory,
    options: FileUploadOptions,
  ): Promise<FileUploadResult> {
    try {
      const bucketName = this.configService.get<string>('SUPABASE_BUCKET_NAME');
      const fileName = this.generateFileName(file.originalname, options.generateUniqueName);
      const filePath = options.folder ? `${options.folder}/${fileName}` : `${category}/${fileName}`;

      const { data, error } = await this.supabaseClient.storage
        .from(bucketName)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) {
        this.logger.error('Supabase upload error:', error);
        throw new BadRequestException(`Failed to upload file: ${error.message}`);
      }

      // Get public URL
      const { data: urlData } = this.supabaseClient.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      return {
        url: urlData.publicUrl,
        fileName: fileName,
        fileSize: file.size,
        fileType: file.mimetype,
      };
    } catch (error) {
      this.logger.error('Failed to upload to Supabase:', error);
      throw new BadRequestException('Failed to upload file to storage');
    }
  }

  private async deleteFromSupabase(fileUrl: string): Promise<void> {
    try {
      const bucketName = this.configService.get<string>('SUPABASE_BUCKET_NAME', 'pavodah-files');
      
      // Extract file path from URL
      const url = new URL(fileUrl);
      const pathParts = url.pathname.split('/');
      const filePath = pathParts.slice(pathParts.indexOf(bucketName) + 1).join('/');

      const { error } = await this.supabaseClient.storage
        .from(bucketName)
        .remove([filePath]);

      if (error) {
        this.logger.error('Supabase delete error:', error);
        throw new BadRequestException(`Failed to delete file: ${error.message}`);
      }
    } catch (error) {
      this.logger.error('Failed to delete from Supabase:', error);
      throw new BadRequestException('Failed to delete file from storage');
    }
  }

  private async uploadToS3(
    file: Express.Multer.File,
    category: FileCategory,
    options: FileUploadOptions,
  ): Promise<FileUploadResult> {
    // TODO: Implement AWS S3 upload
    throw new BadRequestException('AWS S3 provider not implemented yet');
  }

  private async deleteFromS3(fileUrl: string): Promise<void> {
    // TODO: Implement AWS S3 delete
    throw new BadRequestException('AWS S3 provider not implemented yet');
  }

  private async uploadToLocal(
    file: Express.Multer.File,
    category: FileCategory,
    options: FileUploadOptions,
  ): Promise<FileUploadResult> {
    // TODO: Implement local file upload
    throw new BadRequestException('Local provider not implemented yet');
  }

  private async deleteFromLocal(fileUrl: string): Promise<void> {
    // TODO: Implement local file delete
    throw new BadRequestException('Local provider not implemented yet');
  }

  // Utility methods for common file operations
  async uploadAvatar(file: Express.Multer.File, userId: string): Promise<FileUploadResult> {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB for avatars

    return this.uploadFile(file, FileCategory.AVATAR, {
      folder: `users/${userId}`,
      allowedTypes,
      maxSize,
      generateUniqueName: true,
    });
  }

  async uploadDocument(file: Express.Multer.File, userId: string): Promise<FileUploadResult> {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB for documents

    return this.uploadFile(file, FileCategory.DOCUMENT, {
      folder: `users/${userId}/documents`,
      allowedTypes,
      maxSize,
      generateUniqueName: true,
    });
  }

  async uploadGeneral(file: Express.Multer.File, folder?: string): Promise<FileUploadResult> {
    return this.uploadFile(file, FileCategory.GENERAL, {
      folder,
      generateUniqueName: true,
    });
  }
}
