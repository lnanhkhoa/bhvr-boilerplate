import { Hono } from "hono";
import type { Context } from "hono";

// Beaver-inspired file upload routes with serene error handling
const app = new Hono();

// Apply file upload middleware to all routes
app.use("*", async (c, next) => {
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
      if (value && typeof value === 'object' && 'name' in value && 'size' in value && 'type' in value) {
        const file = value as File;
        
        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          return c.json({ 
            success: false,
            message: "Upload failed",
            error: 'File too large (max 10MB)' 
          }, 413);
        }

        files.push(file);
      } else {
        fields[key] = value as string;
      }
    }

    // Attach parsed data to context
    (c as any).set('uploadedFiles', files);
    (c as any).set('formFields', fields);
    
    return next();
  } catch (error) {
    return c.json({ 
      success: false,
      message: "Upload failed",
      error: 'Failed to parse multipart data' 
    }, 400);
  }
});

// Helper function to save files
const saveUploadedFile = async (file: File, uploadDir: string = './uploads'): Promise<string> => {
  // Ensure upload directory exists
  await Bun.write(`${uploadDir}/.gitkeep`, '');
  
  // Generate unique filename
  const timestamp = Date.now();
  const extension = file.name.split('.').pop() || '';
  const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${extension}`;
  const filepath = `${uploadDir}/${filename}`;
  
  // Save file
  await Bun.write(filepath, file);
  
  return filepath;
};

// Single file upload handler
app.post("/single", async (c: Context) => {
  try {
    const files = c.get('uploadedFiles') as File[];

    if (!files || files.length === 0) {
      return c.json({
        success: false,
        message: "Upload failed",
        error: "No file provided",
      }, 400);
    }

    if (files.length > 1) {
      return c.json({
        success: false,
        message: "Upload failed",
        error: "Only one file allowed for single upload",
      }, 400);
    }

    const file = files[0];
    if (!file) {
      return c.json({
        success: false,
        message: "Upload failed",
        error: "Invalid file data",
      }, 400);
    }
    
    const filepath = await saveUploadedFile(file);

    return c.json({
      success: true,
      message: "File uploaded successfully with beaver-like precision",
      files: [{
        originalName: file.name,
        filename: filepath.split('/').pop() || '',
        filepath: filepath,
        size: file.size,
        mimeType: file.type,
      }],
    });

  } catch (error) {
    console.error('Upload error:', error);
    return c.json({
      success: false,
      message: "Upload failed",
      error: "Failed to upload file",
    }, 500);
  }
});

// Multiple files upload handler
app.post("/multiple", async (c: Context) => {
  try {
    const files = c.get('uploadedFiles') as File[];

    if (!files || files.length === 0) {
      return c.json({
        success: false,
        message: "Upload failed",
        error: "No files provided",
      }, 400);
    }

    const uploadedFiles = [];
    
    for (const file of files) {
      const filepath = await saveUploadedFile(file);
      uploadedFiles.push({
        originalName: file.name,
        filename: filepath.split('/').pop() || '',
        filepath: filepath,
        size: file.size,
        mimeType: file.type,
      });
    }

    return c.json({
      success: true,
      message: `${files.length} files uploaded successfully with serene organization`,
      files: uploadedFiles,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return c.json({
      success: false,
      message: "Upload failed",
      error: "Failed to upload files",
    }, 500);
  }
});

export default app;
