const charA = 'A'.charCodeAt(0);

function ord(charCode) {
  return charCode - charA;
}

function addToLetter(charCode, delta) {
  const o = ord(charCode);
  // console.log('o', o);
  const od = o + parseInt(delta, 10);
  // console.log('od', od);
  const newCharcode = charA + (od % 26);

  // console.log(String.fromCharCode(charCode), '->', String.fromCharCode(newCharcode));
  return String.fromCharCode(newCharcode);
}

export function caesar(input, shift = 2) {
  let output = '';

  for (let i = 0; i < input.length; i += 1) {
    output += addToLetter(input.charCodeAt(i), shift);
  }

  return output;
}

export function clean(input) {
  return input
    .toUpperCase()
    .replace(/Ä/g, 'AE')
    .replace(/Ö/g, 'OE')
    .replace(/Ü/g, 'UE')
    .replace(/[^A-Z]/g, '');
}

export function format(input) {
  return input ? input.match(/\w{1,5}/g).join(' ') : '';
}

export function makeHistogram(input) {
  const histogram = Array(26).fill(0);

  for (let i = 0; i < input.length; i += 1) {
    const o = ord(input.charCodeAt(i));
    histogram[o] += 1;
  }

  for (let i = 0; i < histogram.length; i += 1) {
    histogram[i] /= input.length;
  }

  return histogram;
}

export function standardDeviation(histogram1, histogram2) {
  let stdv = 0;

  for (let i = 0; i < histogram1.length; i += 1) {
    stdv += (histogram1[i] - histogram2[i]) ** 2;
  }

  stdv = Math.sqrt(stdv / (histogram1.length - 1));

  return stdv;
}

export const random = (max) => Math.floor(Math.random() * max);
