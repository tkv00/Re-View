import requests
from bs4 import BeautifulSoup
import pymysql

# MySQL 연결 설정
conn = pymysql.connect(host='127.0.0.1', user='root', password='rlaehdus00', db='Product', charset='utf8')

page = 1
user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.66 Safari/537.36"
headers = {'User-Agent': user_agent}


while True:
    url = 'https://search.shopping.naver.com/search/all?adQuery=옷&frm=NVSHATC&origQuery=옷&pagingIndex=1&pagingSize=40&productSet=total&query=옷&sort=rel&timestamp=&viewType=list'
    print(f"Accessing {url}")
    response = requests.get(url, headers=headers)
    print(response)
    soup = BeautifulSoup(response.text, 'html.parser')

    # 페이지 종료 조건 로직...

    for product in soup.find_all('li', class_='baby-product'):
        name = product.find('div', class_='name').text.strip()
        price = product.find('strong', class_='price-value').text.strip()
        image_element = product.find('img')
        if image_element:
            image_url = image_element['src'].split('//')[-1]  # URL 형식 정리
        else:
            image_url = "No image available"
        id += 1
        print(f"Product found: ID = {id}, Name = {name}, Price = {price}, Image URL = {image_url}")

        # 데이터베이스에 저장
        with conn.cursor() as cursor:
            sql = "INSERT INTO Product (id, name, price, image_url) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (id, name, price, image_url))
        conn.commit()

    # 페이지 종료 조건 검사
    if not soup.find('li', class_='baby-product'):
        print(f"No products found on page {page}. Ending crawl.")
        break

    page += 1
conn.close()


