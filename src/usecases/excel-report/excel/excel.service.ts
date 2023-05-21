import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as ExcelJS from 'exceljs';

import { FileService } from 'src/services/fs/fs.service';

@Injectable()
export class ExcelService {
  constructor(private readonly fs: FileService) {}
  async getTop() {
    const useragent =
      'Mozilla%2F5.0+%28iPhone%3B+CPU+iPhone+OS+7_0+like+Mac+OS+X%29+AppleWebKit%2F537.51.1+%28KHTML%2C+like+Gecko%29+Version%2F7.0+Mobile%2F11A465+Safari%2F9537.53';
    const location = 'w+CAIQIFISCSXqSrhS2XQxEctjUsuTzREh';

    const browser = await puppeteer.launch({
      headless: control.HEADLESS,
      args: ['--disabled-setuid-sandbox', '--no-sandbox'],
    });
    const page = await browser.newPage();

    // const m = puppeteer.KnownDevices['iPhone 11'];
    //emulate iPhoneXua
    // await page.emulate(m);

    const ads_results: Row[] = [];

    // await page.setUserAgent(iua);
    for (const word of keyWords) {
      const { keyword, chinese } = word;
      const adurl = `https://www.google.com//search?q=${keyword}&ip=0.0.0.0&source_ip=0.0.0.0&ie=UTF-8&oe=UTF-8&hl=vi&adtest=on&noj=1&igu=1&uule=${location}&adtest-useragent=${useragent}`;
      await page.goto(adurl, {
        waitUntil: 'domcontentloaded',
      });
      const results = await page.evaluate((formats) => {
        const pms = document.querySelectorAll('.ob9lvb');
        const values = Array.from(pms, (element, index) => {
          if (index >= 4) {
            return null;
          }

          const url = element.innerHTML.slice(
            0,
            element.innerHTML.indexOf('/'),
          );
          const result = formats[url];
          return result;
        }).filter((item) => item !== null);

        const urls = Array.from(pms, (element) => {
          const url = element.innerHTML.slice(
            0,
            element.innerHTML.indexOf('/'),
          );
          return url;
        });

        return { values, urls };
      }, formats);

      // this.fs.appendFile(results.urls);
      const Row: Row = {
        keyword,
        chinese,
        top: results.values,
      };

      ads_results.push(Row);
    }

    await browser.close();
    return ads_results;
  }

  async exportExcelNew(data: Row[]): Promise<any> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Set default cell properties
    worksheet.properties.defaultRowHeight = 50; // Set default row height
    worksheet.properties.defaultColWidth = 20; // Set default column width

    data.forEach((item) => {
      const row = [
        item.keyword,
        item.chinese,
        ...item.top.map((topItem) => (topItem ? topItem.value : '')),
      ];
      const addedRow = worksheet.addRow(row);
      item.top.forEach((topItem, columnIndex) => {
        const cell = addedRow.getCell(columnIndex + 3);
        cell.alignment = { vertical: 'middle', horizontal: 'center' };

        if (topItem && topItem.format) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: topItem.format.bgColor },
          };
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}

export const keyWords: keyWord[] = [
  {
    keyword: 'kham+tri',
    chinese: 'Chi',
  },
  {
    keyword: '[kham+tri]',
    chinese: 'khamtrichina',
  },
  {
    keyword: 'benh+tri',
    chinese: 'benhtrichina',
  },
];

export const formats: nameList = {
  'khamtri.dakhoahongphuc.vn': {
    value: 'Hồng Phúc 鸿福',
    format: {
      bgColor: '00FF00',
    },
  },
  'benhtri.phongkhamdakhoahongcuong.vn': {
    value: 'Hồng Cường 鸿强',
    format: {
      bgColor: 'FF00FF',
    },
  },
  'benhtri.phongkhamdinhtienhoang.vn': {
    value: 'Đinh Tiên Hoàng 丁先皇',
    format: {
      bgColor: 'DD7E6B',
    },
  },
  'benhtri.dakhoavankiet.vn': {
    value: 'Văn Kiệt 文杰',
    format: {
      bgColor: 'FFF2CC',
    },
  },
  'benhtri.dakhoaaua.vn': {
    value: 'Âu Á 欧亚',
    format: {
      bgColor: '4BACC6',
    },
  },
  'www.phongkhamdakhoatanbinh.vn': {
    value: 'TÂN BÌNH 新平',
    format: {
      bgColor: '4DF3F9',
    },
  },
};

export const dummy: Row[] = [
  {
    keyword: 'kham+tri',
    chinese: 'Chi',
    top: [
      {
        value: 'Hong Phuc',
        format: {
          bgColor: '00FF00',
        },
      },
      {
        value: 'Hong Cuong',
        format: {
          bgColor: '00FF00',
        },
      },
      {
        value: 'Tien Hoang',
        format: {
          bgColor: '00FF00',
        },
      },
      {
        value: 'Tan Binh',
        format: {
          bgColor: '00FF00',
        },
      },
      {
        value: 'Van Kiet',
        format: {
          bgColor: '00FF00',
        },
      },
      {
        value: 'A Au',
        format: {
          bgColor: '00FF00',
        },
      },
    ],
  },
  {
    keyword: '[kham+tri]',
    chinese: 'khamtrichina',
    top: [
      {
        format: {
          bgColor: '00FF00',
        },
        value: 'Hong Phuc',
      },
      {
        value: 'Hong Cuong',
        format: {
          bgColor: '00FF00',
        },
      },
      {
        value: 'Tien Hoang',
        format: {
          bgColor: '00FF00',
        },
      },
      {
        value: 'Van Kiet',
        format: {
          bgColor: '00FF00',
        },
      },
      {
        value: 'A Au',
        format: {
          bgColor: '00FF00',
        },
      },
      {
        value: 'Tan Binh',
        format: {
          bgColor: '00FF00',
        },
      },
    ],
  },
  {
    keyword: 'benh+tri',
    chinese: 'benhtrichina',
    top: [
      {
        format: {
          bgColor: '00FF00',
        },
        value: 'Hong Phuc',
      },
      {
        value: 'Tien Hoang',
        format: {
          bgColor: '00FF00',
        },
      },
      {
        value: 'A Au',
        format: {
          bgColor: '00FF00',
        },
      },
      {
        value: 'Van Kiet',
        format: {
          bgColor: '00FF00',
        },
      },
      null,
      null,
      null,
    ],
  },
];

export const control = {
  HEADLESS: true,
};

export interface nameList {
  [key: string]: top;
}

export interface top {
  value: string;
  format: {
    bgColor: string;
  };
}

export interface Row extends keyWord {
  top: top[];
}

export interface keyWord {
  keyword: string;
  chinese: string;
}
