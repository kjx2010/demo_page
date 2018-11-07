function loaderFunction() {
  const l_time = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("to_loader").style.display = "block";
}