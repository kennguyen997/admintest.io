import transEN from './en';
import { trans } from './transtypes';

const clone = (ob: trans): trans => {
  return JSON.parse(JSON.stringify(ob));
};

const getKeyObjects = (ob: any): trans => {
  Object.keys(ob).forEach((k: string) => {
    Object.keys(ob[k]).forEach((ck: string) => {
      ob[k][ck] = `${k}.${ck}`;
    });
  });
  return ob;
};

export const { common, errorMessage, keyValue, defaultKeyValue, applyPage } = getKeyObjects(
  clone(transEN),
);
