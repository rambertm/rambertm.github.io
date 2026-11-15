
const UNIT_GROUPS = [
  {
    name: "Elite",
    units: [
      {
        id: "elite_2ndmizukage",
        name: "겐게츠",
        image: "./images/elite_2ndmizukage.png",
        sounds: {
          entry: "./sounds/elite_2ndmizukage_entry.mp3",
          skill: "./sounds/elite_2ndmizukage_skill.mp3",
        },
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
        sounds: {
          entry: "./sounds/epic_hinata_entry.mp3",
        },
      },
    ],
  },
];

const container = document.getElementById("unit-container");

const audio = new Audio();

let currentButton = null;

function createSoundButton(imageSrc, label, soundSrc, type) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `sound-button ${type}-button`;
  button.setAttribute("aria-label", label);

  const image = document.createElement("img");
  image.src = imageSrc;
  image.alt = "";

  button.appendChild(image);

  button.addEventListener("click", () => {
    playSound(soundSrc, button);
  });

  return button;
}

function renderUnits() {
  UNIT_GROUPS.forEach((group) => {
    const section = document.createElement("section");
    section.className = "unit-section";

    const heading = document.createElement("h2");
    heading.textContent = group.name;

    const grid = document.createElement("div");
    grid.className = "unit-grid";

    group.units.forEach((unit) => {
      const unitCard = document.createElement("div");
      unitCard.className = "unit-card";
      
      const entryButton = createSoundButton(
        unit.image,
        unit.name,
        unit.sounds.entry,
        "entry"
      );
      
      unitCard.appendChild(entryButton);

      if (unit.sounds.skill) {
        const skillButton = createSoundButton(
          unit.image,
          `${unit.name} Skill`,
          unit.sounds.skill,
          "skill"
        );
      
        unitCard.appendChild(skillButton);
      }
      
      grid.appendChild(unitCard);
    });

    section.append(heading, grid);
    container.appendChild(section);
  });
}

function playSound(soundSrc, button) {
  if (currentButton === button && !audio.paused) {
    audio.pause();
    return;
  }

  audio.pause();
  audio.currentTime = 0;

  if (currentButton) {
    currentButton.classList.remove("playing");
  }

  currentButton = button;
  currentButton.classList.add("playing");

  audio.src = soundSrc;

  audio.play().catch((error) => {
    console.error("Failed to play sound:", error);
    button.classList.remove("playing");
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
