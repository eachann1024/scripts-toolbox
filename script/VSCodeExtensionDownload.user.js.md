# Better VS Code Extension Installer

This userscript enhances the VS Code Extension Marketplace by adding useful functionality for downloading and installing extensions.

## Features

- **Download Button**: Adds a "Download" button that lets you download the .vsix file directly from the marketplace
- **Direct Install Buttons**: Adds "Install to Cursor", "Install to Windsurf", and "Install to Trae" buttons with editor icons for one-click installation

## Installation

1. Install a user script manager like [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/)
2. Click on the raw version of the script: [VSCodeExtensionDownload.user.js](VSCodeExtensionDownload.user.js)
3. The user script manager should automatically detect and prompt you to install the script

## Usage

1. Navigate to any VS Code extension page on the marketplace (e.g. `https://marketplace.visualstudio.com/items?itemName=qwenlm.qwen-code-vscode-ide-companion`)
2. You'll see additional buttons next to the install button:
   - **Download**: Downloads the .vsix file directly to your computer
   - **Install to Cursor**: Installs the extension directly to Cursor editor
   - **Install to Windsurf**: Installs the extension directly to Windsurf editor
   - **Install to Trae**: Installs the extension directly to Trae editor

## How It Works

The script works by:

1. Extracting the extension information (publisher, name, version) from the page URL and content
2. Creating additional buttons that match the styling of the existing install button
3. Adding event listeners to handle the download and custom install actions
4. Using the VS Code Marketplace API to generate direct download URLs for .vsix files

## Troubleshooting

If the buttons don't appear:

1. Make sure the user script manager is enabled and the script is installed
2. Check the browser console for any error messages (Press F12 → Console)
3. Verify you're on a valid extension page (URL should contain `items?itemName=`)
4. Try refreshing the page

## Version History

- **v1.6**: Fixed download button not showing on some extension pages. Improved element selectors and styling to work with current VS Code Marketplace layout. Added debug logging for easier troubleshooting.
- **v1.5**: Refactored button creation logic for better compatibility with different page layouts.
- **v1.4**: Fixed download button not showing on some extension pages. Improved element selectors to work with current VS Code Marketplace layout.
- **v1.3**: Optimized metadata tags for better visibility on userscript platforms. Added more keywords to description.
- **v1.2**: Renamed to "Better VS Code Extension Installer". Added "Install to Cursor", "Install to Windsurf", and "Install to Trae" buttons with editor icons.
- **v1.1**: Added `@license` meta key for Greasy Fork compatibility.
- **v1.0**: Initial release with download functionality.

## Contributing

Feel free to submit issues or pull requests to improve the script.