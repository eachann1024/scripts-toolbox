# Scripts Toolbox

[切换到中文版](README_zh.md)

## Overview

A collection of useful scripts to enhance your browsing experience and automate daily tasks.

## Better VS Code Extension Installer

This script adds download and direct-install buttons to VS Code extension marketplace pages. It allows you to download .vsix files or install extensions directly to Cursor, Windsurf, and Trae editors.

### Features

- Adds a "Download" button next to the install button on VS Code extension pages
- Downloads the .vsix file directly from the marketplace
- Maintains the same styling as the original install button
- Adds "Install to Cursor", "Install to Windsurf", and "Install to Trae" buttons with editor icons

### Installation

1. Install a user script manager like [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/)
2. Click on the raw version of the script: [VSCodeExtensionDownload.user.js](script/VSCodeExtensionDownload.user.js) *(Note: The filename remains the same for continuity, but the script name has been updated)*
3. The user script manager should automatically detect and prompt you to install the script

### Usage

1. Navigate to any VS Code extension page on the marketplace
2. You'll see a "Download" button, "Install to Cursor", "Install to Windsurf", and "Install to Trae" buttons next to the install button
3. Click the desired button:
   - "Download": Downloads the .vsix file
   - "Install to ...": Installs the extension directly to the specified editor (if supported)

### Changelog

- **v1.7**: Fixed issue where download button was not appearing alongside custom install buttons. Improved button creation logic to ensure all buttons are properly displayed.
- **v1.6**: Fixed download button not showing on some extension pages. Improved element selectors and styling to work with current VS Code Marketplace layout. Added debug logging for easier troubleshooting.
- **v1.5**: Refactored button creation logic for better compatibility with different page layouts.
- **v1.4**: Fixed download button not showing on some extension pages. Improved element selectors to work with current VS Code Marketplace layout.
- **v1.3**: Optimized metadata tags for better visibility on userscript platforms. Added more keywords to description.
- **v1.2**: Renamed to "Better VS Code Extension Installer". Added "Install to Cursor", "Install to Windsurf", and "Install to Trae" buttons with editor icons.
- **v1.1**: Added `@license` meta key for Greasy Fork compatibility.
- **v1.0**: Initial release with download functionality.

### Contributing

Feel free to submit issues or pull requests to improve the scripts.