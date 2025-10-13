import { useEffect, useRef, useState } from "react";

const knownParams = Object.freeze({
  search: "search",
  device: "device",
} as const);

interface UseSearchParamsReturn {
  /**
   * The search term currently being used.
   */
  searchTerm: string | null;
  /**
   * The devices that are currently selected
   */
  selectedDevices: Array<string>;
  /**
   * Updates the search term that's currently being used
   */
  setSearchTerm(searchTerm: string | null): void;
  /**
   * Updates the list of devices that are currently selected.
   */
  setSelectedDevices(selectedDevices: Array<string>): void;
  /**
   * Sets the list of known valid devices, which are used for validting the query parameter.
   */
  setValidDevices(validDevices: Array<string>): void;
}

/**
 * Handles reading and writing the search params as query strings
 */
export function useSearchParams(): UseSearchParamsReturn {
  const [searchTerm, _setSearchTerm] = useState<string | null>(null);
  const [selectedDevices, _setSelectedDevices] = useState<Array<string>>([]);
  const validDevicesRef = useRef<Array<string>>([]);

  // Read the query parameter values
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get(knownParams.search);
    const devices = params.getAll(knownParams.device);

    if (search) {
      _setSearchTerm(search);
    }

    if (devices.length) {
      _setSelectedDevices(devices);
    }

    // inited.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.search]);

  // Update the page URL when the known parameters change value
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (searchTerm) {
      params.set(knownParams.search, searchTerm);
    } else {
      params.delete(knownParams.search);
    }

    params.delete(knownParams.device);
    if (selectedDevices.length) {
      selectedDevices.forEach((device) =>
        params.append(knownParams.device, device)
      );
    }

    const queryString = params.size ? `?${params.toString()}` : "";
    const newUrl = `${window.location.pathname}${queryString}`;
    window.history.replaceState({}, "", newUrl);
  }, [searchTerm, selectedDevices]);

  function setSearchTerm(searchTerm: string | null) {
    _setSearchTerm(searchTerm);
  }

  function setSelectedDevices(selectedDevices: Array<string>) {
    _setSelectedDevices(selectedDevices);
  }

  function setValidDevices(validDevices: Array<string>) {
    _setSelectedDevices(
      selectedDevices.filter((d) => validDevices.includes(d))
    );
    validDevicesRef.current = validDevices;
  }

  return {
    searchTerm,
    selectedDevices,
    setSearchTerm,
    setSelectedDevices,
    setValidDevices,
  };
}
