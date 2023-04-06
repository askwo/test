function selectV(obj, v)
{
	obj.value = v;
}
function checkV(obj, v)
{
	if(v == "0")
		obj.checked = false;
	else
		obj.checked = true;
}
function checkSlide(obj, v)
{
	if(v == "0")
    {
        obj.value = 0;
        $(obj).parent().addClass("jy");
        $(obj).next().next().text(lang_enable_off);
    }
	else{
        obj.value = 1;
        $(obj).parent().removeClass("jy");
        $(obj).next().next().text(lang_enable_on);
    }
}
function changeEnableBtn(obj) {
    var status = $(obj).children("input").val();
    if (status == 1) {
        $(obj).addClass("jy");
        $(obj).children("input").val(0);
        $(obj).children("b").text(lang_enable_off);
    } else {
        $(obj).removeClass("jy");
        $(obj).children("input").val(1);
        $(obj).children("b").text(lang_enable_on);
    }
}
function getCheckV(obj)
{
	return (obj.checked == true)?"1":"0";
}
function setCheckBox(obj, v)
{
	if(obj)
	{
		if(v == "0")
		{
			obj[0].value = "0";
			obj[0].checked = true;
		}
		else if(v == "1")
		{
			obj[1].value = "1";
			obj[1].checked = true;
		}
	}
}
function cpright()
{
	document.write("&copy; 2023 上海宽域工业网络设备有限公司");	
}
function dw(message)
{
	document.write(message);	
}
function showMsg()
{
	var msgVar=document.forms[0].message.value;
	if (msgVar.length > 1)
		//alert(msgVar);
		parent.IndexPage.msgbox(msgVar.replace(/\n/g,"<br/>"));
}
function addstr(input_msg)
{
	var last_msg = "";
	var str_location;
	var temp_str_1 = "";
	var temp_str_2 = "";
	var str_num = 0;
	temp_str_1 = addstr.arguments[0];
	while(1)
	{
		str_location = temp_str_1.indexOf("%s");
		if(str_location >= 0)
		{
			str_num++;
			temp_str_2 = temp_str_1.substring(0,str_location);
			last_msg += temp_str_2 + addstr.arguments[str_num];
			temp_str_1 = temp_str_1.substring(str_location+2,temp_str_1.length);
			continue;
		}
		if(str_location < 0)
		{
			last_msg += temp_str_1;
			break;
		}
	}
	return last_msg;
}

function checkMsg(msg)
{
	if(msg.length > 1)
	{
		//alert(msg);
		parent.IndexPage.msgbox(msg.replace(/\n/g,"<br/>"));
		submitEnable();
		return false;
	}
	return true;
}	

function checkBlank(fieldObj, fname)
{
	var msg = "";
	if (fieldObj.value.length < 1){
		msg = addstr(msg_blank,fname);
        }
	return msg;
}

function checkNoBlanks(fObj, fname)
{
	var space = " ";
 	if (fObj.value.indexOf(space) >= 0 )
		return addstr(msg_space, fname);
	else return "";
}

function checkMail(fobj, fname)
{  
   var tmp_str = fobj.value;
   var msg = "";

   var pattern = /^[a-zA-Z0-9]{1}[\.a-zA-Z0-9_-]*[a-zA-Z0-9]{1}@([a-zA-Z0-9]+[-]{0,1}[a-zA-Z0-9]+[\.]{1}){1,2}[a-zA-Z]+$/;
   
   if(!pattern.test(tmp_str))
     msg = addstr(msg_invalid_email, fname);
   
   return msg;
} 

function isTrueIp(s) 
{ 
    var patrn=/^[\.0-9]+$/; 
    
    if (!patrn.exec(s)) return false 

    return true 
}

function isIPv6(str)
{
  return /:/.test(str)
    &&str.match(/:/g).length<8
    &&/::/.test(str)
      ?(str.match(/::/g).length==1
        &&/^::$|^(::)?([\da-f]{1,4}(:|::))*[\da-f]{1,4}(:|::)?$/i.test(str))
      :/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str);
}

function checkHostName(fobj, fname)
{  
    var tmp_str = fobj.value;
    var msg = "";
    var pattern = /^([a-zA-Z0-9]+[-]{0,1}[a-zA-Z0-9]+[\.]{1}){1,2}[a-zA-Z]+$/;
   
   if(isTrueIp(tmp_str))
   {
        if(isIP(tmp_str)==false)
            msg = addstr(msg_invalid_ipaddr, fname);
   }else
   {
        if(!pattern.test(tmp_str))
            msg = addstr(msg_invalid_domain, fname);
   }
   return msg;
}

function checkAllSpaces(fieldObj, fname)
{
	var msg = "";
	if(fieldObj.value.length == 0)
		return "";
	var tstr = makeStr(fieldObj.value.length," ");
	if (tstr == fieldObj.value)
		msg = addstr(msg_allspaces,fname);
	return msg;
}

function checkValid(text_input_field, field_name, Valid_Str, max_size, mustFill)
{
	var error_msg= "";
	var size = text_input_field.value.length;
	var str = text_input_field.value;

	if ((mustFill) && (size != max_size) )
		error_msg = addstr(msg_blank_in,field_name);
 	for (var i=0; i < size; i++)
  	{
    	if (!(Valid_Str.indexOf(str.charAt(i)) >= 0))
    	{
			error_msg = addstr(msg_invalid,field_name,Valid_Str);
			break;
    	}
  	}
  	return error_msg;
}

function checkIntStr(input_str, field_name, min_value, max_value, required)
{
	var str = input_str;
	var error_msg= "";
	if (str.length==0)
	{
		if (required)
			error_msg = addstr(msg_blank,field_name);
	}
	else
	{
		for (var i=0; i < str.length; i++)
		{
			if ((str.charAt(i) < '0') || (str.charAt(i) > '9'))
				error_msg = addstr(msg_check_invalid,field_name);
		}
		if (error_msg.length < 2)
		{
			var int_value = parseInt(str,10);
			if (int_value < min_value || int_value > max_value)
				error_msg = addstr(msg_valid_range,field_name,min_value,max_value);
		}
	}
	return(error_msg);
}

function checkInt(text_input_field, field_name, min_value, max_value, required)
// NOTE: Doesn't allow negative numbers, required is true/false
{
	var str = text_input_field.value;
	return checkIntStr(str, field_name, min_value, max_value, required);
}
function checkNullInt(text_input_field, field_name, min_value, max_value, required)
// NOTE: Doesn't allow negative numbers, required is true/false
{
	var str = text_input_field.value;
	if(str=="")
		return "";
	return checkIntStr(str, field_name, min_value, max_value, required);
}

function checkMAC(fObj, fname, removeSeparators)
{
	var msg = "";
	if(badMac(fObj, removeSeparators))
		msg = addstr(msg_invalid_mac, fname);
	return msg;
}
function checkUnicastMAC(fObj, fname, removeSeparators)
{
	var msg = "";
	if(badUnicastMac(fObj, removeSeparators))
		msg = addstr(msg_invalid_unimac, fname);
	return msg;
}

function blankIP(ip1, ip2, ip3, ip4)
{
return ((ip1.value == "" || ip1.value == "0")
	 && (ip2.value == "" || ip2.value == "0")
	 && (ip3.value == "" || ip3.value == "0")
	 && (ip4.value == "" || ip4.value == "0"))
}

function badIP(ip1, ip2, ip3, ip4, max)
{
	if(!(isInteger(ip1.value,1,254,false))) return true;
	if(!(isInteger(ip2.value,0,255,false))) return true;
	if(!(isInteger(ip3.value,0,255,false))) return true;
	if(!(isInteger(ip4.value,1,max,false))) return true;
   	return false;
}
function badSubnetIP(ip1, ip2, ip3, ip4, max)
{
	if(!(isInteger(ip1.value,1,254,false))) return true;
	if(!(isInteger(ip2.value,0,255,false))) return true;
	if(!(isInteger(ip3.value,0,255,false))) return true;
	if(!(isInteger(ip4.value,0,max,false))) return true;
   	return false;
}


function badMask(ip1, ip2, ip3, ip4)
{
	if(!(isInteger(ip1.value,0,255,false))) return true;
	if(!(isInteger(ip2.value,0,255,false))) return true;
	if(!(isInteger(ip3.value,0,255,false))) return true;
	if(!(isInteger(ip4.value,0,255,false))) return true;
   	return false;
}
function badMac(macfld, removeSeparators)
{
	var myRE = /[0-9a-fA-F]{12}/;
	var MAC = macfld.value;	
	
	MAC = MAC.replace(/:/g,"");
	MAC = MAC.replace(/-/g,"");
	MAC = MAC.toLowerCase();
	if (removeSeparators)
		macfld.value = MAC;	
	if((MAC.length != 12) || (MAC == "000000000000") || (MAC == "ffffffffffff") ||(myRE.test(MAC)!=true))
		return true;
	else
	 	return false;
}
function badUnicastMac(macfld, removeSeparators)
{
	var myRE = /[0-9a-fA-F]{12}/;
	var MAC = macfld.value;	
	
	MAC = MAC.replace(/:/g,"");
	MAC = MAC.replace(/-/g,"");
	MAC = MAC.toLowerCase();
	if (removeSeparators)
		macfld.value = MAC;	
	if((MAC.length != 12) || (MAC == "000000000000")|| (MAC == "ffffffffffff") ||(myRE.test(MAC)!=true))
	{
		return true;
	}
	else
	{
		var c = MAC.substring(1, 2);
		if((c=="1") || (c=="3") || (c=="5") || (c=="7") || (c=="9"))
			return true;
	 	return false;
	}
}
function badIpRange(from1,from2,from3,from4,to1,to2,to3,to4)
{
    var total1 = 0;
    var total2 = 0;
    
    total1 += parseInt(from4.value,10);
    total1 += parseInt(from3.value,10)*256;
    total1 += parseInt(from2.value,10)*256*256;
    total1 += parseInt(from1.value,10)*256*256*256;
    
    total2 += parseInt(to4.value,10);
    total2 += parseInt(to3.value,10)*256;
    total2 += parseInt(to2.value,10)*256*256;
    total2 += parseInt(to1.value,10)*256*256*256;
    if(total1 >= total2)
        return true;
    return false;
}
function isIllegal(s)
{
	var reg = /^(\w| |\(|\)|[\u4E00-\u9FA5])+$/;	
	
	if(s.match(reg)) 
	{
	    if(fucCheckLength(s)>16)
	        return false;
	    else
		    return true;
	}

	return false;
}
function isIllegaluser(s)
{
	var reg = /^(\w)*$/;	
	
	if(s.match(reg)) 
	{
	    if(fucCheckLength(s)>16)
	        return false;
	    else
		    return true;
	}

	return false;
}
function isIllegalvlan(s)
{
	var reg = /^(\w|[\u4E00-\u9FA5])+$/;	
	
	if(s.match(reg)) 
	{
	    if(fucCheckLength(s)>16)
	        return false;
	    else
		    return true;
	}

	return false;
}

function isIllegalwithAt(s)
{
	var reg = /^(\w|[\u4E00-\u9FA5]|@|\.)+$/;	
	
	if(s.match(reg)) 
	{
	    if(fucCheckLength(s)>16)
	        return false;
	    else
		    return true;
	}

	return false;
}

function isIllegalKey(s)
{
	var reg = /^(\w|[\u4E00-\u9FA5]|@|\.)+$/;	
	
	if(s.match(reg)) 
	{
	    if((fucCheckLength(s)>64) || (fucCheckLength(s)<6))
	        return false;
	    else
		    return true;
	}

	return false;
}

function fucCheckLength(strTemp)  
{  
    var i,sum;  
    sum=0;  
    for(i=0;i<strTemp.length;i++)  
    {  
        if ((strTemp.charCodeAt(i)>=0) && (strTemp.charCodeAt(i)<=255))  
            sum=sum+1;  
        else  
            sum=sum+2;  
    }  
    return sum;  
}

function isBlank(str) 
{
	return (str.length == 0 );
}
function isBigger(str_a, str_b)
{
	var int_value_a = parseInt(str_a);
	var int_value_b = parseInt(str_b);
	return (int_value_a > int_value_b);
}
function isInteger(str,min_value,max_value,allowBlank)
{
	if(str.length == 0)
		if(allowBlank)
			return true;
		else
			return false;
	for (var i=0; i < str.length; i++)
	{
		if ((str.charAt(i) < '0') || (str.charAt(i) > '9'))
				return false;
	}
	var int_value = parseInt(str,10);
	if ((int_value < min_value) || (int_value > max_value))
		return false;
	return true;
}

function isNumber(str) 
{
    var i;
    if(str == null)
    	return false;
    	
    for(i = 0; i<str.length; i++) {
        var c = str.substring(i, i+1);
        if("0" <= c && c <= "9") {
            continue;
        }
        return false;
    }
    return true;
}
function isHex(str) {
    var i;
    for(i = 0; i<str.length; i++) {
        var c = str.substring(i, i+1);
        if(("0" <= c && c <= "9") || ("a" <= c && c <= "f") || ("A" <= c && c <= "F")) {
            continue;
        }
        return false;
    }
    return true;
}
function isTelephoneNum(str) 
{
	var c;
    if(str.length == 0) 
        return false;
    for (var i = 0; i < str.length; i++) 
	{
        c = str.substring(i, i+1);
        if (c>= "0" && c <= "9")
            continue;
        if ( c == '-' && i !=0 && i != (str.length-1) )
            continue;
        if ( c == ',' ) continue;
        if (c == ' ') continue;
        if (c>= 'A' && c <= 'Z') continue;
        if (c>= 'a' && c <= 'z') continue;
        return false;
    }
    return true;
}
function checkDay(year,month,day)
{
	var isleap = false;
	if(year%400 == 0 || (year%4 == 0 && year%100 != 0))
		isleap = true;
	if(month%2)
	{
		if((month<=7)&&(day>31))
			return false;
		if((month>7)&&(day>30))
			return false;
	}
	else
	{
		if(month<=6)
		{
			if(month == 2)
			{
				if((isleap)&&(day>29))
				{
					return false;
				}
				if((!isleap)&&(day>28))
				{			
					return false;	
				}		
			}
			else
			{
				if(day > 30)
					return false;
			}
		}
		else
			if(day>31)
				return false;
	}
	return true;
}
function CheckSpaceInName(text_input_field)
{
	if (text_input_field.value.length>1)
	{
		for (var i=0;i<text_input_field.value.length;i++)
		{
			if (text_input_field.value.charAt(i) == ' ')
				return false;
		}
	}
	return true;
}
function IP_T2R(ipbox, ipvar)
{
   var ipstr;
   ipstr= eval("document.forms[0]."+ipbox+"1").value+"." 
          +eval("document.forms[0]."+ipbox+"2").value+"."
		  +eval("document.forms[0]."+ipbox+"3").value+"."
		  +eval("document.forms[0]."+ipbox+"4").value;
	eval("document.forms[0]."+ipvar).value = ipstr;
}
function IP_R2T(ipbox, ipvar)
{
	var ipArray = new Array();
	var i;
	var str;

    str = eval("document.forms[0]."+ipvar).value
	if(str.length == 0)
	    return;
	ipArray = str.split(".");
	for(i=1; i<=ipArray.length; i++)
	{
		eval("document.forms[0]."+ipbox+i).value = ipArray[i-1];
	}
}
function IP_STRING_R2T(ipbox, ipstr)
{
	var ipArray = new Array();
	var i;
	var str;

	if(ipstr.length == 0)
	    return;

	ipArray = ipstr.split(".");
	for(i=1; i<=ipArray.length; i++)
	{
		eval("document.forms[0]."+ipbox+i).value = ipArray[i-1];
	}
}
function IP_STRING_T2R(ipbox)
{
   return  eval("document.forms[0]."+ipbox+"1").value+"." 
          +eval("document.forms[0]."+ipbox+"2").value+"."
		  +eval("document.forms[0]."+ipbox+"3").value+"."
		  +eval("document.forms[0]."+ipbox+"4").value;	
}
function checkIPAddress(ipbox, max, bAllowBlank)
{
	if(bAllowBlank == true)
	{
		if((eval("document.forms[0]."+ipbox+"1").value == "0"||eval("document.forms[0]."+ipbox+"1").value == "")
		&& (eval("document.forms[0]."+ipbox+"2").value == "0"||eval("document.forms[0]."+ipbox+"2").value == "")
		&& (eval("document.forms[0]."+ipbox+"3").value == "0"||eval("document.forms[0]."+ipbox+"3").value == "")
		&& (eval("document.forms[0]."+ipbox+"4").value == "0"||eval("document.forms[0]."+ipbox+"4").value == ""))
		     return false;  
	}
	
	return check_vip(	eval("document.forms[0]."+ipbox+"1"),
					eval("document.forms[0]."+ipbox+"2"),
					eval("document.forms[0]."+ipbox+"3"),
					eval("document.forms[0]."+ipbox+"4"), max);
}

function check_vip(ip1, ip2, ip3, ip4, max) {
    if(checkIPMain(ip1,255)) return true; 
    if(checkIPMain(ip2,255)) return true;
    if(checkIPMain(ip3,255)) return true;
    if(checkIPMain(ip4,max)) return true;
    if((parseInt(ip1.value)==0)||(parseInt(ip1.value)==0)&&(parseInt(ip2.value)==0)&&(parseInt(ip3.value)==0)&&(parseInt(ip4.value)==0))
    	return true;
    return false;
}

function checkIPMain(ip,max) 
{
    if( false == isNumeric(ip, max) ) 
    {
        ip.focus();
        return true;
    }
    
    return false;
}

function isNumeric(str, max) {
		if(str.value.length <= 3){
				str.value = str.value.replace(/^000/g,"0");
				str.value = str.value.replace(/^00/g,"0");
				if(str.value.length > 1)
						str.value = str.value.replace(/^0/g,"");
		}
		
    if(str.value.length == 0 || str.value == null || str.value == "") {
        str.focus();
        return false;
    }
    
    var i = parseInt(str.value);
    
    if(i>max) {
        str.focus();
        return false;
    }
    for(i=0; i<str.value.length; i++) {
        var c = str.value.substring(i, i+1);
        if("0" <= c && c <= "9") {
            continue;
        }
        str.focus();
        return false;
    }
    return true;
}
function isIE()
{
    if(navigator.appName.indexOf("Microsoft") != -1)
        return true;
    else return false;
}
function setDisabled(OnOffFlag,formFields)
{
	for (var i = 1; i < setDisabled.arguments.length; i++)
		setDisabled.arguments[i].disabled = OnOffFlag;
}
function makeStr(strSize, fillChar)
{
	var temp = "";
	for (i=0; i < strSize ; i ++)
		temp = temp + fillChar;
	return temp;
}

function isIP(strIP) 
{
       var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g;
	   re.lastIndex = 0;
       if(re.test(strIP))
       {
            if(RegExp.$1 >0 && RegExp.$1 <255 && RegExp.$2>=0 && RegExp.$2<256 && RegExp.$3>=0 && RegExp.$3<256 && RegExp.$4>0 && RegExp.$4<255) return true;
       }
       
       return false; 
}


function check_ether(fobj) 
{
	var tmp = fobj.value;
	
	if(tmp.length != 6)
		return false;
	
	if(tmp.substr(0,2) != "0x" && tmp.substr(0,2) != "0X")
		return false;
	
	var str = tmp.substring(tmp.length -4);
	
	if(isHex(str))
		return true;
		
	return false;
}

function check_ip(fobj) 
{ 	
		var tmp = fobj.value;
    var ip = new RegExp("^([0-9]+).([0-9]+).([0-9]+).([0-9]+)$");
    if (tmp.match(ip) == null)
    		return false;
	
    var ipaddr = tmp.split(".");
    if(ipaddr[0] >0 && ipaddr[0] <255 && ipaddr[1]>=0 && ipaddr[1]<=255 && ipaddr[2]>=0 && ipaddr[2]<=255 && ipaddr[3]>0 && ipaddr[3]<255) 
        return true;
   
    return false; 
}
function isMask(strIP) 
{
var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g;
re.lastIndex = 0;
if(re.test(strIP))
{
     if(RegExp.$1 >=0 && RegExp.$1 <255 && RegExp.$2>=0 && RegExp.$2<256 && RegExp.$3>=0 && RegExp.$3<256 && RegExp.$4>=0 && RegExp.$4<255) return true;
}

return false; 
}
function check_ipmask(fobj) 
{ 	
	var tmp = fobj.value.split("/");
	if(tmp.length != 2)
		return false;
	if(isMask(tmp[0]) == false)
		return false;
	if(tmp[1]>=0 && tmp[1] <=32)
		return true;
	return false;
}
function check_mip(fobj) 
{ 	
		var tmp = fobj.value;
    var ip = new RegExp("^([0-9]+).([0-9]+).([0-9]+).([0-9]+)$");
    if (tmp.match(ip) == null)
    		return false;
	
    var ipaddr = tmp.split(".");
    if(ipaddr[0] >223 && ipaddr[0] <255 && ipaddr[1]>=0 && ipaddr[1]<=255 && ipaddr[2]>=0 && ipaddr[2]<=255 && ipaddr[3]>0 && ipaddr[3]<255) 
        return true;
   
    return false; 
}

function check_ip6(fobj)  
{
	var str = fobj.value;
    var matchStr = "((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$";      
	var ret = str.match(matchStr);        
	if (ret)
		return true;
		
	return false;
} 
function isIP6(str)  
{
    var matchStr = "((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$";      
	var ret = str.match(matchStr);        
	if (ret)
		return true;
		
	return false;
} 
function check_ipmask6(fobj) 
{ 	
	var tmp = fobj.value.split("/");
	if(tmp.length != 2)
		return false;
	if(isIP6(tmp[0]) == false)
		return false;
	if(tmp[1]>0 && tmp[1] <=128)
		return true;
	return false;
}
function check_mask(fobj) 
{ 	
		var tmp = fobj.value;
    var ip = new RegExp("^([0-9]+).([0-9]+).([0-9]+).([0-9]+)$");
    if (tmp.match(ip) == null)
    		return false;
	
    var ipaddr = tmp.split(".");  
    if(ipaddr[0] >0 && ipaddr[0] <=255 && ipaddr[1]>=0 && ipaddr[1]<=255 && ipaddr[2]>=0 && ipaddr[2]<=255 && ipaddr[3]>=0 && ipaddr[3]<=255) 
        return true;
   
    return false; 
}

function check_intf(fobj) 
{ 	
    var tmp = fobj.value;
    var ip = new RegExp("^eth1.[0-9]{1,4}$");
    if (tmp.match(ip) == null)
    		return false;
	
    var ipaddr = tmp.split(".");  
    if(ipaddr[1]>=0 && ipaddr[1]<=4095) 
        return ipaddr[1];
   
    return false; 
}
function isMulticastMac(mac)
{
	var head = mac.substring(0,2);
	if(parseInt(head,10)%2 ==1)
		return true;
	return false;
}

var DEBUG = false; // false for release
var separator = "\t";  // used for string=> multiple select list

function radioTable(fObj,radioObj,act_str)
{
	if (radioSelectedIndex(radioObj) > -1)
			stdAction(fObj,act_str);
	else alert("No entry selected. \nClick a radio button to select an entry.");
}

function stdAction(fObj,act_str)
{
	fObj.todo.value = act_str;
	dataToHidden(fObj);
	//submitDemo(fObj);
        fObj.submit();
}
function optionSelected(sel_obj) // return true or false
{
	return (sel_obj.selectedIndex > -1 && sel_obj.selectedIndex < sel_obj.options.length) ? true : false;
}

function getSelIndex(sel_object, sel_text)
{
	if (sel_text.length == 0)
		return 0;  
	var size = sel_object.options.length;
	for (var i = 0; i < size; i++)
	{
		if ( (sel_object.options[i].text == sel_text) || (sel_object.options[i].value == sel_text) )
			return(i);
	}
	if (DEBUG) 
		alert("DEBUG: " + sel_object.name + " (Select List) has invalid value " + sel_text + "  Selecting 1st item instead");
	return 0;
}
function getSelected(sel_obj)
{
	var index = sel_obj.selectedIndex;
	if (index >= 0)
		return (sel_obj.options[index].value != "") ? sel_obj.options[index].value : sel_obj.options[index].text;
	else return "";
}

function getMultiSelected(sel_obj)
{
	var size = sel_obj.options.length; 
	var i; 
	var str = "";
	if(isNaN(size))
		return str;
	if(size == 0)
		return str;
	str = separator;
	for(i = 0; i < size; i++)
		if (sel_obj.options[i].selected)
			str+= sel_obj.options[i].text + separator; 
	return str;
}
function setSelected(sel_obj,list)
{
	var selSize = sel_obj.options.length;
	var startTextPos;  	var startValuePos; 
	var textChar; 	        var valueChar;
	for ( var i =0 ; i < selSize; i++)
	{
		startTextPos = -1; 
		startValuePos = -1; 
		sel_obj.options[i].selected = false;
		startTextPos = list.indexOf(separator + sel_obj.options[i].text + separator);
		if(sel_obj.options[i].value.length > 0)
			startValuePos = list.indexOf(separator + sel_obj.options[i].value + separator);
		if (startTextPos > -1)
			sel_obj.options[i].selected = true;
		if (startValuePos > -1) 
			sel_obj.options[i].selected = true;
	}
}
function radioSelectedIndex(radio_object)
{
	if (!radio_object)
		return -1;
	var size = radio_object.length;
	if(isNaN(size))
	{
		if(radio_object.checked == true)
			return 0;
		else
			return -1;
	}
	for (var i = 0; i < size; i++)
	{
		if(!(radio_object[i]))
			return (radio_object.checked) ? 0 : -1;
		if (radio_object[i].checked)
			return(i);
	}
	if(radio_object.checked == true)
		return 0;
	else
		return -1;
}
function getRadioCheckedValue(radio_object)
{
	var index = 0;
	if (!radio_object)
		return "";
	var size = radio_object.length;
	if(isNaN(size)) 
	{
		if (radio_object.checked == true)
			return radio_object.value;
		else 
			return ""; 
	}
	for (var i = 0; i < size; i++)
	{
		if(!(radio_object[i])) 
			continue;
		if (radio_object[i].checked == true)
			return(radio_object[i].value);
	}
	if (radio_object.checked == true)
		return radio_object.value;
	else 
		return ""; 
}
function getRadioIndex(radio_object, checked_value)
{
	if (!radio_object)
		return 0;
	if(radio_object.value == checked_value)
		return 0;
	var size = radio_object.length;
	if(isNaN(size))
		return 0;
	for (var i = 0; i < size; i++)
	{
		if(!(radio_object[i]))
			continue;
		if (radio_object[i].value == checked_value)
			return  i;
	}
	if (DEBUG) 
		alert("DEBUG: " + radio_object.name + " (Radio button) has invalid value " + checked_value + "  Selecting 1st item instead");
	return  0;
}

function getvalue(field_obj)
{
	var field_type = field_obj.type;
	if (field_type == "text" || field_type == "password" || field_type == "hidden" || field_type == "textarea")
		return field_obj.value;
	else if (field_type == "select-one")
		return getSelected(field_obj);
	else if (field_type == "select-multiple")
		return getMultiSelected(field_obj);
	else if (field_type  == "checkbox")
		return (field_obj.checked) ? "enable" : "disable" ;
	else if (field_type  == "radio") 
		return getRadioCheckedValue(field_obj);
	else if (field_obj.length > 0 )
		return getRadioCheckedValue(field_obj);
	else
		return field_obj.value;
}
function ip1to4(ipaddr,ip1,ip2,ip3,ip4)
{
	var len;
	var tmp;
	var all;
	all=ipaddr.value; 

	len=all.length;
	tmp=all.indexOf(".");
	ip1.value=all.substring(0,tmp);

	all=all.substring(tmp+1,len);
	len=all.length;
	tmp=all.indexOf(".");
	ip2.value=all.substring(0,tmp);

	all=all.substring(tmp+1,len);
	len=all.length;
	tmp=all.indexOf(".");
	ip3.value=all.substring(0,tmp);

	all=all.substring(tmp+1,len);
	ip4.value=all;
 } 
function ip4to1(ipaddr,ip1,ip2,ip3,ip4)
{
	if (ip1.value.length>0)
		ipaddr.value=ip1.value+"."+ip2.value+"."+ip3.value+"."+ip4.value; 
	else
		ipaddr.value="";
} 
function mac1to6(macaddr,mac1,mac2,mac3,mac4,mac5,mac6)
{
  
	var len;
	var tmp;
	var all;
	all=macaddr.value; 

	len=all.length;
	tmp=all.indexOf(":");
	mac1.value=all.substring(0,tmp);

	all=all.substring(tmp+1,len);
	len=all.length;
	tmp=all.indexOf(":");
	mac2.value=all.substring(0,tmp);

	all=all.substring(tmp+1,len);
	len=all.length;
	tmp=all.indexOf(":");
	mac3.value=all.substring(0,tmp);

	all=all.substring(tmp+1,len);
	len=all.length;
	tmp=all.indexOf(":");
	mac4.value=all.substring(0,tmp);

	all=all.substring(tmp+1,len);
	len=all.length;
	tmp=all.indexOf(":");
	mac5.value=all.substring(0,tmp);

	all=all.substring(tmp+1,len);
	mac6.value=all;
 } 

function mac6to1(macaddr,mac1,mac2,mac3,mac4,mac5,mac6)
{
	if (mac1.value.length>0)
		macaddr.value=mac1.value+":"+mac2.value+":"+mac3.value+":"+mac4.value+":"+mac5.value+":"+mac6.value; 
	else
		macaddr.value="";
} 
function submitEnable()
{
	for(var f=0;f<document.forms.length;f++){  
		var oForm = document.forms[0].elements;
		for (var i=0;i<oForm.length;i++)
		{
			if(oForm[i].type.toLowerCase()=="submit" || oForm[i].type.toLowerCase()=="button")
			{
				oForm[i].disabled=false;
			}
		}
	}
}
function submitDisable()
{
	for(var f=0;f<document.forms.length;f++){  
		var oForm = document.forms[0].elements;
		for (var i=0;i<oForm.length;i++)
		{
			if(oForm[i].type.toLowerCase()=="submit" || oForm[i].type.toLowerCase()=="button")
			{
				oForm[i].disabled=true;
			}
		}
	}
}

function dollors(string)
{
	if(string[0]=='.')
		return document.getElementById(string.substr(1));
	else
		return document.getElementsByName(string);
}
function domHidden(string)
{
	var ele = dollors(string);	
	for(var i = 0; i < ele.length; i++)
		ele[i].style.display = "none";
}
function domVisable(string)
{
	var ele = dollors(string);	
	for(var i = 0; i < ele.length; i++)
		ele[i].style.display = "block";
}
function domDisable(string)
{
	var ele = dollors(string);
	for(var i = 0; i < ele.length; i++)
		ele[i].disabled= true;
}
function domEnable(string)
{
	var ele = dollors(string);
	for(var i = 0; i < ele.length; i++)
		ele[i].disabled= false;
}
function selectListFillById(selectobjid, list)
{
	var selectObj = document.getElementById(selectobjid);
	for(var i=0;i<list.length;i++)
	{
		if(list[i].length > 0)
			selectObj.options[selectObj.length] = new Option(list[i],list[i]);
	}
}
function selectFillWithNull(str,selectobjid)
{
	var selectObj = document.getElementById(selectobjid);
	var list = document.getElementById(str).value.split(";");
	selectObj.options[selectObj.length] = new Option("","");
	selectListFillById(selectobjid, list);
}

/*Fill l2 port select dom. */
function snmpViewSelectFill(viewList,selectobjid)
{
	var list = document.getElementById(viewList).value.split(";");
	selectListFillById(selectobjid, list);
}
/*Fill l2 port select dom. */
function l2PortSelectFill(portList,selectobjid)
{
	var list = document.getElementById(portList).value.split(";");
	selectListFillById(selectobjid, list);
}
/*Fill l3 interfaces select dom. */
function l3IfSelectFill(portList,selectobjid)
{
	var list = document.getElementById(portList).value.split(";");
	selectListFillById(selectobjid, list);
}
function checkListFillById(obj, list)
{
	var tmp ="";
	var table = document.getElementById(obj);
	var j = 0;
	var row = table.insertRow(0);
	
	for(var i=0;i<list.length-1;i++)
	{
		if(j>7)
		{
			row = table.insertRow();
			j = 0;
		}
		var n0 = row.insertCell();
		n0.innerHTML = '<label class="selectbox" style="padding-right:5px;"><input name="ckPort" type="checkbox" class="chk_box" value="' + list[i] + '" /><span></span></label>'+list[i]+"&nbsp;&nbsp;";
		j++;
	}
	
	var n0 = row.insertCell();
	n0.innerHTML = '<a href="javascript:void(0)" target="_top" onClick="sel_all()">'+lang_sel_all+'</a>';
}
function l2FillCheckPort(portList, selectobjid)
{
	var list = document.getElementById(portList).value.split(";");
	checkListFillById(selectobjid, list);
}
/*Parse error message from app.*/
function parseErrorMsg()
{
	var errMsg = dollors("message")[0].value;
	if(errMsg.length > 0)
		//alert(errMsg);
		parent.IndexPage.msgbox(errMsg.replace(/\n/g,"<br/>"));
}
var Cookie = {
    Get : function(name){
        var arrStr = document.cookie.split("; ");
        for(var i = 0;i < arrStr.length;i ++){
            var temp = arrStr[i].split("=");
            if(temp[0] == name) 
                return unescape(temp[1]);
        }
        return null;
    },

    Set : function(name, value, hours, path){
        var str = name + "=" + escape(value);

        if(hours != undefined && hours > 0){
            var date = new Date();
            var ms = hours * 3600 * 1000;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toGMTString();
        }		 
        if(path == undefined){
			path = "/";
		}
        str += "; path=" + path;
        
        document.cookie = str;
    },

    Delete :function(name, path){
        var date = new Date();
		var str;
        date.setTime(date.getTime() - 10000);		

        if(path == undefined){
            path = "/";
		}
        str += "; path=" + path;
        document.cookie = name + "=; expires=" + date.toGMTString() + str;
    }
}
function isValidStr(str)
{
	var vkeyWords=/[&="';\/\\]/;
	if(str=="")
		return true;
	if(vkeyWords.test(str)){
		return true;
    }
	if(str.indexOf(' ')>=0)
		return true;
	
	return false;
}
function isValidStr2(str)
{
	var vkeyWords=/[&="';\/\\]/;
	if(str=="")
		return true;
	if(vkeyWords.test(str)){
		return true;
    }

	return false;
}
function delConfirm(obj, fun)
{
	if(confirm(lang_del_sure))
	{
		fun(obj);
		return true;
	}
	else
	{
		return false;
	}
}
function selectListFillNum(objid, min, max)
{
	var selectObj = document.getElementById(objid);
	for(var i=min;i<max+1;i++)
	{
		var name = i;
		if(i=="-1")
			name="disable";
		selectObj.options[selectObj.length] = new Option(name,i);
	}
}
function isExitsFunction(funcName) {
    try {
        if (typeof(eval(funcName)) == "function") {
            return true;
        }
    } catch(e) {}
    return false;
}
function ifDisableDomByUser()
{
	var user_privilege = document.getElementsByName("user_privilege")[0].value;

	if(user_privilege < 14)
		return 'disabled="disabled" ';
	else
		return " ";
}
		
function ReadonlyText(objText) 
{
  if (objText){
    objText.style.background = "#E6E6E6";
    objText.style.color = "black";
    objText.readOnly=true;
  }
}
function DisableFormElements(container)
{
  if (!container)
  	return;
  var aEle;
  if (navigator.appName =="Microsoft Internet Explorer") //IE
  {
    for (var i=0;i<container.all.length;i++)
    {
      aEle = container.all[i];
      tagName = aEle.tagName.toUpperCase();
      if (tagName=="INPUT")
      {
      	  if(aEle.type.toUpperCase()=="SUBMIT" && (aEle.name.toUpperCase() == "SAVE"||
      	  aEle.name.toUpperCase() == "ADD"||aEle.name.toUpperCase() == "DEL"||aEle.name.toUpperCase() == "UP"))
          {
            aEle.disabled = true;
          }
      }
      else if (tagName=="TEXTAREA")
      {
        ReadonlyText(aEle);
      }
    }
  }
  else
  {
    aEle = container.getElementsByTagName("button");
    for (var i=0;i< aEle.length;i++)
    {
      aEle[i].disabled = true;
    }
    aEle = container.getElementsByTagName("textarea");
    for (var i=0;i< aEle.length;i++)
    {
      ReadonlyText(aEle[i]);
    }
    aEle = container.getElementsByTagName("input");
    for (var i=0;i< aEle.length;i++)
    {
      if (aEle[i].type.toUpperCase()!="HIDDEN")
      {
        if (aEle[i].type.toUpperCase()=="TEXT")
        {
          ReadonlyText(aEle[i]);
        }
      	if(aEle[i].type.toUpperCase()=="SUBMIT" && (aEle[i].name.toUpperCase() == "SAVE"||
      	aEle[i].name.toUpperCase() == "ADD"||aEle[i].name.toUpperCase() == "DEL"||aEle[i].name.toUpperCase() == "UP") )
        {
           aEle[i].disabled = true;
        }
      }
    }
  }
}
function disableAllDOM(disabled)
{
    for (var i = 0; i < document.forms.length; ++i) {
        DisableFormElements(document.forms[i]);
    }
}

function updateAllDOM(objname)
{
	var disable = true;
	var selectObjs = document.getElementsByName(objname);
	var privilege = selectObjs[0].value;

	if(isExitsFunction("updatePageDOM"))
		return updatePageDOM(privilege);
	else {
		if(privilege < 14)
			disableAllDOM(false);
	}
}
var sel_all_val=true;
function sel_all()
{
	var cf = document.forms[0];
	var cd = document.getElementById("l2_port_list");
    var nh_list = cd.value.split(";"); 
	var rowCount = nh_list.length-1;

	for(j=0;j<rowCount;j++)
	{
		cf.ckPort[j].checked=sel_all_val;
	}
	if(sel_all_val==true)
		sel_all_val=false;
	else
		sel_all_val=true;
}
//set up success tips
function setSuccess() {
	/*
	parent.layer.msg('<font style="color:#666">'+lang_save_success+'</font>', {
		icon: 1,
		//shade: [0.6, '#393D49'] //取消遮罩
	});
	*/
}
function refresh(url){
	if (url === undefined) {
		url = location.href;
	}
    parent.layer.msg(lang_refreshed);
	location.href=url;
}
//解决表格head头溢出
function tableposition() {
	var tabble_head_h = $(".showtable").height();
	$(".marfu").css("margin-top","-"+ tabble_head_h +"px");
	window.onresize = function(){
        tableposition();
    }
}
function back() {
    parent.layer.closeAll();
}
function fixedTableHead(height){
	let gdH = height ? height : 80;
    let w = document.querySelector(".gundongbox").offsetWidth;
    //$(".biaotoubox table").width(w);
    //$(".gundongbox table").width(w);
    $(".gundongbox table .title td").each(function(index) {
        var tdw = $(this).width();
        $(".biaotoubox table .title td").eq(index).width(tdw);
        $(".gundongbox table .title td").eq(index).width(tdw);
    });
    document.body.onscroll = function(event) {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		//console.log(scrollTop);
        if (scrollTop > gdH) {
            $(".biaotoubox").css({"display":"block"});
        } else {
            $(".biaotoubox").css({"display":"none"});
        }
    }
}
function fomartByte(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
/**
 * 从hash中获取键值
 * @param {string} hash   哈希字符串    例如:#name=admin&role=Administrator
 * @param {*} keys        键名         例如:role
 * @returns {null/string} 键值         例如:Administrator
 */
function getHashPara(hash,keys) {
	var reg = new RegExp("(^|&)" + keys + "=([^&]*)(&|$)","i");
	var r = hash.substr(1).match(reg);
	if (r!=null) return (r[2]); return null;
}
/**
 * 确认对话框
 * @param {string} msg 确认对话框提示语 
 * @param {object} obj 传递给确认对话框的参数
 * @param {object} fun 点击确定执行的方法
 * @returns 
 */
function confirmDialog(msg, obj, fun)
{
    var htmls = '';
    htmls += '<div class="cfbg">';
    htmls += '    <div class="cfbox">';
    htmls += '        <div class="icobox"><i class="iconfont icon-warning_fill"></i></div>';
    htmls += '        <div class="cttext">'+msg+'</div>';
    htmls += '        <div class="cfbtnbox">';
    htmls += '            <button type="button" id="qdanniu" class="btn btn_blue" style="margin-right:20px">'+lang_tc_yes+'</button>';
    htmls += '            <button type="button" id="qxanniu" class="btn btn_k">'+lang_tc_no+'</button>';
    htmls += '       </div>';
    htmls += '    </div>';
    htmls += '</div>';
    $("body",parent.document).append(htmls);
    $("#qdanniu",parent.document).on("click", function() {
        parent.IndexPage.confyes(obj, fun);
    });
	$("#qxanniu",parent.document).on("click", function() {
        parent.IndexPage.confno();
    })
    return false;
}
function confAction(obj, fun) {
    fun(obj);
    confCancel();
	return true;
}
function confCancel() {
    $(".cfbg",parent.document).remove();
}



/**
 * 显示出内页的tab选卡
 * @params {string} hastab 框架页面传递过来的选项卡数据信息
 * 格式：lang_running_conf||run_conf.htm&lang_start_conf||start_config.htm&lang_view_confgl||config.htm     名称||链接....
 * @params {string} curname 当前选项卡名称
 */
function showPageTab(hastab,curname) {
	if (hastab == "") {
        return;
	}
    let list = hastab.split('&');
	let htmls = '';
	/*
	<div class="tabqu">
        <div class="active"><a href="u.cgi?next_file=run_conf.htm"><script>dw(lang_view_runconf)</script></a></div>
        <div><a href="u.cgi?next_file=start_conf.htm"><script>dw(lang_view_startconf)</script></a></div>
        <div><a href="u.cgi?next_file=config.htm"><script>dw(lang_view_confgl)</script></a></div>
    </div>
	*/
	if (curname) {
        sessionStorage.setItem("secondcurTabName",curname);
	}
	htmls += '<div class="tabqu">';
	for (let i = 0; i < list.length; i++) {
		let tabs = list[i].split('||');
		let tabName;
		tabName = tabs[0];
		if (sessionStorage.getItem("secondcurTabName") == tabName) {
			sessionStorage.setItem("tabUrl", tabs[1]);
		}
		let className = (sessionStorage.getItem("secondcurTabName") == tabName) ? 'class="active"' : (i == 0 && !sessionStorage.getItem("secondcurTabName")) ? 'class="active"' : '';
		htmls += '<div '+className+' onclick="showPageTab(&quot;'+hastab+'&quot;,&quot;'+tabName+'&quot;);clearpages()"><a href="'+tabs[1]+'">'+tabName+'</a></div>';
	}
	htmls += '</div>';	
	if ($(".tabqu").length === 0) {
		$(".contentAuto").before(htmls);
		$(".contentAuto").addClass("hastab");
	}
	
}
function clearpages() {
	sessionStorage.removeItem("page_maxrows");//清除所有分页页面设置的参数(每页显示的条数)
	sessionStorage.removeItem("current_page");//清除所有分页页面设置的参数(当前页次)
}
$(function() {
    try{
        $("body").niceScroll({
            autohidemode:false
        });
		var count = $(".gundongbox>table>tbody>tr").length;
		var nodata_num = $(".notata").length;
		if (count == 1 && nodata_num == 0) {
			$(".gundongbox").append('<div class="notata"><div class="nodata_pic"></div><div class="nodata_txt">'+lang_nodata+'</div></div>');
			$(".pagebox").hide();
		}
    } catch(ex){
        console.log("当前页面"+location.href+"未引用niceScroll.js");
    }
});