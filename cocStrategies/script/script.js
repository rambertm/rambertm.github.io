const MAINFIELD = document.getElementsByTagName('article')[0];
const PAGENATION = document.querySelector('.pagenation');
const FILTER = {tags :[], passed: [], currentpage: 1};
const CONTENTSPERPAGE = 4;

Main();
function Main(){
  'use strict';
  for(let i = 0; i < CONTENTS.length; i++){
    FILTER.passed.push(i);
  }
  DrawMainNav();
  LoadContents([0, 1, 2, 3], 0, CONTENTSPERPAGE);
  SetPageNation(1);
}

function DrawMainNav(){
  'use strict';
  const tiers = [{value: 14, text: 14}, {value: 13, text: 13}, {value: 12, text: 12}, {value: 11, text: 11}, {value: 10, text: '10 -'}];
  const layouts = [{value: 'PZ', text: '돌돌이'}, {value: 'SQ', text: '네모'}, {value: 'SM', text: '대칭'}, {value: 'AS', text: '비대칭'}, {value: 'IL', text: '섬'}, {value: 'AG', text: '밀집형'}];
  const strategies = [{value: 'QH', text: '퀸힐'}, {value: 'HM', text: '광호'}, {value: 'LL', text: '라벌'}, {value: 'DG', text: '용'}, {value: 'DR', text: '드라'}, {value: 'SM', text: '슈법'}, {value: 'CL', text: '복제'}, {value: 'IV', text: '투명'}, {value: 'TR', text: '함정'}, {value: 'OS', text: '외부영상'}];
  const nav = document.querySelector('.nav');
  const dl = document.createElement('dl');
  DrawDl(dl, '티어', 'TH', tiers);
  DrawDl(dl, '배치', 'LO', layouts);
  DrawDl(dl, '전략', 'ST', strategies);
  dl.addEventListener('click', DLClickListener);
  nav.appendChild(dl);
}

function DLClickListener(event){
  'use strict';
  const box = event.target;
  if (box.tagName !== 'INPUT'){
    return
  }
  const tag = box.value;
  FILTER.passed = [];
  if (box.checked) {
    if (!FILTER.tags.includes(tag)){
      FILTER.tags.push(tag);
    }
  }else{
    if (FILTER.tags.includes(tag)){
      let index = FILTER.tags.indexOf(tag);
      if (index !== -1) {
        FILTER.tags.splice(index, 1);
      }
    }
  }
  for(let i = 0; i < CONTENTS.length; i++){
    if (IsPassFilter(CONTENTS[i].tags, FILTER.tags)){
      FILTER.passed.push(i);
    }
  }
  FILTER.currentpage = 1;
  LoadContents(FILTER.passed, 0, CONTENTSPERPAGE);
  SetPageNation(1);
}

function DrawDl(dl, dtName, prefix, dds){
  'use strict';
  const container = document.createElement('div');
  const dt = document.createElement('dt');
  dt.textContent = dtName;
  dl.appendChild(container).appendChild(dt);
  for (let i = 0; i < dds.length; i++){
    const dd = document.createElement('dd');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = prefix + '_' + dds[i].value;
    dd.appendChild(label).appendChild(checkbox);
    label.appendChild(document.createTextNode(dds[i].text));
    container.appendChild(dd);
  }
}

function SetPageNation(startPage){
  'use strict';
  ClearChildren(PAGENATION);
  let count = FILTER.passed.length;
  let pages = Math.floor((count - 1) / CONTENTSPERPAGE) + 1;
  if (pages === 1){
    return
  }
  if (startPage !== 1){
    let child = document.createElement('button');
    child.className = 'pagenation__indexbutton';
    child.value = (startPage - 5);
    child.textContent = '<<';
    child.addEventListener('click', PrevPageChapter);
    PAGENATION.appendChild(child);
  }
  for(let i = 0; i < 5 ;i++){
    let page = startPage + i;
    if (page > pages){
      return
    }
    let child = document.createElement('button');
    child.className = 'pagenation__indexbutton';
    child.textContent = page;
    if (i === 0){
      child.classList.add('pagenation__indexbutton--selected');
    }
    child.addEventListener('click', PageButtonClicked);
    PAGENATION.appendChild(child);
  }
  if ((startPage + 4) < pages){
    let child = document.createElement('button');
    child.className = 'pagenation__indexbutton';
    child.value = (startPage + 5);
    child.textContent = '>>';
    child.addEventListener('click', NextPageChapter);
    PAGENATION.appendChild(child);
  }
}

function PrevPageChapter(event){
  'use strict';
  let startPage = Math.floor(event.target.value);
  FILTER.currentpage = startPage + 4;
  SetPageNation(startPage);
  let queryClass = 'pagenation__indexbutton--selected';
  document.querySelector('.' + queryClass).classList.remove(queryClass);
  PAGENATION.lastElementChild.previousElementSibling.classList.add(queryClass);
  LoadContents(FILTER.passed, (startPage + 3) * CONTENTSPERPAGE, CONTENTSPERPAGE);
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function NextPageChapter(event){
  'use strict';
  let startPage = Math.floor(event.target.value);
  FILTER.currentpage = startPage;
  SetPageNation(startPage);
  LoadContents(FILTER.passed, (startPage - 1) * CONTENTSPERPAGE, CONTENTSPERPAGE);
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}


function PageButtonClicked(event){
  'use strict';
  let page = Math.floor(event.target.textContent);
  if (page === FILTER.currentpage){
    return
  }else{
    FILTER.currentpage = page;
    LoadContents(FILTER.passed, (page - 1) * CONTENTSPERPAGE, CONTENTSPERPAGE);
    let queryClass = 'pagenation__indexbutton--selected';
    document.querySelector('.' + queryClass).classList.remove(queryClass);
    event.target.classList.add(queryClass);
  }
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function LoadContents(passedIndex, startIndex, count){
  'use strict';
  ClearChildren(MAINFIELD);
  for(let i = 0; i < count; i++){
    const index = passedIndex[startIndex + i];
    if (index !== undefined){
      const src = 'https://www.youtube-nocookie.com/embed/' + CONTENTS[index].videoId + '?rel=0&vq=hd1080';
      const comment = CONTENTS[index].comment;
      const armylink = CONTENTS[index].armylink;
      const baselink = CONTENTS[index].baselink;
      const container = document.createElement('div');
      const helper = document.createElement('div');
      const youtube = document.createElement('iframe');
      container.className = 'cocvid';
      helper.className = 'cocvid__helper';
      if (comment) {
        const tip = document.createElement('div');
        const tipText = document.createElement('span');
        tip.textContent = '해설: ';
        tip.className = 'cocvid__helper__tip';
        tipText.textContent = comment;
        tipText.className = 'cocvid__helper__tiptext';
        helper.appendChild(tip).appendChild(tipText);
      }
      if (armylink) {
        const linkahref = document.createElement('a');
        linkahref.className = 'cocvid__helper__link';
        linkahref.textContent = 'COPY ARMY';
        linkahref.target = '_blank';
        linkahref.href = 'https://link.clashofclans.com/?action=CopyArmy&army=' + armylink;
        helper.appendChild(linkahref);
      }
      if (baselink) {
        const linkahref = document.createElement('a');
        linkahref.className = 'cocvid__helper__link';
        linkahref.textContent = 'COPY BASE';
        linkahref.target = '_blank';
        linkahref.href = baselink;
        helper.appendChild(linkahref);
      }
      youtube.className = 'cocvid__youtube';
      SetYoutubeAttributes(youtube, src);
      container.appendChild(youtube);
      container.appendChild(helper);
      MAINFIELD.appendChild(container);
    }else{
      return
    }
  }
}

function IsPassFilter(test, filters){
  'use strict';
  let passTier = false;
  let passLayout = false;
  let passStrat = true;
  let passTierExisted = false;
  let passLayoutExisted = false;
  let filterCount = filters.length;
  if (filterCount){
    for(let i = 0; i < filterCount; i++){
      let filter = filters[i];
      if (filter.includes('TH_')) {
        passTierExisted = true;
        passTier = passTier || test.includes(filter);
      }else if(filter.includes('LO_')){
        passLayoutExisted = true;
        passLayout = passLayout || test.includes(filter);
      }else if(filter.includes('ST_')){
        passStrat = passStrat && test.includes(filter);
      }
    }
    if (passTierExisted){
      if (passLayoutExisted){
        return passTier && passStrat && passLayout
      }else{
        return passTier && passStrat
      }
    }else{
      if (passLayoutExisted){
        return passStrat && passLayout
      }else{
        return passStrat
      }
    }
  }else{
    return true
  }
}

function SetYoutubeAttributes(element, src){
  'use strict';
  element.src = src;
  element.width = '50%';
  element.height = '500px';
  element.setAttribute('allowFullScreen', '');
  element.setAttribute('frameborder', '0');
  element.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
}

///// TOUCH, SWIPE EVENT givanse @ stackoverflow /////
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
var xDown = null;
var yDown = null;
function getTouches(evt) {
  return evt.touches
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
          let currentPageButton = document.querySelector('.pagenation__indexbutton--selected');
          let nextPageButton = currentPageButton.nextElementSibling;
          if (nextPageButton){
            nextPageButton.click();
          }
        } else {
          let currentPageButton = document.querySelector('.pagenation__indexbutton--selected');
          let prevPageButton = currentPageButton.previousElementSibling;
          if (prevPageButton){
            prevPageButton.click();
          }
        }
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */
        } else {
            /* up swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};
/////////////////////////Functions///////////////////////////////
function ClearChildren(element){
  while(element.firstChild){
    element.removeChild(element.lastChild);
  }
};

/*
for IE8 and below
 */
if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(what, i) {
        i = i || 0;
        var L = this.length;
        while (i < L) {
            if(this[i] === what) return i;
            ++i;
        }
        return -1;
    };
}
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        // c. Increase k by 1.
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}
/////////////////////////////////////////////////////////////
