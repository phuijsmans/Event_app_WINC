export const SendRequest = (method, formData) => {
  const ROOT_URL = "http://localhost:3000/";
  const sendRequest = async (method, root_url, url_part = "", body = false) => {
    const options = {};
    options.method = method;
    switch (method) {
      case "GET":
        // console.log("GET REQUEST");
        break;
      case "PUT":
      case "PATCH":
        // console.log("Method is PUT or PATCH ", { method });

        options.body = JSON.stringify(body);
        options.headers = {
          "Content-Type": "application/json",
        };
        await fetch(`${root_url}${url_part}`, options).then((res) =>
          res.json()
        );
        break;
      case "DELETE":
        // console.log("DELETE REQUEST");
        break;
      case "POST":
        // console.log("POST REQUEST");
        break;
    }
  };

  const returnNumbersArray = (array) => {
    let forcedNumbersArray = [];
    array.forEach((str) => {
      forcedNumbersArray.push(Number(str));
    });
    return forcedNumbersArray;
  };

  const massageFormData = (method, formData) => {
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

  if (method.method === "GET") {
    console.log(method.method);
    sendRequest(method.method, ROOT_URL, `events/${formData.id}`);
  }

  if (method.method === "PUT" || method.method === "PATCH") {
    massageFormData(method.method, formData);
  }
};
