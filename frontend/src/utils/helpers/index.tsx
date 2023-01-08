import React from 'react';
import { TabPanelProps } from '../../typings/interfaces/tabInterface';

export function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
};

export const isObjectSame = (prevObj: any, newObj: any) => {
  const isSameObj = Object.keys(newObj).every(
    (key) => prevObj.hasOwnProperty(key) && prevObj[key] === newObj[key],
  );
  return isSameObj;
};

export const searchResult = (arr: any, searchObj: any) => {
  const data = arr.filter((e: any) =>
    Object.keys(e).some(
      (key) =>
        e[key] &&
        searchObj[key] &&
        e[key].toString().toLowerCase().includes(searchObj[key].toLowerCase()),
    ),
  );

  return data;
};

export const isEmptyObj = (obj: any) => {
  if (obj) {
    for (const key in obj) {
      if (obj[key] !== null && obj[key] !== '') {
        return false;
      }
      return true;
    }
  }
  return false;
};
