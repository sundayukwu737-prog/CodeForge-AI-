// ==========================================
// CodeForge AI
// resources.js (fixed)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    if (typeof CodeForgeXP !== "undefined") {
        CodeForgeXP.init();
    }

    const searchInput = document.getElementById("searchInput");
    const cards = document.querySelectorAll(".resource-card");
    const favoriteButtons = document.querySelectorAll(".favorite-btn");
    const favoriteList = document.getElementById("favoriteList");

    let favorites = JSON.parse(localStorage.getItem("resourceFavorites")) || [];

    function loadFavorites(){

        favoriteList.innerHTML = "";

        if(favorites.length === 0){
            favoriteList.innerHTML = "<li>No favorite resources yet.</li>";
            return;
        }

        favorites.forEach(resource=>{
            const li = document.createElement("li");
            li.textContent = resource;
            favoriteList.appendChild(li);
        });

    }

    if (searchInput) {
        searchInput.addEventListener("keyup",()=>{

            const value = searchInput.value.toLowerCase();

            cards.forEach(card=>{
                const cardTitle = card.querySelector("h3").textContent.toLowerCase();
                card.style.display = cardTitle.includes(value) ? "block" : "none";
            });

        });
    }

    favoriteButtons.forEach(button=>{
        button.addEventListener("click",()=>{

            const resourceTitle = button.parentElement.querySelector("h3").textContent;

            if(!favorites.includes(resourceTitle)){

                favorites.push(resourceTitle);
                localStorage.setItem("resourceFavorites", JSON.stringify(favorites));
                loadFavorites();

                if (typeof CodeForgeXP !== "undefined") {
                    CodeForgeXP.addXP(10, "resource-favorite-" + resourceTitle);
                }

                alert("⭐ Resource added to favorites!");

            }else{
                alert("Already in favorites.");
            }

        });
    });

    loadFavorites();

    console.log("📚 Resources Loaded Successfully");

});
