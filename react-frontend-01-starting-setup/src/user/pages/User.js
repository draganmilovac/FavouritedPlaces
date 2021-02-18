import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Dragan Milovac",
      image:
        "https://e0.365dm.com/20/08/2048x1152/skysports-ronaldo-juve_5061431.jpg",
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
