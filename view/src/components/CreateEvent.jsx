import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Location from "./Location";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0SWQiOiI2Mzg3M2VhZDgzYWI4NDIyM2U3NzVmOTYiLCJob3N0RW1haWwiOiJ2YXN1QGNldi5hYy5pbiIsImlhdCI6MTY2OTg0MDUxNSwiZXhwIjoxNjY5OTI2OTE1fQ.2C2M6Pj2dj9pnIFCN1SHXzA8CMY0Y3z99XKHHmtHhYo";
const CreateEvent = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    // const formData = new FormData();
    // formData.append("img", data.file[0]);
    const form = data;
    form.loc = {
      coordinates: [lng, lat],
    };
    form.img = form.img[0];
    console.log(form);

    const res = {
      method: "post",
      data: form,
      url: "http://localhost:8080/hosts/create-event",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // const res = await fetch("http://localhost:8080/hosts/create-event", {
    //   method: "POST",
    //   body: form,
    // })
    axios(res).then((res) => res.json());
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  };

  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  function setLocation(props) {
    console.log(props.lng);
    setLng(props.lng);
    setLat(props.lat);
  }
  return (
    <div className="flex my-16 justify-center">
      <form class="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="event-name"
            >
              Event Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="event-name"
              type="text"
              placeholder="Event Name"
              {...register("name")}
            />
            <p class="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          </div>
        </div>
        <div class="w-full mb-2">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="event-description"
          >
            Description
          </label>
          <textarea
            id="event-description"
            name="description"
            rows="3"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Description"
            {...register("description")}
          ></textarea>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="event-pass"
            >
              Pass
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="event-pass"
              type="password"
              placeholder="******************"
              {...register("pass")}
            />
            <p class="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Cover photo
          </label>
          <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div class="space-y-1 text-center">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="True"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="flex text-sm text-gray-600">
                <label
                  for="file-upload"
                  class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    class="sr-only"
                    accept="image/*"
                    {...register("img")}
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
        <div class="my-5">
          <input
            type="datetime-local"
            placeholder="date"
            {...register("date", {})}
          />
        </div>
        <Location setLocation={setLocation} />
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
