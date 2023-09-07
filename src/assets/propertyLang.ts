import i18n from 'app/trans/i18n';

const keyLang = (key: string) => {
  if (i18n.language === 'korean') {
    return `${key}_kr`;
  } else return `${key}_eng`;
};

export const crowdFundingLink = () => {
  if (i18n.language === 'korean') {
    return `url`;
  } else return `url_eng`;
};

export const propertyLang = (value: any, key: string) => {
  const keyString = keyLang(key);
  if (Object.prototype.hasOwnProperty.call(value, keyString)) {
    return value[keyString];
  }
  console.log({ value });
  throw new Error(`Property ${keyString} does not exist on`);
};

const keyImgLang = (key: string) => {
  if (i18n.language === 'korean') {
    return `${key}Domestic`;
  } else return `${key}Oversea`;
};

export const propertyImgLang = (value: any, key: string) => {
  const keyString = keyImgLang(key);
  if (Object.prototype.hasOwnProperty.call(value, keyString)) {
    return value[keyString];
  }
  console.log({ value });
  throw new Error(`Property img ${keyString} does not exist on`);
};

export const formatCreatedAt = (value: any) => {
  const d = new Date(value);
  const arr = d.toDateString().split(' ');
  if (i18n.language === 'korean') {
    const month = d.getMonth() + 1;
    return `${arr[3]}년 ${month}월 ${arr[2]}일`;
  } else {
    return `${arr[1]} ${arr[2]}, ${arr[3]}`;
  }
};
