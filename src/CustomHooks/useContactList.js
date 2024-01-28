import { useState, useRef } from "react";
import BluetoothSyncAPI from "./../Services/BluetoothSyncAPI.Service.V2";

/**
 * Custom React Hook responsible for sync with the Car's Bluetooth API
 */
const useContactList = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [offset, setOffset] = useState(0);
  const count = useRef(5);
  const [error, setError] = useState(null);
  /**
   * Call next page
   */
  const nextPage = () => {
    if (offset + count.current < filteredList.length) {
      setOffset(offset + count.current);
    }
  };

  /**
   * Call previous page
   */
  const prevPage = () => {
    if (offset - count.current >= 0) {
      setOffset(offset - count.current);
    }
  };

  /**
   *
   */
  const onFilter = (term) => {
    const lowerCaseTerm = term.toLowerCase();
    const filtered = list.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lowerCaseTerm) ||
        contact.email.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredList(filtered);
    setOffset(0); // Reset pagination when filter changes
  };

  /**
   * Call the Bluetooth API and update the list
   */
  const sync = async () => {
    setIsSyncing(true);
    setError(null);

    const users = await BluetoothSyncAPI.sync(); // Assuming retry logic is implemented inside this method
    const formattedUsers = users.map((user) => ({
      name: `${user.name.first} ${user.name.last}`,
      thumbnail: user.picture.thumbnail,
      email: user.email,
      phone: user.phone,
      id: `${user.id.name}-${user.id.value}`,
    }));
    // Implemention Goes Here
  };
  /**
   * Return the necessary functions
   */
  return {
    // Full list
    contactList: list,
    // Current page list
    currentPageList: filteredList.slice(offset, offset + count.current),
    // function used to sync with the Bluetooth API
    sync,
    // function to move the poiter to the next page
    nextPage,
    // function to mobe the pointer to the previous page
    prevPage,
    // variable that holds the value to indicate if the next page will be available or not
    hasNextPage: !(offset + count.current < filteredList.length),
    // variable that holds the value to indicate if the previous page will be available or not
    hasPrevPage: offset < count.current,
    // holds the value is the api is syncing or not
    isSyncing,
    // Current page number
    page: offset > 0 ? offset / count.current : offset,
    // Current page number
    totalPages: Math.floor(filteredList.length / count.current),
    // The total os records
    total: filteredList.length,
    //
    onFilter,
    error,
  };
};

export default useContactList;
