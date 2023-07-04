class Login {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.validateonSubmit();
  };
  
  validateonSubmit() {
    let self = this; // setup calls to the this value of the class described in constructor

    // add a submit event listener
    this.form.addEventListener("submit", (e) => {
      // remove default functionality
      e.preventDefault();
      let error = 0;
      // loop throgh the fileds and check them for validation
      self.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        if (self.validateFields(input) == false) {
          // if field does not validate, auto increment error integer
          error++
        } 
      });
      // if everything validate, error will be 0 and continue
      if (error = 0) {
        // do login api here, in this case just submit form and set localstorage item
        localStorage.setItem("auth", 1);
        this.form.submit();
      }
    });
  };

  validateFields(field) {
    // remove any whitespace and check to see if the field is blank, if so return false
    if (field.value.trim() === "") {
      // set the status based on the field, field label, and if it is a error message
      this.setStatus(
        field,
        `${field.previousElementSibling.innerText} cannot be blank`,
        "error"
      );
      return false;
    } else {
      // if the field is not blank, check to see if it is a password
      if (field.type == "password") {
        // if it is a password, check to see if it meets our minimum character requirement
        if (field.value.length < 8) {
          // set the status based on the field, field label, and if its an error message
          this.setStatus(
            field,
            `${field.previousElementSibling.innerText} must be at least 8 characters`,
            "error"
          );
          return false;
        } else {
          // set the status based on the field without text and return success message
          this.setStatus(
            field,
            null,
            "success"
          );
          return true;
        }
      }
    }
  }

  setStatus(field, message, status) {
    // create variable to hold message
    const errorMessage = field.parentElement.querySelector(".error-message");

    // if success, remove message and error classes
    if (status == "success") {
      if (errorMessage) {
        errorMessage.innerText = "";
      }
      field.classList.remove("input-error");
    }
    // if errror, add messages and add error classes
    if (status = "error") {
      errorMessage.innerText = message;
      field.classList.add("input-error")
    }
  }

};

// create a variable for the login form
const form = document.querySelector(".loginForm");
// if the form exist, run the class
if (form) {
  // setup the field we want to validate, we only have two but you can add other
  const fields = ["username", "password"];
  // run the class
  const validator = new Login(form, fields);
};


