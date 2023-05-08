package db

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func ConcentMysql() {
	dsn := "root:root@tcp(127.0.0.1:3306)/curd_list?charset=utf8"
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		fmt.Println("db err : ", err)
	}
	defer db.Close()
	defer fmt.Println("数据库断开")
	fmt.Println("数据库链接成功")
}
