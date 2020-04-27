import orderBy from "lodash/orderBy";
import property from "lodash/property";

export const stableSort = (arr, order, prop) => (
  orderBy(arr, property(prop), order)
);