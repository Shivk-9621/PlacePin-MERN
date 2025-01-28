import React from "react";
import { useEffect, useState } from "react";
import UsersList from "../Components/UsersList";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState([]);

  const USERS = [
    {
      id: "u1",
      name: "manas",
      image:
        "https://spng.pngfind.com/pngs/s/16-168087_wikipedia-user-icon-bynightsight-user-image-icon-png.png",
      places: 3
    }
  ];

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const url = "http://localhost:5000/api/users";
        const response = await fetch(url);
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(response.message);
        }

        setLoadedUsers(responseData.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
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
