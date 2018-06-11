'use strict';

var TEXT_SIZE = 16;
var TEXT_HEIGHT = TEXT_SIZE * 1.2;
var TEXT_COLOR = '#000000';
var TEXT_ERROR_COLOR = '#ff0000';
var TEXT_FONT_FAMILY = 'PT Mono';

var CLOUD_COLOR = '#ffffff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_POSITION_X = 100;
var CLOUD_POSITION_Y = 10;

var GAP = 10;
var OFFSET = 5;
var PADDING_TOP = 15;

var BAR_GAP = 50;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var CURRENT_PLAYER_BAR_COLOR = '#ff0000';

var startPositionX = CLOUD_POSITION_X + BAR_WIDTH;
var startPositionY = CLOUD_HEIGHT - OFFSET;

/* функция для отрисовки облака */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/* функция для нахожденя максимальново значения в массиве */
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

/* функция возвращающая объект-словарь со значениями позиций игроков по времени */
var createPlayersTimesMap = function (playersTimes) {
  var objectMap = {};

  for (var i = 0; i < playersTimes.length; i++) {
    objectMap[playersTimes[i]] = i;
  }

  return objectMap;
};

/* Функция для сортировки времени мрохождения всех игроков (кроме текущего, т.е игрока с именем "Вы") */
var sortPlayersTimes = function (playersNames, times) {
  /* Записывает отфильтрованный масив в переменную */
  var playersTimes = filterPlayersTimes('Вы', playersNames, times);

  /* Сортирует отфильтрованный массив */
  sortAscending(playersTimes);
  /* Создает словать из времени прохождения игроков */
  var playersTimesMap = createPlayersTimesMap(playersTimes);

  return playersTimesMap;
};

/* Возвращает массив игроков (за исключеним игрока с определенным именем) */
var filterPlayersTimes = function (name, playersNames, times) {
  var players = [];

  for (var k = 0; k < times.length; k++) {
    if (playersNames[k] !== name) {
      players.push(times[k]);
    }
  }

  return players;
};

/* Функция сортирующая элементы массива (по возрастанию) */
var sortAscending = function (arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    var maxElement = arr[i];

    for (var j = i + 1; j < arr.length; j++) {
      if (arr[j] > maxElement) {
        var swap = arr[i];
        maxElement = arr[j];
        arr[i] = maxElement;
        arr[j] = swap;
      }
    }
  }
};

window.renderStatistics = function (ctx, names, times) {
  /* Рисует подложку от статистики */
  renderCloud(ctx, CLOUD_POSITION_X + GAP, CLOUD_POSITION_Y + GAP, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_POSITION_X, CLOUD_POSITION_Y, CLOUD_COLOR);

  /* Задает размеры текста */
  ctx.textBaseline = 'top';
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_SIZE.toString() + 'px' + ' ' + TEXT_FONT_FAMILY;

  if (!times) {
    ctx.fillStyle = TEXT_ERROR_COLOR;
    ctx.fillText('Ура, поздравляем!', CLOUD_POSITION_X + GAP + OFFSET, CLOUD_HEIGHT / 2);
    ctx.fillText('Вы успешно закончили игру.', CLOUD_POSITION_X + GAP + OFFSET, CLOUD_HEIGHT / 2 + TEXT_HEIGHT);
  } else {
    /* Выводит победный текст */
    ctx.fillText('Ура вы победили!', CLOUD_POSITION_X + GAP + OFFSET, CLOUD_POSITION_Y + PADDING_TOP + OFFSET);
    ctx.fillText('Список результатов:', CLOUD_POSITION_X + GAP + OFFSET, CLOUD_POSITION_Y + PADDING_TOP + OFFSET + TEXT_HEIGHT);


    /* Изменяет базовую линию текста, для удобства подсчетов */
    ctx.textBaseline = 'bottom';

    /* Находит максимальное число в массиве */
    var maxTime = getMaxElement(times);

    /* Объявляет дополнительные переменные для последуюего вычисления цвета для раскраски блоков на гистограмме */
    var transparencyCoefficient = 1 / (names.length - 1);

    /* Вызывает сортировку времени прохождения всех игроков и записывает в переменную*/
    var sortedTimes = sortPlayersTimes(names, times);

    /* Рисует гистогнамму */
    for (var i = 0; i < names.length; i++) {
      ctx.fillText(names[i], startPositionX + (BAR_WIDTH + BAR_GAP) * i, startPositionY);

      ctx.fillStyle = (names[i] === 'Вы')
        ? CURRENT_PLAYER_BAR_COLOR
        : 'rgba(0, 0, 255,' + (1 - transparencyCoefficient * sortedTimes[times[i]]).toFixed(2) + ')';

      var currentBarHeight = MAX_BAR_HEIGHT * times[i] / maxTime;

      ctx.fillRect(startPositionX + (BAR_WIDTH + BAR_GAP) * i, startPositionY - currentBarHeight - TEXT_HEIGHT, BAR_WIDTH, currentBarHeight);

      ctx.fillStyle = TEXT_COLOR;
      ctx.fillText(Math.round(times[i]), startPositionX + (BAR_WIDTH + BAR_GAP) * i, startPositionY - currentBarHeight - TEXT_HEIGHT - OFFSET);
    }
  }
};
