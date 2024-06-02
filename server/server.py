from flask import Flask, request
import json
from datetime import datetime
from helpers.data_formatting import format_data
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/get_dataset', methods=['GET'])
def get_dataset():
	with open('data.json') as f:
			data = json.load(f)
			formatted_data = format_data(data)
			return formatted_data


if __name__ == '__main__':
    app.run()
