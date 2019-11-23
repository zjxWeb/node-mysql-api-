# API接口文档说明

1. 短信验证：https://www.juhe.cn聚合数据

   + url:`url+/duanxi_send`

   + 请求方式：post

   + 传值：
   
     ```
      "mobile":req.body.phone,  // 接受短信的用户手机号码
             "tpl_id": 19928,  // 您申请的短信模板ID，根据实际情况修改
             "tpl_value": `#code#=${code}`,  // 您设置的模板变量，根据实际情况修改
          "key":' 1899c0809ae404d49522c786d32e3252',  // 应用APPKEY(应用详细页查询)
     ```

     

   + 返回值：
   
     ```{
      "reason": "错误的短信模板ID,请通过后台确认!!!",
     
       "result": null,
     
       "error_code": 205402,
     
       "code": "222184"
     
     }
     ```

2. 查询所有的图书

   + url:`url+/books`
   + 请求方式：get
   + 返回值：图书的信息
     + 格式：数组

3. 根据id查询图书

   + url:`url+/books/book/:id`
   + 请求方式：get
   + 返回值：id对应的图书信息
     + 格式：数组

4. 添加图书：

   + url：`url+/books/book`

   + 请求方式：post

   + 传值：

     ```
     id：？；
     
     name：？； 
     
     author：？； 
     
     category：？；
     
     description：？；
     ```

   + 返回值：

     + 成功：flag:1
     + 失败：flag:2

5. 编辑方式

   + url：`url+/books/book`

   + 请求方式：put

   + 传值：

     ```
     id：？；
     
     name：？； 
     
     author：？； 
     
     category：？；
     
     description：？；
     ```

   + 返回值：

     + 成功：flag:1
     + 失败：flag:2

6. 删除方式

   + url：`url+/books/book`/:id:
   + 请求方式：delete
   + 返回值：
     + 成功：flag:1
     + 失败：flag:2