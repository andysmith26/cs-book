import json
import os
import re
import subprocess

CLASSES_FILE = 'current-class-files.txt'
FILE_PREFIX = '~/g/org/'
targetAgendaDateString = "*** "
targetAgendaStartString = "**** agenda"
targetAgendaEndString = "*"
readyStatuses = ["READY", "TIMED", "DONE"]

targetAheadHeadline = "* looking ahead"
targetAheadDateString = "** "
targetAheadEndString = "* "

targetHomeworkHeadline = "* homework"
targetHomeworkDateString = "** "
targetHomeworkEndString = "* "

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
    firstDate = re.search("(\d+)-(\d+)-(\d+)\s(\w+)",s)
    if firstDate:
        output = [[firstDate.group(0), firstDate.group(4) + " " + getMonth(firstDate.group(2)) + " " + firstDate.group(3)]]
        secondDate = re.search("-\s\[(\d+)-(\d+)-(\d+)\s(\w+)",s)
        if secondDate:
            output.append([secondDate.group(0)[3:], secondDate.group(4) + " " + getMonth(secondDate.group(2)) + " " + secondDate.group(3)])
    else:
        output = []
    return output

def statusExtractor(s):
    status = re.match("\w+", text)
    if status:
        output = status.group(0)
    else:
        output = []
    return output

with open(CLASSES_FILE, "r") as file:
    files = [line.rstrip('\n') for line in file]

for f in files:
    print("starting: " + f)

    with open(os.path.join(os.environ['HOME'], "g", "org", f), "r") as file:
        lines = [line.rstrip('\n') for line in file]
        print("found %s lines in file" % (len(lines)))

    # build the agenda info
    agenda_dict = {}
    gotDate = False
    gotAgenda = False
    classSession = {}
    agendaLines = []
    classList = []
    for line in lines:
        if gotAgenda == True:
            if line[:len(targetAgendaEndString)] == targetAgendaEndString:
                classSession["agenda"] = agendaLines
                classList.append(classSession)
                classSession = {}
                agendaLines = []
                gotDate = False
                gotAgenda = False
            else:
                agendaLines.append(line)
        elif gotDate:
            if line[:len(targetAgendaStartString)] == targetAgendaStartString:
                gotAgenda = True

        else:
            # print(line[0:4])
            if line[:len(targetAgendaDateString)] == targetAgendaDateString:
                text = line[len(targetAgendaDateString):]
                dates = dateExtractor(text)
                if len(dates) > 0:
                    foundSortableDate = dates[0][0]
                    foundDisplayDate = dates[0][1]
                foundStatus = statusExtractor(text)
                print(text)
                if len(dates) > 0 and foundStatus in readyStatuses:
                    gotDate = True
                    classSession["sortableDate"] = foundSortableDate
                    classSession["displayDate"] = foundDisplayDate
                    classSession["status"] = foundStatus
    agenda_dict["classes"] = classList
    outputfile = f[:-4] + "-agenda.json"
    outputfiles.append(outputfile)
    with open(outputfile, "w") as file:
        json.dump(agenda_dict, file, indent=4, sort_keys=True)

    # build the homework info
        homework_dict = {}
        gotStart = False
        gotHomework = False
        homeworkItem = {}
        homeworkLines = []
        homeworkList = []
        for line in lines:
            if gotStart:
                if line[:len(targetHomeworkDateString)] == targetHomeworkDateString:
                    if gotHomework:
                        homeworkItem["lines"] = homeworkLines
                        homeworkList.append(homeworkItem)
                        homeworkItem = {}
                        homeworkLines = []
                        gotHomework = False
                    text = line[len(targetHomeworkDateString):]
                    dates = dateExtractor(text)
                    if len(dates) > 1:
                        homeworkItem["sortableStartDate"] = dates[0][0]
                        homeworkItem["displayStartDate"] = dates[0][1]
                        homeworkItem["sortableEndDate"] = dates[1][0]
                        homeworkItem["displayEndDate"] = dates[1][1]
                elif line[:len(targetHomeworkEndString)] == targetHomeworkEndString:
                    if gotHomework:
                        homeworkItem["lines"] = homeworkLines
                        homeworkList.append(homeworkItem)
                        homeworkItem = {}
                        homeworkLines = []
                        gotHomework = False
                    text = line[len(targetHomeworkDateString):]
                    dates = dateExtractor(text)
                    if len(dates) > 1:
                        homeworkItem["sortableStartDate"] = dates[0][0]
                        homeworkItem["displayStartDate"] = dates[0][1]
                        homeworkItem["sortableEndDate"] = dates[1][0]
                        homeworkItem["displayEndDate"] = dates[1][1]
                    gotStart = False
                    break
                else:
                    gotHomework = True
                    homeworkLines.append(line)
            else:
                if line[:len(targetHomeworkHeadline)] == targetHomeworkHeadline:
                    gotStart = True
        homework_dict["homeworks"] = homeworkList
        outputfile = f[:-4] + "-homeworks.json"
        outputfiles.append(outputfile)
        print(homework_dict)
        with open(outputfile, "w") as file:
            json.dump(homework_dict, file, indent=4, sort_keys=True)


    # build the 'looking ahead' info
    ahead_dict = {}
    gotStart = False
    gotAhead = False
    aheadItem = {}
    aheadLines = []
    aheadsList = []
    for line in lines:
        if gotStart:
            if line[:len(targetAheadDateString)] == targetAheadDateString:
                if gotAhead:
                    aheadItem["lines"] = aheadLines
                    aheadsList.append(aheadItem)
                    aheadItem = {}
                    aheadLines = []
                    gotAhead = False
                text = line[len(targetAheadDateString):]
                dates = dateExtractor(text)
                if len(dates[0]) > 1:
                    aheadItem["sortableDate"] = dates[0][0]
                    aheadItem["displayDate"] = dates[0][1]
            elif line[:len(targetAheadEndString)] == targetAheadEndString:
                if gotAhead:
                    aheadItem["lines"] = aheadLines
                    aheadsList.append(aheadItem)
                    aheadItem = {}
                    aheadLines = []
                    gotAhead = False
                text = line[len(targetAheadDateString):]
                dates = dateExtractor(text)
                if len(dates) > 1:
                    aheadItem["sortableDate"] = dates[0][0]
                    aheadItem["displayDate"] = dates[0][1]

                gotStart = False
                break
            else:
                gotAhead = True
                aheadLines.append(line)
        else:
            if line[:len(targetAheadHeadline)] == targetAheadHeadline:
                gotStart = True
    ahead_dict["aheads"] = aheadsList
    outputfile = f[:-4] + "-aheads.json"
    outputfiles.append(outputfile)
    with open(outputfile, "w") as file:
        json.dump(ahead_dict, file, indent=4, sort_keys=True)

addString = " ".join(outputfiles)
subprocess.check_output('git add ' + addString, shell=True)
#subprocess.check_output('git commit -m "autoupdate agenda file"', shell=True)
#subprocess.check_output('git push"', shell=True)
