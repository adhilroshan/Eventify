import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

const UserDashboard = () => {
    const [data, setData] = useState([])
  useEffect(() => {
    const configuration = {
      method: "get",
      url: "http://localhost:8080/",
    };
    // make the API call
    axios(configuration)
      .then(async (result) => {
        // assign the message in our result to the message we initialized above
        await setData(result.data);
        console.log(data);

        //    console.log(result);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  return (
    <div>
        {
            data.map((data) =>(
                <Card name={data.name} />
            ))
        }
    </div>
  );
};

export default UserDashboard;
