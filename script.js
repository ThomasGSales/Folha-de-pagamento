function mostrarOcultarInput(checkBoxId, inputId) {
    var checkBox = document.getElementById(checkBoxId);
    var input = document.getElementById(inputId);
  
    if (checkBox.checked) {
        input.classList.remove("hidden");
    } else {
        input.classList.add("hidden");
    }
}
