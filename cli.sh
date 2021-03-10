#!/bin/bash

IMAGE_NAME=jest-selenium-ts
IMAGE_TAG=latest

case "$1" in
  "build")
    docker build . -t $IMAGE_NAME:$IMAGE_TAG ;;
  "lint")
    docker run --rm $IMAGE_NAME "npm run lint" ;;
  "test")
    docker run --rm $IMAGE_NAME "npm test";;
  "")
esac
