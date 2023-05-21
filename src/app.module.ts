import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { ExcelModule } from './usecases/excel-report/excel.module';

@Module({
  imports: [ExcelModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
