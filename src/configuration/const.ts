import { keyWord, nameList } from './const.interface';

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
