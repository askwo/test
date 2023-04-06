var IndexPage = {};
IndexPage.menu_status = 1;//左侧菜单状态，1：展开 0：收缩，默认展开

/**
 * 菜单的收起和展开
 * @param {DOMElement} 当前单击的DOM节点，this
 */
IndexPage.menuAct = function(obj) {
    var w = $(".leftbox").width();//获取左侧菜单的宽度
    if (w > 200) {
        $(".leftbox").removeAttr("style");
        $(".leftbox").addClass("ss");
        $(".mainiframe").css({width:"calc(100% - 50px)"});
        $(".nav_and_port").css({width:"calc(100% - 50px)"});
        obj.className = "iconfont icon-unfold_menu";
        this.menu_status = 0;
        $("nav").removeAttr("style");
    } else {
        $(".leftbox").removeClass("ss");
        var w2 = $(".leftbox").width();
        $(".mainiframe").css({width:"calc(100% - "+w2+"px)"});
        $(".nav_and_port").css({width:"calc(100% - "+w2+"px)"});
        obj.className = "iconfont icon-fold_menu";
        this.menu_status = 1;
    }
    document.getElementById('mainiframe').contentWindow.location.reload(true);  
}

/**
 * 一级菜单的单击
 * @param {DOMElement} obj 当前单击的DOM节点
 * @returns 
 */
IndexPage.openmenu = function(obj) {
    //判断是否有子菜单
    var ishave_second = $(obj).next().length;
    if (ishave_second === 0) {
        //jquery方式修改右侧的导航面包屑
        $("#whichpage").text('');
        var menuname = $(obj).children("span").html();
        var reg = /<script.*>.*<\/script>/g;
        menuname = menuname.replace(reg, "");
        $("#whichpage").prev("span").text(menuname);
        sessionStorage.removeItem("curHrefUrl");
        /*javascript 原生方式修改右侧的导航面包屑
        document.getElementById("whichpage").innerText = '';
        var menuname = obj.lastElementChild.innerHTML;
        var reg = /<script.*>.*<\/script>/g;
        menuname = menuname.replace(reg, "");
        var prevs = document.getElementById("whichpage").previousElementSibling;
        prevs.innerText = menuname;
        */
    }
    
    //如果菜单是收起的状态，则不执行后面的操作
    if (this.menu_status === 0) {
        return;
    }
    //判断是否有二级菜单
    if (ishave_second == 0) {
        $(".havemenu").not(obj).removeClass("active");
        $(".havemenu").removeClass("on");
        $(".sec_menu").removeClass("on");
        $("nav").hide();
        $(".down_box").removeAttr("style");
        $(obj).addClass("active");
        var iframe = document.getElementById("mainiframe");
        iframe.onload = function(){
            document.getElementById("mainiframe").contentWindow.showPageTab("","");
        }
        return;
    }
    $(".havemenu").not(obj).removeClass("active");
    $(".havemenu").not(obj).removeClass("on");
    $(".havemenu").not(obj).next("nav").slideUp();
    $(obj).addClass("on");
    
    var status = $(obj).next().css("display");
    $(".havemenu").not(obj).children(".down_box").css("transform","rotate(360deg)");
    if (status == "none") {
        $(obj).children(".down_box").css("transform","rotate(90deg)");
    } else {
        $(obj).children(".down_box").css("transform","rotate(360deg)");
    }

    $(obj).next().slideToggle();
}

/**
 * 二级菜单的单击，除了打开对应的页面，设置当前样式，导航面包屑修改
 * @param {DOMElement} obj    当前点击的节点对象
 * @param {string}     hastab 包含的三级菜单(作为内页的tab选项卡)
 */
IndexPage.selmenu = function(obj,hastab) {
    sessionStorage.removeItem("tabUrl");
    sessionStorage.removeItem("secondcurTabName");
    sessionStorage.removeItem("page_maxrows");//清除所有分页页面设置的参数(每页显示的条数)
    sessionStorage.removeItem("current_page");//清除所有分页页面设置的参数(当前页次)
    if(document.documentElement.clientWidth <= 640) {
        IndexPage.gbmbmenu();
    }
    //保存当前的页面链接
    let curHrefUrl = $(obj).children("a").attr("href");
    sessionStorage.setItem("curHrefUrl", curHrefUrl);
    //设置当前菜单样式
    $(".sec_menu").not(obj).removeClass("on");
    $(obj).addClass("on");
    //设置导航面包屑
    var txt = obj.innerText;
    var prev_str = $(obj).parent().prev().children("span").html();
    var reg = /<script.*>.*<\/script>/g;
    prev_str = prev_str.replace(reg, "");
    document.getElementById("whichpage").innerHTML = "/ " + txt;
    $("#whichpage").prev().text(prev_str);
    $(".tmtips").remove();
    //如果单击的二级菜单包含有tab，则内页需要显示出包含的tab菜单
    var iframe = document.getElementById("mainiframe");
    iframe.onload = function(){
        document.getElementById("mainiframe").contentWindow.showPageTab(hastab,"");
    }
    
}

/**
 * 框架内页面调用父级页面的方法(确认对话框，“确定”按钮调用的方法)
 * @param {*} obj 
 * @param {*} fun 
 */
IndexPage.confyes = function(obj, fun) {
    //调用框架内页面的方法并传递相关参数
    document.getElementById("mainiframe").contentWindow.confAction(obj, fun);
}

/**
 * 框架内页面调用父级页面的方法(确认对话框，“取消”按钮调用的方法)
 */
IndexPage.confno = function() {
    document.getElementById("mainiframe").contentWindow.confCancel();
}

/**
 * 语言选择
 * @param {string} language  选择切换的语言包字符串cn/en
 */
IndexPage.selectLang = function(language) {
    document.getElementById("lang_config").value = language;
    document.getElementById("selectForm").submit();
}

/**
 * 退出和保存配置的确认对话框
 * @param {string} msg 确认对话框提示语 
 * @param {string} act 是退出/保存配置字符串 logout/save,
 * @returns 
 */
IndexPage.confDialog = function(msg, act) {
    var htmls = '';
    htmls += '<div class="cfbg">';
    htmls += '    <div class="cfbox fromright">';
    htmls += '        <div class="icobox"><i class="iconfont icon-warning_fill"></i></div>';
    htmls += '        <div class="cttext">'+msg+'</div>';
    htmls += '        <div class="cfbtnbox">';
    htmls += '            <button type="button" id="indexqdbtn" class="btn btn_blue" style="margin-right:20px">'+lang_tc_yes+'</button>';
    htmls += '            <button type="button" id="indexqxbtn" class="btn btn_k">'+lang_tc_no+'</button>';
    htmls += '       </div>';
    htmls += '    </div>';
    htmls += '</div>';
    $("body").append(htmls);
    $("#indexqdbtn").on("click", function() {
        if (act == "logout") {
            window.location.href=window.location.protocol+"//"+window.location.host+"/action/logout?user="+$("#user").val();
            if (sessionStorage.getItem("curHrefUrl")) {
                sessionStorage.removeItem("curHrefUrl");
            }
            $(".cfbg").remove();
        } else {
            var cd = document.getElementById("write_config");
            cd.value = 'write config';
            document.getElementById("selectForm").submit();
            $("#indexqdbtn").html(lang_saveing+"<span>.</span><span>.</span><span>.</span>");
            $("#indexqdbtn").attr("disabled",true);
        }
        
    });
    $("#indexqxbtn").on("click", function() {
        $(".cfbg").remove();
    })
    return false;
}

/**
 * 倒计时提示框
 * @param {type} text  warn:警告，error:错误，success:成功
 * @param {content} text  提示文字内容
 */
IndexPage.msgbox = function(content, times) {
	$(".tmtips").remove();
	var htmls = '';
	htmls += '<div class="tmtips">';
    htmls += '    <div class="iconqu">';
    htmls += '        <i class="iconfont icon-warning_line"></i>';
    htmls += '    </div>';
    htmls += '    <div class="msgqu">'+content+'</div>';
    htmls += '</div>';
	$("body").append(htmls);

	var w = $(".tmtips").get(0).offsetWidth;
	var mr = parseInt(w/2 ,10);
	$(".tmtips").css("margin-left","-"+mr+"px");
	//默认五秒后关闭
	var delaytime = times ? times : 5000;
	setTimeout(function() {
		$(".tmtips").remove();
	}, delaytime);
}

/**
 * 获取菜单配置文件，生成菜单DOM
 */
IndexPage.getMenu = function(index, jsonfile) {
    localStorage.setItem("curJsonFile", jsonfile);
    localStorage.setItem("tagboxIndex", index);
    $(".tagbox").not($(".tagbox").eq(index)).removeClass("cur");
    $(".tagbox").eq(index).addClass("cur");
    $.ajax({
        url:jsonfile,
        type:"GET",
        cache:false,
        success:function(data) {
            try {
                //data  = JSON.parse(data);
                //一级菜单
                for (let i = 0; i < data.length; i++) {
                    let menu_name;
                    menu_name = data[i]['name'];
                    data[i]['name'] = menu_name;
                    //二级菜单
                    if (data[i]['children']) {
                        for (let j = 0; j < data[i]['children'].length; j++) {
                            let menu_name;
                            menu_name = data[i]['children'][j]['name'];
                            data[i]['children'][j]['name'] = menu_name;
                        }
                    }
                    
                }
                let menus = '';
                let m = 0;
                for (let i = 0; i < data.length; i++) {
                    if (data[i]['children']) {
                        menus += '<li>';
                        menus += '    <a href="javascript:void(0)" class="havemenu" onclick="IndexPage.openmenu(this)">';
                        menus += '        <label><i class="iconfont icon-xtgl"></i></label>';
                        menus += '        <span>'+data[i]['name']+'</span>';
                        menus += '        <div class="down_box"><i class="iconfont icon-unfold"></i></div>';
                        menus += '    </a>';
                        menus += '    <nav>';
                        for (let j = 0; j < data[i]['children'].length; j++) {
                            menus += '    <div class="sec_menu" onclick="IndexPage.selmenu(this,&quot;'+data[i]['children'][j]['hasTab']+'&quot;)"><a href="'+data[i]['children'][j]['link']+'" tab-data="'+data[i]['children'][j]['hasTab']+'" target="mainiframe"><span>'+data[i]['children'][j]['name']+'</span></a></div>';
                        }
                        // <div class="sec_menu" onclick="IndexPage.selmenu(this)"><a href="u.cgi?next_file=run_conf.htm" target="mainiframe"><span><script>dw(lang_conf_manage)</script></span></a></div>
                        menus += '    </nav>';
                        menus += '</li>';
                    } else {

                        menus += '<li>';
                        menus += '    <a href="'+data[i]['link']+'" target="mainiframe" class="havemenu '+(m== 0 ? "active" : "")+'" onclick="IndexPage.openmenu(this)">';        
                        menus += '        <label><i class="iconfont icon-sbgl"></i></label>';        
                        menus += '        <span>'+data[i]['name']+'</span>';    
                        menus += '    </a>';
                        menus += '</li>';
                        m++;
                    }
                }
                $(".leftbox>ul").html(menus);
                //如果刷新页面，定位并显示上次访问的页面，菜单变化和框架内页变化
                let curHrefUrl = sessionStorage.getItem("curHrefUrl");
                let tabUrl = sessionStorage.getItem("tabUrl");
                if (curHrefUrl) {
                    if (tabUrl) {
                        $("#mainiframe").attr("src",tabUrl);
                    } else {
                        $("#mainiframe").attr("src",curHrefUrl);
                    }
                    /*
                    var iframe = document.getElementById("mainiframe");
                    iframe.onload = function(){
                        document.getElementById("mainiframe").contentWindow.showPageTab("lang_view_runconf||run_conf.htm&lang_view_startconf||start_conf.htm&lang_view_confgl||config.htm","");
                    }
                    */

                    $(".sec_menu>a").each(function() {
                        $(".havemenu").removeClass("active");
                        if ($(this).attr("href") == curHrefUrl) {
                            let tabdata = $(this).attr("tab-data");
                            if (tabdata) {
                                var iframe = document.getElementById("mainiframe");
                                iframe.onload = function(){
                                    document.getElementById("mainiframe").contentWindow.showPageTab(tabdata,"");
                                }
                            }
                            $(this).parent().parent("nav").show();
                            $(this).parent().addClass("on");
                            document.getElementById("whichpage").innerHTML = "/ " + $(this).text();
                            $(this).parent().parent("nav").prev("a").addClass("one");
                        }
                    });
                }
                
                



            } catch (ex) {
                alert("菜单配置文件格式有误");
                console.log(ex);
            }
        }
    });
}


/**
 * 添加/编辑数据后刷新页面
 */
IndexPage.freshAddPage = function() {
    setTimeout(function() {
        var cururl = $("#mainiframe").contents().find('input[name=this_file]').val();
        if (cururl) {
            document.getElementById("mainiframe").contentWindow.location.replace(cururl);
        } else {
            document.getElementById("mainiframe").contentWindow.location.reload();
        }
    }, 500);
} 

IndexPage.openmbmenu = function() {
    $(".leftbox").removeClass("ss");
    $(".leftbox").show();
    $("body").append('<div class="cfbg" style="z-index: 3" onclick="IndexPage.gbmbmenu()"></div>');
}
IndexPage.gbmbmenu = function() {
    $(".leftbox").hide();
    $(".cfbg").remove();
}
window.onload = function() {
    var index = localStorage.getItem("tagboxIndex") ? localStorage.getItem("tagboxIndex") : 0;
    var jsonFile = localStorage.getItem("curJsonFile") ? localStorage.getItem("curJsonFile") : 'js.json';
    IndexPage.getMenu(index, jsonFile);
    
    //左侧菜单滚动条
    $(".leftbox").niceScroll({
        autohidemode:true
    });
}