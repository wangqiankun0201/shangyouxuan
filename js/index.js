/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-24 20:02:52
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-27 11:57:13
 * @FilePath: \毕业设计c:\Users\王乾坤\Desktop\商优选\js\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 作用：需要将所有的DOM元素对象以及相关的资源全部都加载完毕之后，再来实现的事件函数
window.onload = function () {
    // 声明一个记录点击的缩略图下标
    var bigimgIndex = 0;
    //路径导航数据渲染
    navPathDataBind();

    function navPathDataBind() {
        // 1.获取页面导航的元素对象
        var navPath = document.getElementById("navPath");
        // 2.获取数据
        var path = goodData.path;
        // 3.遍历数据
        for (var i = 0; i < path.length; i++) {
            if (i == path.length - 1) {
                var aNode = document.createElement('a');
                aNode.innerText = path[i].title
                navPath.appendChild(aNode);
            } else {
                // 4.创建a标签
                var aNode = document.createElement("a");
                aNode.href = path[i].url;
                aNode.innerText = path[i].title;
                // 5.创建i标签
                var iNode = document.createElement("i");
                iNode.innerText = "/";
                // 6.让navPath元素追加a和i
                navPath.appendChild(aNode);
                navPath.appendChild(iNode);
            }
        }

    }

    // 放大镜的移入和移出效果
    bigClassBind();

    function bigClassBind() {
        // 1.获取小图框元素
        var smallPic = document.getElementById("smallPic");
        var leftTop = document.getElementById("leftTop");
        // 2.设置移入事件
        smallPic.onmouseenter = function () {
            // 3.创建蒙版元素
            var maskDiv = document.createElement("div");
            maskDiv.className = "mask";
            // 4.创建大图框元素
            var bigPic = document.createElement('div');
            bigPic.id = "bigPic";
            // 5.创建大图片元素
            var bigImg = document.createElement('img');
            bigImg.src = goodData.imagessrc[bigimgIndex].b;
            // 6.大图框追加大图片
            bigPic.appendChild(bigImg);
            // 7.小图框追加蒙版
            smallPic.appendChild(maskDiv);
            // 8.追加大图框
            leftTop.appendChild(bigPic);
            // 9.设施移出事件
            smallPic.onmouseleave = function () {
                // 10.小图框移出蒙版元素
                smallPic.removeChild(maskDiv);
                // 11.让leftTop元素移出大图框
                leftTop.removeChild(bigPic);
            }
            // 12.添加移动事件
            smallPic.onmousemove = function (event) {
                // 13.蒙版左侧距离
                var left = event.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth / 2;
                if (left < 0) {
                    left = 0;
                } else if (left > smallPic.offsetWidth - maskDiv.offsetWidth) {
                    left = smallPic.offsetWidth - maskDiv.offsetWidth;
                }
                maskDiv.style.left = left + 'px';
                // 14.蒙版右侧距离
                var top = event.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetHeight / 2;
                if (top < 0) {
                    top = 0;
                } else if (top > smallPic.offsetHeight - maskDiv.offsetHeight) {
                    top = smallPic.offsetHeight - maskDiv.offsetHeight;
                }
                maskDiv.style.top = top + 'px';

                // 比例关系
                var scaleX = (smallPic.offsetWidth - maskDiv.offsetWidth) / (bigImg.offsetWidth - bigPic.offsetWidth);
                bigImg.style.left = -left / scaleX + 'px';
                var scaleY = (smallPic.offsetHeight - maskDiv.offsetHeight) / (bigImg.offsetHeight - bigPic.offsetHeight);
                bigImg.style.top = -top / scaleX + 'px';

            }
        }
    }
    // 动态渲染放大镜缩略图
    thumbnailData();

    function thumbnailData() {
        // 1.获取ul元素
        var list = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom #piclist ul");
        // 2.获取动态数据
        var images = goodData.imagessrc;
        // 3.循环创建元素
        for (var i = 0; i < images.length; i++) {
            // 4.创建li元素
            var li = document.createElement('li');
            // 5.创建img元素
            var img = document.createElement('img');
            // 6.为ul元素添加路径属性
            img.src = images[i].s;
            // 7.将img元素追加为li的子元素
            li.appendChild(img);
            // 8.将li元素追加为ui的子元素
            list.appendChild(li);

        }
    }

    // 点击缩略图的效果
    thumbnailClick();

    function thumbnailClick() {
        // 1.获取所有的li元素
        var liNodes = document.querySelectorAll("#wrapper #content .contentMain #center #left #leftBottom #piclist ul li");
        var small = document.querySelector("#wrapper #content .contentMain #center #left #leftTop #smallPic img");
        small.src = goodData.imagessrc[0].s;
        // 2.为li绑定点击事件
        for (var i = 0; i < liNodes.length; i++) {
            // 3.在点击事件之前，为每一个元素都添加上自定义的下标
            liNodes[i].index = i;
            liNodes[i].onclick = function () {
                var idx = this.index;
                bigimgIndex = idx;
                // bigClassBind();
                small.src = goodData.imagessrc[idx].s
            }

        }

    }
    // 点击按钮的效果
    aClick();

    function aClick() {
        // 1.获取左侧按钮
        var firstA = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a:first-child');
        // 2.获取右侧按钮
        var lastA = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom a:last-child");
        // 3.获取小图片
        // var smallimg = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic img');
        // var piclict = document.getElementById('piclist');
        var ul = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom #piclist ul");
        var liNodes = document.querySelectorAll("#wrapper #content .contentMain #center #left #leftBottom #piclist ul li");

        // 4.计算
        var start = 0;
        var step = (liNodes[0].offsetWidth + 20) * 2;
        var endPosition = (liNodes.length - 5) * (liNodes[0].offsetWidth + 20);
        // 5.为左侧按钮绑定点击事件
        firstA.onclick = function () {
            start -= step;
            if (start < 0) {
                start = 0;
            }
            ul.style.left = -start + 'px';
        }
        // 5.为右侧按钮绑定点击事件
        lastA.onclick = function () {
            start += step;
            if (start > endPosition) {
                start = endPosition;
            }
            ul.style.left = -start + 'px';

        }
    }

    // 商品详情数据的动态渲染
    rightTopData();

    function rightTopData() {
        // 1.查找元素
        var rightTop = document.getElementsByClassName('rightTop')[0];
        // 2.查找数据
        var goodsDetail = goodData.goodsDetail;
        var s = `<h3>${goodsDetail.title}</h3>
                            <p>${goodsDetail.recommend}</p>
                            <div class="priceWrap">
                                <div class="priceTop">
                                    <span>价&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                                    <div class="price">
                                        <span>￥</span>
                                        <p>${goodsDetail.price}</p>
                                        <i>降价通知</i>
                                    </div>
                                    <p>
                                        <span>累积评价</span>
                                        <span>${goodsDetail.evaluateNum}</span>
                                    </p>

                                </div>
                                <div class="priceBottom">
                                    <span>促&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                                    <p>
                                        <span>${goodsDetail.promoteSales.type}</span>
                                        <span>${goodsDetail.promoteSales.content}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="support">
                                <span>支&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                                <p>${goodsDetail.support}</p>
                            </div>
                            <div class="address">
                                <span>配&nbsp;送&nbsp;至</span>
                                <p>${goodsDetail.address}</p>
                            </div>`
        rightTop.innerHTML = s;
    }

    // 商品参数数据的动态渲染
    rightBottomData();

    function rightBottomData() {
        // 1.获取chooseWrap元素对象
        var chooseWrap = document.getElementsByClassName('chooseWrap')[0];
        // 2.获取参数数据
        var phoneData = goodData.goodsDetail.crumbData;
        // 3.循环遍历创建dl
        for (var i = 0; i < phoneData.length; i++) {
            // 4.创建dl
            var dl = document.createElement('dl');
            // 5.创建dt
            var dt = document.createElement('dt');
            // 8.将dt追加到dl上
            dl.appendChild(dt);
            // 6.为dt添加数据
            dt.innerText = phoneData[i].title;
            // 7.创建dd
            for (var j = 0; j < phoneData[i].data.length; j++) {
                var dd = document.createElement('dd');
                dd.innerText = phoneData[i].data[j].type;
                dd.setAttribute('price', phoneData[i].data[j].changePrice);
                dl.appendChild(dd);
            }
            dl.querySelector('dd').className = "colorlist";

            // 9.将dl追加到chooseWrap
            chooseWrap.appendChild(dl);

        }
    }

    // 商品参数的排他效果
    onlyOne();

    function onlyOne() {
        //  1，获取所有的dl
        var dlNodes = document.querySelectorAll("#wrapper #content .contentMain #center #right .rightBottom .chooseWrap dl");
        var arr = new Array(dlNodes.length);
        var chooseDiv = document.getElementsByClassName("choose")[0];
        arr.fill(0);
        for (var k = 0; k < dlNodes.length; k++) {
            // 2.获取第一个dl下的dd
            (function (k) {
                var ddNodes = dlNodes[k].querySelectorAll('dd');
                // 遍历当前所有的dd元素
                // for(var i = 0;i<ddNodes.length;i++){
                //     ddNodes[i].onclick = function(){
                //         for(var j =0;j<ddNodes.length;j++){
                //             ddNodes[j].style.color = "#666";
                //         }
                //         this.style.color = "red";
                //     }
                // }

                for (var i = 0; i < ddNodes.length; i++) {
                    ddNodes[i].onclick = function () {
                        chooseDiv.innerHTML = '';
                        for (var j = 0; j < ddNodes.length; j++) {
                            ddNodes[j].className = "";
                        }
                        this.className = 'colorlist';

                        // 点击哪一个dd元素动态的产生一个新的mark元素
                        arr[k] = this;
                        changePriceBind(arr);

                        arr.forEach(function (value, index) {
                            if (value) {
                                // 创建mark元素
                                var markDiv = document.createElement('div');
                                markDiv.className = 'mark';
                                markDiv.innerText = value.innerText;
                                // 创建a元素
                                var aNode = document.createElement('a');
                                aNode.innerText = "X";
                                // 为a元素设置index属性
                                aNode.setAttribute('index', index);
                                // mark元素追加a元素
                                markDiv.appendChild(aNode)
                                // choose元素追加mark元素
                                chooseDiv.appendChild(markDiv);
                            }
                        })
                        // 获取所有a标签元素，并且循环发生点击事件
                        var aNodes = document.querySelectorAll('#wrapper #content .contentMain #center #right .rightBottom .choose .mark a');

                        for (var n = 0; n < aNodes.length; n++) {
                            aNodes[n].onclick = function () {
                                // 获取点击的a标签上的index属性值
                                var idx1 = this.getAttribute('index');
                                // 恢复数组中对应下标元素值
                                arr[idx1] = 0;
                                changePriceBind(arr)

                                // 找到对应的dl行中的所有的dd元素
                                var ddlist = dlNodes[idx1].querySelectorAll('dd');
                                // 将所有dd恢复默认颜色
                                for (var m = 0; m < ddlist.length; m++) {
                                    ddlist[m].className = '';
                                }
                                // 为第一个dd添加红色
                                ddlist[0].className = 'colorlist';
                                // 删除当前mark元素
                                chooseDiv.removeChild(this.parentNode);
                            }
                        }
                    }
                }
            })(k);




        }

    }

    // 价格变动的函数声明
    //这个函数只有点击dd或者删除mark标记时才需要调用
    function changePriceBind(arr) {
        // 获取价格的标签元素
        
        var price1 = document.querySelector("#wrapper #content .contentMain #center #right .rightTop .priceWrap .priceTop .price > p");
        var oldPrice = goodData.goodsDetail.price;
        var oldprice = document.querySelector("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p");
        var newPrice = document.querySelector("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i");
        // 遍历arr数组
        for(var i = 0;i<arr.length;i++){
            if(arr[i]){
            oldPrice+=Number(arr[i].getAttribute('price'));
            }
        }
        price1.innerText =oldPrice;
        oldprice.innerText = "￥"+oldPrice;
        var inps = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li div input');
        for(var m = 0;m<inps.length;m++){
            if(inps[m].checked){
                oldPrice += Number(inps[m].value);
            }
        }
        newPrice.innerText = "￥" + oldPrice;
        
    }

    // 选择搭配中建区域复选框选中套餐价变动效果
    choosePrice();
    function choosePrice(){
        // 获取中间区域复选框元素
        var inps = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li div input');
        
         
        for(var i = 0;i<inps.length;i++){
            inps[i].onclick = function(){
                var oldprice = Number(document.querySelector("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p").innerText.slice(1));
                var newPrice = document.querySelector("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i");
                for(var j = 0;j<inps.length;j++){
                    if(inps[j].checked){
                        oldprice += Number(inps[j].value);
                    }
                }
                newPrice.innerText = "￥"+oldprice;
            }
        }
    }

    // 封装一个公共的选项卡函数
    function tabfn(tabBtns,tabConts){
        for(var i =0;i<tabBtns.length;i++){
            tabBtns[i].index =i;
            tabBtns[i].onclick = function(){
                for(var j =0;j<tabBtns.length;j++){
                    tabBtns[j].className = '';
                    tabConts[j].className = '';
                }
                this.className = 'active';
                tabConts[this.index].className = 'active';
            }

        }
    }

    // 点击左侧选项卡
    leftTab();
    function leftTab(){
        // 被点击元素
        var h4s = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideTop h4');
        // 被切换显示元素
        var divs = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideBottom >div");
        tabfn(h4s,divs);
        
    }

    // 点击右侧选项卡
    rightTab();
    function rightTab(){
        // 被点击元素
        var lis = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .bottomDetail .tabBtns li");
        // 被切换显示元素
        var divs = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .bottomDetail .tabContents div");
        tabfn(lis,divs);

    }
    // 右边侧边栏的点击效果
    rightAsideBind();
    function rightAsideBind(){
        //找到按钮元素发生点击事件
        var btn = document.querySelector('#wrapper .rightAside .btns');
        // 记录初始状态
        var flag = true;
        // 绑定点击事件
        btn.onclick = function(){
            if(flag){
                flag = false;
                btn.className = 'btns btnsOpen';
                btn.parentNode.className = 'rightAside asideOpen';
            }else{
                flag = true;
                btn.className = 'btns btnsClose';
                btn.parentNode.className = 'rightAside asideClose';
            }

        }
    }

}