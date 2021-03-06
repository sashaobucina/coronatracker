import find from "lodash/find";

export function convertDataToWeekly(overall) {
  const filteredData = overall.filter((entry) => entry.confirmed !== 0);

  let data = filteredData.map((entry, idx, arr) => {
    const weeklyVal = idx < 7 ? 0 : arr[idx]["confirmed"] - arr[idx - 7]["confirmed"];
    return {
      cases: entry.confirmed,
      weekly: Math.round(weeklyVal)
    };
  });

  return data.filter((entry) => entry.weekly >= 10);
}

export function convertToDates(overall, offset) {
  const n = overall.length
  return overall.slice(n - offset, n).map(entry => entry["date"])
}

export function getSummary(data, key) {
  const n = data.length;
  return n <= 1 ? "0" : formatNumber((data[n - 1][key] - data[n - 2][key]));
}

export function getCountry(country, countries) {
  return find(countries, (maybeCountry) => (
    maybeCountry.toLowerCase() === country.toLowerCase()
  ));
}

export function getDate(dateStr) {
  const date = new Date(dateStr);
  return date.toDateString();
}

export function today() {
  const today = new Date();
  return `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`;
}

export function formatNumber(num) {
  let numParts = num.toString().split('.');
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return numParts.join('.');
}

export function rounded(num) {
  if (num >= 1000000000) {
    return Math.round(num / 100000000) / 10 + "B";
  }
  else if (num >= 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  }
  else if (num >= 1000) {
    return Math.round(num / 100) / 10 + "K";
  } else {
    return num
  }
};