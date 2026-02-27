import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/modules/shared/components/UI/file-upload";
import { Button } from "@/modules/shared/components/UI/button";
import { Upload, X } from "lucide-react";

interface DriverLicenseInputProps {
  value: File[];
  onChange: (files: File[]) => void;
}

export function DriverLicenseInput({ value, onChange }: DriverLicenseInputProps) {
  return (
    <FileUpload
      value={value}
      onValueChange={onChange}
      accept='image/*'
      multiple
      maxFiles={1}
      className='w-full max-w'
    >
      <FileUploadDropzone>
        <div className='flex flex-col items-center gap-1'>
          <div className='flex items-center justify-center rounded-full border p-2.5'>
            <Upload className='size-6 text-muted-foreground' />
          </div>
          <p className='font-medium text-sm'>Drag & drop your driver license here</p>
          <p className='text-muted-foreground text-xs'>Or click to browse</p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant='outline' size='sm' className='mt-2 w-fit'>
            Browse driver license
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {value.map((file) => (
          <FileUploadItem key={file.name} value={file}>
            <FileUploadItemPreview />
            <FileUploadItemMetadata />
            <FileUploadItemDelete asChild>
              <Button variant='ghost' size='icon' className='size-7'>
                <X />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
}
