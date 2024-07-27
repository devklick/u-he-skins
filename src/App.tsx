import { useEffect, useRef, useState } from "react";

import { Loader } from "@mantine/core";

import SkinsList from "./components/SkinsList";
import PageHeader from "./components/PageHeader/PageHeader";
import { getSkins } from "./services/api-service";
import { SkinItem } from "./types/SkinItem";

import PageFilters from "./components/PageFilters";

import styles from "./App.module.scss";
import PageFooter from "./components/PageFooter";

function sortSkins(skins: Array<SkinItem>) {
  return skins.sort((a, b) => {
    const deviceOrder = a.device.name.localeCompare(b.device.name);
    const nameOrder = a.name.localeCompare(b.name);
    return deviceOrder || nameOrder;
  });
}

function App() {
  const allSkins = useRef<Array<SkinItem>>([]);
  const allDevices = useRef<Array<string>>([]);
  const searchTerm = useRef<string | undefined>();
  const selectedDevices = useRef<Array<string>>([]);
  const [filteredSkins, setFilteredSkins] = useState<Array<SkinItem>>([]);

  useEffect(() => {
    async function get() {
      allSkins.current = await getSkins();
      allDevices.current = Array.from(
        new Set(allSkins.current.map((s) => s.device.name))
      );
      const sortedSkins = sortSkins(allSkins.current);
      setFilteredSkins(sortedSkins);
    }
    get();
  }, []);

  function handleSearchUpdated(search: string | undefined) {
    searchTerm.current = search;
    filterSkins({
      searchTerm: searchTerm.current,
      selectedDevices: selectedDevices.current,
    });
  }

  function handleDevicesUpdated(devices: Array<string>) {
    selectedDevices.current = devices;
    filterSkins({
      searchTerm: searchTerm.current,
      selectedDevices: selectedDevices.current,
    });
  }

  function filterSkins({
    searchTerm,
    selectedDevices,
  }: {
    searchTerm: string | undefined;
    selectedDevices: Array<string>;
  }) {
    let candidates = [...allSkins.current];
    if (searchTerm) candidates = filterSearchTerm(candidates, searchTerm);
    candidates = filterDevices(candidates, selectedDevices);

    setFilteredSkins(sortSkins(candidates));
  }

  function filterSearchTerm(candidates: Array<SkinItem>, searchTerm: string) {
    return candidates.filter((s) => {
      const toSearch = [s.name, s.description];
      return toSearch.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  function filterDevices(candidates: Array<SkinItem>, devices: Array<string>) {
    return candidates.filter(
      (c) => !devices.length || devices.includes(c.device.name)
    );
  }

  return (
    <div className={styles.appContainer}>
      <PageHeader />
      {!allSkins.current.length ? (
        <Loader />
      ) : (
        <>
          <PageFilters
            availableDevices={allDevices.current}
            onDevicesUpdated={handleDevicesUpdated}
            onSearchTermUpdated={handleSearchUpdated}
          />
          <SkinsList
            skins={filteredSkins.sort((a, b) => a.name.localeCompare(b.name))}
          />
        </>
      )}
      <PageFooter />
    </div>
  );
}

export default App;
