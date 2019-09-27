const charA = "A".charCodeAt(0);

function ord(charCode) {
  return charCode - charA;
}

function addToLetter(charCode, delta) {
  const o = ord(charCode);
  // console.log('o', o);
  const od = o + parseInt(delta);
  // console.log('od', od);
  const newCharcode = charA + (od) % 26;

  // console.log(String.fromCharCode(charCode), '->', String.fromCharCode(newCharcode));
  return String.fromCharCode(newCharcode);
}

export function caesar(input, shift = 2) {
  let output = "";

  for (let i = 0; i < input.length; i += 1) {
    output += addToLetter(input.charCodeAt(i), shift);
  }

  return output;
}

export function clean(input) {
  return input.toUpperCase().replace(/[^A-Z]/g, '');
}

export function format(input) {
  return input.match(/\w{1,5}/g).join(" ");
}

export function makeHistogram(input) {
  const histogram = Array(26).fill(0);

  for (let i = 0; i < input.length; i += 1) {
    const o = ord(input.charCodeAt(i));
    histogram[o] += 1;
  }

  return histogram;
}
