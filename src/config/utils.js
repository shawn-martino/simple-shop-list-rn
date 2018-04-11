import _ from 'lodash';

export const createOrganizedItemsArray = (items) => {
  // Create Alphabet array and loop over each, discard non-matching first letter of item
  const sectionList = [...'abcdefghijklmnopqrstuvwxyz'].reduce(
    (result, letter) => {
      // Create object to store the letters items
      const letterObj = { key: letter, data: [] };
      // Loop over items and add matches to letter object
      items.map((item) => {
        if (item.name.charAt().toLowerCase() === letter) {
          return letterObj.data.push(item);
        }
        return item;
      });
      // All matches added to reduced array and returned
      if (letterObj.data.length > 0) {
        const sortedItems = _.sortBy(letterObj.data, 'name');
        letterObj.data = sortedItems;
        result = [...result, letterObj]; // eslint-disable-line no-param-reassign
        return result;
      }
      return result;
    },
    [],
  );
  // Return the new array as a promise enabling .then()
  return sectionList;
};

export const createOrganizedListArray = (list) => {
  const shops = new Set();
  list.forEach((item) => {
    shops.add(item.shop);
  });
  const sortedList = [];
  shops.forEach((shop) => {
    const sortedItems = list.filter(item => item.shop === shop);
    const obj = {
      key: shop,
      data: _.sortBy(sortedItems, 'name'),
    };
    sortedList.push(obj);
  });
  const sortedListByShop = _.sortBy(sortedList, 'key');
  return sortedListByShop;
};
