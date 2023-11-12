import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class UploadService {
  private storage = new Storage({
    projectId: "oceanic-will-398716",
    keyFilename: "./keys.json", // Path to the JSON file with your service account key
  });
  private bucket = this.storage.bucket("peerprep-questions"); // Your bucket name

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const { originalname, buffer } = file;
    const blob = this.bucket.file(originalname); // Create a new blob in the bucket and upload the file data.
    const blobStream = blob.createWriteStream();
  
    return new Promise((resolve, reject) => {
      blobStream.on('error', err => reject(err));
      blobStream.on('finish', () => {
        // Replace spaces with '%20' only in the URL for direct access
        const publicUrl = `https://storage.googleapis.com/${this.bucket.name}/${encodeURIComponent(blob.name)}`;
        resolve(publicUrl);
      });
  
      blobStream.end(buffer);
    });
  }
  
  async deleteFile(fileName: string): Promise<void> {
    const file = this.bucket.file(fileName);
  
    try {
      await file.delete();
      console.log(`File ${fileName} deleted.`);
    } catch (error) {
      console.error(`Failed to delete file ${fileName}:`, error);
      throw error; // You might want to handle this more gracefully
    }
  }
  
}
