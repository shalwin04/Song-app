import React from "react";

const SongsCard = ({ song: { mbid, artist, image, name } }) => {
  const mediumImage = image.find((img) => img.size === "medium");
  const imageUrl = mediumImage
    ? mediumImage["#text"]
    : "https://via.placeholder.com/400";

  return (
    <div className="song">
      <div>
        <p>{name}</p>
      </div>

      <div>
        <img src={imageUrl || "https://via.placeholder.com/400"} alt={name} />
      </div>

      <div>
        <h3>{artist}</h3>
      </div>
    </div>
  );
};

export default SongsCard;
