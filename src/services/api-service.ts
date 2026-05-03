import { useQuery } from "@tanstack/react-query";
import { trimEnd } from "../common/utils/string-utils";
import { SkinItem } from "../types/SkinItem";
import { useEffect, useRef, useState } from "react";
import { filterSkins } from "../common/utils/skin-utils";

const baseUrl =
  import.meta.env.MODE === "development" ? "" : import.meta.env.VITE_BASE_URL;

const endpoints = {
  skins: "skins",
} as const;

function buildUrl(endpoint: keyof typeof endpoints) {
  return [trimEnd(baseUrl, "/"), endpoints[endpoint]].join("/");
}

export async function getSkins(): Promise<Array<SkinItem>> {
  const url = buildUrl("skins");
  const response = await window.fetch(url);
  return await response.json();
}

interface UseGetSkinsParams {
  selectedDevices: Array<string>;
  searchTerm: string | null;
}

export function useGetSkins({
  selectedDevices,
  searchTerm,
}: UseGetSkinsParams) {
  const allSkins = useRef<Array<SkinItem>>([]);
  const [data, setData] = useState<{
    skins: Array<SkinItem>;
    devices: Array<string>;
  }>({ devices: [], skins: [] });
  const [loading, setLoading] = useState(true);

  const result = useQuery({
    queryKey: ["skins"],
    queryFn: getSkins,
  });

  // Store the skins data from the API response
  useEffect(() => {
    if (!result.isSuccess) return;
    const skins = result.data as Array<SkinItem>;
    const devices = Array.from(new Set(skins.map((s) => s.device.name)));
    allSkins.current = skins;
    setData({ skins, devices });
    setLoading(false);
  }, [result.data, result.isSuccess]);

  // Filter the skins whenever the search term or selected devices change
  useEffect(() => {
    if (loading) return;
    setData((data) => ({
      devices: data.devices,
      skins: filterSkins({
        skins: allSkins.current,
        searchTerm,
        selectedDevices,
      }),
    }));
  }, [selectedDevices, searchTerm, loading]);

  return { ...data, loading };
}
