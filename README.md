<h1 align="center">Web前后端漏洞分析与防御-知识梳理📖</h1>
<p align="center"><img src="http://www.kejiganhuo.tech/wp-content/uploads/2017/03/cropped-319907-106.jpg" /></p>

---

* [X](https://github.com/TYRMars/WebsafeLearn#X)`自己对Web安全的探索`

# 目录
#### 第一章 Web-前置知识
* [01-01](https://github.com/TYRMars/WebsafeLearn#01-01) `HTTP协议`
* [01-02](https://github.com/TYRMars/WebsafeLearn#01-01) `前端通信`
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
### HTTP协议
* HTTP协议的主要特点
* HTTP报文的组成部分
* HTTP方法
* POST和GET的区别
* HTTP状态码
* 什么是持久链接
* 什么是管线化

#### HTTP协议主要特点
* 简单快速：每个资源每个url，统一资源符是固定的
* 灵活：每个HTTP协议头部都有数据类型，就可以通过HTTP协议完成不同的数据类型传输
* 无连接：连接一次就会断掉
* 无状态：客户端和服务器端两种身份，无法区别上一次连接和这一次连接的身份（通过session可以实现身份识别）

#### HTTP报文
* HTTP请求报文：请求行、请求头、空行、请求体
    * 请求行：包含HTTP方法、页面地址、HTTP协议、以及版本
    * 请求头：Key-Value值告诉服务端我需要哪些内容
    * 空行：下一个是请求体，需要解析
* HTTP相应报文：状态行、响应头、空行、响应体

#### POST和GET的区别
* GET在浏览器回退时是无害的，而POST会再次提交请求
* GET产生的URL地址可以被收藏，而POST不可以
* GET请求会被浏览器主动缓存，而POST不会，除非手动设置
* GET请求只能进行URL编码，而POST支持多种编码方式
* GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留
* GET请求在URL中传送的参数是有长度限制的，而POST没有长度限制
* 对参数的数据类型，GET只能请求ASCII字符，而POST没有限制
* GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传敏感信息
* GET参数通过URL传递，POST放在Request body中

#### HTTP状态码
* 1XX：指示信息-表示请求已接受，继续处理
* 2XX：成功-表示请求已被成功接收
    * 200 OK ：客户端请求成功
    * 206 Partial Content：客户发送一个带有Range头的GET请求，服务器完成了它 播放视频和音频
* 3XX：重定向-要完成请求必须进行更进一步的操作
    * 301 Move Permanently：所请求的页面已经转移至新的URL
    * 302 Found：所请求的页面已经临时转移到新的URL
    * 304 Not Modified：客户端有缓冲的文档并发出一个条件性的请求，服务器告诉客户，原来缓冲的文档还可以继续使用
* 4XX：客户端错误-请求有语法错误或请求无法实现
    * 400 Bad Request：客户端请求有语法错误，不能被服务器所理解
    * 401 Unauthorized：请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用
    * 403 Forbidden：对被请求页面的访问被禁止
    * 404 Not Found：请求资源不存在
* 5XX：服务错误-服务器未能实现合法的请求
    * 500 Internal Server Error：服务器发生不可预期的错误原来缓冲的文档还可以继续使用
    * 503 Server Unavailable：请求未完成，服务器临时过载或当机，一段事件后恢复正常

#### HTTP 持久连接 (HTTP1.1)
* HTTP协议采用“请求-应答”模式，使用普通模式，即非Keep-Alive模式时，每个请求／应答客户和服务器都要新建一个连接，完成之后立即断开连接（HTTP协议为无连接的协议）
* 当使用Keep-Alive模式（又称持久连接，连接重用）时，Keep-Alive功能使客户端到服务器端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive功能避免了建立或者重新建立连接

#### 管线化
* 在使用持久连接的情况下，某个连接上消息的传递类似于
* 请求1->响应1->请求2->响应2->请求3->响应3
* 管线化，变成了以下情况（把所有的请求都打包📦发到服务端，然后服务端所有响应也打包📦响应回来）
* 请求1->请求2->请求3->响应1->响应2->响应3

* 管线化机制通过持久连接完成，仅HTTP／1.1支持此技术
* 只有GET和HEAD请求可以完成管线化，而POST则有所限制
* 初次创建连接时不应启动管线化，因为对方（服务器）不一定支持HTTP／1.1版本的协议
* 管线化不会影响响应到来的顺序
* HTTP/1.1要求服务器端支持管线化，但并不要求服务器端也对响应进行管线化处理，只是要求对于管线化的请求不失败即可

## 01-02
### 前端通信
* 什么是同源策略及限制
* 前后端如何通信
* 如何创建Ajax
* 跨域通信的几种方式

#### 同源策略及限制
* 同源限制从一个源加载的文档或脚本如何于来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的关键的安全机制。
    * Cookie、LocalStorage和IndexDB无法读取
    * DOM无法读取
    * AJAX不能发送请求

#### 前后端如何通信
* Ajax
* WebSocket
* CORS

#### 如何创建AJAX
* XMLHttpRequest对象的工作流程
* 兼容性处理
* 事件的触发条件
* 事件的触发顺序

```JavaScript

```

#### 跨域通讯📞的几种方式
* JSONP
* Hash
* postMessage(HTML5新增)
* WebSocket
* CORS支持跨域通讯的AJAX

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
* 富文本得保留HTML
* HTML有XSS攻击风险

#### 浏览器自带的XSS攻击拦截机制
* 设置Header X-XSS-Protection
* 此机制只适用于参数出现在HTML内容或属性才会去拦截
* 只适用于反射型
* 并不是所有浏览器都支持

## 02-03
### HTML内容和属性转义

#### HTML内容转义

* 尖括号的替换`<,>`

```HTML
<div>
#{content}
</div>
```

* 转义< `&lt;` 和 > `&gt`

```JavaScript
var escapeHtml = function(str) {
  if(!str) return '';
  str = str.replace(/</g,'&lt;');//替换成html实体
  str = str.replace(/>/g,'&gt;');
  return str;
}
```

#### HTML属性转义

* HTML属性

```HTML
<img class="#{class}" />
<img class="hello" onload="alert(1)" />
```

* 将`"`和`'`进行转义

```JavaScript
var = escapeHtmlProperty = function(str) {
  if(!str) return '';
  str = str.replace(/"/g,'&quto');
  str = str.replace(/'/g,'&39');
  str = str.replace(/ /g,'&32');
  return str;
}
```

#### 总结
```JavaScript
var escapeHtml = function(str) {
  if(!str) return '';
  str = str.replace(/</g,'&lt;');//替换成html实体
  str = str.replace(/>/g,'&gt;');
  str = str.replace(/"/g,'&quto');
  str = str.replace(/'/g,'&39');
  str = str.replace(/ /g,'&32'); //遵循书写规则，可以不做转义
  return str;
}
```

---

## X
### XSS攻击-关于URL
* 问: 如果对URL传值的时候做encodeURICompoment,在接收的时候decodeURLComponent,是不是这样也可以放置XSS攻击呢？
* 答：`不能，因为XSS攻击的重点不在于传输过程中有没有转义，而在于最后输出的时候有没有意义。如果我传输一段脚本,它直接显示出来，这是XSS攻击，但如果我做了某种encode，但是显示的时候又decode，那实际上相当于什么也没做。类似的SQL注入也是同样原理，只要在拼接SQL的时候用的原来的值，不管传输过程中有没有转义，都没有起到防御作用`
