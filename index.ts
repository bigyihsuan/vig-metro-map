const button = window.document.getElementById("buttonTest")! as HTMLButtonElement;

button.addEventListener("click", () => {
  alert("hello world");
  console.log("hello world");
});