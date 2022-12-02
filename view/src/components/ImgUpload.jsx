import React from "react";
import { useForm } from "react-hook-form";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0SWQiOiI2Mzg3M2VhZDgzYWI4NDIyM2U3NzVmOTYiLCJob3N0RW1haWwiOiJ2YXN1QGNldi5hYy5pbiIsImlhdCI6MTY2OTg0MDUxNSwiZXhwIjoxNjY5OTI2OTE1fQ.2C2M6Pj2dj9pnIFCN1SHXzA8CMY0Y3z99XKHHmtHhYo";

function ImgUpload() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    const form = data;
    formData.append("file", form.file[0]);
    console.log(form.file[0]);

    
    const res = await fetch("http://localhost:8080/hosts/upload/images", {
      method: "POST",
      data: formData,
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
    console.log(res);
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("file")} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default ImgUpload;
