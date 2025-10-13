import { SkinItem } from "../../types/SkinItem";

export function filterSkins({
  skins,
  searchTerm,
  selectedDevices,
}: {
  skins: Array<SkinItem>;
  searchTerm: string | null;
  selectedDevices: Array<string>;
}) {
  let candidates = [...skins];
  if (searchTerm) candidates = filterSkinsBySearchTerm(candidates, searchTerm);
  candidates = filterSkinsByDevices(candidates, selectedDevices);

  return sortSkins(candidates);
}

function filterSkinsBySearchTerm(
  candidates: Array<SkinItem>,
  searchTerm: string
) {
  return candidates.filter((s) => {
    const toSearch = [s.name, s.description];
    return toSearch.some((s) =>
      s.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
}

function filterSkinsByDevices(
  candidates: Array<SkinItem>,
  devices: Array<string>
) {
  return candidates.filter(
    (c) => !devices.length || devices.includes(c.device.name)
  );
}

function sortSkins(skins: Array<SkinItem>) {
  return skins.sort((a, b) => {
    const deviceOrder = a.device.name.localeCompare(b.device.name);
    const nameOrder = a.name.localeCompare(b.name);
    return deviceOrder || nameOrder;
  });
}
