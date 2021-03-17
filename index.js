var game = createElement('game');

window.onload = function()
{
	document.body.append(game);

	document.body.onkeydown = onkeyup;
}

var gameOver = false;

var currentScore = 0;

function createElement(className, parentElement)
{
	var div = document.createElement('div');
	
	div.classList.add(className);

	if(parentElement !== undefined)
	{
		parentElement.append(div);
	}

	return div;
}

var road = createElement('road', game);

var totalWidth = window.visualViewport.width;

var roadMargin = (totalWidth - 320) / 2;

road.style.left = roadMargin;

var leftRoadLine = createElement('left-road-line', road);

var rightRoadLine = createElement('right-road-line', road);

var totalHeight = window.visualViewport.height;

var noOfBlocksToCreate = parseInt(totalHeight / 35);

totalHeight -= totalHeight - (noOfBlocksToCreate * 35);

function appendLeftRoadLineBlock(position)
{
	var lineBlock = createElement('line-block', leftRoadLine);

	lineBlock.style.top = position * 35;
}

function appendRightRoadLineBlock(position)
{
	var lineBlock = createElement('line-block', rightRoadLine);

	lineBlock.style.top = position * 35;
}

for(var i = 0; i < noOfBlocksToCreate; i++)
{
	appendLeftRoadLineBlock(i);

	appendRightRoadLineBlock(i);
}

function moveRoadLineBlock(child)
{
	const top = parseInt(child.style.top);

	if(top <= 0)
	{
		child.style.top = totalHeight - 10;	
	}
	else 
	{
		child.style.top = top - 10;
	}
}

function moveRoadLineBlocks()
{
	if(gameOver)
	{
		return;
	}

	for(var i = 0; i < noOfBlocksToCreate; i++)
	{
		const child1 = leftRoadLine.children[i];

		moveRoadLineBlock(child1);

		const child2 = rightRoadLine.children[i];

		moveRoadLineBlock(child2);
	}

	setTimeout(moveRoadLineBlocks, 100);	
}

moveRoadLineBlocks();

function addClass(element, classes)
{
	for(var i = 0; i < classes.length; i++)
	{
		var cls = classes[i];
		element.classList.add(cls);
	}
}

var myCar = createElement('car', game);

myCar.classList.add('myCar');

myCar.style.top = totalHeight - 50;

myCar.style.left = roadMargin + 135;

var carTopLeftPart = createElement('carPart', myCar);

carTopLeftPart.classList.add('carTopLeftPart');

var carTopRightPart = createElement('carPart', myCar);

carTopRightPart.classList.add('carTopRightPart');

function onkeyup(event)
{
	if(gameOver)
	{
		return;
	}

	if(event.keyCode === 37)
	{
		var newLeftValue = (parseInt(myCar.style.left) - 30);

		if(newLeftValue > roadMargin + 10)
		{
			myCar.style.left = newLeftValue;
		} 
		else 
		{
			myCar.style.left = roadMargin + 15;
		}
	}
	else if(event.keyCode === 39)
	{
		var newRightValue = (parseInt(myCar.style.left) + 30);

		if(newRightValue < roadMargin + 260)
		{
			myCar.style.left = newRightValue;
		} 
		else 
		{
			myCar.style.left = roadMargin + 255;
		}
	}
}

function finishGame()
{
	var gameOverDiv = createElement('gameOver', game);

	gameOverDiv.innerHTML = "GAME OVER";

	var playAgainButton = document.createElement('button');

	playAgainButton.classList.add('playAgainButton');

	playAgainButton.innerHTML = "Play Again";

	playAgainButton.onclick = function()
	{
		location.reload();
	}

	game.append(playAgainButton);
}

function createCar(top, left, i)
{
	var car = createElement('car', game);

	car.classList.add('hideCar');

	car.style.top = top;

	car.style.left = roadMargin + 10 + left;

	var carBottomLeftPart = createElement('carPart', car);

	carBottomLeftPart.classList.add('carBottomLeftPart');

	var carBottomRightPart = createElement('carPart', car);

	carBottomRightPart.classList.add('carBottomRightPart');

	car.visible = false;

	function moveCar()
	{
		if(gameOver)
		{
			return;
		}

		const mctop = parseInt(myCar.style.top);
		const mcleft = parseInt(myCar.style.left);

		const top = parseInt(car.style.top);
		const left = parseInt(car.style.left);

		if(car.visible && top >= mctop - 50 && top <= mctop + 50 && left >= mcleft - 50 && left <= mcleft + 50)
		{
			gameOver = true;

			finishGame();

			return;
		}

		if(top >= totalHeight)
		{
			car.style.top = 0;

			car.style.left = roadMargin + 10 + (60 * randomNumber(0, 4)) + 5; 	

			car.classList.remove('hideCar');

			car.visible = true;
		}
		else 
		{
			car.style.top = top + 30 + (currentScore / 5);
		}

		setTimeout(moveCar, 100);
	}

	moveCar();
}

function randomNumber(min, max) 
{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var noOfCarsToCreate = totalHeight / 200;

for(var i = 0; i < noOfCarsToCreate; i++)
{
	createCar(i * 200, (60 * randomNumber(0, 4)) + 5, i);
} 

var score = createElement('score', game);

score.innerHTML = "Your Score: " + currentScore;

function updateScore()
{
	if(gameOver)
	{
		return;
	}

	currentScore = parseInt(score.innerHTML.replace("Your Score: ", ""));

	currentScore += 1;

	score.innerHTML = "Your Score: " + currentScore;

	setTimeout(updateScore, 500);
}

updateScore();