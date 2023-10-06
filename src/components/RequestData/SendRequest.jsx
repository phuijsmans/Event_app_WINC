export const SendRequest = (method, formData) => {
  const ROOT_URL = "http://localhost:3000/";
  const sendRequest = async (method, root_url, url_part = "", body = false) => {
    const options = {};
    options.method = method;
    switch (method) {
      case "GET":
        break;
      case "PUT":
      case "PATCH":
        options.body = JSON.stringify(massageFormData(body));
        options.headers = {
          "Content-Type": "application/json",
        };
        await fetch(`${root_url}${url_part}`, options).then((res) =>
          res.json()
        );
        break;
      case "DELETE":
        break;
      case "POST":
        break;
    }
    return;
  };

  const returnNumbersArray = (array) => {
    let forcedNumbersArray = [];
    array.forEach((str) => {
      forcedNumbersArray.push(Number(str));
    });
    return forcedNumbersArray;
  };

  const massageFormData = (formData) => {
    let massageFormData = JSON.parse(JSON.stringify(formData));
    massageFormData.createdBy = Number(formData.createdBy);
    const getCategoryIds = formData.categoryIds.split(",");
    massageFormData.categoryIds = returnNumbersArray(getCategoryIds);
    massageFormData.id = Number(formData.id);
    return massageFormData;
  };
  sendRequest(method.method, ROOT_URL, `events/${formData.id}`, formData);
};
