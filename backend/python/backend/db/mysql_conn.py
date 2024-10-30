import configparser
import pymysql

from backend.settings.dev import BASE_DIR


def mysql_get_conn():
    config = configparser.ConfigParser()
    config.read('application.properties', encoding='utf-8')

    address = config['MYSQL']['address']
    port = int(config['MYSQL']['port'])
    username = config['MYSQL']['username']
    password = config['MYSQL']['password']
    database = config['MYSQL']['database']
    charset = config['MYSQL']['charset']

    conn = pymysql.connect(host=address, port=port, user=username, password=password, db=database, charset=charset, cursorclass=pymysql.cursors.DictCursor)

    return conn
