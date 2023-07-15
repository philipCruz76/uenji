"use client";

import { FC, useState } from "react";

interface PhotoCarousselProps {}

const PhotoCaroussel: FC<PhotoCarousselProps> = ({}) => {
  let [photos, setPhotos] = useState([]);

  const handleRightClick = () => {};

  return <div>PhotoCaroussel</div>;
};

export default PhotoCaroussel;
