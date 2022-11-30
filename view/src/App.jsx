import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="bg-blue-500 w-screen h-screen flex justify-center items-center">
      <div className="">
        <h1 className="text-white w-7/12 mx-auto text-center font-semibold font-sans  text-4xl block ">
          Presenting, an opportunity to connect with people nearby.
        </h1>
        <div className="mt-4 flex flex-col items-center">
          <button className="bg-black text-white px-3 py-2 rounded-md text-lg font-medium">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
