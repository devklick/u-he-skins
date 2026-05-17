import { useEffect } from "react";

import PageHeader from "./components/PageHeader/PageHeader";
import Loader from "./components/Loader";
import PageFilters from "./components/PageFilters";
import SkinsList from "./components/SkinsList";
import PageFooter from "./components/PageFooter";
import { useGetSkins } from "./services/api-service";

import useScrolledPagination from "./common/hooks/useScrolledPagination";
import useFilters from "./common/hooks/useFilters";

import styles from "./App.module.scss";

function App() {
  const filters = useFilters();

  const { devices, skins, loading } = useGetSkins({
    selectedDevices: filters.selectedDevices,
    searchTerm: filters.searchTerm,
  });

  // Store valid devices against filters for filter validation.
  useEffect(() => {
    if (loading) return;
    filters.setValidDevices(devices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devices, loading]);

  // TODO: ideally the pageSize should be determined based on the viewport height and the the item height
  const { pageData, observerTarget } = useScrolledPagination({
    items: skins,
    pageSize: 5,
  });

  function handleSearchUpdated(search: string | undefined) {
    filters.setSearchTerm(search ?? null);
  }

  function handleDevicesUpdated(devices: Array<string>) {
    filters.setSelectedDevices(devices);
  }

  return (
    <div className={styles["app"]}>
      <PageHeader />
      {loading && <Loader />}
      {!loading && (
        <>
          <PageFilters
            availableDevices={devices}
            onDevicesUpdated={handleDevicesUpdated}
            onSearchTermUpdated={handleSearchUpdated}
            searchTerm={filters.searchTerm}
            selectedDevices={filters.selectedDevices}
          />
          <SkinsList
            skins={pageData.map((item, i) => ({
              ...item,
              ref: i === pageData.length - 1 ? observerTarget : undefined,
            }))}
          />
        </>
      )}
      <PageFooter />
    </div>
  );
}

export default App;
