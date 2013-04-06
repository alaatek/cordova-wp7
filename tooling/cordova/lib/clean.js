/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/


var fso = WScript.CreateObject('Scripting.FileSystemObject');
var wscript_shell = WScript.CreateObject("WScript.Shell");
var args = WScript.Arguments;
// working dir
var ROOT = WScript.ScriptFullName.split('\\cordova\\lib\\clean.js').join('');


// help function
function Usage() {
    Log("");
    Log("Usage: clean [ --debug | --release ]");
    Log("    --debug   : Cleans generated debug files in project.");
    Log("    --release : Cleans generated release files in project.");
    Log("examples:");
    Log("    clean --debug");
    Log("    clean");
    Log("         - deletes all generated files in project");
    Log("");
}

//  logs to stdout or stderr
function Log(msg, error) {
    if (error) {
        WScript.StdErr.WriteLine(msg);
    }
    else {
        WScript.StdOut.WriteLine(msg);
    }
}

// cleans any generated files in the cordova project
function clean_project(path) {
    if (fso.FolderExists(path + "\\obj")) {
        fso.DeleteFolder(path + "\\obj");
    }
    if (fso.FolderExists(path + "\\Bin")) {
        fso.DeleteFolder(path + "\\Bin");
    }
    //TODO: delete CordovaAppProj.csproj.user as well? Service References?
}

// cleans any files generated by build --debug
function clean_debug(path) {
    if (fso.FolderExists(path + "\\obj\\Debug")) {
        fso.DeleteFolder(path + "\\obj\\Debug");
    }
    if (fso.FolderExists(path + "\\Bin\\Debug")) {
        fso.DeleteFolder(path + "\\Bin\\Debug");
    }
}

// cleans any files generated by build --release
function clean_release(path) {
    if (fso.FolderExists(path + "\\obj\\Release")) {
        fso.DeleteFolder(path + "\\obj\\Release");
    }
    if (fso.FolderExists(path + "\\Bin\\Release")) {
        fso.DeleteFolder(path + "\\Bin\\Release");
    }
}

Log("");

if (args.Count() > 0) {
    // support help flags
    if (args(0) == "--help" || args(0) == "/?" ||
            args(0) == "help" || args(0) == "-help" || args(0) == "/help") {
        Usage();
        WScript.Quit(1);
    }
    else if (args.Count() > 1) {
        Log("Error: Too many arguments.", true);
        Usage();
        WScript.Quit(1);
    }
    else if (fso.FolderExists(ROOT)) {
        if (args(0) == "--debug" || args(0) == "-d") {
            clean_debug(ROOT);
        }
        else if (args(0) == "--release" || args(0) == "-r") {
            clean_release(ROOT);
        }
        else {
            Log("Error: \"" + arg(0) + "\" is not recognized as a build option", true);
            Usage();
            WScript.Quit(1);
        }
    }
    else {
        Log("Error: Project directory not found,", true);
        Usage();
        WScript.Quit(1);
    }
}
else {
   if (fso.FolderExists(ROOT)) {
        Log("Cleaning cordova project...");
        clean_project(ROOT);
    }
    else {
        Log("Error: Project directory not found,", true);
        Usage();
        WScript.Quit(1);
    }
}