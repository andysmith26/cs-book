import json
import os
import re
import subprocess


targetDateString = "*** "
targetAgendaStartString = "**** agenda"
targetAgendaEndString = "*"
outputfiles = []

def getMonth(s):
    monthDict = {
    "01" : "Jan",
    "02" : "Feb",
    "03" : "Mar",
    "04" : "Apr",
    "05" : "May",
    "06" : "June",
    "07" : "July",
    "08" : "Aug",
    "09" : "Sept",
    "10" : "Oct",
    "11" : "Nov",
    "12" : "Dec",
    }
    return monthDict[s]

def dateExtractor(s):
    dates = re.search("(\d+)-(\d+)-(\d+)\s(\w+)",s)
    if dates:
        output = dates.group(4) + " " + getMonth(dates.group(2)) + " " + dates.group(3)
    else:
        output = ""
    return output

def statusExtractor(s):
    status = re.match("\w+", text)
    if status:
        output = status.group(0)
    else:
        output = ""
    return output

with open("current_agenda_files.txt", "r") as file:
    files = [line.rstrip('\n') for line in file]

for f in files:
    print("starting: " + f)
    agenda_dict = {}
    with open(os.path.join(os.path.dirname(__file__), "..", "..", "org", f), "r") as file:
        lines = [line.rstrip('\n') for line in file]
    gotDate = False
    gotAgenda = False
    classSession = {}
    agendaLines = []
    classList = []
    for line in lines:
        # print(line)
        if gotDate:
            if line[:len(targetAgendaStartString)] == targetAgendaStartString:
                gotAgenda = True
            elif line[:len(targetAgendaEndString)] == targetAgendaEndString:
                classSession["agenda"] = agendaLines
                classList.append(classSession)
                classSession = {}
                agendaLines = []
                gotDate = False
                gotAgenda = False
            else:
                # print(" *** FOUND A LINE ***")
                agendaLines.append(line)
        else:
            # print(line[0:3])
            if line[:len(targetDateString)] == targetDateString:
                text = line[len(targetDateString):]
                foundDate = dateExtractor(text)
                foundStatus = statusExtractor(text)
                if len(foundDate) > 0 and len(foundStatus):
                    gotDate = True
                    classSession["date"] = foundDate
                    classSession["status"] = foundStatus
    agenda_dict["classes"] = classList
    # print(agenda_dict)
    outputfile = f[:-4] + ".json"
    outputfiles.append(outputfile)
    with open(outputfile, "w") as file:
        json.dump(agenda_dict, file)

addString = " ".join(outputfiles)
subprocess.check_output('git add ' + addString, shell=True)
#subprocess.check_output('git commit -m "autoupdate agenda file"', shell=True)
#subprocess.check_output('git push"', shell=True)
