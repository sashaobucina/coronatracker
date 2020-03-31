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