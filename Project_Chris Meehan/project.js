//Script file for project
//list of global variables
var health = 20;
var maxhealth = 20;
var checkhealth = new Boolean(true);
var name = "";
var danger = 0;
var maxdanger = 100;
var weapons = ["Pipe Wrench", "Baseball Bat", "Pistol", "AR-15"];
var weapondamage = [1, 3, 2, 4];
var weapon = "";
var weaponname = "";
var damage = 1;
var turn = 0;
var namecheck = new Boolean(false);
var wepcheck = new Boolean(false);
var pipe = weapons[0];
var bat = weapons[1];
var gun = weapons[2];
var ar = weapons[3];
var enemypre = ["Crack", "Meth", "Heroin", "Weed"];
var enemysuf = ["Addict", "Dealer"];
var prefix = "";
var suffix = "";
var suf = "";
var enname = "";
var enemyhealth = 0;
var emh = 0;
var enemydamage = 0;
var checkenemy = new Boolean(false);
var f = 0;
var contbut = "";
var gotaway = new Boolean(false);
var kills = 0;
var makeclock = new Boolean(false);

//script for the intro page
function intro() {
	document.getElementById("weapon1").innerHTML = weapons[0];
	document.getElementById("weapon2").innerHTML = weapons[1];
	document.getElementById("weapon3").innerHTML = weapons[2];
	document.getElementById("weapon4").innerHTML = weapons[3];

	document.getElementById("namebtn").addEventListener('click', username);
	document.getElementById("wrench").addEventListener('click', wocc);
	document.getElementById("bat").addEventListener('click', wocc);
	document.getElementById("gun").addEventListener('click', wocc);
	document.getElementById("biggun").addEventListener('click', wocc);
	document.getElementById("submit").addEventListener('click', verify);
}

//checks to see if a name has been entered
function username(event) {
	name = document.getElementById("name").value;
	document.getElementById("plrname").innerHTML = name;
	
	if (name != "" && name != " " && name != null) {
		namecheck = true;
		console.log(namecheck);
	}
}

//checks to see if a weapon is chosen
function wocc(event) {
	weapon = document.getElementById(event.target.id).value;
	document.getElementById("plrwpn").innerHTML = weapon;
	if (weapon != "" && weapon != " " && weapon != null) {
		wepcheck = true;
		console.log(wepcheck);
	}
	console.log(weapon);
}

//checks to see if there is both a name and a weapon chosen
function verify(event) {
	
	if (namecheck != true && wepcheck != false) {
		document.getElementById("resub").innerHTML = "Please enter a name";
	}
	else if (namecheck != false && wepcheck != true) {
		document.getElementById("resub").innerHTML = "Please choose a weapon";
	}
	else if (namecheck != true && wepcheck !=true) {
		document.getElementById("resub").innerHTML = "Please enter a name and choose a weapon";
	}
	else {
		 game()
	}
}

//script for the game page
function game() {
	document.getElementById("main").innerHTML = "<div id='clock'></div><div class='meters'><span id='hpdisplay'>&nbsp;</span><br/><span id='ddisplay'>&nbsp;</span><br/><span id='namedisplay'>&nbsp;</span><br/><span id='weaponchoice'>&nbsp;</span></div><div class='enmeters'><span id='ehdisplay'>&nbsp;</span><br/><span id='endisplay'>&nbsp;</span><br/></div><br/><br/><br/><div id='fightlog' class='log'><p id='encounter'>This is where a random encounter will go<p></div><br/><span id='hnt'>&nbsp;</span><br/><br/><div id='cont'></div><br/><hr/><br/><input class='choices' type='button' value='Attack with weapon' id='wepatk'/><br/><input class='choices' type='button' value='Attack with fists' id='stdatk'/><br/><input class='choices' type='button' value='Inspect' id='inspect'/><br/><input class='choices' type='button' value='Run Away' id='run'/><br/><input class='choices' type='button' value='Walk Past' id='walk'/><br/><br/><br/><input class='choices' type='button' value='Hint' id='hint'/><br/><br/><br/>";
	document.getElementById("weaponchoice").innerHTML = "Weapon: " + weapon;
	document.getElementById("hpdisplay").innerHTML = "Health: " + health + "/" + maxhealth;
	document.getElementById("ddisplay").innerHTML = "Danger: " + danger + "/" + maxdanger;
	document.getElementById("namedisplay").innerHTML = "Name: " + name;
	if (f == 0) {
		document.getElementById("encounter").innerHTML = "You find yourself alone in the city at night. Your car has broken down and you must journey home on foot. You're armed with nothing but your trusty " + weapon + " and the need to survive.";
	} else if (f== 1) {
		document.getElementById("encounter").innerHTML = "You continue along, moving through the streets with your " + weapon + " held tight in your hands. This is not how you wanted your day to go.";
	}else {
		document.getElementById("encounter").innerHTML = "Your adrenaline is rushing and your hands are starting to shake. But you look at your " + weapon + " and renew your tenacity. You will make it home tonight.";
	}
	contbut = document.createElement("input");
	contbut.setAttribute("value", "Continue");
	contbut.setAttribute("type", "button");
	contbut.setAttribute("id", "contin");
	document.querySelector("#cont").appendChild(contbut);
	var continuebutton = document.getElementById("contin")
	continuebutton.addEventListener("click", encounters);
	var wpatk = document.getElementById('wepatk');
	wpatk.addEventListener("click", weaponattack);
	var atk = document.getElementById("stdatk");
	atk.addEventListener("click", attack);
	console.log(checkenemy);
	var inspct = document.getElementById("inspect");
	inspct.addEventListener("click", inspectenemy);
	var escpe = document.getElementById("run");
	escpe.addEventListener("click", runaway);
	var wlk = document.getElementById("walk");
	wlk.addEventListener("click", walkpast);
	var hint = document.getElementById("hint");
	hint.addEventListener("mousedown", hints);
	hint.addEventListener("mouseup", nohint);
	var makeclock = true;
	if (makeclock == true) {
		clocktime();
	}
	turn = 0;
	
}

//script for the encounters	
function encounters() {
	do {
		engagement();
		return;
	}
	while (f < 3)
}

//script for turns
function turns() {
	var turns = "";
	var t = 0
	if (turn % 2 == 0) {
		turns = document.getElementsByClassName("choices");
		for(t = 0; t < turns.length; t++) {
			var myturn = turns[t];
			myturn.removeAttribute("disabled");
		}
	}
	else{
		turns = document.getElementsByClassName("choices");
		while(t < turns.length) { 
			var eturn = turns[t];
			eturn.setAttribute("disabled", "true");
			t++;
		}
		setTimeout(enemyturn, 2500);
	}
	checkdead();
	checkenemydead();
}

function enemyturn() {
	if (checkenemy == true && turn % 2 != 0){
		switch (suf) {
			case "Addict":
				enemydamage = 1;
				break;
			case "Dealer":
				enemydamage = 2;
				break;
		}
		health = health - enemydamage;
		document.getElementById("hpdisplay").innerHTML = "Health: " + health + "/" + maxhealth;
		var enatk = document.createElement("p");
		enatk.textContent = "The " + enname + " attacks you. It does " + enemydamage + " damage.";
		document.querySelector("#fightlog").appendChild(enatk);
		document.querySelector("#fightlog").scrollTo(0,10000);
		turn++;
		console.log(turn);
		turns();
	}
}

//script for weapon attack
function weaponattack(event) {
	if (checkenemy == true) {
		switch (weapon) {
			case "Pipe Wrench":
				enemyhealth = enemyhealth - (damage + weapondamage[0]);
				document.getElementById("ehdisplay").innerHTML = "Enemy Health: " + enemyhealth + "/" + emh;
				danger = danger + 5;
				document.getElementById("ddisplay").innerHTML = "Danger: " + danger + "/" + maxdanger;
				var myatk = document.createElement("p");
				myatk.textContent = "You attack the " + enname + " with your " + weapon + ". It does " + (damage + weapondamage[0]) + " damage.";
				document.querySelector("#fightlog").appendChild(myatk);
				document.querySelector("#fightlog").scrollTo(0,10000);
				break;
			case "Baseball Bat":
				enemyhealth = enemyhealth - (damage + weapondamage[1]);
				document.getElementById("ehdisplay").innerHTML = "Enemy Health: " + enemyhealth + "/" + emh;
				danger = danger + 15;
				document.getElementById("ddisplay").innerHTML = "Danger: " + danger + "/" + maxdanger;
				var myatk = document.createElement("p");
				myatk.textContent = "You attack the " + enname + " with your " + weapon + ". It does " + (damage + weapondamage[1]) + " damage.";
				document.querySelector("#fightlog").appendChild(myatk);
				document.querySelector("#fightlog").scrollTo(0,10000);
				break;
			case "Pistol":
				enemyhealth = enemyhealth - (damage + weapondamage[2]);
				document.getElementById("ehdisplay").innerHTML = "Enemy Health: " + enemyhealth + "/" + emh;
				danger = danger + 10;
				document.getElementById("ddisplay").innerHTML = "Danger: " + danger + "/" + maxdanger;
				var myatk = document.createElement("p");
				myatk.textContent = "You attack the " + enname + " with your " + weapon + ". It does " + (damage + weapondamage[2]) + " damage.";
				document.querySelector("#fightlog").appendChild(myatk);
				document.querySelector("#fightlog").scrollTo(0,10000);
				break;
			case "AR-15":
				enemyhealth = enemyhealth - (damage + weapondamage[3]);
				document.getElementById("ehdisplay").innerHTML = "Enemy Health: " + enemyhealth + "/" + emh;
				danger = danger + 20;
				document.getElementById("ddisplay").innerHTML = "Danger: " + danger + "/" + maxdanger;
				var myatk = document.createElement("p");
				myatk.textContent = "You attack the " + enname + " with your " + weapon + ". It does " + (damage + weapondamage[3]) + " damage.";
				document.querySelector("#fightlog").appendChild(myatk);
				document.querySelector("#fightlog").scrollTo(0,10000);
				break;
		}
		turn++;
		console.log(turn);
		turns();
		
	} else {
		document.getElementById("hnt").innerHTML = "There is nothing to attack.";
		setTimeout(nohint, 1000);
	}
}

//script for fist attack
function attack(event) {
	if (checkenemy == true) {
		enemyhealth = enemyhealth - (damage);
		document.getElementById("ehdisplay").innerHTML = "Enemy Health: " + enemyhealth + "/" + emh;
		var myatk = document.createElement("p");
		myatk.textContent = "You attack the " + enname + " with your fists. It does " + damage + " damage.";
		document.querySelector("#fightlog").appendChild(myatk);
		document.querySelector("#fightlog").scrollTo(0,10000);
		turn++;
		console.log(turn);
		turns();
	} else {
		document.getElementById("hnt").innerHTML = "There is nothing to attack.";
		setTimeout(nohint, 1500);
	}
}

//script for inspect
function inspectenemy(event) {
	if (checkenemy == true) {
		var insp = document.createElement("p");
		if (enemyhealth > 1) {
			if (suf == "Addict") {
				insp.textContent = "It's a " + enname + ". Due to their addiction, they've become erratic and aggressive. They will attack you if you cross them.";
			} else {
				insp.textContent = "It's a " + enname + ". More dangerous and responsive than an addict. They will not go down easy.";
			}
		} else {
			insp.textContent = "The " + enname + " is weak from your attacks and can barely stand.";
		}
		document.querySelector("#fightlog").appendChild(insp);
		document.querySelector("#fightlog").scrollTo(0,10000);
	} else {
		document.getElementById("hnt").innerHTML = "There's nothing to inspect.";
		setTimeout(nohint, 1500);
	}
}

//script for run away
function runaway(event) {
	if (checkenemy == true) {
		var runchance = Math.floor(Math.random() * 100) + 1;
		if (runchance <= (100 - (enemyhealth * 10))) {
			gotaway = true;
			victory();
		} else {
			switch (suf) {
			case "Addict":
				enemydamage = 1;
				break;
			case "Dealer":
				enemydamage = 2;
				break;
			}
			health = health - enemydamage;
			document.getElementById("hpdisplay").innerHTML = "Health: " + health + "/" + maxhealth;
			var enatk = document.createElement("p");
			enatk.textContent = "You try to get away, but the " + enname + " chases you down and attacks you. It does " + enemydamage + " damage.";
			document.querySelector("#fightlog").appendChild(enatk);
			document.querySelector("#fightlog").scrollTo(0,10000);
			turn++;
			turn++;
			console.log(turn);
			turns();
		}
	console.log(runchance);
	} else {
		document.getElementById("hnt").innerHTML = "There's nothing to run away from.";
		setTimeout(nohint, 1000);
	}
}

//script for walk past
function walkpast(event) {
	gotaway = false;
	if (checkenemy == true) {
		if (enemyhealth > 1) {
			switch (suf) {
			case "Addict":
				enemydamage = 1;
				break;
			case "Dealer":
				enemydamage = 2;
				break;
			}
			health = health - enemydamage;
			document.getElementById("hpdisplay").innerHTML = "Health: " + health + "/" + maxhealth;
			var enatk = document.createElement("p");
			enatk.textContent = "You try to walk past the " + enname + ", but instead they attack you. It does " + enemydamage + " damage.";
			document.querySelector("#fightlog").appendChild(enatk);
			document.querySelector("#fightlog").scrollTo(0,10000);
			turn++;
			turn++;
			console.log(turn);
			turns();
		} else {
			victory();
		}
	} else {
		document.getElementById("hnt").innerHTML = "There's nothing to walk past.";
		setTimeout(nohint, 1000);
	}
}

//hint funtions
function hints() {
	var rdmhint = Math.floor(Math.random() * 5) + 1;
	if (rdmhint == 1) {
		document.getElementById("hnt").innerHTML = "Attacking with your weapon will increase your Danger level.";
	} else if (rdmhint == 2) {
		document.getElementById("hnt").innerHTML = "Attacking with your fists may do less damage, but it won't increase your Danger level.";
	} else if (rdmhint == 3) {
		document.getElementById("hnt").innerHTML = "The lower the enemy's health, the better chances you have of successfully running away.";
	} else if (rdmhint == 4) {
		document.getElementById("hnt").innerHTML = "Keep an eye on that Danger meter! If your Danger level hits the max, you'll get arrested.";
	} else {
		document.getElementById("hnt").innerHTML = "Once the enemy's health reaches a certain point, you may have the opportunity to walk past your enemy.";
	} 
	return rdmhint;
}
function nohint() {
	document.getElementById("hnt").innerHTML = "";
}
//enemy stuff
function enemy() {
	checkenemy = true;
	console.log(checkenemy);
	var prefix = enemypre[Math.floor(Math.random() * 4)];
	var suff = Math.floor(Math.random() * 100) + 1;
	if (suff > 25) {
		var suffix = enemysuf[0];
		enemyhealth = 10;
		emh = 10;
		suf = "Addict";
		document.getElementById("ehdisplay").innerHTML = "Enemy Health: " + enemyhealth + "/" + emh;
	}
	else {
		var suffix = enemysuf[1];
		enemyhealth = 15;
		emh = 15;
		suf = "Dealer";
		document.getElementById("ehdisplay").innerHTML = "Enemy Health: " + enemyhealth + "/" + emh;
	}
	enname = prefix + " " + suffix;
	return enname;
}

//Script to put in a clock cause why not
function clocktime() {
    var today = new Date();
    var sec = today.getSeconds();
	var min = today.getMinutes();
	var hour = today.getHours();
    sec = checkTime(sec);
	min = checkTime(min);
    document.getElementById('clock').innerHTML = hour + ":" + min + ":" + sec;
    var t = setTimeout(clocktime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

//script encounter functions
function engagement() {
	document.getElementById("encounter").innerHTML = "You come across a " + enemy() + " in your path. What will you do?";
	document.getElementById("endisplay").innerHTML = "Enemy: " + enname;
	document.querySelector("#contin").remove(contbut);
	turn = 0;
	turns();
	console.log(turn);
	console.log(f);
	}
	
//script for checking dead
function checkdead() {
	if (health < 1) {
		checkenemy = false;
		checkhealth = false;
		var youlose = document.createElement("p");
		youlose.textContent = "You died. Game Over";
		document.querySelector("#fightlog").appendChild(youlose);
		document.querySelector("#fightlog").scrollTo(0,10000);
		var turns = document.getElementsByClassName("choices");
		var t = 0
		 do { 
			var eturn = turns[t];
			eturn.setAttribute("disabled", "true");
			t++;
		}
		while(t < turns.length);
		var resit = document.createElement("input");
			resit.setAttribute("value", "Reset");
			resit.setAttribute("type", "button");
			resit.setAttribute("id", "rset");
			document.querySelector("#cont").appendChild(resit);
			document.getElementById("rset").addEventListener('click', resetgame);
	}
	if (danger >= 100) {
		checkenemy = false;
		var youlose = document.createElement("p");
		youlose.textContent = "Your Danger level got too high. You were arrested. Game Over";
		document.querySelector("#fightlog").appendChild(youlose);
		document.querySelector("#fightlog").scrollTo(0,10000);
		var turns = document.getElementsByClassName("choices");
		var t = 0
		while(t < turns.length) { 
			var eturn = turns[t];
			eturn.setAttribute("disabled", "true");
			t++;
		}
		var resit = document.createElement("input");
			resit.setAttribute("value", "Reset");
			resit.setAttribute("type", "button");
			resit.setAttribute("id", "rset");
			document.querySelector("#cont").appendChild(resit);
			document.getElementById("rset").addEventListener('click', resetgame);
	}
}

function checkenemydead() {
	if (enemyhealth < 1){
		checkenemy = false;
		kills++
		console.log(kills);
		victory();
	}
}

//script for winning
function victory() {
		f++;
	if (health > 0 && danger < 100) {
		if (enemyhealth <= 0) {
			var youwin = document.createElement("p");
			if (f < 3) {
				youwin.textContent = "Congratulations! You've just committed murder! Click the continue button to proceed.";
			} else {
				if (kills <= 2) {
					youwin.textContent = "Great work! You've managed to get the end with only killing one or two people.";
				} else{
					youwin.textContent = "Great job! Now you're a serial killer! I hope you're happy with yourself.";
				}
			}
		} else if (gotaway == true) {
			checkenemy = false;
			var youwin = document.createElement("p");
			var gtwy = document.createElement("p");
			if (f < 3) {
				youwin.textContent = "Good job! You've managed to escape your opponent without them chasing you down. Click the continue button to proceed.";
			}
			else {
				if (kills > 0){
					gtwy.textContent = "Good job! You've managed to escape your opponent without them chasing you down.";
					document.querySelector("#fightlog").appendChild(gtwy);
					document.querySelector("#fightlog").scrollTo(0,10000);
					youwin.textContent = "Great work! You've managed to get the end with only killing one or two people.";
				} else {
					gtwy.textContent = "Good job! You've managed to escape your opponent without them chasing you down.";
					document.querySelector("#fightlog").appendChild(gtwy);
					document.querySelector("#fightlog").scrollTo(0,10000);
					youwin.textContent = "Amazing! You managed to make it to the end without killing anyone!";
				}
			}
		} else {
			checkenemy = false;
			var youwin = document.createElement("p");
			var wlkwy = document.createElement("p");
			if (f < 3) {
				youwin.textContent = "Nice! You beat your opponent so bad that they couldn't do anything as you walked right past them. Click the continue button to proceed.";
			} else {
				if (kills > 0){
					wlkwy.textContent = "Nice! You beat your opponent so bad that they couldn't do anything as you walked right past them.";
					document.querySelector("#fightlog").appendChild(wlkwy);
					document.querySelector("#fightlog").scrollTo(0,10000);
					youwin.textContent = "Great work! You've managed to get the end with only killing one or two people.";
				} else {
					youwin.textContent = "Amazing! You managed to make it to the end without killing anyone!";
				}
			}
		}
		document.querySelector("#fightlog").appendChild(youwin);
		document.querySelector("#fightlog").scrollTo(0,10000);
		var turns = document.getElementsByClassName("choices");
		var t = 0
		while(t < turns.length) { 
			var eturn = turns[t];
			eturn.setAttribute("disabled", "true");
			t++;
		}
		var contbut = document.createElement("input");
		if (f < 3) {
			contbut.setAttribute("value", "Continue");
			contbut.setAttribute("type", "button");
			contbut.setAttribute("id", "contin");
			document.querySelector("#cont").appendChild(contbut);
			document.getElementById("contin").addEventListener('click', game);
		} else {
			contbut.setAttribute("value", "End");
			contbut.setAttribute("type", "button");
			contbut.setAttribute("id", "contin");
			document.querySelector("#cont").appendChild(contbut);
			document.getElementById("contin").addEventListener('click', win);
		}
	}
}

//script for the end
function win() {
	document.getElementById("main").innerHTML = "<div id='clock'></div><br/><br/><h1>You Won</h1><br/><br/><p>Great job, " + name + "! You manage to finally make it home. You go inside, lock your door, set down your " + weapon + ", and lay down on your couch until you fall asleep.</p><br/><br/><br/><div id='retry'></div><br/>";
	var playagain = document.createElement("input");
	playagain.setAttribute("value", "Play Again");
	playagain.setAttribute("type", "button");
	playagain.setAttribute("id", "restart");
	document.querySelector("#retry").appendChild(playagain);
	document.getElementById("restart").addEventListener("click", resetgame);
}

//script to reset the game
function resetgame(event) {
	window.location.assign("project.html");
}