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
