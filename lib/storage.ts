import { supabase } from "./supabase";

// Swappable interface - easy to replace Supabase with Cloudinary, S3, etc.
export interface StorageProvider {
  upload(file: File): Promise<string>;
  delete(url: string): Promise<void>;
}

const BUCKET_NAME = "preview-images";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/heic",
  "image/heif",
  "image/bmp",
  "image/tiff",
];

export class StorageError extends Error {
  constructor(
    message: string,
    public code:
      | "FILE_TOO_LARGE"
      | "INVALID_TYPE"
      | "UPLOAD_FAILED"
      | "DELETE_FAILED",
  ) {
    super(message);
    this.name = "StorageError";
  }
}

export function validateFile(file: File): void {
  if (file.size > MAX_FILE_SIZE) {
    throw new StorageError(
      `File size must be less than 5MB. Your file is ${(file.size / 1024 / 1024).toFixed(1)}MB.`,
      "FILE_TOO_LARGE",
    );
  }

  // Check file type - also allow .heic/.heif by extension since MIME type detection can be unreliable
  const isAllowedType = ALLOWED_TYPES.includes(file.type);
  const hasAllowedExtension = /\.(heic|heif)$/i.test(file.name);

  if (!isAllowedType && !hasAllowedExtension) {
    throw new StorageError(
      "Unsupported file format. Please upload a JPEG, PNG, GIF, WebP, HEIC, or HEIF image.",
      "INVALID_TYPE",
    );
  }
}

// Supabase implementation
const supabaseStorage: StorageProvider = {
  async upload(file: File): Promise<string> {
    // Validate before upload
    validateFile(file);

    const fileExt = file.name.split(".").pop() || "jpg";
    const filename = `${crypto.randomUUID()}.${fileExt}`;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new StorageError(
        `Upload failed: ${error.message}`,
        "UPLOAD_FAILED",
      );
    }

    // Use Supabase image transformations - WebP conversion is automatic
    // when any transform param is used (based on browser Accept header)
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filename, {
        transform: {
          quality: 90,
        },
      });

    return urlData.publicUrl;
  },

  async delete(url: string): Promise<void> {
    // Extract filename from URL (handle query params from transform URLs)
    const urlWithoutParams = url.split("?")[0];
    const urlParts = urlWithoutParams.split("/");
    const filename = urlParts[urlParts.length - 1];

    if (!filename) return;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filename]);

    if (error) {
      // Don't throw on delete errors - just log them
      console.error("Failed to delete image:", error.message);
    }
  },
};

// Export the current storage provider (easy to swap later)
export const storage = supabaseStorage;
