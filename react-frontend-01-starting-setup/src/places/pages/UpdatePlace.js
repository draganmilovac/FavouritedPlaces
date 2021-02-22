import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "./../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "./../../shared/util/validators";
import Button from "./../../shared/components/FormElements/Button";
import { useForm } from "./../../shared/hooks/form-hook";
import Card from "./../../shared/components/UIElements/Card";
import "./PlaceForm.css";

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

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
      setIsLoading(false);
    }
  }, [setFormData, identifiedPlace]);

  if (isLoading) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find a place.</h2>
        </Card>
      </div>
    );
  }
  const updateFormHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };
  return (
    <form className="place-form" onSubmit={updateFormHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        value={formState.inputs.title.value}
        valid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description(at minimum 5 caracters)."
        onInput={inputHandler}
        value={formState.inputs.description.value}
        valid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
