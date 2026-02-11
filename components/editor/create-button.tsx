"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { hasChanges, validateConfig } from "@/lib/config-context";
import { savePreview } from "@/lib/preview-storage";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Brand, BrandConfig } from "@/lib/brands";

interface CreateButtonProps {
  config: BrandConfig;
  brand: Brand;
  onSuccess: (uuid: string) => void;
  className?: string;
  label?: string;
}

export function CreateButton({ config, brand, onSuccess, className, label }: CreateButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    // Validate required fields
    const errors = validateConfig(config);
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    // Check if there are any changes
    if (!hasChanges(config, brand)) {
      toast.error("No changes to save", {
        description: "Make some changes before creating a preview.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const uuid = await savePreview(config, brand);
      toast.success("Preview created!");
      onSuccess(uuid);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create preview";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCreate}
      disabled={isLoading}
      className={cn(
        "flex items-center justify-center px-6 py-4 bg-black hover:bg-gray-900 disabled:bg-gray-400 rounded-md text-[22px] font-bold text-white transition-colors disabled:cursor-not-allowed tracking-[-0.02em]",
        className ?? "w-full"
      )}
      style={{
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          CREATING...
        </>
      ) : (
        label ?? "Create Card"
      )}
    </button>
  );
}
