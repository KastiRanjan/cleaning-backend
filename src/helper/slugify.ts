function hyphenSpace(s: string) {
  s = s.trim ? s.trim() : s.toLowerCase().replace(/^\s+|\s+$/g, '');
  return s.split(/\s+/).join('-');
}

export default hyphenSpace;
