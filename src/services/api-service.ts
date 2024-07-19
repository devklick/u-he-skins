import { trimEnd } from "../common/utils/string-utils";
import { SkinItem } from "../types/SkinItem";

const baseUrl =
  import.meta.env.MODE === "development" ? "" : import.meta.env.VITE_BASE_URL;

const endpoints = {
  skins: "skins",
} as const;

function getUrl(endpoint: keyof typeof endpoints) {
  return [trimEnd(baseUrl, "/"), endpoints[endpoint]].join("/");
}

export async function getSkins(): Promise<Array<SkinItem>> {
  const url = getUrl("skins");
  const response = await window.fetch(url);
  return await response.json();
}
