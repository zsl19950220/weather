//请求天气相关数据
//1.声明变量url保存请求的地址
//2.声明变量city保存请求的城市
//3.声明变量data保存请求回来的数据
//4.使用ajax发起请求
//5.在ajax的success回调函数中执行获取数据之后的渲染操作
//
let url = "https://www.tianqiapi.com/api/";
let city = "太原";
let data = null;
let appid = 35931589;
let password = "KiH951lu";

//获取显示国家的元素
let country = document.querySelector(".weather>span");

//获取显示当天温度的元素
let todayEle = document.querySelector(".wendu");

//获取当天的星期和时间
let todays = document.querySelector(".xingqi>.span1");


//获取当几时的的情况反馈回来的温度
let xingqi = document.querySelector(".time-weather");

//获取整个星期的情况
let weekDetail = document.querySelector(".week-weather>.week")

//获取生活指数里面的内容
let lifeFtyle = document.querySelector(".shzs-kapian")

//获取小箭头
let jiantou = document.querySelector(".jiantou>img")

ajax({
    url: url,
    data: {
        city: city,
        appid: appid,
        appsecret: password
    },
    async: true,
    type: "get",
    dataType: "json",
    success: (res) => {
        data = res;
        nowWea(data);
        hours(data);
        week(data);
        lifeIndex(data);
        air(data);
    }
})

//封装一个实时天气的函数
function nowWea(data) {
    let today = data.data[0];

    //渲染当天星期几
    todays.innerHTML = today.week;

    //渲染当时的国家
    country.innerHTML = data.country;

    //渲染实时的天气
    let str = "";
    str = `<div class="font-qu">
    <span>${data.city}</span>
</div>
<div class="dushu">
    <span>${today.tem.slice(0,-1)}°</span>
</div>
<div class="dushu-d-img">
    <div class="dushu-d">
        <span>${today.tem1.slice(0,-1)}°~${today.tem2.slice(0,-1)}°${today.wea.slice(0,-1)}</span>
        <div class="dushu-img">
            <img src="img/${today.wea_img}.png" alt="">
        </div>
    </div>
</div>`;
    todayEle.innerHTML = str
}

//逐小时的天气预报函数
function hours(data) {
    //获取当天的星期

    let hour = data.data[0].hours;
    //对逐小时天气预报进行循环遍历，渲染在页面中
    let str = "";
    hour.forEach(v => {
        str += `<div class="time">
        <div class="time-f jiacu">${v.day.substr(3,3)}</div>
        <div class="time-img"><img src="img/${data.data[0].wea_img}.png" alt=""></div>
        <div class="time-du jiacu">${v.tem.slice(0,-1)}°</div>
    </div>`;
    })
    xingqi.innerHTML = str;
}

//7天天气预报
function week(data) {
    let weekWea = data.data;
    let str = "";
    weekWea.forEach(v => {
        str += `<li class="week-day">
        <span class="week-f">${v.week}</span>
        <span class="week-img"><img src="img/${v.wea_img}.png" alt=""></span>
        <span class="week-ff">${v.tem1.slice(0,-1)}</span>
        <span class="week-fff">${v.tem2.slice(0,-1)}</span>
    </li>`;
    })
    weekDetail.innerHTML = str
}



//生活指数的函数
function lifeIndex(data) {
    let todayIndex = data.data[0].index;
    let str = "";
    todayIndex.forEach(v => {
        str += `<div class="swiper-slide">
        <div class="shzs-kapian-content">
            <div class="content-img">
            <img src="img/穿衣.jpg" alt="">
            </div>
            <div class="content-font">
                <h3>${v.title}</h3>
                <p>${v.desc}</p>
            </div>
        </div>
    </div>`
    })
    lifeFtyle.innerHTML = str

    //实例化swiper
    var mySwiper = new Swiper('.swiper-container', {
        //autoplay: true, //可选选项，自动滑动

        loop: true,
        effect: 'coverflow',
        coverflowEffect: {
            stretch: 15,
            rotate: 0,
            depth: 300,
            slideShadows: false,
        },
    })
}

//空气质量的判断
function air(data) {
    let airLevel = data.data[0];
    console.log(airLevel)
    if (airLevel.air_level == "优") {
        jiantou.style.marginLeft = 0 + "rem";
    } else if (airLevel.air_level == "良") {
        jiantou.style.marginLeft = 0.75 + "rem";
    } else if (airLevel.air_level == "轻度") {
        jiantou.style.marginLeft = 1.5 + "rem";
    } else if (airLevel.air_level == "中度") {
        jiantou.style.marginLeft = 2.25 + "rem";
    } else if (airLevel.air_level == "重度") {
        jiantou.style.marginLeft = 2.66 + "rem";
    } else if (airLevel.air_level == "严重") {
        jiantou.style.marginLeft = 3.475 + "rem";
    }

}