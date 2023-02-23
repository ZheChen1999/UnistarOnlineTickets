# -*- coding: utf-8 -*-
"""
Created on Sat Feb 18 14:29:18 2023

@author: zt7n22
"""

import time
import win32gui, win32ui, win32con, win32api
#!-*- coding:utf-8 -*-
import os
import requests
from io import BytesIO
from pyzbar import pyzbar
from PIL import Image,ImageEnhance
import qrcode,os
import time

def window_capture(filename):
    hwnd = 0  # 窗口的编号，0号表示当前活跃窗口
    # 根据窗口句柄获取窗口的设备上下文DC（Divice Context）
    hwndDC = win32gui.GetWindowDC(hwnd)
    # 根据窗口的DC获取mfcDC
    mfcDC = win32ui.CreateDCFromHandle(hwndDC)
    # mfcDC创建可兼容的DC
    saveDC = mfcDC.CreateCompatibleDC()
    # 创建bigmap准备保存图片
    saveBitMap = win32ui.CreateBitmap()
    # 获取监控器信息
    MoniterDev = win32api.EnumDisplayMonitors(None, None)
    #print(MoniterDev)
    w = MoniterDev[0][2][2]
    h = MoniterDev[0][2][3]
    print(w)
    print(h)
    # 为bitmap开辟空间
    saveBitMap.CreateCompatibleBitmap(mfcDC, w, h)
    # 高度saveDC，将截图保存到saveBitmap中
    saveDC.SelectObject(saveBitMap)
    # 截取从左上角（0，0）长宽为（w，h）的图片
    saveDC.BitBlt((0, 0), (int(w/2), int(h/2)), mfcDC, (0, 0), win32con.SRCCOPY)
    saveBitMap.SaveBitmapFile(saveDC, filename)
 
def get_ewm(img_adds):
    """ 读取二维码的内容： img_adds：二维码地址（可以是网址也可是本地地址 """
    if os.path.isfile(img_adds):
        # 从本地加载二维码图片
        img = Image.open(img_adds)
    else:
        # 从网络下载并加载二维码图片
        rq_img = requests.get(img_adds).content
        img = Image.open(BytesIO(rq_img))
 
    # img.show()  # 显示图片，测试用
 
    txt_list = pyzbar.decode(img)
   
    data = ""
    for txt in txt_list:
        barcodeData = txt.data.decode("utf-8")
        data = data + barcodeData
    return data
"Grab the part of the screen"

import pyscreenshot as ImageGrab
def cap_jiexi_bus_code(is_jiexi = True):
    if is_jiexi:
        i=0
        while True:
            im = ImageGrab.grab(bbox=(0, 0, 500, 500))  # X1,Y1,X2,Y2
            im.save("test.png")
            #window_capture("haha" + str(i) + ".jpg")
            #jiexi_text = get_ewm("haha" + str(i) + ".jpg")
    
            jiexi_text = get_ewm("test" + ".png")
            print(jiexi_text)
            with open('data.txt','w') as f:    #设置文件对象
                f.write(jiexi_text)                 #将字符串写入文件中
            print("jiexi successfully!")
try:
    cap_jiexi_bus_code(True)

except KeyboardInterrupt:
    print('jiexi wrong!')

except Exception as e:
    print(e)