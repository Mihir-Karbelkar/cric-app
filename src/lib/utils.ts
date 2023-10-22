import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function epochToJsDate(ts: number) {
  let objectDate = new Date(ts);

  let day = objectDate.getDate();
  let month = objectDate.getMonth();

  let year = objectDate.getFullYear();
  return `${day}/${month}/${year}`;
}

export const paginate = <T extends any>(
  items: Array<T>,
  page = 0,
  perPage = 10
) => {
  const offset = perPage * page;
  const totalPages = Math.ceil(items.length / perPage);
  const paginatedItems = items.slice(offset, perPage * (page + 1));

  return {
    previousPage: page - 1 > -1 ? page - 1 : null,
    nextPage: totalPages > page + 1 ? page + 1 : null,
    total: items.length,
    pageCount: totalPages,
    items: paginatedItems,
  };
};

export const groupParamsByKey = (params: any) =>
  [...params.entries()].reduce((acc, tuple) => {
    // getting the key and value from each tuple
    const [key, val] = tuple;
    if (acc.hasOwnProperty(key)) {
      // if the current key is already an array, we'll add the value to it
      if (Array.isArray(acc[key])) {
        acc[key] = [...acc[key], val];
      } else {
        // if it's not an array, but contains a value, we'll convert it into an array
        // and add the current value to it
        acc[key] = [acc[key], val];
      }
    } else {
      // plain assignment if no special case is present
      acc[key] = val;
    }

    return acc;
  }, {});
