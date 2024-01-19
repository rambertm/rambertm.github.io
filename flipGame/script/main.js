const FUNC = {
  removeChildren: function(parent){
    'use strict';
    while (parent.firstChild) {
      parent.removeChild(parent.lastChild);
    }
  },
};
const SOUND = {
  fx: {
    cardflip: new Howl({src: ["./sounds/fx/cardflip.mp3"]}),
    achieve01: new Howl({src: ["./sounds/fx/achieve01.mp3"]}),
    firstblood: new Howl({src: ["./sounds/fx/firstblood.mp3"]}),
    doublekill: new Howl({src: ["./sounds/fx/doublekill.mp3"]}),
    triplekill: new Howl({src: ["./sounds/fx/triplekill.mp3"]}),
    megakill: new Howl({src: ["./sounds/fx/megakill.mp3"]}),
    ultrakill: new Howl({src: ["./sounds/fx/ultrakill.mp3"]}),
    monsterkill: new Howl({src: ["./sounds/fx/monsterkill.mp3"]}),
    killingspree: new Howl({src: ["./sounds/fx/killingspree.mp3"]}),
    ownage: new Howl({src: ["./sounds/fx/ownage.mp3"]}),
    dominating: new Howl({src: ["./sounds/fx/dominating.mp3"]}),
    unstoppable: new Howl({src: ["./sounds/fx/unstoppable.mp3"]}),
    rampage: new Howl({src: ["./sounds/fx/rampage.mp3"]}),
    wickedsick: new Howl({src: ["./sounds/fx/wickedsick.mp3"]}),
    godlike: new Howl({src: ["./sounds/fx/godlike.mp3"]}),
    holyshit: new Howl({src: ["./sounds/fx/holyshit.mp3"]}),
    ropeburning: new Howl({src: ["./sounds/fx/ropeburning.mp3"]}),
    defeat01: new Howl({src: ["./sounds/fx/defeat01.mp3"]}),
  },
  bgm: {
    loop01: new Howl({src: ["./sounds/bgm/pixabay-loop_instantrave.mp3"], loop: true}),
    badass01: new Howl({src: ["./sounds/bgm/bensound-badass.mp3"], loop: true}),
  },
};
const VFX = {
  effect: function(target, effect, duration, sound = ""){
    target.classList.add(effect);
    setTimeout(() => {target.classList.remove(effect)}, duration, target);
    if (sound !== "") SOUND.fx[sound].play();
  },
  click: function(target) { this.effect(target, "transform--scaleshrink", 75, "button01") },
  shake: function(target) { this.effect(target, "shake--normal", 500) },
  shakeLittle: function(target) { this.effect(target, "shake--little", 500) },
  shakeHard: function(target) { this.effect(target, "shake--hard", 500) },
  shakeCrazy: function(target) { this.effect(target, "shake--crazy", 500) },
  shakeOpacity: function(target) { this.effect(target, "shake--opacity", 500) },
};
const CARDIMAGES = {
  coc: ["siegemachines_battleblimp", "siegemachines_flameflinger", "siegemachines_loglauncher", "siegemachines_siegebarracks", "siegemachines_stoneslammer", "siegemachines_wallwrecker", "spells_bat", "spells_clone", "spells_earthquake", "spells_freeze", "spells_haste", "spells_healing", "spells_invisibility", "spells_jump", "spells_lightning", "spells_poison", "spells_rage", "spells_skeleton", "superunits_archer", "superunits_balloon", "superunits_barbarian", "superunits_bowler", "superunits_dragon", "superunits_giant", "superunits_goblin", "superunits_icehound", "superunits_infernodragon", "superunits_minion", "superunits_valkyrie", "superunits_wallbreaker", "superunits_witch", "superunits_wizard", "units_archer", "units_babydragon", "units_balloon", "units_barbarian", "units_bowler", "units_dragon", "units_dragonrider", "units_electrodragon", "units_giant", "units_goblin", "units_golem", "units_headhunter", "units_healer", "units_hogrider", "units_icegolem", "units_lavahound", "units_miner", "units_minion", "units_pekka", "units_valkyrie", "units_wallbreaker", "units_witch", "units_wizard", "units_yeti"],
  wow: ["alexstrasza", "alleria", "anduin01", "anduin02", "annhylde", "aranna", "arthas01", "azzinoth", "dame", "deathwing01", "deathwing02", "elise", "garrosh01", "garrosh02", "geddon", "guldan01", "guldan02", "illidan01", "illidan02", "illidan03", "illidan04", "jaina01", "jaina02", "jaina03", "jaina04", "jaina05", "jaina06", "kelthuzad01", "khadgar01", "liadrin", "lichking01", "lichking02", "magni01", "maiev", "malfurion01", "malfurion02", "malfurion03", "medivh", "morgl", "nemsy", "ragnaros", "rexxar01", "rexxar02", "rivendare", "sapphiron", "sargeras", "saurfang", "sylvanas01", "sylvanas02", "thrall01", "thrall02", "thrall03", "tyrande01", "uther01", "uther02", "uther03", "vaelastrasz", "valeera01", "valeera02", "varian", "vashj", "zuljin"],
}

class FlipGame {
  static images = [];
  static difficulty = 7;
  static maxLv = 40;
  static deckFullName = {coc: "Clash of Clans", wow: "World of Warcraft"};
  constructor(lv, deckName){
    this.lv = lv;
    this.score = 0;
    this.maxCombo = 0;
    this.source = deckName;
    FlipGame.images = CARDIMAGES[this.source].slice();
    FlipGame.maxLv = FlipGame.images.length - FlipGame.difficulty - 3;
    this.initiateVariables();
    this.createFields();
    this.createCards();
    this.playGround.addEventListener('click', this.cardClicked.bind(this));
    this.elemExit.addEventListener('click', () => {this.exitBoxContainer.classList.remove("display--none")});
    this.displayState();
    this.createExitBox();
    SOUND.fx.defeat01.stop();
    SOUND.bgm.loop01.volume(1.2);
    SOUND.bgm.loop01.play();
  }
  initiateVariables(){
    this.deck = [];
    this.selected = null;
    this.timeLeft = FlipGame.getTimeLeft(this.lv);
    this.clickLeft = FlipGame.getClickLeft(this.lv);
    this.timeLeftRound = 5;
    this.combo = 0;
    this.isRopeExist = false;
    this.transDurTime = Math.max((1.6 - this.lv / 100), 1.2) + "s";
  }
  createFields(){
    this.totalField = document.createElement('div');
    this.status = document.createElement('div');
    this.elemLv = document.createElement('div');
    this.elemTimer = document.createElement('div');
    this.elemClickCounter = document.createElement('div');
    this.elemScore = document.createElement('div');
    this.elemExit = document.createElement('div');
    this.elemRoping = document.createElement('div');
    this.elemRopeMask = document.createElement('div');
    this.elemSpark = document.createElement('div');
    this.playGround = document.createElement('div');
    this.totalField.className = "FGPG";
    this.status.className = "FGPG__status";
    this.elemLv.className = "FGPG__status__level";
    this.elemTimer.className = "FGPG__status__timer";
    this.elemClickCounter.className = "FGPG__status__clickcounter";
    this.elemScore.className = "FGPG__status__score";
    this.elemExit.className = "FGPG__status__exit";
    this.elemExit.textContent = "X";
    this.elemRoping.className = "FGPG__roping";
    this.elemRopeMask.className = "FGPG__roping__mask";
    this.elemRopeMask.classList.add("display--none");
    this.elemSpark.className = "FGPG__roping__spark";
    this.playGround.className = "FGPG__ground";
    this.status.appendChild(this.elemLv);
    this.status.appendChild(this.elemTimer);
    this.status.appendChild(this.elemClickCounter);
    this.status.appendChild(this.elemScore);
    this.status.appendChild(this.elemExit);
    document.querySelector('.gamefield').appendChild(this.totalField).appendChild(this.status);
    this.totalField.appendChild(this.elemRoping).appendChild(this.elemRopeMask).appendChild(this.elemSpark);
    this.totalField.appendChild(this.playGround);
  }
  createExitBox(){
    this.exitBoxContainer = document.createElement('div');
    const exitBox = document.createElement('div');
    const exitMsg = document.createElement('div');
    const exitButtons = document.createElement('div');
    const exitYes = document.createElement('div');
    const exitNo = document.createElement('div');
    this.exitBoxContainer.className = "FGPG__ground__exitboxcontainer";
    this.exitBoxContainer.classList.add("display--none");
    exitBox.className = "FGPG__ground__exitbox";
    exitMsg.className = "FGPG__ground__exitbox__msg";
    exitMsg.textContent = "Stop Playing?";
    exitButtons.className = "FGPG__ground__exitbox__buttons";
    exitYes.className = "FGPG__ground__exitbox__buttons__yes";
    exitYes.textContent = "Yes";
    exitNo.className = "FGPG__ground__exitbox__buttons__no";
    exitNo.textContent = "No";
    this.exitBoxContainer.appendChild(exitBox).appendChild(exitMsg);
    exitBox.appendChild(exitButtons).appendChild(exitYes);
    exitButtons.appendChild(exitNo);
    exitYes.addEventListener('click', this.exitGame.bind(this));
    exitNo.addEventListener('click', () => {this.exitBoxContainer.classList.add("display--none");});
    this.totalField.appendChild(this.exitBoxContainer);
  }
  displayState(){
    this.elemLv.textContent = "Lv. " + this.lv;
    this.elemClickCounter.textContent = this.clickLeft;
    this.elemTimer.textContent = FlipGame.convertSec(this.timeLeft);
    this.elemScore.textContent = "Score: " + this.score;
    this.gameTimer = setInterval(this.tic.bind(this), 1000);
  }
  nextRound(){
    clearInterval(this.gameTimer);
    this.addScore((this.lv - 1) * 10);
    this.addScore(this.timeLeft);
    this.addScore(this.clickLeft);
    this.initiateVariables();
    FUNC.removeChildren(this.playGround);
    this.elemTimer.classList.remove("border--tomatoblur");
    this.elemClickCounter.classList.remove("border--tomatoblur");
    this.elemRoping.classList.remove("FGPG__roping--show");
    this.elemRopeMask.classList.remove("move--ltr--ropemask");
    this.elemRopeMask.classList.add("display--none");
    this.playGround.textContent = "Next Round!";
    SOUND.fx.ropeburning.stop();
    SOUND.bgm.loop01.fade(0, 1, 1000);
    this.roundTimer = setInterval(this.ticRound.bind(this), 1000);
  }
  ticRound(){
    this.timeLeftRound--;
    if (this.timeLeftRound > 1) {
      this.playGround.textContent = (this.timeLeftRound - 1) + " s";
    }else if (this.timeLeftRound === 1) {
      this.playGround.textContent = "Go!"
    }else{
      clearInterval(this.roundTimer);
      this.playGround.textContent = "";
      this.createCards();
      this.displayState();
    }
  }
  tic(){
    this.timeLeft--;
    this.elemTimer.textContent = FlipGame.convertSec(this.timeLeft);
    if (this.timeLeft < 30) {
      if ((this.timeLeft % 2) === 1) {
        this.elemTimer.classList.add("border--tomatoblur");
      }else{
        this.elemTimer.classList.remove("border--tomatoblur");
      }
    }
    if (this.timeLeft < 23) {
      if (!this.isRopeExist) {
        SOUND.bgm.loop01.fade(1, 0, 2000);
        SOUND.fx.ropeburning.volume(1.5);
        SOUND.fx.ropeburning.play();
        this.isRopeExist = true;
        this.elemRoping.classList.add("FGPG__roping--show");
        this.elemRopeMask.classList.remove("display--none");
        this.elemRopeMask.classList.add("move--ltr--ropemask");
      }
    }
    if (this.timeLeft < 1) {
      this.bust();
    }
  }
  win(){
    this.addScore(1000);
    this.destroy();
    setTimeout(()=>{SOUND.fx.badass01.play()}, 1000);
  }
  exitGame(){
    this.bust();
    SOUND.fx.ropeburning.stop();
  }
  bust(){
    this.destroy();
    setTimeout(()=>{SOUND.fx.defeat01.play()}, 1000);
  }
  destroy(){
    this.totalField.remove();
    clearInterval(this.gameTimer);
    clearInterval(this.roundTimer);
    SOUND.bgm.loop01.stop();
    this.showRecord();
  }
showRecord(){
    const gameField = document.querySelector('.gamefield');
    this.recordField = document.createElement('div');
    this.recordField.className = "record";
    this.recordField.textContent = "FlipGame Record"
    this.recordBoard = document.createElement('div');
    this.recordBoard.className = "record__score";
    const deckName = document.createElement('div');
    deckName.textContent = FlipGame.deckFullName[this.source];
    const lvDiv = document.createElement('div');
    lvDiv.textContent = "Level: " + this.lv;
    const scoreDiv = document.createElement('div');
    scoreDiv.textContent = "Score: " + this.score;
    const maxComboDiv = document.createElement('div');
    maxComboDiv.textContent = "Max Combo: " + this.maxCombo;
    const nameField = document.createElement('div');
    nameField.textContent = "Nickname: "
    const name = document.createElement('input');
    name.className = "record__name";
    name.setAttribute('maxLength', 20);
    const sendButton = document.createElement('button');
    sendButton.className = "record__send"
    sendButton.textContent = "Send";
    sendButton.addEventListener('click', async () => {
      this.recordBoard.remove();
      const flipGameRef = FIREBASE.collection(FIREBASE.db, 'flipgame');
      const docRef = await FIREBASE.addDoc(flipGameRef, {
        player: name.value,
        lv: this.lv,
        score: this.score,
        maxcombo: this.maxCombo,
        date: FIREBASE.Timestamp.fromDate(new Date()),
        deck: this.source,
      });
      const grid = document.createElement('div');
      grid.className = "record__grid";
      grid.appendChild(document.createElement('div')).textContent = "Rank";
      grid.appendChild(document.createElement('div'));
      grid.appendChild(document.createElement('div')).textContent = "Player";
      grid.appendChild(document.createElement('div')).textContent = "Score";
      grid.appendChild(document.createElement('div')).textContent = "Date";
      grid.appendChild(document.createElement('div')).textContent = "Lv";
      grid.appendChild(document.createElement('div')).textContent = "Combo";
      let i = 1;
      const q = FIREBASE.query(flipGameRef, FIREBASE.orderBy("score", "desc"), FIREBASE.limit(20));
      const docSnap = await FIREBASE.getDocs(q);
      docSnap.forEach((doc) => {
        const data = doc.data();
        grid.appendChild(document.createElement('div')).textContent = i;
        grid.appendChild(document.createElement('img')).src = "/flipGame/images/" + data.deck + ".webp";
        grid.appendChild(document.createElement('div')).textContent = data.player;
        grid.appendChild(document.createElement('div')).textContent = data.score;
        grid.appendChild(document.createElement('div')).textContent = data.date.toDate().toLocaleDateString();
        grid.appendChild(document.createElement('div')).textContent = data.lv;
        grid.appendChild(document.createElement('div')).textContent = data.maxcombo;
        i++;
      });
      this.recordField.appendChild(grid);
    });
    gameField.appendChild(this.recordField).appendChild(this.recordBoard);
    nameField.appendChild(name);
    this.recordBoard.appendChild(deckName);
    this.recordBoard.appendChild(lvDiv);
    this.recordBoard.appendChild(scoreDiv);
    this.recordBoard.appendChild(maxComboDiv);
    this.recordBoard.appendChild(nameField);
    this.recordBoard.appendChild(sendButton);
  }
  hitPair(found){
    found.state = 'set';
    this.selected.state = 'set';
    found.element.style.transitionDuration = "0.8s";
    found.element.style.transform = "rotateY(180deg)";
    this.removeFromDeck(found);
    this.removeFromDeck(this.selected);
    this.addScore(1);
    this.checkCombo();
    SOUND.fx.achieve01.play();
  }
  checkCombo(){
    this.combo++;
    if (this.combo > 1) {
      if (this.maxCombo < this.combo) {
        this.maxCombo = this.combo;
      }
      if (this.combo === 2) {
        this.addScore(2);
        VFX.shake(this.elemScore);
        SOUND.fx.doublekill.play();
      }else if (this.combo === 3) {
        VFX.shake(this.elemScore);
        this.addScore(4);
        SOUND.fx.triplekill.play();
      }else if (this.combo === 4) {
        this.addScore(8);
        VFX.shake(this.totalField);
        SOUND.fx.megakill.play();
      }else if (this.combo === 5) {
        this.addScore(16);
        VFX.shake(this.totalField);
        SOUND.fx.ultrakill.play();
      }else if (this.combo === 6) {
        this.addScore(24);
        VFX.shakeHard(this.totalField);
        SOUND.fx.monsterkill.play();
      }else if (this.combo === 7) {
        this.addScore(48);
        VFX.shakeCrazy(this.totalField);
        SOUND.fx.unstoppable.play();
      }else if (this.combo > 7) {
        this.addScore(96);
        VFX.shakeCrazy(this.totalField);
        VFX.shakeOpacity(this.totalField);
        SOUND.fx.godlike.play();
      }
    }
  }
  recoverPair(found){
    this.selected.state = 'back';
    this.selected.element.style.transitionDuration = "0.8s";
    this.selected.element.style.transform = "rotateY(0)";
    this.selected.turned = false;
    found.element.style.transitionDuration = this.transDurTime;
    if (found.turned) {
      found.element.style.transform = "rotateY(0)";
    }else {
      found.element.style.transform = "rotateY(360deg)";
    }
    found.turned = !found.turned;
    this.combo = 0;
  }
  cardClicked(){
    const parent = event.target.parentNode;
    if (parent.classList.contains("FGPG__card")) {
      const found = this.deck.find(card => card.element === parent);
      if (found) {
        switch (found.state) {
          case 'back':
            if (this.selected) {
              if (this.selected.name === found.name) {
                /// when chosen a pair ///
                this.hitPair(found);
                if (this.deck.length === 0) {
                  /// when finished whole cards ///
                  this.lv++;
                  if (this.lv > FlipGame.maxLv) {
                    this.win();
                  }else {
                    this.nextRound();
                  }
                  return
                }
              }else {
                /// when chosen a wrong pair ///
                this.recoverPair(found);
              }
              this.selected = null;
            }else {
              /// when picked a card ///
              found.state = 'front';
              found.element.style.transitionDuration = "0.8s";
              found.element.style.transform = "rotateY(180deg)";
              this.selected = found;
            }
            SOUND.fx.cardflip.play();
            this.clickLeft--;
            this.elemClickCounter.textContent = this.clickLeft;
            if (this.clickLeft < 20) {
              this.elemClickCounter.classList.add("border--tomatoblur");
            }
            if (this.clickLeft === 0) this.bust()
            break;
        }
      }
    }
  }
  generateRewards(){
    const gold = Math.ceil(this.score / 100) * 10;
    const maxGem = Math.floor(this.score / 500);
    let halfGem = Math.floor(maxGem / 2);
    const randomGem = Math.round(Math.random() * (maxGem - halfGem));
    if (Math.random() < (this.lv / FlipGame.maxLv)) {
      halfGem += randomGem;
    }
    return {gold, gem: halfGem}
  }
  addScore(point){
    this.score = this.score + point;
    this.elemScore.textContent = "Score: " + this.score;
  }
  static getTimeLeft(lv){
    let time = Math.floor(Math.log2(lv + 3) * 50 - FlipGame.difficulty * 2);
    return time
  }
  static getClickLeft(lv){
    let click = (lv + FlipGame.difficulty) * (4 + lv * 0.2) * 4 - (FlipGame.difficulty * 3);
    return Math.round(click / 10) * 10
  }
  static convertSec(time){
    const min = Math.floor(time / 60);
    const sec = time - 60 * min;
    if (min === 0) return sec + "s"
    else return min + "m " + sec + "s"
  }
  removeFromDeck(target){
    const index = this.deck.indexOf(target);
    if (index > -1) this.deck.splice(index, 1);
  }
  createCards(){
    const n = this.lv + FlipGame.difficulty;
    const backImgNo = ("0" + this.lv).slice(-2);
    const deck = FlipGame.createRandomDeck(n);
    for(let i = 0;i < n * 2; i++){
      const card = new FG_Card(deck[i], backImgNo, this.source);
      if ((this.lv > 8) && (this.lv < 16)) {
        card.element.classList.add("FGPG__card--small");
      }else if ((this.lv >= 16) && (this.lv < 18)) {
        card.element.classList.add("FGPG__card--smaller");
      }else if ((this.lv >= 18) && (this.lv < 29)) {
        card.element.classList.add("FGPG__card--smallest");
      }else if (this.lv >= 29) {
        card.element.classList.add("FGPG__card--ultrasmall");
      }
      this.deck.push(card);
      this.playGround.appendChild(card.element);
    }
  }
  static createRandomDeck(n){
    const images = FlipGame.images.slice();
    const deck = [];
    const randomDeck = [];
    for(let i = 0;i < n; i++) {
      const rand = Math.floor(Math.random() * images.length);
      deck.push(images[rand]);
      deck.push(images[rand]);
      images.splice(rand, 1);
    }
    for(let i = 0; i < n * 2; i ++){
      const randInDeck = Math.floor(Math.random() * deck.length);
      randomDeck.push(deck[randInDeck]);
      deck.splice(randInDeck, 1);
    }
    return randomDeck
  }
}
class FG_Card {
  constructor(frontImg, backImgNo, source){
    const backUrl = "url('./images/cardbacks/" + backImgNo + ".webp')";
    this.element = document.createElement('div');
    this.element.className = "FGPG__card";
    this.name = frontImg;
    this.state = "back";
    this.turned = false;
    const back = document.createElement('div');
    const front = document.createElement('div');
    front.className = "FGPG__card__front";
    front.style.backgroundImage = "url('./images/characters/" + source + "/" + frontImg + ".webp')";
    back.className = "FGPG__card__back";
    back.style.backgroundImage = backUrl;
    this.element.appendChild(back);
    this.element.appendChild(front);
  }
}
document.querySelector('.adventures__flipgame__menu__go').addEventListener('click', () => {
  const deckName = document.getElementById("flipgame__deck").value;
  new FlipGame(1, deckName);
  document.querySelector('.adventures').remove();
})
