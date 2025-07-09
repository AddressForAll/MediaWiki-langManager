# MediaWiki-langManager
Methodology and scripts for [Mediawiki](https://www.mediawiki.org) contents, expanding Mediawiki interface to "all languages in one Wiki", translating or reviewing translations with [ChatGPT API](https://openai.com/api/).

## New Mediawiki interface
A Javascript+CSS plugin creates the menu and checks language availability. The "reference page" is the original title, for example <code>MyPage_title</code>. A translation page is a reserved name for subpage, for example <code>MyPage_title/pt</code> for Portuguese and <code>MyPage_title/es</code> for Spanish. The modified edit-interface also includes ChatGPT plugins for:
* start a new page from other language;
* generate all languages from reference-page;
* review all languages after reference-page modifications.

## Startup procedures
The backup script is also a standalone **digital preservation** procedure.

From XML-backup of the last version, creates "reference page" and "translation pages" in big "include editions" XML. A internal PHP runs all editions.

## Maintenance scrits
This project includes, in the standard Mediawiki maintenance scripts, some operations to perform in batch all interface operations and diffs statistics.

## Structure
* `src-php` folder with PHP  maintenance scripts, to be perform in batch.
* `src-gui` folder with [Graphical User Interface](https://en.wikipedia.org/wiki/Graphical_user_interface), CSS+Javascript, and online ChatGPT calls.

## License
[Apache-2.0](https://spdx.org/licenses/Apache-2.0.html)
