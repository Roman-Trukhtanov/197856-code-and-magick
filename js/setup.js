'use strict';

var setupDialog = document.querySelector('.setup');
setupDialog.classList.remove('hidden');

var WIZARDS_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARDS_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZARDS_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARDS_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var BROTHERS_AMOUNT = 4;

var wizardTemplate = document.querySelector('#similar-wizard-template').content;
var similarWizardsContainer = document.querySelector('.setup-similar-list');
var setupSimilarContainer = document.querySelector('.setup-similar');

var createBrothers = function (wizardsAmount) {
  var brothers = [];
  var wizardsNamesIndex = 0;
  var wizardsSurNamesIndex = 0;
  var wizardsCoatColorsIndex = 0;
  var wizardsEyesColorsIndex = 0;

  for (var i = 0; i < wizardsAmount; i++) {
    if ((WIZARDS_NAMES.length - 1) < wizardsNamesIndex) {
      wizardsNamesIndex = 0;
    }
    if ((WIZARDS_SURNAMES.length - 1) < wizardsSurNamesIndex) {
      wizardsSurNamesIndex = 0;
    }
    if ((WIZARDS_COAT_COLORS.length - 1) < wizardsCoatColorsIndex) {
      wizardsCoatColorsIndex = 0;
    }
    if (WIZARDS_EYES_COLORS.length < wizardsEyesColorsIndex) {
      wizardsEyesColorsIndex = 0;
    }

    brothers.push({
      'name': getElementOfArray(WIZARDS_NAMES, WIZARDS_NAMES.length - 1 - wizardsNamesIndex),
      'surname': getElementOfArray(WIZARDS_SURNAMES, WIZARDS_SURNAMES.length - 1 - wizardsSurNamesIndex),
      'coatColor': getElementOfArray(WIZARDS_COAT_COLORS, WIZARDS_COAT_COLORS.length - 1 - wizardsCoatColorsIndex),
      'eyesColor': getElementOfArray(WIZARDS_EYES_COLORS, WIZARDS_EYES_COLORS.length - 1 - wizardsEyesColorsIndex)
    });

    wizardsNamesIndex++;
    wizardsSurNamesIndex++;
    wizardsCoatColorsIndex++;
    wizardsEyesColorsIndex++;
  }

  return brothers;
};

var getElementOfArray = function (array, arrayMaxLength) {
  var index = getRandomInt(0, arrayMaxLength);

  var swap = array[index];
  array[index] = array[arrayMaxLength];
  array[arrayMaxLength] = swap;

  return swap;
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var getWizard = function (wizard) {
  var wizardElement = wizardTemplate.querySelector('.setup-similar-item').cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fillFragment = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(getWizard(wizards[i]));
  }

  return fragment;
};

var allBrothers = createBrothers(BROTHERS_AMOUNT);

similarWizardsContainer.appendChild(fillFragment(allBrothers));

setupSimilarContainer.classList.remove('hidden');
