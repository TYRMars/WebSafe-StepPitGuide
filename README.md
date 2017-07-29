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
* XXS 跨站脚本攻击
* 运行了来自别的网站的脚本！！！

#### XSS攻击
* 在URL中加入脚本`loacalhost:8080/?from`<script>alert(1)</script>`Google`
* 会弹出1
* 如果`<script>alert(1)</script>`改为`<script src="http://code.jquery.com/jquery-3.2.1.min.js"></script>`
* 在浏览器的控制台中`windows.jQuery`,`jQuery.fn.jquery`得到jquery版本是`3.2.1`
* 于是完成了一次跨站脚本攻击XSS

#### XSS攻击原理
* 程序+数据=结果
    * `<div>#{content}</div>`=>`content:Hello world!`=>`<div>Hello world</div>`
    * `<div>#{content}</div>`=>`content:<script>alert(1)</script>`=>`<div><script>alert(1)</script></div>`

#### XSS攻击危害
* 从以上弹框，弹个框能上天！！！

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

#### 实际案例

“微博病毒”攻击事件回顾：

2011年6月28日晚，新浪微博出现了一次比较大的XSS攻击事件。大量用户自动发送诸如：“郭美美事件的一些未注意到的细节”，“建党大业中穿帮的地方”，“让女人心动的100句诗歌”，“3D肉团团高清普通话版种子”，“这是传说中的神仙眷侣啊”，“惊爆!范冰冰艳照真流出了”等等微博和私信，并自动关注一位名为hellosamy的用户。

事件的经过线索如下：

20:14，开始有大量带V的认证用户中招转发蠕虫

20:30，某网站中的病毒页面无法访问

20:32，新浪微博中hellosamy用户无法访问

21:02，新浪漏洞修补完毕

## 02-02
### XSS攻击类型
* 基本可以分为
    * 反射型
    * 存储型

### 反射型
* URL参数直接注入
* 反射型XSS攻击传播，需要攻击把带有脚本的URL传播给用户
`http://loacalhost:8080/?from<script>alert(1)</script>Google`
* 一般都会看出URL有问题
* 所以攻击者会对URL做出变换 利用短网址,可以通过`dwz.cn`进行转换
*

### 存储型攻击
* 存储到DB后读取时注入
  * xss代码会保存到网站的数据中，比如保存到数据库，当其他用户在访问到一篇文章或一个评论时，这段代码会被从数据库中读取取出来，显示在用户页面上
* XSS攻击注入点
  * HTML节点内容
  * HTML属性
  * JavaScript代码
  * 富文本

#### 1. HTML节点内容

```HTML
<div>
  #{content}
</div>
<div>
  <script>
  </script>
</div>
```

##### 案例

* URL输入`1"onerror="alert(1)`导致的问题

```HTML
<img src="#{image}" alt="图片">
<img src="1" onerror="alert(1)"/>
```

1. URL中请求图片时`search`传递`id`:`http://loacalhost:8080/?imgid=1`

```HTML
<!-- 正常情况下搜索到id为1的图片 -->
<img src="/image/1" >
```

2. 当我改变URL中的请求时:`http://loacalhost:8080/?imgid=1" onerror="alert(1)`

```HTML
<!-- 改变后的情况 -->
<img src="/image/1" onerror="alert(1)" >
<!-- " onerror="alert(1)  -->
```

* 这样`src`属性被提前关闭，出现了一个onerror属性，就会出现弹框！！！

#### 2. JavaScript代码

```HTML
<script>
var data = "#{data}";
var data = "hello";alert(1);"";
</script>
```

##### 案例

* 以XXX来登录，页面上会显示“欢迎Google登录”

```HTML
<script>
var from = "Google"//此段代码是传递到页面上
</script>
```


1. URL中由数据库获取传递`id`:`http://loacalhost:8080/?from=Google`

```HTML
<!-- 正常情况下搜索到id为1的图片 -->
<script>
var from = "Google"//此段代码是传递到页面上
</script>
```

2. 当我改变URL中的请求时:`http://loacalhost:8080/?from=Googel";alert(1);"`

```HTML
<!-- 改变后的情况 -->
<script>
var from = "Google";alert(1);""//此段代码是传递到页面上
</script>
<!-- ";alert(1);"  -->
```

* 这样`from`属性被关闭，中间会注入了`alert`，就会出现弹框！！！

#### 3. 富文本
