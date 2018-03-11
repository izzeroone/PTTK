# Phân tích thiết kế hệ thống thông tin
## Yêu cầu
Yêu cầu cài đặt mariadb hoặc mysql

## Cấu hình
Mở file input/api/server/connectors.js

const db = new Sequelize('QLCL', "zerotwo", "002", {
    host: 'localhost',
    dialect: 'mysql'
});

Sửa QLCL thành tên database
zerotwo thành username đăng nhập
002 là mật khẩu

## Cài đặt

$ meteor npm install --no-optional

## Chạy

$ meteor

The URL is: http://localhost:3000/
