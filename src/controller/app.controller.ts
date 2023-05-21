import { Controller, Get, Res } from '@nestjs/common';
import { ExcelService } from 'src/usecases/excel-report/excel/excel.service';
import { Response } from 'express';
import { dummy } from 'src/configuration/dummy-data';

@Controller()
export class AppController {
  constructor(private readonly excelService: ExcelService) {}

  @Get('test')
  async getTop(@Res() res: Response) {
    const buffer = await this.excelService.exportExcelNew(dummy);
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
    res.send(buffer);
  }

  @Get('product')
  async testExcell(@Res() res: Response) {
    const data = await this.excelService.getTop();
    const buffer = await this.excelService.exportExcelNew(data);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
    res.send(buffer);
  }
}
