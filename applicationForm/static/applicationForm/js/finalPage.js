function onBeforeUnload(e) {
  if (true) {
    e.preventDefault();
    e.returnValue = "";
    return;
  }
}
window.addEventListener("beforeunload", onBeforeUnload);
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
$("#pdfEmail").on("click", function () {
  var csrftoken = getCookie("csrftoken");
  Swal.fire({
    title: "Please enter your email",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Send PDF to my Email",
    showLoaderOnConfirm: true,
    preConfirm: (emailInput) => {
      return axios({
        method: "post",
        url: `/form/email`,
        headers: {
          "X-CSRFToken": csrftoken,
        },
        data: {
          emailInput: emailInput,
        },
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }
          return function () {
            Swal.fire("PDF sent via Email");
          };
        })
        .catch((error) => {
          Swal.showValidationMessage(`Request failed: ${error}`);
        });
    },
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `PDF sent..!!! Please follow the instructions in the email you received.`,
      });
    }
  });
});

const deleteDataButton = document.getElementById("deleteDataButton");
const csrftoken = getCookie("csrftoken");
deleteDataButton.addEventListener("click", function () {
  Swal.fire({
    title: "Do you really want to delete your data?",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      axios({
        method: "delete",
        url: `/form/deleteUserData`,
        headers: {
          "X-CSRFToken": csrftoken,
        },
      })
        .then((response) => {
          Swal.fire(
            "Your data is deleted from JustBot servers now. You can close the browser tab."
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});
