const characters = [
  {
    name: "Homer Simpson",
    image:
      "https://35milimetros.es/wp-content/uploads/2016/02/homer-simpson.jpg",
  },
  {
    name: "Micheal Scott",
    image:
      "https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/06/29/5fa91c5e49c91.jpeg",
  },
  {
    name: "Walter White",
    image:
      "https://vader.news/__export/1616459037431/sites/gadgets/img/2021/03/22/walter-white.jpg_1841249101.jpg",
  },
  {
    name: "Goku",
    image:
      "https://dragonball.guru/wp-content/uploads/2021/01/goku-dragon-ball-guru.jpg",
  },
  {
    name: "Tyrion Lannister",
    image:
      "https://fotografias.antena3.com/clipping/cmsimages02/2012/08/08/800B0E58-0268-4E5C-84F4-0CBA36E7D7EB/98.jpg?crop=1024,576,x0,y0&width=1900&height=1069&optimize=low&format=webply",
  },
  {
    name: "Hermione Granger",
    image:
      "https://media.glamour.com/photos/58a72f5277d3274eb940938f/4:3/w_1987,h_1490,c_limit/hermione.jpg",
  },
  {
    name: "Lisa Simpson",
    image:
      "https://7televalencia.com/wp-content/uploads/2019/04/lisasimpsonnok.jpg",
  },
  {
    name: "Batman",
    image:
      "https://estaticos-cdn.elperiodico.com/clip/bd2a087e-0076-4792-80e5-27e8d52955c1_alta-libre-aspect-ratio_default_0.png",
  },
];

// end charactes list

//take input from user
let promptInput = "";
const takePromptBtn = document.getElementById("takePromptBtn");
takePromptBtn.addEventListener("click", function () {
  promptInput = document.getElementById("promptInput").value;
});

// functions
async function clickCharacter(nameCharacter) {
  //show loader
  const loader = document.getElementById("loader");
  loader.classList.remove("d-none");
  // end show loader
  //   call Open Ai API
  const temperature = 0.7;

  const API_URL = "https://api.openai.com/v1/chat/completions";
  const MODEL = "gpt-3.5-turbo";
  const API_KEY = "";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: `You are ${nameCharacter} and ${promptInput}. Don't break character!`,
        },
      ],
      temperature: temperature,
    }),
  });

  const data = await response.json();
  console.log(data);
}

// end functions

// take characters container from the dom

const charactersContainer = document.getElementById("characters_container");

//function to add character to the page
function addCharactersToPage() {
  characters.forEach((character) => {
    const characterElement = document.createElement("div");
    characterElement.classList.add("character");

    //add data-character attribute
    characterElement.setAttribute("data-character", character.name);

    //add character image
    const characterImage = document.createElement("img");
    characterImage.src = character.image;
    characterImage.alt = character.name;
    characterImage.classList.add("rounded-circle");
    characterElement.appendChild(characterImage);

    //append element to container
    charactersContainer.appendChild(characterElement);
  });

  // event listener on each character
  const charactersList = document.querySelectorAll(".character");

  charactersList.forEach((element) => {
    element.addEventListener("click", function () {
      clickCharacter(element.dataset.character);
      console.log(element.dataset.character);
    });
  });
}

document.addEventListener("DOMContentLoaded", addCharactersToPage);
