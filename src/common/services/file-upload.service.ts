import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
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
  SERVICE = 'services',
  SERVICE_PORTFOLIO = 'services/portfolio',
  CATEGORY = 'categories',
}

@Injectable()
export class FileUploadService {
  private readonly logger = new Logger(FileUploadService.name);
  private supabaseClient: SupabaseClient;
  private s3Client: S3Client;
  private provider: FileUploadProvider;

  constructor(private readonly configService: ConfigService) {
    // Get the configured provider, default to LOCAL for development
    const configuredProvider = this.configService.get<string>(
      'FILE_UPLOAD_PROVIDER',
      FileUploadProvider.LOCAL,
    );

    // Validate and set the provider
    if (
      Object.values(FileUploadProvider).includes(
        configuredProvider as FileUploadProvider,
      )
    ) {
      this.provider = configuredProvider as FileUploadProvider;
    } else {
      this.logger.warn(
        `Invalid FILE_UPLOAD_PROVIDER: ${configuredProvider}, falling back to LOCAL`,
      );
      this.provider = FileUploadProvider.LOCAL;
    }

    // Initialize the appropriate client based on provider
    this.initializeProvider();

    this.logger.log(`File upload provider initialized: ${this.provider}`);
  }

  private initializeProvider(): void {
    switch (this.provider) {
      case FileUploadProvider.SUPABASE:
        this.initializeSupabase();
        break;
      case FileUploadProvider.AWS_S3:
        this.initializeS3();
        break;
      case FileUploadProvider.LOCAL:
        this.logger.log('Using LOCAL file upload provider');
        break;
      default:
        this.logger.error(`Unknown provider: ${this.provider}`);
        this.provider = FileUploadProvider.LOCAL;
        this.logger.log('Falling back to LOCAL provider');
    }
  }

  private initializeSupabase(): void {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      this.logger.error(
        'Supabase provider selected but SUPABASE_URL or SUPABASE_KEY not configured',
      );
      this.provider = FileUploadProvider.LOCAL;
      this.logger.warn('Falling back to LOCAL provider');
      return;
    }

    this.supabaseClient = createClient(supabaseUrl, supabaseKey);
    this.logger.log('Supabase client initialized successfully');
  }

  private initializeS3(): void {
    const awsRegion = this.configService.get<string>('AWS_REGION');
    const awsAccessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const awsSecretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );

    if (!awsRegion || !awsAccessKeyId || !awsSecretAccessKey) {
      this.logger.error(
        'AWS S3 provider selected but AWS credentials not configured',
      );
      this.provider = FileUploadProvider.LOCAL;
      this.logger.warn('Falling back to LOCAL provider');
      return;
    }

    this.s3Client = new S3Client({
      region: awsRegion,
      credentials: {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretAccessKey,
      },
    });
    this.logger.log('AWS S3 client initialized successfully');
  }

  async uploadFile(
    file: Express.Multer.File,
    category: FileCategory,
    options: FileUploadOptions = {},
  ): Promise<FileUploadResult> {
    // Validate file
    this.validateFile(file, options);

    this.logger.log(`Using file upload provider: ${this.provider}`);

    switch (this.provider) {
      case FileUploadProvider.SUPABASE:
        return this.uploadToSupabase(file, category, options);
      case FileUploadProvider.AWS_S3:
        return this.uploadToS3(file, category, options);
      case FileUploadProvider.LOCAL:
        return this.uploadToLocal(file, category, options);
      default:
        this.logger.error(
          `Unknown provider: ${this.provider}, available providers: ${Object.values(FileUploadProvider)}`,
        );
        throw new BadRequestException(
          `Unsupported file upload provider: ${this.provider}`,
        );
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
        throw new BadRequestException(
          `Unsupported file upload provider: ${this.provider}`,
        );
    }
  }

  private validateFile(
    file: Express.Multer.File,
    options: FileUploadOptions,
  ): void {
    // Check file size
    const maxSize = options.maxSize || 10 * 1024 * 1024; // Default 10MB
    if (file.size > maxSize) {
      throw new BadRequestException(
        `File size cannot exceed ${maxSize / (1024 * 1024)}MB`,
      );
    }

    // Check file type
    if (options.allowedTypes && !options.allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types: ${options.allowedTypes.join(', ')}`,
      );
    }
  }

  private generateFileName(
    originalName: string,
    generateUnique: boolean = true,
  ): string {
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
      const fileName = this.generateFileName(
        file.originalname,
        options.generateUniqueName,
      );
      const filePath = options.folder
        ? `${options.folder}/${fileName}`
        : `${category}/${fileName}`;

      const { data, error } = await this.supabaseClient.storage
        .from(bucketName)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) {
        this.logger.error('Supabase upload error:', error);
        throw new BadRequestException(
          `Failed to upload file: ${error.message}`,
        );
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
      const bucketName = this.configService.get<string>(
        'SUPABASE_BUCKET_NAME',
        'pavodah-files',
      );

      // Extract file path from URL
      const url = new URL(fileUrl);
      const pathParts = url.pathname.split('/');
      const filePath = pathParts
        .slice(pathParts.indexOf(bucketName) + 1)
        .join('/');

      const { error } = await this.supabaseClient.storage
        .from(bucketName)
        .remove([filePath]);

      if (error) {
        this.logger.error('Supabase delete error:', error);
        throw new BadRequestException(
          `Failed to delete file: ${error.message}`,
        );
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
    try {
      const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
      if (!bucketName) {
        throw new BadRequestException('AWS S3 bucket name not configured');
      }

      const fileName = this.generateFileName(
        file.originalname,
        options.generateUniqueName,
      );
      const key = options.folder
        ? `${options.folder}/${fileName}`
        : `${category}/${fileName}`;

      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentLength: file.size,
      });

      await this.s3Client.send(command);

      // Generate public URL
      const region = this.configService.get<string>('AWS_REGION');
      const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

      return {
        url: publicUrl,
        fileName: fileName,
        fileSize: file.size,
        fileType: file.mimetype,
      };
    } catch (error) {
      this.logger.error('Failed to upload to S3:', error);
      throw new BadRequestException('Failed to upload file to S3 storage');
    }
  }

  private async deleteFromS3(fileUrl: string): Promise<void> {
    try {
      const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
      if (!bucketName) {
        throw new BadRequestException('AWS S3 bucket name not configured');
      }

      // Extract key from URL
      const url = new URL(fileUrl);
      const key = url.pathname.substring(1); // Remove leading slash

      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
      this.logger.log(`Deleted S3 file: ${key}`);
    } catch (error) {
      this.logger.error('Failed to delete from S3:', error);
      throw new BadRequestException('Failed to delete file from S3 storage');
    }
  }

  private async uploadToLocal(
    file: Express.Multer.File,
    category: FileCategory,
    options: FileUploadOptions,
  ): Promise<FileUploadResult> {
    const fs = require('fs').promises;
    const path = require('path');

    try {
      // Create uploads directory structure
      const uploadsDir = path.join(process.cwd(), 'uploads');
      const categoryDir = path.join(uploadsDir, category);
      const folderDir = options.folder
        ? path.join(categoryDir, options.folder)
        : categoryDir;

      // Ensure directories exist
      await fs.mkdir(folderDir, { recursive: true });

      // Generate file name
      const fileName = this.generateFileName(
        file.originalname,
        options.generateUniqueName,
      );
      const filePath = path.join(folderDir, fileName);

      // Write file to disk
      await fs.writeFile(filePath, file.buffer);

      // Generate public URL (for development)
      const relativePath = path.relative(
        path.join(process.cwd(), 'uploads'),
        filePath,
      );
      const publicUrl = `/uploads/${relativePath.replace(/\\/g, '/')}`;

      return {
        url: publicUrl,
        fileName: fileName,
        fileSize: file.size,
        fileType: file.mimetype,
      };
    } catch (error) {
      this.logger.error('Local upload error:', error);
      throw new BadRequestException(
        `Failed to upload file locally: ${error.message}`,
      );
    }
  }

  private async deleteFromLocal(fileUrl: string): Promise<void> {
    const fs = require('fs').promises;
    const path = require('path');

    try {
      // Convert URL back to file path
      const relativePath = fileUrl.replace('/uploads/', '');
      const filePath = path.join(process.cwd(), 'uploads', relativePath);

      // Check if file exists and delete it
      try {
        await fs.access(filePath);
        await fs.unlink(filePath);
        this.logger.log(`Deleted local file: ${filePath}`);
      } catch (error) {
        // File doesn't exist, which is fine
        this.logger.warn(`File not found for deletion: ${filePath}`);
      }
    } catch (error) {
      this.logger.error('Local delete error:', error);
      // Don't throw error for delete operations to avoid breaking the flow
    }
  }

  // Utility methods for common file operations
  async uploadAvatar(
    file: Express.Multer.File,
    userId: string,
  ): Promise<FileUploadResult> {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB for avatars

    return this.uploadFile(file, FileCategory.AVATAR, {
      folder: `users/${userId}`,
      allowedTypes,
      maxSize,
      generateUniqueName: true,
    });
  }

  async uploadDocument(
    file: Express.Multer.File,
    userId: string,
  ): Promise<FileUploadResult> {
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

  async uploadGeneral(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<FileUploadResult> {
    return this.uploadFile(file, FileCategory.GENERAL, {
      folder,
      generateUniqueName: true,
    });
  }
}
