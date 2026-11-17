
import React, { useState } from "react";

const BASE_URL = "http://localhost:6001";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  // Update form state whenever an input changes
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Submit the form to the backend
  function handleSubmit(event) {
    event.preventDefault();

    const newPlant = {
      name: formData.name,
      image: formData.image,
      price: Number(formData.price),
    };

    fetch(`${BASE_URL}/plants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add plant");
        }

        return response.json();
      })
      .then((createdPlant) => {
        // Update the plants state in PlantPage
        onAddPlant(createdPlant);

        // Reset the form
        setFormData({
          name: "",
          image: "",
          price: "",
        });
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          step="0.01"
          min="0"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
