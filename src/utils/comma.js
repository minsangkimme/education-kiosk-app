export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function convertCommaNumber(x) {
  if (x === '') return '';
  return x == undefined ? null : Number(x.toString().replace(/,/gi,'')).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function removeCommas(x) {
  if (x === 0) return 0;
  if (!x) return null;
  return x.toString().replace(/,/gi, "");
}
