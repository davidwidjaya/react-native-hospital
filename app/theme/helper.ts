import React, { Component } from "react";

var blacklist = [
    {
        str: "fopen"
    },
    {
        str: "filesize()"
    },
];

export class Helper {

    static formatThousand(num) {
		num = num.toString().replace(/\$|\,/g, '');
		if (isNaN(num)) {
			num = "";
		}

		var sign = (num == (num = Math.abs(num)));
		num = Math.floor(num * 100 + 0.50000000001);
		cents = num % 100;
		num = Math.floor(num / 100).toString();

		if (cents < 10) {
			cents = "0" + cents;
		}
		for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
			num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
		}

		return (((sign) ? '' : '-') + num);
    }
    
    static formatMonthString(num) {
        var paramMonth = num;

        if(paramMonth == 1){
            return "January"
        }
        else if(paramMonth == 2){
            return "February"
        }
        else if(paramMonth == 3){
            return "March"
        }
        else if(paramMonth == 4){
            return "April"
        }
        else if(paramMonth == 5){
            return "May"
        }
        else if(paramMonth == 6){
            return "June"
        }
        else if(paramMonth == 7){
            return "July"
        }
        else if(paramMonth == 8){
            return "August"
        }
        else if(paramMonth == 9){
            return "September"
        }
        else if(paramMonth == 10){
            return "October"
        }
        else if(paramMonth == 11){
            return "November"
        }
        else if(paramMonth == 12){
            return "December"
        }
        else{
            return ""
        }
    }

    static isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    static blacklist_error(message) {
        var str = true;

        blacklist.map((item, key)=>{
            if(message.toLowerCase().includes(item.str)){
                str = false;
            }
        });

        return str;
    }

    static formatDate(date) {
        var transDate_time = date.split(" ");
        var transDate = transDate_time[0].split("-");
        var day = transDate[2];
        var month = this.formatMonthString(transDate[1]);
        var year = transDate[0];
        var tanggal = day + " " + month + " " + year;

        return tanggal;
    }

    static formatDateNum(date) {
        var transDate_time = date.split(" ");

        return transDate_time[0];
    }

    static formatTimeHM(date) {
        var transDate_time = date.split(" ");
        var transTime = transDate_time[1].split(":");
        var hour = transTime[0];
        var min = transTime[1];
        var waktu = hour + ":" + min ;

        return waktu;
    }
}