import { Module } from '@nestjs/common';
import { ExcelService } from './excel/excel.service';
import { FileModule } from 'src/services/fs/fs.module';

@Module({
  imports: [FileModule],
  providers: [ExcelService],
  exports: [ExcelService],
})
export class ExcelModule {}
