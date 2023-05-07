const validateRequest = (reqBody, type) => {
  if (type == "add") {
    const validationKeys = ["name", "vat", "grossPrice", "netPrice", "qty"];
    const keys = Object.keys(reqBody);
    let isValid = true;
    if (!keys || keys.length == 0) {
      isValid = false;
    }
    console.log(keys);
    validationKeys.filter((key) => {
      if (keys.includes(key)) {
        if (!reqBody[key]) {
          isValid = false;
        }
      } else {
        console.log("not there");
        isValid = false;
      }
    });

    return isValid;
  } else if (type == "update") {
    const validationKeys = [
      "name",
      "vat",
      "grossPrice",
      "netPrice",
      "qty",
      "id",
    ];
    let isValid = true;
    const keys = Object.keys(reqBody);
    if (!keys || keys.length == 0) {
      isValid = false;
    }
    validationKeys.filter((key) => {
      if (keys.includes(key)) {
        if (!reqBody[key]) {
          isValid = false;
        }
      } else {
        isValid = false;
      }
    });

    return isValid;
  } else {
    const keys = Object.keys(reqBody);
    let isValid = true;
    if (!keys || keys.length == 0) {
      isValid = false;
    }
    if (keys.includes("id")) {
      if (!reqBody["id"]) {
        isValid = false;
      }
    } else {
      isValid = false;
    }

    return isValid;
  }
};

module.exports = { validateRequest };
