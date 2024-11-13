async function fetchData(){
    try{
        const response = await fetch("data.json");
        if(!response.ok){throw new Error(window.alert("error fetching data"))};
        const data = await response.json();
        return data;
    }catch(error){
        window.alert(error);
    }    
}

async function displayCards(period = "weekly"){
    const data = await fetchData();
    const cardContainer = document.getElementById("cardsContainer");

    cardContainer.className = "cards-container";
    cardContainer.innerHTML = "";

    if(!data){return};

    data.forEach(item => {
        const {title, timeframes} = item;
        const {current, previous} = timeframes[period];
        const titleSlug = title.toLowerCase().replace(/\s+/, '-');

        const card = document.createElement("div");
        card.className = "card";
        card.classList.add(`${titleSlug}`)

        const icon = document.createElement("img");
        icon.src = `images/icon-${titleSlug}.svg`;
        icon.alt = `${title} icon`;
        icon.className = "icon";

        const cardDetails = document.createElement("div");
        cardDetails.className = "card-details";

        const topDetails = document.createElement("div");
        topDetails.className = "top-card-details";
        topDetails.innerHTML = `<span class="title">${title}</span>
                                <span class="material-symbols-outlined">more_horiz</span>`;

        const bottomDetails = document.createElement("div");
        bottomDetails.className ="bottom-card-details";
        bottomDetails.innerHTML = `<p class="current">${current}hrs</p>
                                  <p class="previous">Last Week - ${previous}hrs</p>`;

        
        cardDetails.appendChild(topDetails);
        cardDetails.appendChild(bottomDetails);

        card.appendChild(icon);
        card.appendChild(cardDetails);

        cardContainer.appendChild(card);
    });
}

function tabSelectHandler(){
    const tabs = document.querySelectorAll(".btn");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const period = tab.getAttribute('data-period');
            displayCards(period);
        });
    });
}

displayCards();
tabSelectHandler();