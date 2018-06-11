'use strict';

var setupDialog = document.querySelector('.setup');
setupDialog.classList.remove('hidden');

var WIZZARDS_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZZARDS_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZZARDS_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZZARDS_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];


var similarWizardTemplate = document.querySelector('#similar-wizard-template');
var setupSimilarList = document.querySelector('.setup-similar-list');
var setupSimilar = document.querySelector('.setup-similar');

var createWizzards = function (wizzardsCount) {
  var wizzards = [];

  for (var i = 0; i < wizzardsCount; i++) {
    wizzards[i] = {};

    wizzards[i].name = WIZZARDS_NAMES[
      getRandomInt(0, (WIZZARDS_NAMES.length - 1))
    ];

    wizzards[i].surname = WIZZARDS_SURNAMES[
      getRandomInt(0, (WIZZARDS_SURNAMES.length - 1))
    ];

    wizzards[i].coatColor = WIZZARDS_COAT_COLORS[
      getRandomInt(0, (WIZZARDS_COAT_COLORS.length - 1))
    ];

    wizzards[i].eyesColor = WIZZARDS_EYES_COLORS[
      getRandomInt(0, (WIZZARDS_EYES_COLORS.length - 1))
    ];
  }

  return wizzards;
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var renderWizzard = function (wizzard) {
  var wizzardElement = similarWizardTemplate.content.querySelector('.setup-similar-item').cloneNode(true);

  wizzardElement.querySelector('.setup-similar-label').textContent = wizzard.name + ' ' + wizzard.surname;
  wizzardElement.querySelector('.wizard-coat').style.fill = wizzard.coatColor;
  wizzardElement.querySelector('.wizard-eyes').style.fill = wizzard.eyesColor;

  return wizzardElement;
};

var fillingSetupSimilarBlock = function (wizzards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizzards.length; i++) {
    fragment.appendChild(renderWizzard(wizzards[i]));
  }

  return fragment;
};

var allWizzards = createWizzards(4);

setupSimilarList.appendChild(fillingSetupSimilarBlock(allWizzards));

setupSimilar.classList.remove('hidden');
