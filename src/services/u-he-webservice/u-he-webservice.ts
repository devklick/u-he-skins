import { SkinItem } from "../../types/SkinItem";
import { parseUheSkinsHtml } from "./u-he-webservice.util";

const urls = Object.freeze({
  skins: "https://u-he.com/PatchLib/skins.html",
});

export async function getSkins(): Promise<Array<SkinItem>> {
  // TODO: Is it possible to remove any cors restrictions here?
  const response = await window.fetch(urls.skins);
  const html = await response.text();
  console.log(html);
  return await parseUheSkinsHtml(html);
}
