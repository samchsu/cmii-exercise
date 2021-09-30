# CMII Technical Exercise - Instructions

This program was created using Electron.js + React.js. 

Please clone this repository and "cmii-exercise" repository to get started.

## Getting Started in this repository

In "cmii-backend" directory, you can run:

### `source venv/Scripts/activate`

That will enable the venv environment.

### `pip install flask` 

### `pip install pandas`

### `pip install flask_cors`

This will install all the necessary dependencies.

### `flask run`

Runs the app in the development mode.\
Upon launch, the Electron Application will run.
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

## Getting Started in "cmii-exercise" repository

In this project directory, you can run:

### `npm install`

### `npm install --global yarn` 

This will install all the necessary dependencies.

### `npm start`

Runs the app in the development mode.\
Upon launch, the Electron Application will run.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `npm build`

This will build the application and create an executable file within the project folder. 

# CMII Technical Exercise - My Approach

For the frontend, the hardest part about this exercise was figuring out how to use Flask (I've only used Node.JS in the past) and finding a viable option to import a JSON Object and store it on a new Excel Spreadsheet. I struggled with flask_excel before turning over to pandas, which gave me the ability to create a new spreadsheet and store the JSON Object data as a dataframe. From there, I saved the Excel File to the Flask Server, and converted it into a blob for my React Frontend to receive as a response. This blob will then be converted into a downloadable file and the Frontend will open the file window to download "my_selected_milestones.xlsx".

# CMII Technical Exercise - Changes

I would create a "select & unselect" system for the user, rather than a "select and start over" system if the user accidentally clicks on a milestone. Also, the first object imported from excel sheet is the title ("Milestone" and "Completion Time") and should not be clickable by the user. If this application was used for another excel sheet, I would be creating an edge case if I were to skip over the first object. Because of this, I did not end up changing the state of that object. In addition, the new excel sheet contains the user selected milestones and organizes them by columns "Selected milestone(s) and Selected completion date", but fails to remove the JSON Object format. If I was given more time, I would have the milestones and the one completion date not display as Key, Value pairs. I would also only permit users to submit files with .xlsx filetype.

# Final Thoughts

Thank you for this exercise, and I look forward to reviewing it with you.
