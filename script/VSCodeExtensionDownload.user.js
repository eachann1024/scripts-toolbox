// ==UserScript==
// @name         Better VS Code Extension Installer
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  Adds download and install buttons to VS Code extension marketplace pages. Download .vsix files directly or install extensions to VS Code, Cursor, Windsurf, and Trae with one click.
// @author       eachann1024
// @match        https://marketplace.visualstudio.com/items?itemName=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=visualstudio.com
// @grant        none
// @license      MIT
// @homepageURL  https://github.com/eachann1024/scripts-toolbox
// @supportURL   https://github.com/eachann1024/scripts-toolbox/issues
// @updateURL    https://github.com/eachann1024/scripts-toolbox/raw/master/script/VSCodeExtensionDownload.user.js
// @downloadURL  https://github.com/eachann1024/scripts-toolbox/raw/master/script/VSCodeExtensionDownload.user.js
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // Function to extract itemName from URL
    function getItemNameFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('itemName');
    }

    // Function to extract publisher and extension name from itemName
    function parseItemName(itemName) {
        const parts = itemName.split('.');
        if (parts.length < 2) {
            throw new Error('Invalid itemName format');
        }
        return {
            publisher: parts[0],
            extensionName: parts.slice(1).join('.') // Join remaining parts in case of multiple dots
        };
    }

    // Function to find version on the page
    function findVersion() {
        // Try to find version in the main content area under 'Additional Details'
        const detailsSections = document.querySelectorAll('.additional-details-section');
        for (let section of detailsSections) {
            const header = section.querySelector('h3');
            if (header && header.textContent.trim() === 'Additional Details') {
                // Look for a row containing 'Version' in the first cell
                const rows = section.querySelectorAll('tr');
                for (let row of rows) {
                    const firstCell = row.querySelector('td:first-child');
                    if (firstCell && firstCell.textContent.trim() === 'Version') {
                        const versionCell = row.querySelector('td:last-child');
                        if (versionCell) {
                            return versionCell.textContent.trim();
                        }
                    }
                }
            }
        }

        // Try to find version in the 'Version History' section
        const versionHistory = document.querySelector('#version-history');
        if (versionHistory) {
            const versionElement = versionHistory.querySelector('tr:nth-child(2) td:nth-child(1)');
            if (versionElement) {
                return versionElement.textContent.trim();
            }
        }

        // Fallback: Try to find any element with class 'version' or similar
        const versionElement = document.querySelector('.version, [data-reporting-key="Version"]');
        if (versionElement) {
            return versionElement.textContent.trim();
        }

        // New fallback: Try to find version in the JSON script tag
        const jsonScript = document.querySelector('script.jiContent');
        if (jsonScript) {
            try {
                const jsonData = JSON.parse(jsonScript.textContent);
                if (jsonData.Resources && jsonData.Resources.Version) {
                    return jsonData.Resources.Version;
                }
            } catch (e) {
                console.error('Error parsing JSON from script tag:', e);
            }
        }

        // If not found, throw an error
        throw new Error('Could not find extension version on the page');
    }

    // Function to create and trigger download
    function downloadVSIX(publisher, extensionName, version) {
        const downloadUrl = `https://marketplace.visualstudio.com/_apis/public/gallery/publishers/${publisher}/vsextensions/${extensionName}/${version}/vspackage`;
        
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${extensionName}-${version}.vsix`; // Suggest a filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Function to create and insert custom install buttons
    function addCustomInstallButtons() {
        try {
            const itemName = getItemNameFromURL();
            if (!itemName) {
                console.error('Item name not found in URL');
                return;
            }

            const { publisher, extensionName } = parseItemName(itemName);
            // Note: We don't need the version for custom install buttons, so we don't call findVersion here

            // Find the main install button container
            const installContainer = document.querySelector('.ux-item-action');
            if (!installContainer) {
                console.error('Main install button container not found');
                return;
            }

            // Create container for new buttons
            const customButtonsContainer = document.createElement('div');
            customButtonsContainer.className = 'custom-install-buttons';
            customButtonsContainer.style.marginTop = '10px';
            customButtonsContainer.style.display = 'flex';
            customButtonsContainer.style.gap = '10px';
            customButtonsContainer.style.flexWrap = 'wrap';

            // Define custom editors with their icons
            const editors = [
                { 
                    name: 'Cursor', 
                    scheme: 'cursor',
                    iconUrl: 'https://icon.horse/icon/cursor.sh'
                },
                { 
                    name: 'Windsurf', 
                    scheme: 'windsurf',
                    iconUrl: 'https://icon.horse/icon/windsurf.ai'
                },
                { 
                    name: 'Trae', 
                    scheme: 'trae',
                    iconUrl: 'https://lf-cdn.trae.ai/obj/trae-ai-sg/trae_website_prod/favicon.png'
                }
            ];

            // Create a button for each editor
            editors.forEach(editor => {
                // Clone the original install button structure
                const buttonWrapper = document.createElement('span');
                buttonWrapper.className = 'ux-oneclick-install-button-container';
                buttonWrapper.innerHTML = `
                    <button type="button" class="ms-Button ux-button install ms-Button--default root-39" data-is-focusable="true">
                        <div class="ms-Button-flexContainer flexContainer-40">
                            <div class="ms-Button-textContainer textContainer-41">
                                <div class="ms-Button-label label-43">
                                    <img src="${editor.iconUrl}" alt="${editor.name} icon" style="width: 16px; height: 16px; margin-right: 8px; vertical-align: text-bottom;">
                                    Install to ${editor.name}
                                </div>
                            </div>
                        </div>
                    </button>
                `;

                const customButton = buttonWrapper.querySelector('button');
                
                // Add click handler for custom install
                customButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    try {
                        // Construct the custom scheme URL
                        const customUrl = `${editor.scheme}:extension/${publisher}.${extensionName}`;
                        
                        // Attempt to open the URL
                        window.open(customUrl, '_self');
                        
                        // Fallback: Create a temporary link and click it
                        // const link = document.createElement('a');
                        // link.href = customUrl;
                        // link.style.display = 'none';
                        // document.body.appendChild(link);
                        // link.click();
                        // document.body.removeChild(link);
                    } catch (error) {
                        console.error(`Error installing to ${editor.name}:`, error);
                        alert(`Failed to install to ${editor.name}. Please check console for details.`);
                    }
                });

                customButtonsContainer.appendChild(buttonWrapper);
            });

            // Create download button
            const downloadButtonWrapper = document.createElement('span');
            downloadButtonWrapper.className = 'ux-oneclick-install-button-container';
            downloadButtonWrapper.innerHTML = `
                <button type="button" class="ms-Button ux-button install ms-Button--default root-39" data-is-focusable="true" id="download-extension-button">
                    <div class="ms-Button-flexContainer flexContainer-40">
                        <div class="ms-Button-textContainer textContainer-41">
                            <div class="ms-Button-label label-43">
                                <img src="https://icon.horse/icon/visualstudio.com" alt="Download icon" style="width: 16px; height: 16px; margin-right: 8px; vertical-align: text-bottom;">
                                Download Extension
                            </div>
                        </div>
                    </div>
                </button>
            `;

            const downloadButton = downloadButtonWrapper.querySelector('button');
            
            // Add click handler for download
            downloadButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                try {
                    // Find version when button is clicked
                    const version = findVersion();
                    downloadVSIX(publisher, extensionName, version);
                } catch (error) {
                    console.error('Error downloading extension:', error);
                    alert('Failed to download extension. Please check console for details.');
                }
            });

            // Add download button to container
            customButtonsContainer.appendChild(downloadButtonWrapper);

            // Insert the custom buttons container after the main install container
            installContainer.parentNode.insertBefore(customButtonsContainer, installContainer.nextSibling);
        } catch (error) {
            console.error('Error adding custom install buttons:', error);
        }
    }

    // Wait for the page to load completely
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            addCustomInstallButtons();
        });
    } else {
        // The DOM is already loaded
        addCustomInstallButtons();
    }
})();