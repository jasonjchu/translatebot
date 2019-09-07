#!/bin/bash

npm install
source keys
screen -S translatebot node bot.js
