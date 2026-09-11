---
layout: posteng
title: "Morrowind with the Total Overhaul Mod List, on Linux Mint"
subtitle: "Scattered notes on the automatic install via OpenMW + umo"
sommario: "A short guide on how I installed the \"Total Overhaul\" mod list from modding-openmw.com on Linux Mint, with the Steam version of Morrowind, the issues I ran into with the AppImages, and a few final tips on post processing."
immagine: /img/openMW/screenshot001.jpg
date: 2026-09-11
lang: en-US
translation: /posts/morrowind-total-overhaul/
---

_This article was first published in Italian on September 11, 2026._

Since last August the wonderful [Tamriel Rebuilt](https://www.tamriel-rebuilt.org/) project released [_Poison Song_](https://www.tamriel-rebuilt.org/content/poison-song-released), I fell for it again, hopelessly:

every so often the sudden urge to go back to Vvardenfell hits me, and this time, for convenience, I wanted to try the **"Total Overhaul"** mod list from [modding-openmw.com](https://modding-openmw.com/), the heaviest tier of their guide (graphics, gameplay, UI, everything on top of OpenMW).

The nice thing is that modding-openmw.com has a [dedicated automatic guide for Linux](https://modding-openmw.com/guides/auto/total-overhaul/linux#install-openmw), not a homemade adaptation of a guide meant for Windows:

the heavy lifting is done by two command-line tools, **umo** (downloads and syncs the mod list from Nexus) and **MOMW Configurator** (generates the load order, merges the plugins, builds the navmesh). In theory four commands are enough. In practice I still hit a few snags, noted below.

Starting setup: Linux Mint, **Steam** version of Morrowind, no Wine or Lutris used to install the game itself since OpenMW is already native on Linux.

![Modded starry sky in Morrowind, seen at night](/img/openMW/screenshot012.jpg)

(Linux Mint is a derivative of Ubuntu, and therefore Debian, so everything should work the same way on all related distros)

### 1. OpenMW: AppImage, not Flatpak

The guide explicitly recommends downloading the latest stable version via the official tarball or AppImage (engine, launcher, INI Importer, Navmeshtool), avoiding the Flatpak version.

Of course, _I had the Flatpak installed_ from a previous attempt, so I had to remove it before downloading the AppImages into:

```bash
~/Scaricati/Giochi/Morrowind/OpenMW_AppImages_0.51.0/
```

### 2. The first snag: files "wrong" according to umo

![Being a bully to an Indoril](/img/openMW/screenshot009.jpg)

When pointing umo/MOMW Configurator to the individual executables, for example:

```bash
openmw-iniimporter
openmw-navmeshtool
```

the tool refused to recognize them, giving an error like:

```bash
the given file does not seem to be an actual file
```

My first suspicion (a leftover from the old Flatpak install) was wrong. The real causes were two, trivial but not obvious:

- the browser had downloaded the files **without an extension** at the end of the name:

  ```bash
  .AppImage
  ```

  so they had to be renamed by hand before running:

  ```bash
  chmod +x *.AppImage
  ```

- while pasting the path, a Windows-style backslash had slipped in:

  ```bash
  \
  ```

  instead of the Linux slash:

  ```bash
  /
  ```

  which of course the terminal doesn't digest

Once these two details were fixed, the tools started recognizing the executables without any issue.

### 3. Mod folder and downloading with umo

For the base mod folder path, both tools want the "container" folder, not the folder for the specific list: so if I create:

```bash
~/Scaricati/Giochi/Morrowind/OpenMWMods/
```

they'll take care of creating the subfolder inside:

```bash
total-overhaul/
```

it shouldn't be pointed to by hand.

After logging into Nexus Mods with:

```bash
./umo setup
```

the actual download starts with:

```bash
./umo install --sync total-overhaul
```

Without Nexus Premium you have to manually click "Slow Download" in the browser for every mod that pops up, and it's normal for the process to occasionally stall with a string of errors like:

```bash
(42, 'Callback aborted')
```

Just interrupt with Ctrl+C and relaunch the same command: it resumes from where it stopped without re-downloading what's already there.

Since the mod pack includes a fair number of heavyweight downloads, I took the free trial of Nexus Premium to speed things up (immediately cancelled afterward, since apart from Morrowind, these days I mostly use it for _Daggerfall Unity_, which generally has lightweight mods)

### 4. Configuration: MOMW Configurator

With all the mods downloaded, generating the load order is a single command, launched from the MOMW Tools Pack folder:

```bash
./momw-configurator-linux-amd64 config --verbose --run-navmeshtool --run-validator total-overhaul
```

During the run a bunch of Delta Plugin warnings show up, like:

```bash
Records of type: "LUAL" are not yet supported and will be skipped
```

...but they're normal (they concern recent Lua features that the merge tool simply skips).

### 5. The launcher shows unchecked mods: that's normal

Once configuration is done, OpenMW's graphical launcher shows quite a few unchecked entries and some exclamation marks in the Content Files tab.

It looks broken, but it isn't: in this scenario OpenMW doesn't read the launcher's checkboxes, it reads directly from:

```bash
openmw.cfg
```

where MOMW Configurator has already written the correct lines:

```bash
data=
content=
```

(including optional patches and mutually exclusive plugins deliberately left out).

The launcher simply shows everything that's in the mod folder managed by umo, whether or not it's active in the:

```bash
.cfg
```

If you're ever unsure whether something went wrong, you can safely relaunch the same command:

```bash
momw-configurator
```

and it rewrites the configuration from scratch.

### 6. Problem: the night is _too_ dark!

A fairly well-known design choice of heavily modded Morrowind: at night you can barely see anything, as in the screenshot below (I think it's True Nights?)

![Dark alley in Old Ebonheart at night, nearly unreadable without adjusting exposure](/img/openMW/screenshot007.jpg)

No script is needed to fix this, the Total Overhaul list already comes with OpenMW's post processing shaders:

- in game, press **F2** to open the post-processing panel
- move the **adjustments** entry (HDR/adaption) from the left column to the right one to activate it
- from there, the exposure sliders let you brighten the night hours a bit without upending the rest of the visuals

it's a bit of a tricky call because dark nights build immersion and make torches or spells much more relevant, but for the sake of convenience I recommend bumping up the exposure and not losing your mind over it.

All in all, aside from the two AppImage quirks and Nexus's slowness, the process turned out to be progressively simpler than I feared:

credit goes mostly to umo and MOMW Configurator, which take care of the load order and the merges themselves!

![A stroll on Red Mountain](/img/openMW/screenshot013.jpg)
