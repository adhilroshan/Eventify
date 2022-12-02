import React from "react";

const Card = (props) => {
  var name = props.name;
  var description = props.description;
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        class="w-full"
        src="https://via.placeholder.com/150"
        alt="Sunset in the mountains"
      />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{name}</div>
        <p class="text-gray-700 text-base">{name}</p>
      </div>
    </div>
  );
};

export default Card;
