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
  return n <= 1 ? "0" : (data[n - 1][key] - data[n - 2][key]).toString();
}

export function getDate(data, ind) {
  const date = new Date(data[ind]["date"].toString());
  return date.toDateString();
}