# [Dmot](../README.md) / Changelog

## Table of Contents
- [Version 2.0](#version-20)
    - [Version 2.0.0](#version-200)
- [Version 1.0](#version-10)
- [Beta](#beta)
    - [Beta.4](#version-beta4)
    - [Beta.3](#version-beta3)
    - [Beta.2](#version-beta2)
    - [Beta.1](#version-beta1)
    - [Beta.0](#version-beta0)
- [Alpha](#alpha)
    - [Alpha.3](#version-alpha3)
    - [Alpha.2](#version-alpha2)
    - [Alpha.1](#version-alpha1)
    - [Alpha.0](#version-alpha0)
- [Prelease](#pre-release)
    - [Creation](#creation)

---

## Version 2.0

Version 2.0 is the revision of the version 1.0 release of Dmot. It was released two years after the shutdown of Dmot.

---

## To Be Determined

### Version `2.0.0`

---

## Version 1.0

Version 1.0 is the full release of Dmot. However, it was never released to the public due to time constraint and the shutdown of Dmot.

---

## Beta

The beta version is the second major release of Dmot. It introduced many new functionalities and features that enhances the user experience.

---

## Version `beta.4`

### July 20, 2020

- Added 5 new commands.
    - dmot: invite
    - dmot: music
    - dmot: support
    - dmot: vote
    - dmot: website
- Replaced placeholders with actual texts for the following commands.
    - dmot: balance
    - dmot: blacklist
    - dmot: cat
    - dmot: command
    - dmot: createinvite
    - dmot: dmotuserinformation
    - dmot: dog
    - dmot: evaluate
    - dmot: event
    - dmot: leaderboard
    - dmot: lockdown
    - dmot: rob
    - dmot: setbalance
    - dmot: setevent
    - dmot: shutdown
    - dmot: version
    - dmot: work
- Minor changes to `dmot: avatar`.
    - Fixed a bug where default avatars crashes the bot.
- Minor changes to `dmot: ban`.
    - Fixed an issue where the ban message could not be sent.
- Minor changse to `dmot: botinformation`.
    - Now shows the full section name instead of the acronym.
- Minor changes to `dmot: channelinformation`.
    - Better timestamp.
- Minor changes to `dmot: clap`.
    - Added two extra claps at the start and end of the message.
- Minor changes to `dmot: command`
    - Fixed a bug where the command fails to display when the result does not have an alias.
- Minor changes to `dmot: credit`.
    - Fixed a bug where the list fails to load when searching by sections.
    - Added page number.
- Minor changes to `dmot: leaderboard`.
    - Now caches the leaderboard for faster load time.
    - Leaderboards now update every hour.
    - Fixed typos and grammar mistakes.
- Minor changes to `dmot: link`.
    - Now an alias for `dmot: createinvite`.
- Minor changes to `dmot: modules`.
    - Readded original functionalities.
    - Follow-up responses are now being filtered.
- Minor changes to `dmot: premium`.
    - Fixed a bug where default avatars crashes the bot.
- Minor changes to `dmot: report`.
    - Fixed a bug where reactions fails to register.
- Minor changes to `dmot: rules`.
    - Fixed typos and grammar mistakes.
    - Titles can now contain spaces.
    - Follow-up responses are now being filtered.
- Minor changes to `dmot: say`.
    - Readded original functionality.
    - Removed embed feature.
    - Fixed description.
- Minor changes to `dmot: shutdown`.
    - Follow-up responses are now being filtered.
- Minor changes to `dmot: suggest`.
    - Fixed a bug where reactions fails to register.
- Minor changes to `dmot: uptime`.
    - Better GUI.
- Minor changes to `dmot: version`.
    - Previous changelogs has been added.
    - Fixed typos and grammar mistakes.
- Minor changes to `dmot: work`.
    - Follow-up responses are now being filtered.
- Increased the number of auto-join roles from 3 to 999,999,999.
- Fixed a bug where cooldowns break when the duration is changed.
- Better error feedback.
- Increased the number of unique welcome and leave messages from 3 to 999,999,999.
- Added member-join and member-leave log.
- Commands now support usernames to prevent mass mentions
- Place holders are now replaced.
- Fixed a bug where the bot fails to send a reminder when an AFK user is mentioned.
- Cooldown durations can now be modified.
- Changes in the leaderboard is now only saved once per hour instead in real time.
- Fixed a bug where a user can have a negative balance.
- Fixed a bug where your cooldown is not removed properly.
- Fixed a bug where the bot crashes when a user does not have a role.
- Fixed a bug where premiun servers are not detected.
- Fixed a bug where the bot status randomly disapepars.
- Major rewrite to the bot for better performance.

## Version `beta.3`

### April 30, 2020

- Added 2 new commands.
    - dmot: command
    - dmot: link
- Minor changes to `dmot: biography`.
    - The biography can no longer be longer than 200 characters.
- Minor changes to `dmot: botinformation`.
    - Specific sections can be loaded independently.
- Minor changes to `dmot: blacklist`.
    - Better GUI.
- Minor changes to `dmot: channelinformation`.
    - Channels can be found by names.
- Minor changes to `dmot: credit`.
    - Removed redundant sections.
    - Sections `friend` and `supports` are available.
- Minor changes to `dmot: dmotserverinformation`.
    - Removed redundant aliases.
- Minor changes to `dmot: dmotuserinformation`.
    - Better GUI.
- Minor changes to `dmot: emojiinformation`.
    - Emojis can be found by names.
- Minor changes to `dmot: evaluate`.
    - Added flags such as `nooutput`, `noinput`, `resultsonly`.
- Minor changes to `dmot: google`.
    - Added URL support.
- Minor changes to `dmot: help`.
    - Renamed aliases.
        - `dmot: command` -> `dmot: commands`.
        - `dmot: cmd` -> `dmot: cmds`.
- Minor changes to `dmot: image`.
    - Added URL support.
- Minor changes to `dmot: leaderboard`.
    - Better GUI.
- Minor changes to `dmot: modules`.
    - Disabled command due to unstable results.
- Minor changes to `dmot: news`.
    - Now supports displaying the five latest announcements from each channel.
- Minor changes to `dmot: premium`.
    - Better GUI.
- Minor changes to `dmot: report`.
    - Added a confirmation prompt.
- Minor changes to `dmot: roleinformation`.
    - Better GUI.
    - Roles can be found by names.
- Minor changes to `dmot: rules`.
    - Pages can now be named.
    - Reduced character limit to 500.
- Minor changes to `dmot: say`.
    - Disabled command due to unstable results.
- Minor changes `dmot: serverinformation`.
    - The `emojis` and `roles` sections has been removed.
- Minor changes to `dmot: settheme`.
    - Renamed to `dmot: setevent`.
    - Added more customizations, such as event names and descriptions.
- Minor changes to `dmot: suggest`.
    - Added a confirmation prompt.
- Minor changes to `dmot: theme`.
    - Renamed to `dmot: event`.
- Minor changes to `dmot: uptime`.
    - Better GUI.
- Minor changes to `dmot: userinformation`.
    - The `emojis` and `roles` sections has been removed.
    - Removed sensitive information about user's status.
    - Better GUI.
- Minor changes to `dmot: version`.
    - Now shows the full version of the changelog.
    - Embeds are now sent as direct messages to avoid chat flooding.
- Minor changes to `dmot: work`.
    - Added an interactive minigame.
    - Removed fines.
- Minor changes to `dmot: youtube`.
    - Added URL support.
- Removed 24 commands.
    - dmot: announce
    - dmot: birthday
    - dmot: bug
    - dmot: candy
    - dmot: checkbotonline
    - dmot: flower
    - dmot: googletranslate
    - dmot: harvest
    - dmot: hunt
    - dmot: icecream
    - dmot: invite
    - dmot: math
    - dmot: password
    - dmot: quiz
    - dmot: santa
    - dmot: snowangel
    - dmot: snowangle
    - dmot: snowfight
    - dmot: snowman
    - dmot: teamtrees
    - dmot: time
    - dmot: termofservice
    - dmot: turkey
    - dmot: vote
- Better error handling and fallback system.
- Default values are used if an invalid parameter is passed.
- Optimized internal source code for smoother experience.
- Added place holders for incomplete commands.
- Migrated to Discord v12.

## Version `beta.2`

### December 31, 2019

- The beta badge is now obtainable.

## Version `beta.1`

### December 29, 2019

- Improved and cleaned up several commands.
- Removed a few major bugs that could be potentially dangerous.

## Version `beta.0`

### December 22, 2019

- Added 35 new commands.
    - dmot: announce
    - dmot: biography
    - dmot: birthday
    - dmot: blacklist
    - dmot: bug
    - dmot: channelinformation
    - dmot: clap
    - dmot: createinvite
    - dmot: dmotserverinformation
    - dmot: dmotuserinformation
    - dmot: emojiinformation
    - dmot: flower
    - dmot: google
    - dmot: harvest
    - dmot: hunt
    - dmot: icecream
    - dmot: image
    - dmot: lockdown
    - dmot: math
    - dmot: news
    - dmot: premium
    - dmot: quiz
    - dmot: report
    - dmot: rob
    - dmot: santa
    - dmot: shutdown
    - dmot: snowangel
    - dmot: snowangle
    - dmot: snowfight
    - dmot: snowman
    - dmot: sponsorship
    - dmot: suggest
    - dmot: time
    - dmot: turkey
    - dmot: youtube
- Minor changes to `dmot: balance`.
    - Fixed some issues of retrieving data.
- Minor changes to `dmot: settheme`.
    - Added more themes.
- Minor changes to `dmot: theme`.
    - Better handling for themes.
- Minor changes to `dmot: userinformation`.
    - Better GUI.
- Minor changes to `dmot: work`.
    - Fixed a bug where the salary is not accurate to the actual amount being added.
- Improved direct message logs.

---

## Alpha

The alpha version is the first major release of Dmot. Major developments and new commands were introduced during this stage, though many were incomplete or unstable.

---

## Version `alpha.3`

### October 31, 2019

- Added 8 new commands.
    - dmot: avatar
    - dmot: credit
    - dmot: candy
    - dmot: theme
    - dmot: modules
    - dmot: say
    - dmot: setbalance
    - dmot: settheme
- Added module system.
    - Essential.AutoJoinRole
    - Essential.Language
    - Essential.Leave
    - Essential.Log
    - Essential.LogUnknownCommand
    - Essential.Main
    - Essential.SwearFilter
    - Essential.Version
    - Essential.Welcome
- Added language support to Dmot.
    - Chinese
    - English
- Removed 3 commands.
    - dmot: changelog
    - dmot: setting
    - dmot: settings
- Minor changes to `dmot: balance`.
    - Fixed a bug where an incorrect global-balance was shown.
- Minor changes to `dmot: work`.
    - Added more response messages.
- Minor changes to `dmot: help`.
    - Better GUI.
- Disabled several test commands from the test bot.
- Improved command handler.
    - Now caches commands instead of refetching on execute.
- Added more human-friendly messages.

## Version `alpha.2`

### September 4, 2019

- Added 5 new commands.
    - dmot: afk
    - dmot: botinformation
    - dmot: roleinformation
    - dmot: rules
    - dmot: vote
- Minor changes to `dmot: eightball`.
    - Added new response messages.
- Minor changes to `dmot: invite`.
    - Better GUI.
- Minor changes to `dmot: serverinformation`
    - Added new information to the GUI.
- Minor changes to `dmot: work`
    - Reduced cooldown and granted you more money.

## Version `alpha.1`

### September 2, 2019

- Added 6 new commands.
    - dmot: cat
    - dmot: dog
    - dmot: ping
    - dmot: serverinformation
    - dmot: uptime
    - dmot: userinformation
- Minor changes to `dmot: eightball`.
    - Added new response messages.

## Version `alpha.0`

### September 1, 2019

- Added 13 new commands.
    - dmot: ban
    - dmot: balance
    - dmot: changelog
    - dmot: eightball
    - dmot: evaluate
    - dmot: help
    - dmot: invite
    - dmot: kick
    - dmot: leaderboard
    - dmot: password
    - dmot: setting
    - dmot: settings
    - dmot: version
    - dmot: work

## Pre-Release

This is the beginning of time. Dmot was first created on December 22, 2018 by Dm123321_31mD Gaming as a simple side-project.

---

## Creation

### December 22, 2018

- Dmot was first created by Dm123321_31mD Gaming.

[↑ Back to Top](#dmot--changelog)