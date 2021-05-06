import {escapeRegExp} from 'lodash'
/**
 * 构造模糊查询正则，例如：'南京' => /南.*京/
 * @param {string} keyword
 * @return {RegExp}
 */
export const makeFuzzySearchRegexp = keyword => {
  if (typeof keyword !== 'string') {
    return null;
  }
  const matches = keyword.match(/\w+|\p{sc=Han}|[^\w\s\p{sc=Han}]+/gu);
  if (!matches) {
    return null;
  }
  return new RegExp(`${matches.map(text => escapeRegExp(text)).join('.*')}`);
};