import { createMiddleware } from "hono/factory";
import type { Context } from "hono";

// File upload configuration for peaceful file handling
export interface FileUploadOptions {
  maxFileSize?: number; // in bytes
  allowedMimeTypes?: string[];
  uploadDir?: string;
}

const defaultOptions: FileUploadOptions = {
  maxFileSize: 10 * 1024 * 1024, // 10MB - serene limit
  allowedMimeTypes: [
    'image/jpeg',
    'image/png', 
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'text/csv',
    'application/json'
  ],
  uploadDir: './uploads'
};

// Beaver-inspired file upload middleware
export const fileUploadMiddleware = (options: FileUploadOptions = {}) => {
  const config = { ...defaultOptions, ...options };
  
  return createMiddleware(async (c: Context, next) => {
    const contentType = c.req.header('content-type');
    
    if (!contentType?.includes('multipart/form-data')) {
      return next();
    }

    try {
      // Parse the multipart form data with Bun's native support
      const formData = await c.req.formData();
      const files: File[] = [];
      const fields: Record<string, string> = {};

      for (const [key, value] of formData.entries()) {
        if (value && typeof value === 'object' && value.constructor && value.constructor.name === 'File') {
          // Validate file size
          if (value.size > config.maxFileSize!) {
            return c.json({ 
              error: 'File too large', 
              maxSize: config.maxFileSize 
            }, 413);
          }

          // Validate MIME type
          if (config.allowedMimeTypes && !config.allowedMimeTypes.includes(value.type)) {
            return c.json({ 
              error: 'File type not allowed', 
              allowedTypes: config.allowedMimeTypes 
            }, 415);
          }

          files.push(value);
        } else {
          fields[key] = value as string;
        }
      }

      // Attach parsed data to context for peaceful access
      c.set('uploadedFiles', files);
      c.set('formFields', fields);
      
      return next();
    } catch (error) {
      return c.json({ error: 'Failed to parse multipart data' }, 400);
    }
  });
};

// Helper function to save files with beaver-like organization
export const saveUploadedFile = async (file: File, uploadDir: string = './uploads'): Promise<string> => {
  // Ensure upload directory exists
  await Bun.write(`${uploadDir}/.gitkeep`, '');
  
  // Generate unique filename with timestamp for peaceful coexistence
  const timestamp = Date.now();
  const extension = file.name.split('.').pop() || '';
  const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${extension}`;
  const filepath = `${uploadDir}/${filename}`;
  
  // Save file with Bun's efficient file handling
  await Bun.write(filepath, file);
  
  return filepath;
};
