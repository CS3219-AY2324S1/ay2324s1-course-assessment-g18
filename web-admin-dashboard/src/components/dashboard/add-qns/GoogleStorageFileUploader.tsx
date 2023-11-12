import { Button } from "@/components/ui/button";
import {
  useState,
  Dispatch,
  SetStateAction,
} from "react";
interface Props {
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
}

function GoogleStorageFileUploader({url, setUrl}: Props) {
  const [file, setFile] = useState<any | null>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", file.data);
    const response = await fetch(import.meta.env.VITE_BASE_UPLOAD_URL + "/upload/", {
      method: "POST",
      body: formData,
    });
    const responseWithBody = await response.json();
    console.log(responseWithBody);
    console.log(responseWithBody.url);
    if (response) setUrl(responseWithBody.url);
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
  
    if (file) {
      // Check if the file is an image
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/svg+xml'];
      if (!validImageTypes.includes(file.type)) {
        alert('Please select a valid image file.');
        e.target.value = ''; // Clear the selected file
        return;
      }
  
      const img = {
        preview: URL.createObjectURL(file),
        data: file,
      };
      setFile(img);
    }
  };
  
  return (
    <div className="flex items-center gap-[10px]">
        <input type="file" name="file" onChange={handleFileChange}></input>
        <Button onClick={handleSubmit} type="submit" className="bg-[#5562eb] hover:bg-[#6470ee]">
          Upload
          </Button>
    </div>
  );
}
export default GoogleStorageFileUploader;