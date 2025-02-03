import React from "react";
import { useEffect, useState } from "react";
import UsersList from "../Components/UsersList";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../Shared/hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedUsers, setLoadedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = `${process.env.VITE_BACKEND_URL}/users`;
        const responseData = await sendRequest(url);

        setLoadedUsers(responseData?.users);
      } catch (err) {} 
    };

    fetchUsers();
  }, [sendRequest]);



  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;
