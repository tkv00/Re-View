import requests
from bs4 import BeautifulSoup
import pymysql
url = 'https://www.google.co.kr/'
response = requests.get(url)
print(response)
