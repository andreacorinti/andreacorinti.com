---
title: "RPG Maker MV Vampire Dice" 
subtitle: D10 Storyteller in a JRPG? Why not!
immagine: https://cf.geekdo-images.com/thumb/img/cuDjrsSQcc4RAqv2472v6Ajgo54=/fit-in/200x150/pic1259009.png
sommario: "In this days I've been experimenting with RPG Maker MV since I've only recently found out that is based on JavaScript and no longer Ruby like back in the RPG Maker XP days."
date: 2020-03-13
---

In this days I've been experimenting with **RPG Maker MV** since I've only recently found out that is based on **JavaScript** and no longer Ruby like back in the RPG Maker XP days.

## Vampire the Masquerade

VtM is my favorite Pen & Paper RPG by _far_ (and boasts two of the best CRPG adaptaption ever: _Redemption_ and _Bloodlines_) and, even if the [old Storyteller D10 System had a lot of issues](https://forum.rpg.net/index.php?threads/exalted-why-do-people-say-its-the-storyteller-system-thats-the-problem.594575/), I'm still fond of it.

If you're not familiar with the system, [you can read pretty much everything here](https://whitewolf.fandom.com/wiki/Storyteller_System) or in any World of Darkness core manual.

So, in order to try out the tool and learn something in the middle, I've started this weird implementation for a little experimental project.

## A D10 Dice Roller in RPG Maker MV

Bear in mind that I've yet to study the MV engine properly, so it's all pretty raw and ugly.

```javascript
//=============================================================================
// vampireDice.js 0.5
//=============================================================================

/*:
 * @plugindesc D10 Dice system based on White Wolf Pen & Paper RPG 
 * @author Andrea Corinti
 *
 * @help To call the dice roll, copy&paste the following in a script event:
 * 
 * == BASIC USAGE ==
 * 
 * //
 * vampireDice (number or rolls, difficulty)
 * $gameMessage.add("Your rolls: " + rolls + " and your successes: " + success);
 * rolls = [];
 * success = 0;
 * //
 * 
 * don't forget to resetting the variables (see the last two lines above)
 * 
 * == USING PARAMETRES ==
 * 
 * With 
 * 
 * vampireDice ($gameActors.actor(1).agi, 6)
 *  
 * You'll get a number of dice rolls equivalent to first character's agility value, 
 * with a difficulty of six.
 * 
 * == USING IF ==
 * 
 *  if (success == 0) {
 *      $gameMessage.add("You where discovered by your victim and must fight!");
 *  } else if (success == 1) {
 *      $gameMessage.add("You managed to feed a little");
 *  } else if (success == 2) {
 *      $gameMessage.add("You managed to feed");
 *  } else {
 *      $gameMessage.add("Your blood lust is satisfied.");
 *  }
 * 
 * 
 */

let success = 0;
let rolls = [];

function vampireDice (pool, diff) {

    for (i=0; i < pool; i++) {
        let roll = Math.ceil(Math.random()*10);
        rolls.push(roll);
        if (roll >= diff) {
            success++;
        }

    }

    return "You've done this rolls: " + rolls + " with " + success + " successes.";

};

//console.log(vampireDice(3,6));
```