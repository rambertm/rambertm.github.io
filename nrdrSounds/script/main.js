
const UNIT_GROUPS = [
  {
    name: "엘리트",
    units: [
      {
        id: "elite_gari",
        name: "가리",
        skill: false,
      },
      {
        id: "elite_pakura",
        name: "파쿠라",
        skill: false,
      },
      {
        id: "elite_haku",
        name: "하쿠",
        skill: false,
      },
      {
        id: "elite_guren",
        name: "구렌",
        skill: false,
      },
      {
        id: "elite_shino",
        name: "시노",
        skill: false,
      },
      {
        id: "elite_kiba",
        name: "키바",
        skill: false,
      },
      {
        id: "elite_gengetsu",
        name: "겐게츠",
        skill: true,
      },
      {
        id: "elite_mu",
        name: "무우",
        skill: false,
      },
      {
        id: "elite_rasa",
        name: "라사",
        skill: false,
      },
      {
        id: "elite_a",
        name: "에이",
        skill: false,
      },
      {
        id: "elite_gedo",
        name: "외도마상",
        skill: false,
      },
      {
        id: "elite_ginkaku",
        name: "긴카쿠",
        skill: false,
      },
      {
        id: "elite_kinkaku",
        name: "킨카쿠",
        skill: false,
      },
      {
        id: "elite_kankuro",
        name: "칸쿠로",
        skill: false,
      },
      {
        id: "elite_kisame",
        name: "키사메",
        skill: true,
      },
      {
        id: "elite_mifune",
        name: "미후네",
        skill: false,
      },
      {
        id: "elite_naruto",
        name: "나루토",
        skill: false,
      },
      {
        id: "elite_temari",
        name: "테마리",
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
        id: "epic_hidan",
        name: "히단",
        skill: false,
      },
      {
        id: "epic_hiruzen",
        name: "히루젠",
        skill: false,
      },
      {
        id: "epic_pain",
        name: "페인",
        skill: false,
      },
      {
        id: "epic_tenten",
        name: "텐텐",
        skill: false,
      },
      {
        id: "epic_terumi",
        name: "테루미메이",
        skill: false,
      },
      {
        id: "epic_tobirama",
        name: "토비라마",
        skill: false,
      },
      {
        id: "epic_toneri",
        name: "토네리",
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
        id: "infinity_sasuke",
        name: "사스케",
        skill: false,
      },
      {
        id: "infinity_itachi",
        name: "이타치",
        skill: true,
      },
      {
        id: "infinity_shisui",
        name: "시스이",
        skill: true,
      },
      {
        id: "infinity_madara",
        name: "마다라",
        skill: true,
      },
      {
        id: "infinity_naruto",
        name: "나루토",
        skill: true,
      },
      {
        id: "infinity_hinata",
        name: "히나타",
        skill: true,
      },
      {
        id: "infinity_jiraiya",
        name: "지라이야",
        skill: true,
      },
      {
        id: "infinity_obito",
        name: "오비토",
        skill: true,
      },
      {
        id: "infinity_kakashi",
        name: "카카시",
        skill: true,
      },
      {
        id: "infinity_gui",
        name: "가이",
        skill: true,
      },
      {
        id: "infinity_sakura",
        name: "사쿠라",
        skill: false,
      },
      {
        id: "infinity_ino",
        name: "이노",
        skill: false,
      },
      {
        id: "infinity_kurotsuchi",
        name: "쿠로츠치",
        skill: true,
      },
      {
        id: "infinity_tenten",
        name: "텐텐",
        skill: false,
      },
      {
        id: "infinity_toneri",
        name: "토네리",
        skill: true,
      },
      {
        id: "infinity_momoshiki",
        name: "모모시키",
        skill: true,
      },
    ],
  },
  {
    name: "스페셜",
    units: [
      {
        id: "special_terumi",
        name: "테루미메이",
        skill: true,
      },
      {
        id: "special_killerA",
        name: "킬러에이",
        skill: true,
      },
      {
        id: "special_nagato",
        name: "나가토",
        skill: true,
      },
      {
        id: "special_rocklee",
        name: "록리",
        skill: false,
      },
      {
        id: "special_gamakichi",
        name: "가마키치",
        skill: false,
      },
      {
        id: "special_neji",
        name: "네지",
        skill: false,
      },
      {
        id: "special_mecha7610",
        name: "메카나루토 7610",
        skill: false,
      },
      {
        id: "special_mecha9999",
        name: "메카나루토 9999",
        skill: false,
      },
      {
        id: "special_kakuzu",
        name: "카쿠즈",
        skill: false,
      },
      {
        id: "special_kinshiki",
        name: "킨시키",
        skill: false,
      },  
    ],
  },
  {
    name: "영멸",
    units: [
      {
        id: "immortal_momoshiki",
        name: "모모시키",
        skill: true,
      },
      {
        id: "immortal_kaguya",
        name: "카구야",
        skill: true,
      },
      {
        id: "immortal_kuramaSusanoo",
        name: "위장스사노오",
        skill: false,
      },
      {
        id: "immortal_madara",
        name: "마다라",
        skill: false,
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
