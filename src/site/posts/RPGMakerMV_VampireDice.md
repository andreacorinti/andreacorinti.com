---
title: "RPG Maker MV Vampire Dice" 
subtitle: D10 Storyteller in a JRPG? Why not!
immagine: /images/yaml.png
sommario: "Now, as you may have noticed, I'm developing my site in a strange mix between Italian and English pages..."
date: 2020-03-20
---

In this days I've been experimenting with **RPG Maker MV** since I've only recently found out that is based on **JavaScript** and no longer Ruby like back in the days.

## Vampire the Masquerade

VtM is my favorite Pen & Paper RPG by far (and boasts two of the best CRPG adaptaption ever: _Redemption_ and _Bloodlines_) and, even if the [old Storyteller D10 System had a lot of issues](https://forum.rpg.net/index.php?threads/exalted-why-do-people-say-its-the-storyteller-system-thats-the-problem.594575/), I'm still fond with it.

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
 * $gameMessage.add("Your rolls: " + tiri + " and your successes: " + successi);
 * tiri = [];
 * successi = 0;
 * //
 * 
 * don't forget to resetting the variables (see the last two lines above)
 * 
 * == USING PARAMETRES ==
 * 
 * Using 
 * 
 * vampireDice ($gameActors.actor(1).param[7], 6)
 *  
 * you'll get a number of dice rolls equivalent to first character's agility value, 
 * with a difficulty of six.
 * 
 * == USING IF ==
 * 
 *  if (successi == 0) {
 *      $gameMessage.add("Combattimento casuale");
 *  } else if (successi == 1) {
 *      $gameMessage.add("Riesci a nutrirti un pochino");
 *  } else if (successi == 2) {
 *      $gameMessage.add("Riesci a nutrirti a metà");
 *  } else {
 *      $gameMessage.add("I punti sangue tornano al massimo!");
 *  }
 * 
 * 
 */

let successi = 0;
let tiri = [];

function vampireDice (dadi, diff) {

    for (i=0; i < dadi; i++) {
        let tiro = Math.ceil(Math.random()*10);
        tiri.push(tiro);
        if (tiro >= diff) {
            successi++;
        }

    }

    return "Hai fatto questi tiri: " + tiri + " e totalizzato " + successi + " successi.";

};

//console.log(vampireDice(3,6));
```