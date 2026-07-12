// ===============================
// CodeForge AI - app.js
// ===============================

// Welcome message
console.log("🚀 Welcome to CodeForge AI");

// Smooth button interaction
const buttons = document.querySelectorAll(
".primary-btn, .secondary-btn, .btn"
);

buttons.forEach(button => {

button.addEventListener("mouseenter",()=>{

button.style.transform="translateY(-4px)";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translateY(0)";

});

});

// Simple fade-in effect
const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";

}

});

});

document.querySelectorAll(".feature,.stats div").forEach(item=>{

item.style.opacity="0";
item.style.transform="translateY(40px)";
item.style.transition="all .8s ease";

observer.observe(item);

});
