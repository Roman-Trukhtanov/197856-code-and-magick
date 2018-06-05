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
var POSITION_X = 100;
var POSITION_Y = 10;

var GAP = 10;
var OFFSET = 5;
var PADDING_TOP = 15;

var BAR_GAP = 50;

var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var CURRENT_PLAYER_BAR_COLOR = '#ff0000';

var startPositionX = POSITION_X + BAR_WIDTH;
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

/* Функция для сортировки времени мрохождения всех игроков (кроме текущего, т.е игрока с именем "Вы") */
var sortingPlayersTimes = function (playersNames, playersTimes) {
  /* Объявляет пустой массив, который будет хранить время прохождения игры всех игроков (кроме текущего, т.е игрока с именем "Вы") */
  var playersTimesDataBase = [];

  /* Добавляет данные в новый массив */
  for (var k = 0; k < playersTimes.length; k++) {
    if (playersNames[k] !== 'Вы') {
      playersTimesDataBase.push(playersTimes[k]);
    }
  }

  /* Сортирует новый массив с временем каждого игрока (по возрастанию) */
  for (var i = 0; i < playersTimesDataBase.length - 1; i++) {
    var maxElement = playersTimesDataBase[i];

    for (var j = i + 1; j < playersTimesDataBase.length; j++) {
      if (playersTimesDataBase[j] > maxElement) {
        maxElement = playersTimesDataBase[j];
        var swap = playersTimesDataBase[i];
        playersTimesDataBase[i] = maxElement;
        playersTimesDataBase[j] = swap;
      }
    }
  }

  return playersTimesDataBase;
};

window.renderStatistics = function (ctx, names, times) {
  /* Рисует подложку от статистики */
  renderCloud(ctx, POSITION_X + GAP, POSITION_Y + GAP, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, POSITION_X, POSITION_Y, CLOUD_COLOR);

  /* Задает размеры текста */
  ctx.textBaseline = 'top';
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_SIZE.toString() + 'px' + ' ' + TEXT_FONT_FAMILY;

  /* Выводит победный текст */
  ctx.fillText('Ура вы победили!', POSITION_X + GAP + OFFSET, POSITION_Y + PADDING_TOP + OFFSET);
  ctx.fillText('Список результатов:', POSITION_X + GAP + OFFSET, POSITION_Y + PADDING_TOP + OFFSET + TEXT_HEIGHT);

  /* Изменяет базовую линию текста, для удобства подсчетов*/
  ctx.textBaseline = 'bottom';

  if (!times) {
    ctx.font = TEXT_SIZE.toString() + 'px' + ' ' + 'Times New Roman';
    ctx.fillStyle = TEXT_ERROR_COLOR;
    ctx.fillText('Что-то пошло не так!!!', POSITION_X + GAP + OFFSET, CLOUD_HEIGHT / 2);
    ctx.fillText('Попробуйте пройти игру заного', POSITION_X + GAP + OFFSET, CLOUD_HEIGHT / 2 + TEXT_HEIGHT);
  } else {
    /* Находит максимальное число в массиве */
    var maxTime = getMaxElement(times);

    /* Объявляет дополнительные переменные для последуюего вычисления цвета для раскраски блоков на гистограмме */
    var transparencyCoefficient = 1 / (names.length - 1);

    /* Вызывает сортировку времени прохождения всех игроков и записывает в переменную*/
    var sortedTimes = sortingPlayersTimes(names, times);

    /* Рисует гистогнамму */
    for (var i = 0; i < names.length; i++) {
      ctx.fillText(names[i], startPositionX + (BAR_WIDTH + BAR_GAP) * i, startPositionY);

      if (names[i] === 'Вы') {
        ctx.fillStyle = CURRENT_PLAYER_BAR_COLOR;
      } else {
        ctx.fillStyle = 'rgba(0, 0, 255,' + (1 - transparencyCoefficient * sortedTimes.indexOf(times[i])).toFixed(2) + ')';
      }

      var currentBarHeight = MAX_BAR_HEIGHT * times[i] / maxTime;

      ctx.fillRect(startPositionX + (BAR_WIDTH + BAR_GAP) * i, startPositionY - currentBarHeight - TEXT_HEIGHT, BAR_WIDTH, currentBarHeight);

      ctx.fillStyle = TEXT_COLOR;
      ctx.fillText(Math.round(times[i]), startPositionX + (BAR_WIDTH + BAR_GAP) * i, startPositionY - currentBarHeight - TEXT_HEIGHT - OFFSET);
    }
  }
};
