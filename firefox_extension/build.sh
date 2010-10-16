#!/bin/sh

SELF_DIR=`dirname $0`
cd ${SELF_DIR}

if [ ! -d chrome ]; then
    mkdir chrome
fi

zip -r cakedebughelper.jar content skin
cp chrome.manifest.forjar chrome.manifest
mv cakedebughelper.jar chrome/cakedebughelper.jar
zip -r cakedebughelper.xpi chrome chrome.manifest install.rdf
cp chrome.manifest.dev chrome.manifest

rm chrome/cakedebughelper.jar

