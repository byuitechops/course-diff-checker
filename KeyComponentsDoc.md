# Key Components Doc for Course-Diff-Checker

Author Name: Seth Bolander

## 1. Basic Backlog (You may include a WBS image if you choose)

For each work item/function/smallest piece of your project that needs to be accomplished, *create an entry in the key components doc* of the form:

#### INPUT
**Download a Canvas Course**
- HOW: TBD.
- LIBRARY: TBD.
- SKILLS: TBD.

**Unzip a Compressed Course Directory**
- HOW: TBD.
- LIBRARY: TBD.
- SKILLS: TBD.

**Read All Files of a Type in a Directory**
- HOW: Recursively search a directory and its subdirectories for files. Read file data for each file of a specified extension into an object `{'filepath.extension': 'file data', ...}`.
- LIBRARY: FS, Path
- SKILLS: Recursive functions

#### RUN DIFF CHECKER
**Match a Parent Course File with Its Child Course's File**
- HOW: Filter by `<title>` tags for each file until a match is found.
- LIBRARY: N/A
- SKILLS: Array methods `.filter()` and `.map()`

**Check Differences Between Matched Files**
- HOW: Run Diff Check function on two files with Parent as *src* and Child as *destination*, then set found differences (and other needed info for CSV output) to an object. 
- LIBRARY: PrettyDiff (or similar)
- SKILLS: PrettyDiff (or similar)

**Ignore ID's and Inherent Differences in Files**
- HOW: Run a RegExp search on all values in *differences* object for ID's, `<assignment_group_identifierref>`, and `<topic_id>`.
- LIBRARY: N/A
- SKILLS: RegExp

#### OUTPUT
**Create CSV from _Differences_ Object**
- HOW: Use `fs.writeFileSync(output_file_path, dsv.csvFormat(obj))` to output CSV data to a specified file path.
- LIBRARY: D3-DSV, FS
- SKILLS: D3-DSV

-----

## 2. Library List
- fs
- path
- prettydiff/html-differ/diff-js-xml/similar diff checker library
- d3-dsv

-----

## 3. Prototype List
- FS library
    - Use builtin FS library to readFileSync, readdirSync, lstatSync, and writeFileSync.
- Path library
    - Use builtin Path library to join a directory name and file name to create a file path.
- PrettyDiff (or similar) library
    - Use library to check the differences between a parent course file and child course file, then save found differences as variables.
- D3-DSV library
    - Use D3-DSV library to convert an object into a CSV file with headers: `src path,dest path,src code,dest code,src line start,src line end,dest line start,dest line end`.
- Regular Expressions
    - Use RegExp to search through a string for all instances of a pattern: `/(identifier="[\d\w]+")/` to ignore in most/all cases.

-----

## 4. Design Chart

![design_chart](https://github.com/byuitechops/course-diff-checker/blob/master/designChart.jpg)

