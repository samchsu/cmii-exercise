# env/Scripts/activate
# flask run

from flask import Flask, request, send_from_directory
import pandas as pd
import json
from pandas.io.json import json_normalize
import sys
from flask_cors import CORS, cross_origin
app = Flask(__name__)

# Enable CORS 
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

# Route: "/"
@app.route("/")
def hello_world():
    print("Initial Route", file=sys.stderr)
    return "Initial Route"

# "http://localhost:5000/export"
# Receives JSON Object from Frontend and creates a new Excel File to store data from object
@app.route("/export", methods=['POST'])
@cross_origin(headers=['Content-Type','Authorization'])
def export():
    # Create a dataframe from JSON object
    # obj = pd.read_json(request.json)
    # print(obj.to_string())
    # print(pd.read_json(request.json), file=sys.stderr)
    check = pd.DataFrame.from_dict(request.json)
    print(request.json, file=sys.stderr)
    df = pd.DataFrame(request.json)

    # Generate new Excel File containing data from JSON 
    writer = pd.ExcelWriter("my_selected_milestones.xlsx", engine='xlsxwriter')
    df.to_excel(writer, sheet_name='My Selected Milestones', startrow=1, header=False, index=False)
    worksheet = writer.sheets['My Selected Milestones']
    (max_row, max_col) = df.shape
    
    # Create a list of column headers, to use in add_table().
    column_settings = [{'header': column} for column in df.columns]

    # Add the table.
    worksheet.add_table(0, 0, max_row, max_col - 1, {'columns': column_settings})

    # Make the columns wider.
    worksheet.set_column(0, max_col - 1, 25)

    # Close the Pandas Excel writer and output the Excel file.
    writer.save()

    # Send new Excel File to Frontend
    response = send_from_directory("./", 'my_selected_milestones.xlsx', as_attachment=True, mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', attachment_filename=(str('my_selected_milestones') + '.xlsx'))
    return response

                               