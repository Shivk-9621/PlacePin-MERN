import React from "react";
import UsersList from "../Components/UsersList";

const Users = () => {
    const USERS = [
        {
            id: "u1",
            name: "manas",
            image:
                "https://spng.pngfind.com/pngs/s/16-168087_wikipedia-user-icon-bynightsight-user-image-icon-png.png",
            places: 3,
        },
    ];
    return <UsersList items={USERS} />;
};

export default Users;
