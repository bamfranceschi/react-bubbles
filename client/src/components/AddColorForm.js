import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const AddColorForm = ({ setColorList }) => {
  const initialColor = {
    name: "",
    code: {
      hex: ""
    },
    id: Date.now()
  };

  const [newColor, setNewColor] = useState(initialColor);

  const handleChanges = e => {
    setNewColor({ ...newColor, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/colors", newColor)
      .then(
        res => setColorList(res.data),
        res => console.log(res)
      );
    setNewColor();
  };

  return (
    <div>
      <p>add a color</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="color name"
          name="name"
          value={newColor.name}
          onChange={handleChanges}
        ></input>
        <input
          type="text"
          placeholder="color hex"
          name="hex"
          value={newColor.code.hex}
          onChange={handleChanges}
        ></input>
        <button>add</button>
      </form>
    </div>
  );
};

export default AddColorForm;
