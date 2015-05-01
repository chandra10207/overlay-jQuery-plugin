(function($){var _default={opacity:0.5,color:'#222',zindex:1,styleClass:''};var _elements=[];var _targets=[];var actions={destroy:function(){this.each(function(i,e){destroyOne(e)})},setdefault:function(op){$.extend(_default,op)},destroyall:function(){while(_elements.length){_elements.pop()}while(_targets.length){var ele=_targets.pop();if(ele){ele.overlay.remove()}}}};function destroyOne(elem){var idx;if((idx=$.inArray(elem,_elements))===-1){return}_elements[idx]=undefined;_targets[idx].overlay.remove();_targets[idx]=undefined}$.fn.overlay=function(option){if('string'===typeof option){actions[option].call(this,[].slice.call(arguments,1)[0]);return}if(!this.length){return this}option=$.extend({},_default,option);this.each(function(i,e){if($.inArray(this,_elements)!==-1){return}var self=$(this);var overlay=$("<div>");if(!option['styleClass']){overlay.css("background-color",option['color']).css("z-index",option['zindex']).css("opacity",+option['opacity']).css("-ms-filter","progid:DXImageTransform.Microsoft.Alpha(Opacity="+(+option['opacity'])*100+")").css("filter","alpha(opacity="+(+option['opacity'])*100+")").css("margin","0").css("padding","0").css("border","none")}else{overlay.toggleClass(option['styleClass'])}if(self.css("position")==='fixed'){overlay.css("position","fixed")}else{overlay.css("position","absolute")}$("body").append(overlay);_elements.push(this);_targets.push({self:self,overlay:overlay})});$(window).resize(function(){$.each(_targets,function(i,e){if(!e){return}e.overlay.css("width",e.self.outerWidth()).css("height",e.self.outerHeight());if(e.self.css("position")==='fixed'){var box=e.self.get(0).getBoundingClientRect();e.overlay.css("top",box.top).css("left",box.left)}else{var tmp=e.self.offset();e.overlay.css("top",tmp.top).css("left",tmp.left)}})});$(window).resize();return this}}(jQuery))