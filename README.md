# 2021-LAMAS

2021 Project for Logical Aspects of Multi-Agent Systems.

## Requirements

Install the package manager `npm`.

    sudo apt install npm

Navigate to project root.

    cd path/to/project

Install required packages.

    npm install

## Running with Node

With this approach only the non-GUI elements can be run and tested.

Navigate to project root.

    cd path/to/project

Use node to start the main javascript file.

    node docs/main.js

## Running with a Browser Debugger and VSCode

With this approach GUI and non-GUI components can be ran together.
Depending on the browser that you have already installed, proceed to install the corresponding VSCode extension "Debugger for Firefox" (firefox-devtools.vscode-firefox-debug) or "Debugger for Chrome" (msjsdiag.debugger-for-chrome).

If a launch.json file does not exist yet, create one inside a `.vscode` folder which should be on your project root directory.

    cd path/to/project
    mkdir .vscode
    cd .vscode
    touch launch.json

The contents of the launch.json should look as follows for Firefox.
This information can be found on the Debugger for Firefox extension site.

    {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Launch index.html",
                "type": "firefox",
                "request": "launch",
                "reAttach": true,
                "file": "${workspaceFolder}/docs/index.html"
            }
        ]
    }

The launch.json configuration of Debugger for Chrome can be created automatically by VSCode.

Once you have a launch.json file; in VSCode go to Run and Debug.
In the top-left corner select the name of the launch task.
In the above example this would be "Launch index.html".
Then press the green play button.

An instance of the browser should open executing the program.

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) to learn more about this project's architecture.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) to learn more about contributing to this repository.
