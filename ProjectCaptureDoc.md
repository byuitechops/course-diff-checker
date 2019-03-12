# Project Capture Document for Course Diff Checker
#### *Author: Seth Bolander*
#### *Stakeholder(s): Corey Moore*
#### *Date: Mar 12, 2019*


## Background
Parent and child courses in Canvas have some issues (especially with questions/quiz questions) and the XML files need a simple way to see the differences between the parent and child(ren).

-----

## Definition of Done
An automated proof-of-concept that can give the inherent differences between files in a source (parent course) and destination (child course). 

-----

# Requirements

### Input Requirements

#### Source of Inputs
All inputs are gathered from the user at runtime.

#### Definition of Inputs
A Canvas course code for both the parent and child courses.

---

### Output Requirements
#### Destination
Output(s) will be written to a local folder.

#### Definition of Outputs
A CSV file with a list of all changes between the source (parent) and destination (child). This file will have columns:
```csv
src path,dest path,src code,dest code,src line start,src line end,dest line start,dest line end

```

---

### User Interface

#### Type:
Command-Line Interface

#### 
See [README.md](https://github.com/byuitechops/course-diff-checker/blob/master/README.md) for more information of CLI arguments.

-----

## Expectations

### Timeline
Non-automated, basic functionality finished by Friday Mar 15, 2019.
### Best Mode of Contact
Slack
### Next Meeting
Friday Mar 15, 2019

### Action Items
<!-- Recap Meeting -->
#### TechOps
#### Stakeholder

-----

#### *Approved By:* 
#### *Approval Date:*
