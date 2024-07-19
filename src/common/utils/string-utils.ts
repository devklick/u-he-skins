const knownImageExts = new Set([".png", ".jpg"]);

export function isImagePath(path: string) {
  const ext = path.substring(path.lastIndexOf("."));
  return ext && knownImageExts.has(ext.toLowerCase());
}

export function trimEnd(value: string, remove: string) {
  let i = value.length;
  for (i; i > 0 && value.substring(i, remove.length) === remove; i--);
  return value.substring(0, i);
}
