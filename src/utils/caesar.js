const charA = "A".charCodeAt(0);

function ord(charCode) {
  return charCode - charA;
}

function addToLetter(charCode, delta) {
  const newCharcode = charA + (ord(charCode) + delta) % 26;
  return String.fromCharCode(newCharcode);
}

export function caesar(input, shift = 2) {
  let output = "";

  for (let i = 0; i < input.length; i++) {
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

export function histogram(input) {
  const histogram = Array(26).fill(0);

  for (let i = 0; i < input.length; i++) {
    const o = ord(input.charCodeAt(i));
    histogram[o] += 1;
  }

  return histogram;
}
