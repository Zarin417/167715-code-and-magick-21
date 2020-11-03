'use strict';

(() => {
  const CLOUD_COLOR = `#fff`;
  const CLOUD_SHADOW_COLOR = `rgba(0, 0, 0, 0.7)`;
  const CLOUD_WIDTH = 420;
  const CLOUD_HEIGHT = 270;
  const CLOUD_X = 100;
  const CLOUD_Y = 10;
  const GAP = 10;
  const TEXT_GAP = 20;
  const TEXT_COLOR = `#000`;
  const TEXT_FONT = `bold 16px 'PT Mono'`;
  const PLAYER_COLOR = `rgba(255, 0, 0, 1)`;
  const BAR_MAX_HEIGHT = 150;
  const BAR_WIDTH = 40;
  const BAR_GAP = 50;
  const BAR_X = 140;
  const BAR_Y = 250;

  const renderCloud = (ctx, x, y, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + CLOUD_WIDTH - 30, y);
    ctx.bezierCurveTo(x + CLOUD_WIDTH - 30, y, x + CLOUD_WIDTH, y, x + CLOUD_WIDTH, y + 30);
    ctx.lineTo(x + CLOUD_WIDTH, y + 30);
    ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT - 30);
    ctx.bezierCurveTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT - 30, x + CLOUD_WIDTH, y + CLOUD_HEIGHT, x + CLOUD_WIDTH - 30, y + CLOUD_HEIGHT);
    ctx.lineTo(x + CLOUD_WIDTH - 30, y + CLOUD_HEIGHT);
    ctx.lineTo(x + 30, y + CLOUD_HEIGHT);
    ctx.bezierCurveTo(x + 30, y + CLOUD_HEIGHT, x, y + CLOUD_HEIGHT, x, y + CLOUD_HEIGHT - 30);
    ctx.lineTo(x, y + CLOUD_HEIGHT - 30);
    ctx.closePath();
    ctx.fill();
  };

  // Random color for other players
  const getRandomColor = () => {
    const shadeOfBlue = `hsl(240, ${Math.floor(Math.random() * 100)}%, 50%)`;
    return shadeOfBlue;
  };

  // Rendering text in cloud after win
  const renderText = (ctx, text, x, y) => {
    ctx.font = TEXT_FONT;
    ctx.textBaseline = `top`;
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(text, x, y);
  };

  // Get maximum score of time
  const getMaxElement = (arr) => {
    let maxElement = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  // Score bar rendering
  const renderScoreBar = (ctx, names, times) => {
    const maxTime = getMaxElement(times);

    names.forEach((name, index) => {
      let barHeight = -(BAR_MAX_HEIGHT * times[index]) / maxTime;

      renderText(ctx, name, BAR_X + (BAR_WIDTH + BAR_GAP) * index, BAR_Y);

      ctx.fillStyle = (name === `Вы`) ? PLAYER_COLOR : getRandomColor();
      ctx.fillRect(BAR_X + (BAR_WIDTH + BAR_GAP) * index, BAR_Y - GAP, BAR_WIDTH, barHeight);

      renderText(ctx, Math.round(times[index]), BAR_X + (BAR_WIDTH + BAR_GAP) * index, BAR_Y - GAP + barHeight - TEXT_GAP);
    });
  };

  window.stat = {
    renderStatistics: (ctx, names, times) => {
      renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW_COLOR);
      renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
      renderText(ctx, `Ура вы победили!`, CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP, TEXT_COLOR);
      renderText(ctx, `Список результатов:`, CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP * 2, TEXT_COLOR);
      renderScoreBar(ctx, names, times);
    }
  };
})();
