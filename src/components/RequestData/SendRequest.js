import { redirect } from "react-router-dom";

export const SendRequest = (method, formData) => {
  const ROOT_URL = "http://localhost:3000/";
  const sendRequest = async (method, root_url, url_part = "", body = false) => {
    const options = {};
    options.method = method;
    if (method !== "GET" && body) {
      options.body = JSON.stringify(body);
      options.headers = {
        "Content-Type": "application/json",
      };
    }
    const newId = await fetch(`${root_url}${url_part}`, options)
      .then((res) => res.json())
      .then((json) => json.id);

    // return await response.json();

    // return redirect(`event/${newId}`);
  };

  const returnNumbersArray = (array) => {
    let forcedNumbersArray = [];
    array.forEach((str) => {
      forcedNumbersArray.push(Number(str));
    });
    return forcedNumbersArray;
  };

  const test = (method, formData) => {
    console.log("SendRequest.jsx");
    console.log(method, formData);
    let massageFormData = JSON.parse(JSON.stringify(formData));
    massageFormData.createdBy = Number(formData.createdBy);
    const getCategoryIds = formData.categoryIds.split(",");
    massageFormData.categoryIds = returnNumbersArray(getCategoryIds);
    massageFormData.id = Number(formData.id);
    sendRequest(
      method,
      ROOT_URL,
      `events/${massageFormData.id}`,
      massageFormData
    );
  };

  test(method.method, formData);
};
