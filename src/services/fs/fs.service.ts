import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileService {
  writeFile(filename: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(filename, content, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  writeArrayToFile(filename: string, data: string[]): Promise<void> {
    const content = data.join('\n');
    return this.writeFile(filename, content);
  }

  appendFile(urlArr: string[]): void {
    const filename = 'urls.txt';

    try {
      // Read existing URLs from the file
      const existingUrls = fs
        .readFileSync(filename, 'utf-8')
        .split('\n')
        .filter(Boolean);

      // Find new URLs
      const uniqueUrls = urlArr.filter((url) => !existingUrls.includes(url));

      // Append new URLs to the file
      if (uniqueUrls.length > 0) {
        const content = uniqueUrls.join('\n') + '\n';
        fs.appendFileSync(filename, content);
      }
    } catch (error) {
      console.log('Failed append file!');
    }
  }
}
