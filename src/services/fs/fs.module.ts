import { Module } from '@nestjs/common';
import { FileService } from './fs.service';

@Module({
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
