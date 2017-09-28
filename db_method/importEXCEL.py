# -*- coding:UTF-8 -*-
from pyexcel_xls import get_data
# from control_method import tools
from db_method import insert
import os
# from Website.models import *
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def file_name(file_dir):
    # print(os.walk(file_dir)[2])
    for files in os.walk(file_dir):
        print(files) #当前路径下所有非目录子文件

def importPatientInfo(input):
    header = next(input)
    # patients = list()
    for p in input:
        print len(p), p
        data = {}
        i = 0
        for label in header:
            data[label] = p[i]
            i += 1
        print len(data), data
        insert.addPatientInfo(data)
        # patients.append(data)

def importCATandMRC(input):
    header = next(input)
    for p in input:
        print len(p), p
        data = {}
        i = 0
        for label in header:
            data[label] = p[i]
            i += 1
        print len(data), data
        insert.addCATandMRC(data)

def import_patients():
    PATH = BASE_DIR+"/file_import/patients/"
    print PATH
    for root, dirs, files in os.walk(PATH):
        name = files
        # print(name)
    for NAME in name:
        xls_data = get_data(PATH + NAME)
        for sheet_n in xls_data.keys():
            importPatientInfo(iter(xls_data[sheet_n]))

def import_cat():
    PATH = BASE_DIR+"/file_import/cat/"
    for root, dirs, files in os.walk(PATH):
        name = files
        # print(name)
    for NAME in name:
        xls_data = get_data(PATH + NAME)
        for sheet_n in xls_data.keys():
            importCATandMRC(iter(xls_data[sheet_n]))
