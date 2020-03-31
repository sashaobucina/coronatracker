# CoronaTracker

Tracking the movement and trends of the COVID-19 virus.

## Demo

*Deprecated Warning: No longer supporting Recovered data points due to the following [issue](https://github.com/CSSEGISandData/COVID-19/issues/1250)*

![demo](demo.gif)

## Installation

This project runs on a React frontend managed by [npm](https://www.npmjs.com/get-npm) and a [Python3](https://www.python.org/downloads/release/python-362/) backend routed by Flask.

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install the requirements for the backend component.

```bash
virtualenv <your-venv>
source <your-venv>/bin/activate
pip install -r requirements.txt
```

Make sure to have node and npm installed on your machine. This frontend component is running on node v10.15.0.

```
node -v
npm -v
```

## Run

In a terminal shell, run the following to start the development server.

```bash
python backend/server.py
```

In another shell, run the following to start a local instance of the website on your machine.

```bash
cd frontend
npm install
npm start
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
