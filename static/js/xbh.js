// JavaScript Document
$(init);
function init(){
	menu();
	banner();
	fhbutton();
	}
function fhbutton(){
	var _button=$(".fanhui");
	_button.click(function(){
		$(window).scrollTop(0);
		});
	}
function dqRL(){
	var _left=$(".nb-l");
	var _right=$(".nb-r");
	var _rc=$(".nb-r-con");
	if(_right.height()<_left.height()) _rc.css("height",_rc.height()+_left.height-_right.height());
	}
function menu(){
	var _menuul=$(".menu");
	var _menu=$(".m-ul li");
	var _menua=_menu.find("a");
	var _smenu=$(".s-menu");
	
	if(!_menua.hasClass("thisclass")) _menua.eq(0).addClass("thisclass");
	_menu.each(function(index, element) {
        $(this).hover(function(){
			_menu.find("a").removeClass("thisone");
			$(this).find("a").addClass("thisone");
			var tid=parseInt($(this).find("b").html());
			if(!isNaN(tid)) $.post("/plus/getnav.php",{"chaxun":tid},function(data){
				var _left=index<7?index*110:(index-1)*110;
				var _ul=$("<ul/>").css("left",_left).html(data);
				if(data!="") _smenu.html("").append(_ul).fadeIn();
				else _smenu.fadeOut();	
				});
			else _smenu.fadeOut();	
			},function(){});
    });
	_menuul.mouseleave(function(){_smenu.fadeOut();_menu.find("a").removeClass("thisone");});
	_smenu.hover(function(){},function(){$(this).fadeOut();_menu.find("a").removeClass("thisone");});
	}
	
function banner(){
	var _p=$(".banner");
	var _ak=$(".b-k");
	var _li=_p.find("li");
	var _w=_li.eq(0).width();
	var _len=_li.length;
	var _ul=_p.find("ul");
	var _timer;
	var flag=1;
	var t=0;
	var speed=4000;
	
	_ul.css("width",_w*_len);
	_ak.css({"display":"block","opacity":0}).click(function(){
		if($(this).index()==1){
			t--;
			if(t<0){
				t=0;
				return;
				}
			}
		else{
			t++;
			if(t>=_len){
				t=_len-1;
				return;
				}
			}
		_ul.animate({"left":-t*_w},"slow");
		});
	_timer=setTimeout(autoG,speed);
	_p.hover(function(){clearTimeout(_timer);_ak.animate({"opacity":0.8})},function(){_timer=setTimeout(autoG,speed);_ak.animate({"opacity":0})});
	
	
	function autoG(){
		t+=flag;
		if(t>=_len){
			t=_len-2;
			flag=-flag;
			}
		if(t<0){
			t=1;
			flag=-flag;
			}
		_ul.animate({"left":-t*_w},"slow",function(){_timer=setTimeout(autoG,speed);});
		}
	}