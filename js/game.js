//если страница загружена
$(document).ready(function(){
		//кнопка перезагрузки страницы(начать сначала)
		$('button').click(function(){
			location.reload();
		});
		//скрываем менюшку, которая выпадает при смерти
		$('.screen-ranking').hide(4000);
		$('form').submit(function(e){
			e.preventDefault();
		});
		// если кнопка нажата, и имя игрока больше 3 символов то запускаем функцию init()
		$('#sbmtName').click(function(){
			UserName = $('#sbmtInpt').val();
			if(UserName.length >= 3){
				$('.user-info').text(UserName);
				$('.screen-start').hide(300);
				init();
			}
		});
	//кнопки лево право и атаки
	const K_L = 97;
	const K_R = 100;
	const K_A = 49;

	var map;
	var ctxMap;


	Gwidth = document.getElementById('screenGame');
	var gameWidth = Gwidth.clientWidth;
	var gameHeight = 500;

	var player;
	var enemy = [];

	// переменные игрока
	var isPlaying;
	var health = $('.panel-xp .score-value span').text();
	var mana = 100/*$('.panel-mp .score-value span').text()*/;
	var murder = 0;
	var looGame = 0;
	var x;
	var y;
	var a;
	var backgroundPos = 0;
	var changeBackgroundPos = 6;

	//таймер
	var Timer;
	var _sec = _min = 0;
	var spawnInterval;
	var spawnTime = 100;
	var spawnAmount = 1;

	//количество врагов
	var nameEnemy = ["cyborg","flyingshit"];

	//получаем картинки игрока
	var idle =          actionNetrunner('idle',6);
	var walk =          actionNetrunner('run',13);
	var death =         actionNetrunner('death',19);
	var attack =        actionNetrunner('attak1',25);
	var run = {};
	var enemyAttack = {};
	var enemyDie = {};
	//получаем картинки врагов
	run["cyborg"] =         actionEnemy("cyborg",'run',11);
	enemyAttack["cyborg"] = actionEnemy("cyborg",'attak',6);
	enemyDie["cyborg"] =    actionEnemy("cyborg",'die',4);
	run["flyingshit"] =         actionEnemy("flyingshit",'run',11);
	enemyAttack["flyingshit"] = actionEnemy("flyingshit",'attak',25);
	enemyDie["flyingshit"] =    actionEnemy("flyingshit",'die',13);



	function isInteger(num) {
	  return (num ^ 0) === num;
	}
	//функция инициализации игры
	function init() {
		//получаем холст на котором будет рисоваться враги и игрок, создаем объект Игрок, запускаем цикл игры(startLoop)
		playerId = document.getElementById('playerCan');
		ctxP = playerId.getContext("2d");

		enemyId = document.getElementById('enemy');
		ctxE = enemyId.getContext("2d");

		playerId.height = gameHeight;
		playerId.width = gameWidth;
		enemyId.height = gameHeight;
		enemyId.width = gameWidth;
		player = new Player();
		startLoop();
	}
	//прибавка нулей для картинок
	function zeroPlus(str,len) {
		str = str.toString();
		return str.length < len ? zeroPlus("0" + str,len) : str;
	}
	//функиця получения картинок для нетруннера
	function actionNetrunner(name,count) {
			var mas = new Array();
			for(var i = 1;i<=count;i++){
				mas[i] = new Image;
				mas[i].src = './heroes/netrunner/'+name+'/'+i+'.png';
			}
			return mas;
	}
	// функция создания врагов(берет время спавна и количества врагов)
	function startCreatingEnemy(){
		looGame++;
		stopCreatingEnemy();
		spawnInterval = setInterval(function(){
			if(enemy.length == 0){
				spawnEnemy(spawnAmount);
				if(looGame % 2){
					spawnAmount = spawnAmount + 1;
				}
			}
		},spawnTime);
	}
	function stopCreatingEnemy(){
		clearInterval(spawnInterval);
	}
	// изменения статистики(убийства, здоровья и т.д.)
	function updateStats(){
		$('.kills').text("Killed: "+murder);
		health = +health;
		mana = +mana;
		$('.panel-xp .score-value span').text(health.toFixed(0));
		$('.panel-mp .score-value span').text(mana.toFixed(0));
		if(mana<=0){
			mana = 0;
		}else if(mana<100){
			mana = +mana + 0.1;
		}
		if(health<=0){
			health = 0;
			player.idle = false;
			player.death = true;

		}else if(health<100){
			health = +health + 0.06;
		}
	}
	// функция получения картинок врага
	function actionEnemy(who,name,count) {
			var mas = new Array();
			for(var i = 1;i<=count;i++){
				mas[i] = new Image;
				mas[i].src = './heroes/enemies/'+who+'/'+name+'/'+i+'.png';
			}
			return mas;
	}
	//начало цикла игры
	function startLoop() {
		isPlaying = true;
		//уставлинваем таймер в игре
		Timer = setInterval(function(){
			if(_sec == 59){
				_min++;
				_sec = 0;
			}else{
				_sec++;
				$('.timer').text("Time: "+zeroPlus(_min,2)+":"+zeroPlus(_sec,2));
			}
			
		},1000);
		//запускаем цикл
		loop();
		//создаем врагов
		startCreatingEnemy();
	}
	//цикл игры
	function loop() {
		//фпс игры 
		var fps = 25;
		if(isPlaying){
		setTimeout(function() {
			//запускаем цикл игры рекурсивно и вызываем функцию отрисовки и изменения
			requestAnimationFrame(loop);
			draw();
			update();
		}, 1000/fps);
		}else{
			clearInterval(Timer);

		}
	}
	function sortObj(A,B) {
		return B.score - A.score; 
	}
	//функция остановки цикла, выпадает при смерти статистика
	function stopLoop() {
		username = $('.user-info').text();
		isPlaying = false;
		tr = '<tr>';
		tr +="<td align='center'>" + UserName + "</td>";
		tr +="<td align='center'>" + murder + "</td>";
		tr +="<td align='center'>" + $('.timer').text() + "</td>";
		tr += '</tr>';
		$('#tablea tr:last').after(tr);
		$('.screen-ranking').show("slaw");

	}
	// Описание объекта Игрока
	function Player() {
		this.srcX = 0;//отступы
		this.srcY = 260;
		this.drawX = 0;
		this.drawX = 0;
		this.width = 270; //размеры
		this.height = 270;
		this.isRight = false;
		this.isLeft = false;
		this.idle = true;
		this.walk = false;
		this.attackFirts = false;
		this.death = false;
		this.attack = false;
		this.heIsAttac = false;
		this.speed = 5;//скорость
	}
	// Описание объекта Врага
	function Enemy() {
		this.srcX = 250+gameWidth;//отступы
		this.srcY = 280;
		this.drawX = 0;
		this.drawX = 0;
		this.type = "";
		this.kill = false;
		this.width = 220; //размеры
		this.height = 220;
		this.speed = 2;//скорость
		this.run = true;
		this.attack = false;
		this.death = false;
	}
	//функция спавна героев(принимает кол-во)
	function spawnEnemy(count){
		for (var i = 0; i < count; i++) {
			var randEnemy = nameEnemy[Math.floor(Math.random() * nameEnemy.length)];
			enemy[i] = new Enemy();
			if(i>0){
				enemy[i].srcX =enemy[i-1].srcX + 70 + getRandom(20,100);
			}
			enemy[i].type = randEnemy;
		}
	}
	//функция рисования игрока и врагов
	function draw() {
		player.draw();
		clearCtxE();
		for (var i = 0; i < enemy.length; i++) {
			enemy[i].draw();
		}
	}
	//функция изменения состояния врагов и игрока
	function update() {
		updateStats();
		for (var i = 0; i < enemy.length; i++) {
			if(!enemy[i].kill){
				enemy[i].update();
			}else{
				enemy[i].run = false;
				enemy[i].attack = false;
			}
			

		}
		player.update();
		//определям действия на нажатия кнопок
		window.onkeyup = function (k) {
			switch(k.which){
				case 68:
				player.idle = true;
				player.walk = player.isLeft = player.isRight = false;
				break;
				case 53:
				isPlaying = false;
				break;
				case 65:
				player.idle = true;
				player.walk = player.isLeft = player.isRight = false;
				break;
				case K_A:
				if(player.heIsAttac){
					player.attack = true;
				}
				break;
			}
		}
		//определям действия на нажатия кнопок
		window.onkeypress = function (k) {
			player.attack = false;
			if(!player.death){
				switch (k.which) {
					case K_L:
						$('.screen-game').css('background-position', backgroundPos+'px');
						backgroundPos+=changeBackgroundPos;
						player.isLeft = true;
						player.idle = false;
						player.goLeft();
						break;

					case K_R:
						$('.screen-game').css('background-position', backgroundPos+'px');
						backgroundPos-=changeBackgroundPos;
						player.idle = false;
						player.isRight = true;
						player.goRight();
						break;
					case K_A:
						player.attack1();
						break;
				}
			}else{
				player.idle = false;
				player.walk = false;
			}
		}
	}
	// определяем как будет ходить игрок, а именно направо
	Player.prototype.goRight = function () {
		this.walk = true;
		if(this.srcX> gameWidth-this.width){
			this.srcX = this.srcX;
		}
		else{
			this.srcX +=this.speed;
		}
		this.idle = false;
	}
	// определяем как будет атаковать игрок
	Player.prototype.attack1 = function () {
		
		if(mana>=15) {
			this.attack = true;
			this.attackFirts = true;
			this.idle = this.walk = false;
		}
	}
	// определяем как будет ходить игрок, а именно налево
	Player.prototype.goLeft = function () {
		this.walk = true;
		this.idle = false;
		if(this.srcX< 1){
			this.srcX = this.srcX;
		}
		else{
			this.srcX -=this.speed;
		}
	}
	// отрисовка игрока
	Player.prototype.draw = function () {
		clearCtxP();
		if(this.idle ){
			x = x<6 ? x + 1 : 1;
			ctxP.drawImage(idle[x],this.srcX,this.srcY,this.width,this.height);
		}
		if(this.walk && !this.idle){
			x = x<13 ? x + 1 : 1;
			ctxP.drawImage(walk[x],this.srcX,this.srcY,this.width,this.height);
		}
		if(this.death){
			this.idle = false;
			x = x<19 ? x + 1 : 1;
			if(isInteger(x))
				ctxP.drawImage(death[x],this.srcX,this.srcY,this.width,this.height);
			
			if(x==19) stopLoop();
		}
		if(this.attack){
			this.heIsAttac = true;
			x = x<25 ? x + 1 : 1;
			//this.idle = false;
				ctxP.drawImage(attack[x],this.srcX,this.srcY,this.width,this.height);
	
			if(x>24) {
				this.heIsAttac = false;
				mana = mana-15;
				this.attack = false;
				this.idle = true;
			}
		}
	}
	//изменения состояния игрока, а именно стрельба
	Player.prototype.update = function () {
			if(enemy[0] && this.attackFirts){
				if((enemy[0].srcX + enemy[0].width>= + this.srcX + this.width) && this.attack && this.attackFirts){
					enemy[0].run = false;
					enemy[0].death = true;
					enemy[0].attack = false;
					this.attackFirts = false;
				}
		}
	}
	// отрисовка врага
	Enemy.prototype.draw = function () {
		//ctxE.setTransform(-1,0,0,1,enemyId.width,0);
		if(this.run ){
			y = y<11 ? y + 1 : 1;
			ctxE.drawImage(run[this.type][y],this.srcX,this.srcY,this.width,this.height);
		}
		if(this.death){
			if(this.type =="flyingshit"){
				y = y<12 ? y + 1 : 1;
				ctxE.drawImage(enemyDie[this.type][y],this.srcX,this.srcY,this.width,this.height);
				if(y==12) {
					this.destroy();
					murder++;
				}
			}else if(this.type =="cyborg"){
				a = a<3 ? a + 1 : 1;
				ctxE.drawImage(enemyDie[this.type][a],this.srcX,this.srcY,this.width,this.height);
				if(a==3) {
					this.destroy();
					murder++;
				}
			}

		}
		if(this.attack){
			if(this.type =="flyingshit"){
				y = y<24 ? y + 1 : 1;
				ctxE.drawImage(enemyAttack[this.type][y],this.srcX,this.srcY,this.width,this.height);
				if(y >= 24){
					health = health<1 ? 0: health-2;
				}
			}else if(this.type =="cyborg"){
				a = a<6 ? a + 1 : 1;
				ctxE.drawImage(enemyAttack[this.type][a],this.srcX,this.srcY,this.width,this.height);
				if(a >= 6){
					health = health<1 ? 0: health-2;
				}
			}
		}
	}
	// изменения врага(а именно)
	Enemy.prototype.update = function () {
		for (var i = 0; i < enemy.length; i++) {
		if(!enemy[i].attack){
			if(player.walk && player.isLeft){
				enemy[i].srcX -=(enemy[i].speed/2)/2;
			}else{
				enemy[i].srcX -=(enemy[i].speed+enemy[i].speed)/spawnAmount;
			}
		}else if (player.walk && player.isLeft){
			enemy[i].srcX +=(enemy[i].speed+enemy[i].speed);
		}
		if(player.srcX> enemy[i].srcX-100){
			enemy[i].run = false;
			enemy[i].attack = true;
		}else{
			enemy[i].run = true;
			enemy[i].attack = false;
		}
	}
	}
	//уничтожает врага при его убийстве
	Enemy.prototype.destroy = function(){
		enemy.splice(enemy.indexOf(this),1);
	}
	//очищает наш холст игрока
	function clearCtxP() {
		ctxP.clearRect(0,0,gameWidth,gameHeight);
	}
	//очищает наш холст врага
	function clearCtxE() {	
		ctxE.clearRect(0,0,gameWidth,gameHeight);
	}
	//функция рандома
	function getRandom(min, max)
	{
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	})