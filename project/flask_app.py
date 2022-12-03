import os
import psycopg2
from flask import Flask, request, jsonify

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='postgres',
                            user="postgres",
                            password="1234")
    return conn


@app.route('/table_data', methods=['GET'])
def index():
    print("Data here : ")
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM employee;')
    employees = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(employees=employees)

if __name__ == "__main__":
  app.run()