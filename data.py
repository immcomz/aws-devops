import psycopg2

connection = psycopg2.connect(
    host='db-aws.cpqmban6dwlr.ap-southeast-4.rds.amazonaws.com',
    database='postgres',
    user='postgres',
    password='12345678',
    port=5432
)

cursor = connection.cursor()

for i in range(100):
    name = f'Patient{i}'
    age = 20 + i
    cursor.execute(
        'INSERT INTO patients (name, age) VALUES (%s, %s)', (name, age))

connection.commit()
cursor.close()
connection.close()
