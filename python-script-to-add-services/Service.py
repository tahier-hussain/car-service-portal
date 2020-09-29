import requests
import json

headers = { "Content-Type" : "application/json"}
url = "http://localhost:5000/api/service/add"
number = raw_input("Enter the number of services: ")
for i in range(int(number)):
  service = {}
  service['service'] = raw_input("Enter service: ")
  print(service)
  response = requests.post(url, data=json.dumps(service), headers=headers)
  print(response)