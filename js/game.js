$(document).ready(function(){
		
		$('button').click(function(){
			location.reload();
		});
		$('.screen-ranking').hide(4000);
		$('form').submit(function(e){
			e.preventDefault();
		});
		$('#sbmtName').click(function(){
			UserName = $('#sbmtInpt').val();
			if(UserName.length >= 3){
				$('.user-info').text(UserName);
				$('.screen-start').hide(300);
				init();
			}
			else{
				// тут изменяем placeholder на чтото
			}
		});

	const K_L = 97;
	const K_R = 100;
	const K_A = 49;

	var map;
	var ctxMap;

	var gameWidth = 1535;
	var gameHeight = 500;

	var player;
	var enemy = [];

	var isPlaying;
	var health = $('.panel-xp .score-value span').text();
	var mana = 100/*$('.panel-mp .score-value span').text()*/;
	var murder = 0;
	var x;
	var y;
	var backgroundPos = 0;
	var changeBackgroundPos = 6;

	var Timer;
	var _sec = _min = 0;
	var spawnInterval;
	var spawnTime = 4000;
	var spawnAmount = 1;

	var idle =          actionKnight('idle',6);
	var walk =          actionKnight('run',13);
	var death =         actionKnight('death',19);
	var attack =        actionKnight('attak1',25)
	var run =           actionEnemy('cyborg','run',11);
	var greenchAttack = actionEnemy('cyborg','attak',6);
	var greenchDie =    actionEnemy('cyborg','die',4);


	function init() {
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
	function zeroPlus(str,len) {
		str = str.toString();
		return str.length < len ? zeroPlus("0" + str,len) : str;
	}
	function actionKnight(name,count) {
			var mas = new Array();
			for(var i = 1;i<=count;i++){
				mas[i] = new Image;
				mas[i].src = './heroes/netrunner/'+name+'/'+i+'.png';
			}
			return mas;
	}
	function startCreatingEnemy(){
		stopCreatingEnemy();
		spawnInterval = setInterval(function(){
			if(enemy.length == 0){
				spawnEnemy(spawnAmount);
			}
		},spawnTime);
	}
	function stopCreatingEnemy(){
		clearInterval(spawnInterval);
	}
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
			health = +health + 0.04;
		}
	}
	function actionEnemy(who,name,count) {
			var mas = new Array();
			for(var i = 1;i<=count;i++){
				mas[i] = new Image;
				mas[i].src = './heroes/enemies/'+who+'/'+name+'/'+i+'.png';
				console.log(mas[i].src);
			}
			return mas;
	}
	function startLoop() {
		isPlaying = true;
		Timer = setInterval(function(){
			if(_sec == 59){
				_min++;
				_sec = 0;
			}else{
				_sec++;
				$('.timer').text("Time: "+zeroPlus(_min,2)+":"+zeroPlus(_sec,2));
			}
			
		},1000);
		loop();
		startCreatingEnemy();
	}
	function loop() {
		var fps = 40;
		if(isPlaying){
		setTimeout(function() {
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
	function stopLoop() {
		username = $('.user-info').text();
		isPlaying = false;
		$.ajax({
			type: "POST",
			url:'../php/register.php',
			data:'username='+username+'&score='+murder+'&time='+_sec,
			success:function(data){
				data = JSON.parse(data);
				playedNumber = data.length-1;
				playerNow = data[data.length-1];
				data.sort(sortObj);

				if(data.slice(0,11).indexOf(playerNow) == -1){
					data = data.splice(10,data.length-1);
				}
				var tr;
				for (var i = 0; i < data.length; i++) {
					tr = '<tr>';
					tr +="<td>" + ++i + "</td>";
					tr +="<td>" + data[i].username + "</td>";
					tr +="<td>" + data[i].score + "</td>";
					tr +="<td>" + data[i].time + "</td>";
					tr += '</tr>';
					$('#tablea tr:last').after(tr);

				}
				$('.screen-ranking').show("slaw");
			},
			error:function(data){
				console.log('error');
			},
		});
	}
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
		this.death = false;
		this.attack = false;
		this.heIsAttac = false;
		this.speed = 8;//скорость
	}
	function Enemy() {
		this.srcX = 250+gameWidth+Math.floor(-(Math.random()*300)-250);//отступы
		this.srcY = 280;
		this.drawX = 0;
		this.drawX = 0;
		this.width = 220; //размеры
		this.height = 220;
		this.speed = 4;//скорость
		this.run = true;
		this.attack = false;
		this.death = false;
	}
	function spawnEnemy(count){
		for (var i = 0; i < count; i++) {
			enemy[i] = new Enemy();
		}
	}
	function draw() {
		player.draw();
		clearCtxE();
		for (var i = 0; i < enemy.length; i++) {
			enemy[i].draw();
		}
	}
	function update() {
		updateStats();
		for (var i = 0; i < enemy.length; i++) {
			enemy[i].update();

		}
		player.update();
		window.onkeyup = function (k) {
			switch(k.which){
				case 68:
				player.idle = true;
				player.walk = player.isLeft = player.isRight = false;
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
		window.onkeypress = function (k) {
			player.attack = false;
			if(!player.death){
				switch (k.which) {
					case K_L:
						$('.screen-game').css('background-position', backgroundPos+'px');
						backgroundPos+=changeBackgroundPos;
						console.log('1111111111111');
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

	Player.prototype.attack1 = function () {
		
		if(mana>=15) {
			this.attack = true;
			this.idle = this.walk = false;
		}else{
			//this.idle = true;
		}
	}
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
	Player.prototype.update = function () {

		for (var i = 0; i < enemy.length; i++) {
			//console.log('enemy',enemy[i].srcX + enemy[i].width );
			//console.log('night', this.srcX + this.width);
			if((enemy[i].srcX + enemy[i].width>= + this.srcX + this.width) && this.attack){
				enemy[i].death = true;
				enemy[i].run = false;
			}
			//50 чтобы враг заходил за меч
/*				if(enemy[i].srcX + enemy[i].width-80>= gameWidth - this.srcX - this.width){
				console.log('enemy',enemy[i].srcX + enemy[i].width );
				console.log('night',gameWidth - this.srcX - this.width);
				isPlaying = false;
				this.walk = this.idle = false;
				this.death = true;
			}*/
		}

	}
	Enemy.prototype.draw = function () {
		//ctxE.setTransform(-1,0,0,1,enemyId.width,0);
		if(this.run && !this.death){
			y = y<11 ? y + 1 : 1;
			ctxE.drawImage(run[y],this.srcX,this.srcY,this.width,this.height);
		}
		if(this.death){
			y = y<4 ? y + 1 : 1;
			ctxE.drawImage(greenchDie[y],this.srcX,this.srcY,this.width,this.height);
			if(y==4) {
				this.destroy();
				murder++;
			}
		}
		if(this.attack){
			y = y<6 ? y + 1 : 1;
			ctxE.drawImage(greenchAttack[y],this.srcX,this.srcY,this.width,this.height);
			if(y >= 6){
				health = health<1 ? 0: health-2;
			}
		}
	}
	Enemy.prototype.update = function () {
		if(!this.attack){
			this.srcX -=this.speed;
		}
		//console.log('enemy'+this.srcX);
		//console.log('enemy'+player.srcX);
		if(player.srcX> this.srcX-100){
			//console.log('good');
			this.run = false;
			this.attack = true;
		}else{
			this.run = true;
			this.attack = false;
		}
		/*
			if(this.srcX + this.width - 80 >= gameWidth - player.srcX - player.width){
				this.run = false;
				this.attack = true;

			}
			else if((this.srcX + this.width - 30 >= gameWidth - player.srcX - player.width) && player.attack){
				this.run = false;
				this.attack = false;
			}
			else{
				this.srcX -=this.speed;
			}

			if(this.srcX+this.width>1){
			this.destroy();
		}
		*/
	}
	Enemy.prototype.destroy = function(){
		enemy.splice(enemy.indexOf(this),1);
	}
	function drawBg() {
		//ctxMap.drawImage(background,0,0,2000,1000,0,0,gameWidth,gameHeight);
	}
	function clearCtxP() {
		ctxP.clearRect(0,0,gameWidth,gameHeight);
	}
	function clearCtxE() {	
		ctxE.clearRect(0,0,gameWidth,gameHeight);
	}
	})