
const UNIT_GROUPS = [
  {
    name: "엘리트",
    units: [
      {
        id: "elite_gengetsu",
        name: "겐게츠",
        skill: true,
      },
      {
        id: "elite_a",
        name: "에이",
        skill: false,
      },
      {
        id: "elite_mu",
        name: "무우",
        skill: false,
      },
      {
        id: "elite_orochimaru",
        name: "오로치마루",
        skill: false,
      }
    ],
  },
  {
    name: "에픽",
    units: [
      {
        id: "epic_hinata",
        name: "히나타",
        skill: false,
      },
      {
        id: "epic_ino",
        name: "이노",
        skill: false,
      },
      {
        id: "epic_inoshikacho",
        name: "이노시카쵸",
        skill: false,
      },
      {
        id: "epic_itachi",
        name: "이타치",
        skill: false,
      },
      {
        id: "epic_jiraiya",
        name: "지라이야",
        skill: false,
      },
      {
        id: "epic_kabuto",
        name: "카부토",
        skill: true,
      },
      {
        id: "epic_kakashi",
        name: "카카시",
        skill: false,
      },
      {
        id: "epic_killerA",
        name: "킬러에이",
        skill: false,
      },
      {
        id: "epic_konan",
        name: "코난",
        skill: false,
      },
      {
        id: "epic_momoshiki",
        name: "모모시키",
        skill: false,
      },
      {
        id: "epic_obito",
        name: "오비토",
        skill: false,
      },
      {
        id: "epic_ohnoki",
        name: "오오노키",
        skill: false,
      },
      {
        id: "epic_tsunade",
        name: "츠나데",
        skill: true,
      },
      {
        id: "epic_orochimaru",
        name: "오로치마루",
        skill: false,
      },
      {
        id: "epic_sai",
        name: "사이",
        skill: false,
      },
      {
        id: "epic_sakura",
        name: "사쿠라",
        skill: false,
      },
      {
        id: "epic_sasuke",
        name: "사스케",
        skill: false,
      },
      {
        id: "epic_shisui",
        name: "시스이",
        skill: false,
      },
      {
        id: "epic_zetsu",
        name: "제츠",
        skill: false,
      },
      {
        id: "epic_minato",
        name: "미나토",
        skill: false,
      },
      {
        id: "epic_naruto",
        name: "나루토 미수화",
        skill: false,
      },
      {
        id: "epic_guy",
        name: "마이트가이",
        skill: false,
      },
      {
        id: "epic_gaara",
        name: "가아라",
        skill: true,
      },
      {
        id: "epic_madaraSusanoo",
        name: "마다라 스사노오",
        skill: false,
      },
      {
        id: "epic_madaraRebirth",
        name: "마다라 윤회천생",
        skill: false,
      },
      {
        id: "epic_10mi",
        name: "10미",
        skill: false,
      },
    ],
  },
  {
    name: "인피니티",
    units: [
      {
        id: "infinity_itachi",
        name: "이타치",
        skill: true,
      },
      {
        id: "infinity_kakashi",
        name: "카카시",
        skill: true,
      },
      {
        id: "infinity_obito",
        name: "오비토",
        skill: true,
      },
    ],
  },
  {
    name: "신세대",
    units: [
      {
        id: "genz_himawari",
        name: "히마와리",
        skill: false,
      },
    ],
  },
];

const container = document.getElementById("unit-container");

const audio = new Audio();

let currentButton = null;

function getUnitImage(unit) {
  return `./images/${unit.id}.png`;
}

function getUnitSound(unit, type) {
  return `./sounds/${unit.id}_${type}.mp3`;
}

function createSoundButton(imageSrc, label, soundSrc, type) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `sound-button ${type}-button`;
  button.setAttribute("aria-label", label);
  button.setAttribute("aria-pressed", "false");

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
        getUnitImage(unit),
        unit.name,
        getUnitSound(unit, "entry"),
        "entry"
      );
      
      unitCard.appendChild(entryButton);

      if (unit.skill) {
        const skillButton = createSoundButton(
          getUnitImage(unit),
          `${unit.name} Skill`,
          getUnitSound(unit, "skill"),
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
    
    button.classList.remove("playing");
    button.setAttribute("aria-pressed", "false");
    currentButton = null;
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

  audio.src = soundSrc;

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
