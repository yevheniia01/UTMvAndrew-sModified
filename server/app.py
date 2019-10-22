'''server/app.py - main api app declaration'''
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS

'''Main wrapper for app creation'''
app = Flask(__name__, static_folder='../build')
CORS(app)

##
# API routes
##

@app.route('/api/items')
def items():
  '''Sample API route for data'''
  return jsonify([{'title': 'A'}, {'title': 'B'}])


@app.route('/api/utm_form', methods=['POST'])
def utm_form():
  fieldsList = request.json['data']['input_array']
  landing_url = ''
  adobe_param = 'cid'
  composite_list = []
  for field in fieldsList:
    for key, val in field.items():
      if key == 'landing url':
        landing_url = val
      else:
        composite_list.append(val)

  composite_fields = '-_-'.join(composite_list)

  final_link = "{landing_url}?{adobe_param}={composite_fields}" \
              .format(landing_url=landing_url, adobe_param=adobe_param, composite_fields=composite_fields)

  return jsonify({'long_url': final_link})

##
# View route
##

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
  '''Return index.html for all non-api routes'''
  #pylint: disable=unused-argument
  return send_from_directory(app.static_folder, 'index.html')