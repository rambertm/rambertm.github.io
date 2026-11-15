
const UNIT_GROUPS = [
  {
    name: "Elite",
    units: [
      {
        id: "elite_2ndmizukage",
        name: "2대 미즈카게 갠게츠",
        image: "./images/elite_2ndmizukage.png",
        sound: "./sounds/elite_2ndmizukage.mp3",
      }
    ],
  },
  {
    name: "Epic",
    units: [
      {
        id: "epic_hinata",
        name: "히나타",
        image: "./images/epic_hinata.png",
        sound: "./sounds/epic_hinata.mp3",
      },
    ],
  },
];

const container = document.getElementById("unit-container");

const audio = new Audio();

let currentButton = null;

function renderUnits() {
  UNIT_GROUPS.forEach((group) => {
    const section = document.createElement("section");
    section.className = "unit-section";

    const heading = document.createElement("h2");
    heading.textContent = group.name;

    const grid = document.createElement("div");
    grid.className = "unit-grid";

    group.units.forEach((unit) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "unit-button";
      button.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-label", `${unit.name} sound`);

      const image = document.createElement("img");
      image.src = unit.image;
      image.alt = unit.name;

      const name = document.createElement("span");
      name.textContent = unit.name;

      button.append(image, name);

      button.addEventListener("click", () => {
        playSound(unit, button);
      });

      grid.appendChild(button);
    });

    section.append(heading, grid);
    container.appendChild(section);
  });
}

function playSound(unit, button) {
  if (currentButton === button && !audio.paused) {
    audio.pause();
    return;
  }

  audio.pause();
  audio.currentTime = 0;

  if (currentButton) {
    currentButton.classList.remove("playing");
    currentButton.setAttribute("aria-pressed", "false");
  }

  currentButton = button;
  currentButton.classList.add("playing");
  currentButton.setAttribute("aria-pressed", "true");

  audio.src = unit.sound;

  audio.play().catch((error) => {
    console.error("Failed to play sound:", error);

    button.classList.remove("playing");
    button.setAttribute("aria-pressed", "false");
    currentButton = null;
  });
}

audio.addEventListener("ended", () => {
  if (currentButton) {
    currentButton.classList.remove("playing");
    currentButton.setAttribute("aria-pressed", "false");
    currentButton = null;
  }
});

renderUnits();
