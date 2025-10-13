import { useEffect, useState } from "react";
import { useSearchParams } from "./useSearchParams";

export default function useFilters() {
  const [selectedDevices, _setSelectedDevices] = useState<Array<string>>([]);
  const [searchTerm, _setSearchTerm] = useState<string | null>(null);

  const params = useSearchParams();

  function setSearchTerm(searchTerm: string | null) {
    _setSearchTerm(searchTerm);
    params.setSearchTerm(searchTerm);
  }

  function setSelectedDevices(selectedDevices: Array<string>) {
    _setSelectedDevices(selectedDevices);
    params.setSelectedDevices(selectedDevices);
  }

  useEffect(() => {
    _setSearchTerm(params.searchTerm);
  }, [params.searchTerm]);

  useEffect(() => {
    _setSelectedDevices(params.selectedDevices);
  }, [params.selectedDevices]);

  return {
    selectedDevices,
    searchTerm,
    setSearchTerm,
    setSelectedDevices,
    setValidDevices: params.setValidDevices,
  };
}
