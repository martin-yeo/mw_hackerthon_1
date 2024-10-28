import configparser
import pymysql

from backend.settings.dev import BASE_DIR


def mysql_get_conn(isCronRunning):
    config = configparser.ConfigParser()
    if isCronRunning:
        config.read('{}/{}'.format(BASE_DIR, 'application.properties'), encoding='utf-8')
    else:
        config.read('application.properties', encoding='utf-8')

    address = config['MYSQL']['address']
    port = int(config['MYSQL']['port'])
    username = config['MYSQL']['username']
    password = config['MYSQL']['password']
    database = config['MYSQL']['database']
    charset = config['MYSQL']['charset']

    conn = pymysql.connect(host=address, port=port, user=username, password=password, db=database, charset=charset, cursorclass=pymysql.cursors.DictCursor)

    return conn

def get_naver_confidential(conn):
    result = {}
    cursor = conn.cursor()
    cursor.execute("SELECT field_name, field_value FROM settings WHERE del_yn = 'N' AND field_name LIKE 'naver_app%'")
    tmp_result = cursor.fetchall()

    for data in tmp_result:
        result['{}'.format(data['field_name'])] = data['field_value']

    conn.close()
    return result