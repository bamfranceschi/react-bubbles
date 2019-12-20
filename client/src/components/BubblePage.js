import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/colors")
      .then(res => {
        setColorList(res.data);
      });
  }, []);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const updateColors = color => {
    const findById = element => element.id === color.id;
    const idx = colorList.findIndex(findById);

    if (idx > -1) {
      colorList.splice(idx, 1, color);
      setColorList(colorList);
    }

    axiosWithAuth()
      .get("/colors")
      .then(res => {
        setColorList(res.data);
      });
  };

  const removeColor = color => {
    const findById = element => element.id === color.id;
    const idx = colorList.findIndex(findById);

    if (idx > -1) {
      colorList.splice(idx, 1);
      setColorList(colorList);
    }

    axiosWithAuth()
      .get("/colors")
      .then(res => {
        setColorList(res.data);
      });
  };

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={updateColors}
        setColorList={setColorList}
        removeColor={removeColor}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
