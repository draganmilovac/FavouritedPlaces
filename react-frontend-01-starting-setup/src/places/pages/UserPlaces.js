import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous places in the world",
    imageUrl:
      "https://cdn.cnn.com/cnnnext/dam/assets/130802164459-skyscrapers-gallery---empire-state-building-live-video.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creatorId: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous places in the world",
    imageUrl:
      "https://cdn.cnn.com/cnnnext/dam/assets/130802164459-skyscrapers-gallery---empire-state-building-live-video.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creatorId: "u1",
  },
];
const UserPlaces = () => {
  const userId = useParams().userId;
  const loadPlaces = DUMMY_PLACES.filter((p) => p.creatorId == userId);
  return <PlaceList items={loadPlaces} />;
};

export default UserPlaces;
