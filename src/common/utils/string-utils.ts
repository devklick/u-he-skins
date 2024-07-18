const knownImageExts = new Set([".png", ".jpg"]);

export function isImagePath(path: string) {
  const ext = path.substring(path.lastIndexOf("."));
  return ext && knownImageExts.has(ext.toLowerCase());
}
