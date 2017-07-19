<h1 align="center">Web前后端漏洞分析与防御-知识梳理📖</h1>
<p align="center"><img src="http://www.kejiganhuo.tech/wp-content/uploads/2017/03/cropped-319907-106.jpg" /></p>
---

# 目录
#### 第一章 Web前后端漏洞分析与防御-前置知识
* [01-01](https://github.com/TYRMars/WebsafeLearn#01-01) `Web安全简述`
#### 第二章 前端XSS
* [02-01](https://github.com/TYRMars/WebsafeLearn#02-01) `XSS介绍`
* [02-02](https://github.com/TYRMars/WebsafeLearn#02-02) `XSS攻击类型`
* [02-03](https://github.com/TYRMars/WebsafeLearn#02-03) `HTML内容和属性转义`
* [02-04](https://github.com/TYRMars/WebsafeLearn#02-04) `JS转义`
* [02-05](https://github.com/TYRMars/WebsafeLearn#02-05) `富文本`
* [02-06](https://github.com/TYRMars/WebsafeLearn#02-06) `CSP`
* [02-07](https://github.com/TYRMars/WebsafeLearn#02-07) `PHP-XSS`
#### 第三章 前端CSRF
* [03-01](https://github.com/TYRMars/WebsafeLearn#03-01) `CSRF攻击简介和演示`
* [03-02](https://github.com/TYRMars/WebsafeLearn#03-02) `CSRF攻击原理和危害`
* [03-03](https://github.com/TYRMars/WebsafeLearn#03-03) `CSRF防御-samesite`
* [03-04](https://github.com/TYRMars/WebsafeLearn#03-04) `CSRF防御-验证码`
* [03-05](https://github.com/TYRMars/WebsafeLearn#03-05) `CSRF防御-token`
* [03-06](https://github.com/TYRMars/WebsafeLearn#03-06) `CSRF防御-referer`
* [03-01](https://github.com/TYRMars/WebsafeLearn#03-01) `PHP-CSRF`
#### 第四章 前端Cookies问题
* [04-01](https://github.com/TYRMars/WebsafeLearn#04-01) `Cookies特性`
* [04-02](https://github.com/TYRMars/WebsafeLearn#04-02) `Cookies作用`
* [04-03](https://github.com/TYRMars/WebsafeLearn#04-03) `Cookies和XSS CSRF的关系与案例`
* [04-04](https://github.com/TYRMars/WebsafeLearn#04-04) `Cookies安全策略🔐`
---

## 01-01
### Web安全简述
* Web安全简述

## 02-01
### XSS介绍
* Cross Site Scripting
* 跨站脚本攻击
* 运行了来自别的网站的脚本！！！


#### XSS攻击
* 在URL中加入脚本loacalhost:8080/?from`<script>alert(1)</script>`Google
* 会弹出1
* 如果`<script>alert(1)</script>`改为`<script src="http://code.jquery.com/jquery-3.2.1.min.js"></script>`
* 在浏览器的控制台中`windows.jQuery`,`jQuery.fn.jquery`得到jquery版本是`3.2.1`
* 于是完成了一次跨站脚本攻击XSS

#### XSS攻击原理
* 程序+数据=结果
    * `<div>#{content}</div>`=>`content:Hello world!`=>`<div>Hello world</div>`
    * `<div>#{content}</div>`=>`content:<script>alert(1)</script>`=>`<div><script>alert(1)</script></div>`

#### XSS攻击危害
* 弹个框能上天！！！
#### Scripting
* 获取页面数据
* 获取Cookies
* 劫持前端逻辑
* 发送请求
* 。。。


* 偷取网站任意数据
* 偷取用户资料
* 偷取用户密码和登录态
* 欺骗用户
* 。。。
