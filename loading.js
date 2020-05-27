setTimeout(() => {
  document.querySelector("section.loading").style.display = "none"
 	document.querySelector("section.items").style.display = "grid"
}, 1000 + Math.random() * 3000)