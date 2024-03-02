/**
 * By Springtym communuiction (Pressmp team). © 2020. All rights reserved;
 * -----------------------------------------------------------------------
 * @project	mpforms @version (v1.1.0)
 *	@presetKeys -->(name|email|password|gender|country|state|region|address|about|birth|feedback|note|image|video|audio|URL|check|checks)
 *	@inputSelectors -->(input|textarea|select|radio|scale|range|question|keywords|filecheck|checks|submit|button)
 *	@arguments -->(name|info|required|min|max|default|type|options|selected|printstate)
 *
 *	...
 *	Example mpforms.print.name().gender({require:false}).submit()
 *	mpforms.get.name()
 *	let forms = mpforms.get.gender().birth().feedback().range({min:17,max:80,default:[25,38],name:'age range'}).submit().done();
 *	Print mpforms.print.names().email().feedback().range({min:17,max:80,default:[25,38],name:'age range'}).submit().bind()
 *
 *	CHAIN FORM
 *	mpforms.print||get.
 *  @pesetKeys
 *	form({handler:"default",url:"test.php",method:"post"}).
 *	onsubmit(function(e,event){ console.log(e); return e}).
 *	response(function(res,err){
 *		console.log(res,err);
 *	}).
 *	submit({name:"Login"},{name:"Signup",link:'t.php'}).
 *	bind()
 *
 *	Use ${{selected}} for options in checks,radio,select as ["Option 1","Option 2${{selected}}","Option 3"]
 *
 *	Note that You can set a custom attribut attr (an object). 
 *	... example mpforms.name({require: true,attr:{id:"wyet",custome:"1",fn:function(d){...}}})
 *
 *	USE (next|continue|break) to truncate form.
 *	Form breakpoint print...name().next(true|{}, null|true|{} - show previous button - )...
 *	...................................................................... next version
 *	TO IMPROVE ON TIPS, CHROSSCHECK, Next|Prev values, Value effect of next format keywords on-paste if contains unwanted characters 
**/
window.mpforms = {
		striptag:function(x){ var x=(x||"").toString().trim();x=x.replace(/[<](.*?)[>]/igm,"").split("  ").join(" ").split("  ").join(" "); return x.trim()},
		nofocus:function(_){
			_.parentNode.style.borderColor = mpforms.root.config(_).borderA
		},
		dofocus:function(_){
			_.parentNode.style.borderColor = mpforms.root.config(_).borderB;
		},
		seletthis:function(_){
			var cf = mpforms.root.config(_)
			var s = _.children
			var i = s[0].children[0]
			var v = (s[1].children[0].innerHTML||'').trim()
			var m = _.parentNode.parentNode.lastChild
			var c = m.value.trim()
			var h = "checked"
			if(_.getAttribute(h)=="true"){
				i.style.borderColor = cf.borderA
				i.style.background = cf.background
				i.style.color = cf.background;
				m.value=c.split(","+v).join("").split(v+",").join("").split(v).join("")
				_.setAttribute(h,"false")
			}else{
				i.style.borderColor = cf.objectcolor
				i.style.background = cf.background;
				i.style.color = cf.objectcolor
				if(!c){ m.value=v }else{m.value +=","+v}
				_.setAttribute(h,"true")
			}
			m.value= m.value.trim()==","?"":m.value;
		},
		keywordsPatch:function(i,p,b,g){
			b = '<a style="font-family: serif;display: inline-block;padding: 0 0 0 10px;" onclick="mpforms.removekeyword(this)">&times;</a></span>'
			p = '<span style="background:rgba(98,105,111,.2); cursor:pointer; display:inline-block;padding:4px 8px; border-radius:3px; margin:2px;border: 2px solid rgba(188,207,222,.019);color:inherit; font-size:14px;">'
			g = function(i,p,b,_){_=""; mpforms.set.filter(i.split(","),function(v,c){if((v||"").trim())_+=(p+((v||"").trim())+b); }); return _}
			return g(i,p,b)
		},
		setkeywords:function(a,event,u,p,b,r,i,n,g){
			if(((event.which===13||(event.keyCode==32||event.key==" "||(a.value[(a.value.length)-1])==" "))&&(a.value||'').trim() && (a.getAttribute("button")!="true"))||u===true){
				n = a.parentNode.nextElementSibling
				r = a.parentNode.previousElementSibling
				i = a.value.trim().split(",").join(";")
				r.innerHTML += this.keywordsPatch(i);
				a.value = "";
				n.value = n.value.trim();
				var val = !!n.value?(n.value+","+i):i;
				var m = [];
				var clean = val.split(",");
				for (var i = 0; i < clean.length; i++) {
					var q = clean[i].trim();
					if(!!q)m.push(q)
				}
				n.value = m.toString();
				if(p===true) a.focus();
				return false
			}

		},
		removekeyword:function(_,__,___){
			_.parentNode.parentNode.nextElementSibling.children[0].focus()
			_.innerHTML="";
			___=_.parentNode.parentNode.nextElementSibling.nextElementSibling;
			__=this.striptag(_.parentNode.innerHTML);
			__ = __.trim()
			if(!__) return false;
			___.value = ___.value[0]==","?___.value.substring(1):___.value
			var m = [];
			this.set.filter(___.value.split(","),function(v){ if(v!=__&&v.trim()){ m.push(v); } })
			___.value=m.toString();
			___.value = (___.value||"").split(","+__+",").join(",").split(",,,,,").join(",").split(",,,,").join(",").split(",,,").join(",").split(",,").join(",");
			
			_.parentNode.parentNode.innerHTML=this.keywordsPatch(___.value||"")
		},
		triceRangeBalance:function(f,u,c,k,e,r,s){
			var barpercent = ((c||.1)/k)*100;
			var position = ((barpercent/100)*(u-f))+f
				s = Math.floor(position)
				e.innerHTML = s
				e.parentNode.nextElementSibling.children[2].value = s

			return false;
		},
		triceRangeCompare:function(f,u,c,k,e,r){

			var barpercent = ((r||.1)/k)*100;
			var position = ((barpercent/100)*(u-f))+f
			var s = Math.floor(position)

			var barpercent = ((c||.1)/k)*100;
			var position = ((barpercent/100)*(u-f))+f
				s = s+" - "+Math.floor((position+s)-f)
				e.innerHTML = (s)
				e.parentNode.nextElementSibling.children[4].value = s
				return false;
		},
		triceRangeCompare2:function(f,u,c,k,e,r){
			var barpercent = ((r||.1)/k)*100;
			var position = ((barpercent/100)*(u-f))+f
			var s = Math.floor(position)

			var barpercent = ((c||.1)/k)*100;
			var position = ((barpercent/100)*(u-f))+f
				s = s+" - "+Math.floor((position+s)-f)
				e.innerHTML = (s)
				e.parentNode.nextElementSibling.children[4].value = s
				return false;
		},
		clickslide:function(_,event,start,end,element){
			var e = _
			var s = _.children[0]
			var rect = e.getBoundingClientRect();
			var pos = (event.pageX-(rect.left*1))
			if(pos<=(e.clientWidth)&&pos>-1){s.style.width = (pos); this.triceRangeBalance(start,end,pos,e.clientWidth,element)};
		},
		driveslide:function(_,event,start,end,element){
			var e = _.parentNode;
			var s = _.previousElementSibling
			var rect = e.getBoundingClientRect();
			var pos = (event.pageX-(rect.left*1))
			if(pos<=(e.clientWidth)&&pos>-1){s.style.width = (pos); this.triceRangeBalance(start,end,pos,e.clientWidth,element)};
		},
		driveRangeX:function(_,event,start,end,element){
			var e = _.parentNode;
			var c = e.children;
			var s = _.previousElementSibling;
			var g = _.nextElementSibling;
			var rect = e.getBoundingClientRect();
			var pos = (event.pageX-(rect.left*1))
			var len = (s.clientWidth+g.clientWidth)*1
			var att = s.clientWidth*1
					  c[3].style.zIndex='1'
					  _.style.zIndex='100'
				if(pos<=(e.clientWidth)&&pos>-1&&(len>pos)){
					s.style.width = (pos)+"px";
					g.style.width = (len-pos)+"px";
					this.triceRangeCompare(start,end,len-pos,e.clientWidth,element,pos)
				}
		},
		driveRangeTouchX:function(_,event,start,end,element){
			var e = _.parentNode;
			var c = e.children;
			var s = _.previousElementSibling;
			var g = _.nextElementSibling;
			var rect = e.getBoundingClientRect();
			var pos = (event.touches[0].clientX-(rect.left*1))
			var len = (s.clientWidth+g.clientWidth)*1
			var att = s.clientWidth*1
					 c[3].style.zIndex='1'
					  _.style.zIndex='100'

				if(pos<=(e.clientWidth)&&pos>-1&&(len>pos)){
					s.style.width = (pos)+"px";
					g.style.width = (len-pos)+"px";
					this.triceRangeCompare(start,end,len-pos,e.clientWidth,element,pos)
				}


		},
		driveRange:function(_,event,start,end,element){
			var e = _.parentNode;
			var c = e.children;
			var g = e.children[0];
			var s = _.previousElementSibling;
			var len = (g.clientWidth)*1
				 c[1].style.zIndex='1'
				 _.style.zIndex='100'

			var rect = e.getBoundingClientRect();
			var pos = (event.pageX-(rect.left*1)-c[0].clientWidth)
				if(pos<=(e.clientWidth-len)&&pos>-1){s.style.width = (pos)+"px"; this.triceRangeCompare2(start,end,pos,e.clientWidth,element,len)}

		},
		driveRangeTouch:function(_,event,start,end,element){
			var e = _.parentNode;
			var c = e.children;
			var g = e.children[0];
			var s = _.previousElementSibling;
			var len = (g.clientWidth)*1


			var rect = e.getBoundingClientRect();
			var pos = (event.touches[0].clientX-(rect.left*1)-c[0].clientWidth)
				if(pos<=(e.clientWidth-len)&&pos>-1){s.style.width = (pos)+"px"; this.triceRangeCompare2(start,end,pos,e.clientWidth,element,len)}

		},
		driveslideTouch:function(_,event,start,end,element){
			var e = _.parentNode
			var s = _.previousElementSibling

			var rect = e.getBoundingClientRect();
			var pos = (event.touches[0].clientX-(rect.left*1))
				if(pos<=(e.clientWidth)&&pos>-1){s.style.width = (pos)+"px"; this.triceRangeBalance(start,end,pos,e.clientWidth,element)};

		},
		printstate:function(_,t){
			var p = (_||{}).parentNode;
			var d = document.createElement("div")
			var l = mpforms.root.options({name:"state",options:Nation.getStates(_.value||t)})
			var s ='<div style="padding:10px 0; color:'+mpforms.root.config(_.value?_:null).objectcolor+';">Select State/Region</div>';
				d.innerHTML = s+l
				if(!t)p.nextElementSibling.innerHTML=d.outerHTML;
				else return s+l;
		},
		setBDoptions:function(a,b,c,d,e,f){
				e="";
				d = a==="day"?32:(a=="year"?(new Date().getFullYear()):["January","February","March","April","May","June","July","August","September","October","November","December",""])
				c=Array.isArray(d)?d.length:(d<=32?d:91);
				f = function(_){return '<option value="'+(_[0]=='-'||_[(_.length-1)]=='-'?'':_)+'">'+_+'</option>'}

				if(a==="month"||a==="day")for(var i=0;i<c;i++){ e += f(i==0?'-'+a+'-':(a==="month"?d[(i-1)]:i))}
				else for(var i=0;i<c;i++){ e += f(i==0?'-'+a+'-':(d-i))}


			if(b){
				b=document.querySelectorAll("script");
				b = b[(b.length-1)];
				b.outerHTML = e
			}else return e;
		},
		set:{
			balanceOptionBucket:function(s,e,n,t){
				var a = window.innerHeight
				var b = n.getBoundingClientRect()
				var bottom = a-b.bottom
				var top = b.bottom
				var max = null
					n.style.borderColor = mpforms.root.config(s).borderB
				if(top>bottom&&s.clientHeight>(bottom-20)){
					max=top-20
					s.style.top = 'initial'
					s.style.bottom = n.clientHeight+1
					s.style.boxShadow = 'rgba(90, 90, 90, 0.13) 0px -3px 8px 0px';
					s.style.borderRadius = '10px 10px 0 0';
					n.style.borderRadius = '0 0 10px 10px';

				}else{
					s.style.top = n.clientHeight+1
					s.style.bottom = 'initial'
					s.style.boxShadow = 'rgba(90, 90, 90, 0.13) 0px 3px 8px 0px';
					n.style.borderRadius = '10px 10px 0 0';
					s.style.borderRadius = '0 0 10px 10px';
					max=bottom-20

				}
					s.style.maxHeight = max


			},
			submit:function(a,c,event,n){
				this.Form = a.parentNode.parentNode.parentNode.parentNode;
				var d = this;
				var e = mpforms.formChain[c];
				var k = Object.keys(e);
				this.submitionChecklist = k.length
				n = {click:a.getAttribute("onclick"),that:a,color:a.style.color}
				a.style.color = "rgba(255, 255, 255,0.29)"
				a.setAttribute("onclick","")
				for(var o=0;o<k.length;o++){
					d.processSubmition((e[k[o]][0].id),e[k[o]][2],n,k[o],event);
				}
			},
			data:{},
			Form:null,
			errorlog:[],
			verify:function(p){
				var type = p.getAttribute("type");
					type = (type||"").trim().toLowerCase();
				if(type==="email"||type==="url"||type==="name"||type==="website"||type==="username"||type==="mobile"){
					type = type==="website"||type==="URL"?"url":type;
					return mpforms.verify[type](p.value)
				}else return true;
			},
			processSubmition:function(a,p,o,s,event){
				this.submitionChecklist += -1
				var d = this;
				var g = "getAttribute"
				var div = document.getElementById(a);
				if(!div) return false;
				var imp = document.querySelectorAll('#'+a+' input, #'+a+' select, #'+a+' textarea');
				var	err = div.children[0].children[0]?div.children[0].children[1]:div.children[0]
				var sen = false;
				for(var i = 0; i<imp.length;i++){
					if(!imp[i][g]("bypass")){
						if(imp[i].value==""&&p=="important"&&!imp[i][g]("notrequired")){
							err.style.display="initial";
							div.style.borderLeftColor="red";
							if((imp[i].name||'').indexOf("[]")>-1){
								var o = imp[i];
								var o = o.previousElementSibling||o.nextElementSibling||{};
								if(!o.value){o = o.previousElementSibling||o.nextElementSibling||{}; if(!o.value)d.errorlog.push("**")}

							}else d.errorlog.push("**");
						}else if(p=="important"){
							sen = d.verify(imp[i])
							if(sen!==true){
								err.style.display="initial";
								err.innerHTML="**Invalid input";
								div.style.borderLeftColor="red";
								d.errorlog.push("**")
							}else{
								err.style.display="none";
								if((imp[i].name||'').indexOf("[]")>-1){
									var m = (imp[i].name).split("[]").join("");
									if(d.data[m]) d.data[m].push(imp[i].value);
									else{
										d.data[m] = [];
										d.data[m].push(imp[i].value);
									}
								}else{
									if(!d.data[(imp[i].name)||s]){
										d.data[(imp[i].name)||s] = imp[i].value
									}else if(d.data[(imp[i].name)||s]){}

								}

							}
						}else{
								err.style.display="none";
								if(!d.data[(imp[i].name)||s]){
									d.data[(imp[i].name)||s] = imp[i].value
									}else if(d.data[(imp[i].name)||s]){}
						}
					}
				}
					
				if(this.submitionChecklist===0){

					if(o.that){
						o.that.setAttribute("onclick",o.click)
						o.that.style.color = o.color;
					}
					if(d.errorlog.length===0){
						if(this.breakpoint==="waiting"){/*breakpoint*/this.breakpoint=true; return false}
						var i = this.Form.getAttribute('id');
						
								d.data.Form = this.Form
								
								d.data.UpdateInput = function(name,value){
									if(this.Form&&"string"===typeof name){
										var id = "string"===typeof i?i:this.Form.getAttribute('id');
										var d = document.querySelectorAll('#'+id+' input[name='+name+'],#'+id+' textarea[name='+name+'],#'+id+' select[name='+name+'],#'+id+' option[name='+name+']');
										if(d[0]){
											d[0].value=value;
											if(d[1])d[1].value=value;
											if(d[2])d[2].value=value;
										}
									}
								}
								d.data.RemoveInput = function(name,value){
									if(this.Form&&"string"===typeof name){
										var id = "string"===typeof i?i:this.Form.getAttribute('id');
										var d = document.querySelectorAll('#'+id+' input[name='+name+'],#'+id+' textarea[name='+name+'],#'+id+' select[name='+name+'],#'+id+' option[name='+name+']');
										if(d[0]){
											d[0].outerHTML='';
											if(d[1])d[1].outerHTML='';
											if(d[2])d[2].outerHTML='';
										}
									}
								}
								d.data.AddInput = function(name,value){
									if(this.Form&&"string"===typeof name){
										var inp = document.createElement("input");
										inp.setAttribute("name",name);
										inp.setAttribute('value',value)
										inp.value=value

										var id = "string"===typeof i?i:this.Form.getAttribute('id');
										var d = document.querySelectorAll('#'+id+' input[name],#'+id+' textarea[name],#'+id+' select[name],#'+id+' option[name]');
										if(d[0]){
											d[0].append?d[0].append(inp):d[0].appendChild(inp);
										}
									}
								}

								d.data.Form.New = function(c){
									if((this||{}).outerHTML){
										this.innerHTML=""
										this.outerHTML=c
										this.id=""

									}
								}
								d.data.Form.Thanks = function(a){
									this.New(mpforms.get.thanks(a));
								}
								d.data.Form.Close = function(){
									if((this||{}).outerHTML&&(this||{}).id){
										this.outerHTML=""
									}
								}
								d.data.Form.Insert = d.data.Form.New;
								d.data.Form.newForm = d.data.Form.New;
								d.data.Form.Clear = d.data.Form.Close;
								d.data.Form.Report = d.data.Form.Thanks;

						if(mpforms.responses.submit[i]){
								var pass = mpforms.responses.submit[i](d.data,event);
								if(pass=="[object Object]"){ var newForm = pass.Form;delete pass.Form;}
						}else{
							var pass = d.data;
							var newForm = d.data.Form;
							delete pass.Form;
						}
						
					if(this.Form.getAttribute("handler")==="ajax"){
						event.preventDefault();
						if(pass){
							var m = (this.Form.getAttribute("method")||"").toLowerCase();
							var f = (this.Form.localName==="form"||this.Form.nodeName==="FORM")&&(m==="post")?true:false;
							var i = this.Form.getAttribute('id');
							var u = this.Form.getAttribute('action');
							this.Form = !!f?this.Form:pass;
							mpforms.JX.send(newForm,{url:u,method:m,form:f,fn:mpforms.responses.JX[i]});
						}
					}
					}else event.preventDefault();

					d.data={}
					d.errorlog=[]
				}
			},
			next:function(_,__,event){
				var n = "parentNode"
				var a = "getAttribute"
				var t = _[a]("type")
				var c = _[a]("counts")
				var b = _[a]("breakpoint")
				var r = _[a]("panels")
				var p = _[n][n][n][n].id
				var d = document.querySelectorAll("#"+p+" section");
				var nn = {click:_.getAttribute("onclick"),that:_,color:_.style.color}
						_.style.color = "rgba(255, 255, 255,0.29)"
						_.setAttribute("onclick","")
						r=r*1;
				var e = mpforms.formChain[__];
				var k = Object.keys(e);
				this.submitionChecklist = r-1
				this.breakpoint = "waiting"
				that = this;
					c=(c*1)+((b||0)*1);

				this.filter(d,function(v,s,f,q){
					if(s<b){that.submitionChecklist-=1; return "continue";}
					that.processSubmition(v.children[0].id,e[k[s]][2],nn,k[s],event);
					if(s==(r-1)){return false;}
				});

				if(this.breakpoint===true){
					o=t=="continue"?"block":"none";
					this.filter(d,function(v,s,f,q){
						if(s>=(c-1)){
							v.style.display="block";
							if(_.nextElementSibling) _.nextElementSibling.style.display="block"
						}else{
							v.style.display=o;
							_[n][n][n].style.display="none"
						}
						if(v[a]("breakstatus")){
							var x = v[a]("breakpoint");
							if(x>b)return false;
							else c+=1;
						if(t=="continue")(v.style.display="none");
						}
					});
					_.style.display="none"
					this.submitionChecklist=0;
				}

				_.style.color = nn.color
				_.setAttribute("onclick",nn.click)
			},
			prev:function(_,__){
				var n = "parentNode"
				var a = "getAttribute"
				var m = "breakcounts"
				var h = "inline-block"
				var d = "display"
				var s = "style"
				var k = "block"
				var u = "none"
				var o = _[a](m)
				var p = _[n][n][n][n].id;
				var i = false;
				var	c = false;
				var b = document.querySelectorAll("#"+p+">section");

					this.filter(b,function(v){
						if(o==1){
							if(v[a](m)){ i = true}
							if(i) v[s][d]=u
							else v[s][d]=k
						}else{
							if(!c) v[s][d]=u
							else v[s][d]=k
						}

						if(v[a](m)){
							var x = v[a](m);
							c=false
							if(x==o){
								v[s][d]=k
							}else if(x==(o-1)) {
								c=true
								v[s][d]=k
							}
						}
					});
					_.previousElementSibling[s][d]=h
					_[s][d]=u


			},
			filter:function(v,fn,s){
				for(var o=0;o<v.length;o++){
					if("function"===typeof fn){
						s = fn(v[o],o);
						if(s==="continue") continue;
						if(s===false) break;
					}
				}
			},
			checktageted:function(e,a,s,t){
				a = 'getAttribute';
				s = 'status-check';
				t = 'parentNode';
				return e[a](s)||
						((e[t]||{})[a]?e[t][t][a](s):false)||
						((e[t]||{})[a]?e[t][t][a](s):false)||
						(((e[t]||{})[t]||{})[a]?e[t][t][a](s):false)||
						((((e[t]||{})[t]||{})[t])?e[t][t][t][a](s):false);
			},
			openOptions:function(_,e){
				var cf = mpforms.root.config(_);
				var s = 'setAttribute';
				var h = 'innerHTML';
				var n = _.nextElementSibling
				var v = n.nextElementSibling[h]
				if(n[h]){
					n.style.display = "none"
					n[h] = '';
					_.style.borderRadius=cf.curve+" "+cf.curve+" "+cf.curve+" "+cf.curve
					_.style.borderColor=cf.borderA
					_[s]('status-check','close')
				}else{
					n.style.display = "block"
					n[h] = v;
					_[s]('status-check','open')
					this.balanceOptionBucket(n,e,_);
					if(!this.Listening){
						document.addEventListener('click',function(event){
							if(!mpforms.set.checktageted(event.target||window.document.body)){
								mpforms.set.Listening = true;
								n.style.display = "none"
								n[h] = '';
								_.style.borderRadius=cf.curve+" "+cf.curve+" "+cf.curve+" "+cf.curve
								_.style.borderColor=cf.borderA
							}
						},true)
					}
				}

			},
			setparent:function(_){
				this.setparentNode = {parent:(_.previousElementSibling),input:(_.previousElementSibling.previousElementSibling)}
			},
			selectedOption:function(_){
				var txt = (_.innerText||'').trim();
				var val = _.getAttribute('value')||txt
				var that = this;
				var setvalue = function(){
				var cf = mpforms.root.config(_);
					that.setparentNode.parent.children[0].children[0].innerHTML=txt;
					that.setparentNode.input.value=val
					that.setparentNode.parent.style.borderRadius = cf.curve+" "+cf.curve+" "+cf.curve+" "+cf.curve
				}
				setTimeout(setvalue,50)
			},
			gender:function(_){
				var display = _.style.display
				var cf = mpforms.root.config(_);
				var s = _.parentNode.children;
				var t = "setAttribute"
				var o = "style"
				var z= "cursor:pointer;padding: 6px 12px;display: "+(display||'inline-block')+";margin: 3px;border-radius: "+cf.curve+"; color:"+cf.color3+";"
				var y = z+"background:"+cf.background+";"
				var x = z+"background:"+cf.objectcolor+"; color:#fff;";
					for (var i = 0; i < s.length; i++) {
						s[i][t](o,y);s[i].children[0].style.color = cf.background;
					}
				_[t](o,x)
				_.children[0].style.color = "#fff";
				_.parentNode.nextElementSibling.setAttribute("value",_.getAttribute("targ"));
			},
			boolean:function(_){
				var cf = mpforms.root.config(_);
				var s = _.parentNode.children;
				var t = "setAttribute"
				var o = "style"
				var z= "cursor:pointer;padding: 6px 12px;display: inline-block;margin: 3px;border-radius: "+cf.curve+"; color:"+cf.color3+";"
				var y = z+"background:"+cf.background+";"
				var x = z+"background:"+cf.objectcolor+"; color:#fff;"
					s[0][t](o,y);s[0].children[0].style.color = cf.background;
					s[1][t](o,y);s[1].children[0].style.color = cf.background;
					_[t](o,x)
					_.children[0].style.color = "#fff";
					_.parentNode.nextElementSibling.value=_.getAttribute("targ")

			},
			radio:function(_){
				var m;
				var c = "children"
				var s = "setAttribute"
				var g = "getAttribute"
				var p = _.parentNode;
				var cf = mpforms.root.config(_);
				var x = p[c];

				for(var i=0;i<x.length;i++){
					x[i][s]("selected","false")
					m=x[i][c][0][c][0];
					m.style.color=cf.background;
					m.style.borderColor=cf.borderA;

				}

				_[c][0][c][0].style.color=cf.objectcolor
				_[c][0][c][0].style.borderColor=cf.objectcolor
				_[s]("selected","true")
				p.nextElementSibling.value = _[c][1].innerText;

			}
		},
		res:{
			rand:function(_,__){ var __c="aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789",__d="0123456789",a=__c,self=this,a=a.split(''),n=__d,n=n.split(''),__=__&&__!==''?__:5, r='';for(var i=0;i<__;i++){ r=r+self.shuffle((!_?n:a))[0];}return r;},shuffle:function(a){var i,j,x;for(i=a.length-1;i>0;i--){ j=Math.floor(Math.random()*(i+1));x=a[i];a[i]=a[j];a[j]=x;};return a},netError:function(a,o){
				var c = function(q){return '<div style="text-align: center;font-weight: normal; color: red; font-size:80%; background: rgb(255, 255, 255,0.12); margin: 0 auto;display: block;padding:3px 10px 1 10px;max-width: 300px;">'+(q||'')+'</div>'},s = [],m = [],r = "";for(var i = 0; i<a.length;i++){s = a[i];if(Array.isArray(s)&&s.length===2){m = s[0].split("===").join("==").split("==");r += (mpforms.res.get(m[0])===m[1])?c(s[1]):''}else if(Array.isArray(s)&&s.length===1){ var q = mpforms.res.get(s[0]);r+=(q&&"undefined"!=q?c(q):'');} };return r
			},get:function(a,g){ var g=!g?window.location:g,c=g.toString().split(a+'='),b=!c[1]?null:c[1];if(b!==null)var nV=b.indexOf('&')?b.split('&'):null,rt=!nV?b[1]:nV[0];return unescape(rt)}
		},
		crosscheckBASE:function(a){
		},
		crosscheck:function(_){
			var name = _.getAttribute("name")
			var type = _.getAttribute("type")
			type = "text"==type||!type?name:type;
			var check = this.set.verify(_);
			var par = ____prnt(_,'section');
			var col = check?"#48e209":(((par||{}).style||{}).background||"#000")
			if(par){
			var las = par.children[0].children[0].lastElementChild
				las.style.color=col;
				return ;
			}

		},
		plug:function(fn){
			if("function"===typeof fn) this.pluggedfunction = fn;
		},
		plugin:function(fn){
			if("function"===typeof fn) this.AllPlugins = fn;
		},
		onsubmit:function(fn){return this.plug(fn)},
		submit:function(fn){return this.plug(fn)}
	}


	mpforms.formChain = {}

	mpforms.root = {
		raw:{
			e:function(a){return document.createElement(a||'div')},
			t:'setAttribute',
			h:'innerHTML',
			v:'value',
			H:'outerHTML',
		},
		configuration:{
			margin:"10px",
			padding:"10px",
			border:"1px",
			fontsize:"inherit",
			textcolorA:"inherit",
			textcolorB:"#777",
			maxwidth:"600px",
			curve:"6px",
			background: "rgba(152, 152, 152, .04)",
			hidename:false,
			hideinfo:false,
			borderA:"rgba(153, 153, 153, .11)",
			borderB:"#00a1ff",
			boxshadow_:"rgb(240, 243, 246) -1px 0px 9px 0px",
			boxshadow:"none",
			objectcolorA:"rgb(21 121 199)",
			objectcolorB:"rgb(42 116 169)",
			objectcolorC:"rgb(124 176 214)",
			objectcolorD:"rgba(165, 194, 214,0.75)",
			button:"rgb(8 116 179)",
			fontfamily:"inherit"
		},
		config:function(a,c,n){
			if(a){
				var m = ____prnt(a,'form')||____prnt(a,'fieldset');
				if(!!m&&(m||{}).getAttribute){
					m = m||{};
					m = m.getAttribute("config");
					m = mpforms.design[m];
					if(m=="[object Object]"&&(m||{}).color) return m;
				}
			}
			n = this.configuration;
			c = mpforms.config||n;
			c.color = c.textcolorA||n.textcolorA;
			c.color2 = c.textcolorB||n.textcolorB;
			c.color3 = c.textcolorC||c.color;
			c.curve = c.curve||n.curve;
			c.border = c.border||n.border;
			c.padding = c.padding||n.padding;
			c.hidename = c.hidename||n.hidename;
			c.hideinfo = c.hideinfo||n.hideinfo;
			c.fontsize = c.fontsize||n.fontsize;
			c.maxwidth = c.maxwidth||n.maxwidth;
			c.borderA = c.borderA||n.borderA;
			c.borderB = c.borderB||n.borderB;
			c.boxshadow = c.boxshadow||n.boxshadow;
			c.background = c.background||n.background;
			c.fontfamily = c.fontfamily||n.fontfamily;
			c.objectcolor = c.objectcolorA||n.objectcolorA;
			c.objectcolorB = c.objectcolorB||n.objectcolorB;
			c.objectcolorC = c.objectcolorC||n.objectcolorC;
			c.objectcolorD = c.objectcolorD||n.objectcolorD;
			c.button = c.button||n.button;
			c.margin = c.margin||n.margin;
			c.padding = c.padding||n.padding;
			c.background = c.background=="none"||c.background=="inherit"||c.background=="initial"?n.background:c.background

			return c
		},
		body:function(a){
			var _ = this;
			var cf = this.config();
			var r = this.raw;
			var div = r.e("section");
			var div2 = r.e();
			var lab1 = r.e('span');
			var lab2 = r.e("label");
			var span = r.e('span');
			var s = r.s;
				a.name=a.label||a.name
				div.pmpstyle().wt(a._hiddeninput__?"0px":"auto").pd(a._hiddeninput__?"0px":((a.margin||cf.margin||"10px")+" 5px")).mg("0px").ds(mpforms.breakpoint?"none":"block").nh("0px").ba(cf.background).bs(cf.boxshadow).br("0").ov(a._hiddeninput__?"hidden":"visible").vs(a._hiddeninput__?"hidden":"visible").ht(a._hiddeninput__?"0px":"auto").bd("none").ff(cf.fontfamily).cl(cf.color).fs(cf.fontsize);
				if(a.insertBreakpointType){
					div[r.t]("breakstatus",a.insertBreakpointType)
					div[r.t]("breakpoint",a.breakpoint)
					div[r.t]("breakcount",a.counts)
					div[r.t]("breakcounts",a.breakcounts)
				}
				div2.pmpstyle().wt('auto').pd("0 4px").mg("0px").ds("block").nh("auto").ba("none").bs("none").bd("none").br("0").ov("visible").ol("none").tr(".5s").mw(cf.maxwidth).mg("0 auto");
				div2.style.borderLeft=("2px solid transparent");
				div2[r.t]("onfocus","this.style.borderLeft='2px solid rgba(14, 220, 77, .070)'")
				div2[r.t]("onfocusout","this.style.borderLeft='2px solid transparent'")
				div2[r.t]("tabindex","0")
				div2[r.t]("onclick","mpforms.crosscheckBASE(this)")
				div2[r.t]("breakcounts",a.breakcounts)
				div2.id="_"+mpforms.res.rand(true,50)

				span.pmpstyle().wt('auto').pd("0").mg("0px").ds("none").nh("auto").ht("auto").ba("none").fw("normal").br("none").bd("none").ov("hidden").fs("90%").cl("red").noselect();
				lab1.pmpstyle().wt('auto').pd("3px 0").mg("0px").ds(!cf.hidename?(!a.hidename?"block":"none"):"none").nh("auto").ht("auto").ba("none").fw("normal").br("none").bd("none").ov("hidden").fs("100%").noselect();

				lab2.pmpstyle().wt('auto').pd("3px 0").mg("0px").ds(!cf.hideinfo?(!a.hideinfo?"block":"none"):"none").nh("auto").ht("auto").ba("none").fw("normal").br("none").bd("none").ov("hidden").fs("87%").cl(cf.color2).noselect();
				var err = a.error==='(Optional)'?"optional":"important"
				var error = (a.error||'').trim()=='(Optional)'?a.error:'<span style="color:red; display:none;">'+a.error+'</span>';

				var inf = (a.info||'');
					inf = inf?mpforms.SVG.info()+' '+inf:inf;
				var name = !cf.hidename?span[r.H]+((a.name||"").charAt(0).toUpperCase()+((a.name||"").substring(1))):'';
					name = (a.label||a.name||"").toString().trim()&&typeof name==="string"&&name.length>1?name+' '+(error)+' <span style="color:rgba(0,0,0,0)">'+mpforms.SVG.checkcircle(15,3)+'</span>':''

				span[r.h] = a.error||'';
				lab1[r.h] = !cf.hidename||!a.hidename?name:'';
				lab2[r.h] = !cf.hideinfo||!a.hideinfo?inf:'';
				div2[r.h] = lab1[r.H]+lab2[r.H]+(a.body||'')
				div[r.h] = div2[r.H];

				var s = mpforms.formChain[(Object.keys(mpforms.formChain).length)-1];
				if(s&&"object"===typeof s){
					var len = Object.keys(s).length;
					delete a.body
					s[a.name||len]=[div2,a,err]
				}

			return div[r.H]
		},
		header:function(a){
			return '';
		},
		dex:{

		},
		setInputAttribute:function(inp,atr){
			var keys = Object.keys(atr);
			var that = this;
			for (var i = 0; i < keys.length; i++) {
				if("function"===typeof atr[keys[i]]){
					var rand = "_"+mpforms.res.rand(true,50);
						that.dex[rand] = atr[keys[i]];
							inp.setAttribute([keys[i]] , "mpforms.root.dex."+rand+"(this,event);")
				}else{
					inp.setAttribute([keys[i]] , atr[keys[i]]);
				}

			}
			return inp;
		},
		input:function(a){
			var r = this.raw;
			var div = r.e();
			var imp = r.e('input');
			var cf = this.config();
			
				div.pmpstyle().pd("5px").mg("2px 0").bd(cf.border+" solid "+cf.borderA).mw(cf.maxwidth).mg("1px auto").br(cf.curve).ds("block").wt("auto").ht("auto").ov("hidden").ba("rgba(153, 153, 153, .051)");
				if(a.disabled===true||a.disable===true)imp[r.t]('disabled',"true");
				imp[r.t]('type',(a.type||'text'));
				imp[r.t]('name',(a.name||a.names||a.type||'text'));
				imp[r.t]('placeholder',(a.placeholder||''));
				imp[r.t]('onfocus','mpforms.dofocus(this)');
				imp[r.t]('onfocusout','mpforms.nofocus(this)');
				imp[r.t]('require',a.require===false||a.required===false?"false":"true");
				imp[r.t]('value',a.val||a.value||a.presset||a.initial||a.set||"");
				a.attr = a.attr||a.attribute||a.setAttribute||a.setattribute||a.event||{};
				imp = this.setInputAttribute(imp,a.attr);
				imp = mpforms.root.__handleCallBcks(a,imp)
				if(a.hide){
					imp.pmpstyle().ds("none").vs("hidden")
				}else{
					imp.pmpstyle().ds("block").vs("visible").wt("100%").pd((a.padding||cf.padding||"5px")+" 0").fs("95%").mg("0").bd("none").br("0").ol("none").ba('none').cl(cf.color3||'inherit')
				}
				div[r.h] = imp[r.H];
				
			return div[r.H];
		},
		textarea:function(a,c){
			var r = this.raw;
			var div = r.e();
			var imp = r.e('textarea');
			var cf = this.config();
				div.pmpstyle().pd("5px").mg("2px 0").bd(cf.border+" solid "+cf.borderA).mw(cf.maxwidth).mg("1px auto").br("2px").ds("block").wt("auto").ht(!c?"auto":"200px").ov("hidden").ba("rgba(153, 153, 153, .0511)");
				if(a.disabled===true||a.disable===true)imp[r.t]('disable',"true");
				imp[r.t]('type',(a.type||'text'));
				imp[r.t]('name',(a.name||a.names||a.type||'text'));
				imp[r.t]('placeholder',(a.placeholder||a.name||'')+'...');
				imp[r.t]('onfocus','mpforms.dofocus(this)');
				imp[r.t]('onfocusout','mpforms.nofocus(this)');
				imp[r.t]('onchange','mpforms.crosscheck(this)');
				imp[r.t]('require',a.require===false||a.required===false?"false":"true");
				imp[r.t]('value',a.val||a.value||a.presset||a.initial||a.set||"");
				imp[r.h]=(a.val||a.value||a.presset||a.initial||a.set||"");
				a.attr = a.attr||a.attribute||a.setAttribute||a.setattribute||a.event||{};
				imp = this.setInputAttribute(imp,a.attr);
				imp = mpforms.root.__handleCallBcks(a,imp)
				if(a.hide){
					imp.pmpstyle().ds("none").vs("hidden")
				}else{
					imp.pmpstyle().ds("block").vs("visible").wt("100%").pd((a.padding||cf.padding||"10px")+" 0").fs("100%").mg("0").bd("none").br("0").ol("none").ba("none").ff("sans-serif").rs("none").ht(!c?"auto":"100%").cl(cf.color3)
				}
				div[r.h] = imp[r.H];
			return div[r.H];
		},
		note:function(a){return this.textarea(a,true)},
		check:function(a){
			if(!a) return "";
			var cf = this.config();
			var r = this.raw;
			var div = r.e();
			var table = r.e();
			var span = r.e('span');
			var i = r.e('i');
			var span2 = r.e('span');
			var label = r.e('label');
				div.pmpstyle().pd("0").mg("2px 0").bd("none").mw(cf.maxwidth).mg("1px auto").br("3px").ds("block").wt("auto").ht("auto");
				table.pmpstyle().pd("0").mg("0").bd("none").br("0").ds("table").wt("100%").ht("auto").cr("pointer");
				table[r.t]("onclick","mpforms.seletthis(this)");
				if(a.selected)table[r.t]("checked","true");

				span.pmpstyle().ds("table-cell").wt("10px").pd("5px").va("top").ba("none").bd("none").mg("0").cr("pointer");
				i.pmpstyle().ds("inline-block").br("5px").cl(a.selected?cf.objectcolor:cf.background).bd(a.selected?'2px solid '+cf.objectcolor:"2px solid "+cf.borderA).ba(cf.background).mg("0").pd("0px").tr(".5s")
				i[r.h] = mpforms.SVG.checkbox(20);
				span[r.h] = i[r.H]

				span2.pmpstyle().ds("table-cell").va("middle").ba("none").bd("none").mg("0").cr("pointer");
				label.pmpstyle().ds("inline-block").pd("0").br("0").cl("inherit").fs("85%").bd("none").ba("none").mg("0").fw("normal").cr("pointer").cl("inherit").noselect();
				label[r.h] = a.info||a.option||a.value
				span2[r.h] = label[r.H]



				table[r.h] = span[r.H]+span2[r.H]


				div[r.h] = table[r.H];
			return div[r.H];
		},
		checks:function(c,r,y,i,n,g){
			a=c||{}
			g = this.raw;
			a.options=a.options||a.option||a.select||a.choose||a.value
			if(!a.options || !Array.isArray(a.options)) return this.check(c);
			var p = g.e('input');
			var w = g.e();
			r="";
			y=this;
				for(var n,o,i=0,q={}; i<a.options.length; i++){
					o=a.options[i].toString();
						if(o.indexOf("${{")>-1){
							o = o.split("${{selected}}").join("").trim();
							q.selectedSeledted = o;
							q.selected=true;
							a.selected = !!a.selected?a.selected+","+o:o;
						}else q.selected=false;
						q.value=o
						n=(c.name||c.type||'');
						q.name=(n?n+'-':'')+o
				r += y.check(q);
				}
				p[g.t]('name',a.name||a.type||a.info)
				p[g.t]('type','text')
				p[g.t]('value',a.selected?a.selected:'')
				p = this.setInputAttribute(p,typeof a.attr==="object"?a.attr:{})
				p = mpforms.root.__handleCallBcks(a,p)
				p.pmpstyle().ds("none").vs("hidden")

			w[g.h] = r+p[g.H];
			return w[g.H]
		},
		radiooptions:function(a){
			var cf = this.config();
			var r = this.raw;
			var table = r.e();
			var span = r.e('small');
			var i = r.e('span');
			var span2 = r.e('small');
			var label = r.e('label');
				table.pmpstyle().pd("0").mg("0").bd("none").br("0").ds("table").wt("100%").ht("auto").cr("pointer");
				table[r.t]("onclick","mpforms.set.radio(this)");
				table[r.t]("selected",a.selected?"true":"false");

				span.pmpstyle().ds("table-cell").wt("10px").pd("5px").va("top").ba("none").bd("none").mg("0").cr("pointer");
				span.style["line-height"] = "0";
				i.pmpstyle().ds("inline-block").br("100%").cl(a.selected?cf.objectcolor:cf.background).bd(a.selected?'2px solid '+cf.objectcolor:"2px solid "+cf.borderA).ba(cf.background).mg("0").pd("0px").tr(".5s")
				i[r.h] = mpforms.SVG.checkbox(20);
				span[r.h] = i[r.H]

				span2.pmpstyle().ds("table-cell").va("middle").ba("none").bd("none").mg("0").cr("pointer");
				label.pmpstyle().ds("inline-block").pd("0").br("0").cl("inherit").bd("none").ba("none").mg("0").fw("normal").cr("pointer").cl("inherit").noselect();
				label[r.h] = a.info
				span2[r.h] = label[r.H]
				table[r.h] = span[r.H]+span2[r.H];



			return table[r.H];
		},
		radio:function(a){
			var cf = this.config();
			var options = a.options||a.option
			var that = this;
			var r = that.raw;
			var div = r.e();
			var ret = '';
			var o = '';
			var q = {};
			var imp = r.e('input');
				imp[r.t]('name',a.name||a.type||'radio')
				imp[r.t]('type','text')
				imp.pmpstyle().ds("none").vs("hidden")
				div.pmpstyle().pd("0").mg("2px 0").bd("none").mw(cf.maxwidth).mg("1px auto").br("3px").ds("block").wt("auto").ht("auto");
				a.attr = a.attr||a.attribute||a.setAttribute||a.setattribute||a.event||{};
				imp = this.setInputAttribute(imp,a.attr);
				imp = mpforms.root.__handleCallBcks(a,imp)
			if(Array.isArray(options)){
				for(var i=0;i<options.length; i++){
					o = options[i]||'';
					o = o.toString();
					if(o){
						if(o.indexOf("${{")>-1&&!q.selectedSeledted){
							o = o.split("${{selected}}").join("").trim();
							q.selectedSeledted = o;
							q.selected=true
						}else q.selected=false
						q.info = o
						ret += that.radiooptions(q);
					}
				}
			}
			imp[r.t]('value',q.selectedSeledted||'')
			div[r.h]=ret;
			ret =  div[r.H]+imp[r.H]

			return ret;
		},
		selectoptions:function(a,o){
			var cf = this.config();
			var r = this.raw;
			var div = r.e();
			var con = r.e();
			var span = r.e('span');
			var span2 = r.e('span');
				div.pmpstyle().vs("visible").pd("5px").ov("hidden").mg("0").bd("none").br("0").ds("block").wt("auto").ht("auto").cr("pointer").ba(o?'none':'rgba(237, 244, 246,0.8)').cl("#333");
				div[r.t]("tabindex","0");
				div[r.t]("onclick","mpforms.set.selectedOption(this)");
				div[r.t]("onmouseover","this.style.background='rgb(183 228 241)';");
				div[r.t]("onmouseleave","this.style.background='"+(o?'none':'rgba(237, 244, 246,0.8)')+"';");

				con.pmpstyle().pd("0").wt("100%").mw(cf.maxwidth).mg("1px auto").nw("50px").ov("hidden").mg("0").bd("none").br("0").ds("table").wt("100%").ht("auto").cr("pointer")
				span2.pmpstyle().pd("5").ov("hidden").mg("0").bd("none").br("0").ds("table-cell").wt("10px").ht("auto").cr("pointer").va("middle").ta("center").cl("#a2a2a2");
				span.pmpstyle().pd("5").ov("hidden").mg("0").bd("none").br("0").ds("table-cell").wt("100%").ht("auto").cr("pointer").va("middle").fs("85%");
				span[r.h] = a.info
				span2[r.h] = mpforms.SVG.box(20)
				con[r.h] = span2[r.H]+span[r.H]
				div[r.h] = con[r.H]

			return div[r.H];
		},
		select:function(a){
			var cf = this.config();
			var options = a.options||a.option
			var that = this;
			var r = that.raw;
			var div = r.e();
			var div1 = r.e();
			var div2 = r.e();
			var div3 = r.e();
			var div4 = r.e();
			var div5 = r.e();
			var span = r.e("span");
			var span2 = r.e("span");
			var ret = '';
			var o = '';
			var q = {};

			if(Array.isArray(options)&&options.length>10)return this.options(a)
			var imp = r.e('input');
				imp[r.t]('name',a.name||a.type||'options')
				imp[r.t]('type','text')
				imp.pmpstyle().ds("none").vs("hidden")
				a.attr = a.attr||a.attribute||a.setAttribute||a.setattribute||a.event||{};
				imp = this.setInputAttribute(imp,a.attr);
				imp = mpforms.root.__handleCallBcks(a,imp)
				span.pmpstyle().pd("0").bd("none").br("3px").ds("table-cell").ht("auto").va("middle").cl(cf.color3);
				span2.pmpstyle().pd("0").bd("none").br("3px").ds("table-cell").wt("10px").ht("auto").va("middle").ta("center").cl(cf.color3);
				span2[r.h] = mpforms.SVG.caret();

				div.pmpstyle().pd("0").mg("2px 0").bd("none").mw(cf.maxwidth).mg("1px auto").br("3px").ds("block").wt("100%").ht("auto").noselect();
				div1.pmpstyle().pd("0").mg("0").bd("none").mw("auto").br("0").ds("inline-block").wt("100%").ba("none").ht("auto").po("relative").noselect();

				div2[r.t]('tabindex','0')
				div2.pmpstyle().pd((!cf.padding||cf.padding=="5px"?(a.padding||"10px"):cf.padding)+" 10px").mg("0").bd(cf.border+" solid #ddd").mw("auto").br(cf.curve).ds("block").ba("none").ht("auto").ol("none").noselect();
				div2[r.t]('onclick','mpforms.set.openOptions(this,event)')

				div3.pmpstyle().pd("0").mg("0").bd("none").mw("auto").br("0").ds("table").ba("none").ht("auto").mw(cf.maxwidth).mg("1px auto").nw("50px").wt("100%").cr("pointer").noselect();

				div4.pmpstyle().pd("0").mg("0").bd("1px solid #ddd").po("absolute").mw("auto").br("0").ds("block").ba("#FFFFFF").ht("auto").mw(cf.maxwidth).mg("1px auto").nw("50px").wt("auto").bs("0px 3px 2px 0px rgba(160,160,160,0.50)").zi("1000").ds("none").ov("auto").noselect().wt("100%");
				div4[r.t]('onclick','mpforms.set.setparent(this)')

				div5.pmpstyle().pd("0").mg("0").bd("none").mw("auto").br("0").ba("none").ht("auto").mw(cf.maxwidth).mg("1px auto").nw("50px").wt("auto").ov("hidden").vs("hidden").ht("0").noselect();






			if(Array.isArray(options)){
				for(var i=0;i<options.length; i++){
					o = options[i]||'';
					if(o){
						if(o.indexOf("${{")>-1&&!q.selectedSeledted){
							o = o.split("${{selected}}").join("").trim();
							q.selectedSeledted = o;
							q.selected=true
						}else q.selected=false
						q.info = o
						ret += that.selectoptions(q,(i%2));
					}
				}
			}
			span[r.h] = q.selectedSeledted||options[0];
			div3[r.h] = span[r.H]+span2[r.H]
			div2[r.h] = div3[r.H]
			imp[r.t]('value',q.selectedSeledted||options[0])

			div5[r.h] = ret
			div1[r.h] = imp[r.H]+div2[r.H]+div4[r.H]+div5[r.H]
			div[r.h] = div1[r.H]
			ret = div[r.H]

			return ret;
		},
		keywords:function(a){
			var cf = this.config();
			var r = this.raw;
			var div = r.e();
			var div2 = r.e();
			var imp = r.e('input');
			var imp2 = r.e('input');
			delay = function(t,i,m,e,r){t=t||100;m = new Date()*1;e=m;for(var i=0;i<10000000000;i++){e = new Date()*1;if(e-m>=t) break;}return e-m<t?delay(t-(e-m)):false};
				div.pmpstyle().pd((a.padding||cf.padding||"5px")+" 5px").mg("2px 0").bd(cf.border+" solid "+cf.borderA).mw(cf.maxwidth).mg("1px auto").br(cf.curve).ds("block").wt("auto").ht("auto").po("relative");
				div2.pmpstyle().pd("0").mg("0").bd("0").mw(cf.maxwidth).mg("1px auto").br("0").ds("block").wt("auto").ht("auto");

				imp[r.t]("bypass",'true');
				imp[r.t]('type','text');
				imp[r.t]('placeholder',(a.placeholder||''));
				if(a.button===true)imp[r.t]('button',"true");
				imp[r.t]('onfocus','mpforms.dofocus(this)');
				imp[r.t]('onfocusout','mpforms.nofocus(this);mpforms.setkeywords(this,event,true);delay();');
				imp[r.t]('onkeyup','mpforms.setkeywords(this,event)');
				imp.pmpstyle().ds("block").vs("visible").wt("100%").pd("5px 0").fs("110%").mg("0").bd("none").br("0").ol("none").ba(cf.background).cl(cf.color3)
				a.attr = a.attr||a.attribute||a.setAttribute||a.setattribute||a.event||{};
				imp = this.setInputAttribute(imp,a.attr);
				imp = mpforms.root.__handleCallBcks(a,imp)
				
				var xvalue = mpforms.keywordsPatch(mpforms.striptag(a.value||a.val||''));
				div2[r.h] = xvalue;
				div[r.h] = (a.button===true?'<span onclick="mpforms.setkeywords(this.nextElementSibling,{},true,true)" style="position: absolute; background: '+(cf.objectcolor||cf.objectcolorA)+'; user-select: none; touch-action: none; cursor: pointer; right: 1px;  color: #fff; display: block; padding: 6px 12px; font-size: 80%; border-radius: '+(cf.curve||'5px')+';">+ Add</span>':'')+imp[r.H];
				imp2[r.t]('type','text');
				imp2[r.t]('name',(a.name||a.names||a.type||'keywords'));
				imp2[r.t]('value',(mpforms.striptag(xvalue)||"").split("&times;").join(","));
				imp2.pmpstyle().ds("none").vs("hidden")

			return div2[r.H]+div[r.H]+imp2[r.H];
		},
		gender:function(a){
			var cf = this.config();
			var r = this.raw;
			var div = r.e();
			var ret = '';

				a.options = Array.isArray(a.option)||Array.isArray(a.sex)?(a.option||a.sex):(Array.isArray(a.options)?a.options:["MALE ${{selected}}","FEMALE"]);
			var s = function(v,m,alph){
				var small = r.e('small'),
						i = r.e('i');
					small.pmpstyle().ds(a.block?'block':"inline-block").cr("pointer").vs("visible").wt("auto").pd("6px 12px").mg("3").bd("none").br(cf.curve).ol("none").ba(m?cf.objectcolor:'none').cl(m?"#FFFFFF":cf.color3);
					i.pmpstyle().ds("inline-block").vs("visible").wt("auto").pd("0").mg("0").bd("none").br("0").ol("none").ba("none").cl(m?"#FFFFFF":cf.background)
					i[r.h] = mpforms.SVG.checkcircle()
					small[r.t]('onclick','mpforms.set.gender(this)')
					small[r.t]('targ',a.sendObjective&&alph?alph:v.toLowerCase())
					small[r.h] = (alph?'('+alph+') ':"")+v+" "+i[r.H]
				return small[r.H];
			}
			var opt = "";
			var objective = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","0"]
			var objectiveCount = 0;
				for (var i = 0; i < a.options.length; i++) {
					var o = a.options[i].toString().trim();
					if(!o)continue;

					if(o.toString().indexOf("${{")>-1){
							o = o.split("${{selected}}").join("").trim();
							if(!o)continue;
						if(!a.hasBeenSelected){
							a.hasBeenSelected=o
							opt += s(o,true,(a.isObjective?objective[objectiveCount]:null))
						}else opt += s(o,false,(a.isObjective?objective[objectiveCount]:null))
					}else opt += s(o,false,(a.isObjective?objective[objectiveCount]:null));
					if(a.isObjective)objectiveCount++;
				}

			var imp = r.e('input');
				imp.pmpstyle().ds("none").vs("hidden")
				imp[r.t]('value',(a.hasBeenSelected||"").toLowerCase());
				imp[r.t]('name',a.gender||a.name||'gender');
				

				div[r.h] = opt 
				imp = mpforms.root.__handleCallBcks(a,imp)
			return div[r.H]+imp[r.H];
		},
		__handleCallBcks:function(a,imp){
			var callback = a.callback||a.call||a.func||a.fn||null
				callback = "function"===typeof callback?callback:null
				if(callback){
					var callbackid = mpforms.res.rand(true,50);
					mpforms.responses.InputCallbacks[callbackid] = callback
					if(!imp.getAttribute("onchange"))imp.setAttribute("onchange","mpforms.responses.HandleInputCallbacks(this)")
					else imp.setAttribute("onchange",imp.getAttribute("onchange")+"; mpforms.responses.HandleInputCallbacks(this)")
					imp.setAttribute("callbackid",callbackid)
			}
			return imp;
		},
		yesno:function(a){
			var cf = this.config();
			var r = this.raw;
			var div = r.e();
			var ret = '';
			var s = function(v,m){
				var small = r.e('small'),
						i = r.e('i');
					small.pmpstyle().ds("inline-block").cr("pointer").vs("visible").wt("auto").pd("6px 12px").mg("3px").bd("none").br(cf.curve).ol("none").ba(m?"#222222":cf.background).cl(m?"#FFFFFF":cf.color3);
					i.pmpstyle().ds("inline-block").vs("visible").wt("auto").pd("0").mg("0").bd("none").br("0").ol("none").ba("none").cl(cf.background)
					i[r.h] = mpforms.SVG.checkcircle()
					small[r.t]('onclick','mpforms.set.boolean(this)')
					small[r.t]('targ',v.toLowerCase())
					small[r.h] = v+" "+i[r.H]
				return small[r.H];
			}
			var imp = r.e('input');
				imp.pmpstyle().ds("none").vs("hidden")
				imp[r.t]('value','');
				imp[r.t]('name',(a.name||a.type||'question'));
				div[r.h] = s("Yes")+s("No")
				imp = mpforms.root.__handleCallBcks(a,imp)
			return div[r.H]+imp[r.H];
		},
		submit:function(a,c){

			var cf = this.config();
			var r = this.raw;
			var div = r.e();
			var ret = '';
			var s = function(v,m){
				var small = r.e('input')
				var vn = a.name||'submit';
					small.pmpstyle().ds(a.hide||a.hidebutton||a.hideButton||a.hidden?"none":"inline-block").cr("pointer").vs("visible").wt("auto").pd("8px 18px").mg("3").bd("none").br(cf.curve).ol("none").ba(cf.button||cf.objectcolor).cl("#FFFFFF").fw("normal").bs("0px 0px 2px "+cf.button||cf.objectcolor).fs("120%").noselect();
					small[r.t]('submision-butt','true')
					small[r.t]('type','submit')
					small[r.t]('name',a.name||'Submit')
					small[r.t]('value',(vn.charAt(0).toUpperCase()+vn.substring(1)))
					small[r.t]('onclick','mpforms.set.submit(this,'+a.chainvalues+',event)')
					small = mpforms.root.__handleCallBcks(a,small)
					if(c=="[object Object]"){a=c
						var small2 = r.e('a')
						small2.pmpstyle().ds("inline-block").cr("pointer").vs("visible").wt("auto").pd("8px 18px").mg("3").bd("none").br(cf.curve).ol("none").ba("rgb(8 179 84)").cl("#FFFFFF").fw("normal").bs("0px 0px 2px rgb(8 179 84)").fs("120%").noselect();
						small2.style.textDecoration='none'
						small2[r.h]=a.name||'Link'
						small2[r.t]('onclick',(a.click||a.onclick))
						small2[r.t]('href',(a.url||a.link||a.href))
					return small[r.H]+' &nbsp; '+small2[r.H];

					}

				return small[r.H];
			}

			div[r.h] = s();
			return div[r.H];
		},
		nxpr:function(a,c,e){
			var cf = this.config();
			var r = this.raw;
			var div = r.e();
			var ret = '';
			var s = function(v,m){
				var small = r.e('span')
				var vn = a.name||a.label||'Next';
					small.pmpstyle().ds("inline-block").cr("pointer").vs("visible").wt("auto").pd("5px 18px").mg("3").bd("none").br(cf.curve).ol("none").ba("#FF9800").cl("#FFFFFF").fw("normal").bs("none").fs("95%").bd(cf.border+" solid #ddd").noselect();
					small[r.t]('breakpoint',a.breakpoint)
					small[r.t]('counts',a.counts)
					small[r.t]('panels',a.panels)
					small[r.t]('type',a.type)
					small[r.t]('onclick','mpforms.set.next(this,'+a.chainvalues+',event)')
					small[r.h]=(vn.charAt(0).toUpperCase()+vn.substring(1))
					if(c=="[object Object]"){
						e=a
						a=c
						var small2 = r.e('span')
						small2.pmpstyle().ds("none").ta("left").mw("300px").cr("pointer").vs("visible").wt("auto").pd("1 18px").mg("3").bd("none").br(cf.curve).ol("none").ba(cf.background).cl(cf.color3).fw("normal").fs("95%").bd(cf.border+" solid #ddd").noselect();
						small2.style.textDecoration='none'
						small2[r.h]=a.name||'Previous';
						small2[r.t]('onclick','mpforms.set.prev(this,'+a.chainvalues+',event)')
						small2[r.t]('breakpoint',e.breakpoint)
						small2[r.t]('counts',e.counts)
						small2[r.t]('type',e.type)
						small2[r.t]('breakcounts',e.breakcounts)
					return small[r.H]+' &nbsp; '+small2[r.H];

					}

				return small[r.H];
			}
			div.pmpstyle().ta("right").mw(cf.maxwidth||"500px")
			div[r.h] = s();
			return div[r.H];
		},
		neterror:function(a){
			var r = this.raw;
			var cf = this.config();
			var div = r.e();
				div.pmpstyle().mw(cf.maxwidth).mg("1px auto")
				div[r.h] = a.name
			return div[r.H];
		},
		files:function(a,c){
			var cf = this.config();
			var r = this.raw;
			var div = r.e();
			var div2 = r.e();
			var div3 = r.e();
			var div4 = r.e();
			var div5 = r.e();
			var div6 = r.e();
			var span = r.e("span");
			var text = r.e("text");
			var imp = r.e("input");
			var b = r.e("b");
			var i = r.e("i");
				div.pmpstyle().mw(cf.maxwidth).mg("1px auto").ds("block").pd("0").mg("0").wt("auto");

				div2.pmpstyle().mw("auto").ds("block").pd("2px 10px").mg("0").wt("auto").ba("none").ta("left").cl(cf.color2).fs("70%").noselect();
				b.pmpstyle().ds("inline-block").pd("0px 2px").mg("0").ba("rgba(200, 200, 200, 0.33)").ba("rgb(148, 148, 148, 0.43)").br("3px").cr("pointer").fs("102%").bs("0px 0px 1px 1px #e2e2e2")
				b[r.h] = "&plus;";
				i[r.h] = " Click the '+' sign to upload a new file";
				div2[r.h] = b[r.H]+i[r.H];

				div3.pmpstyle().mw("auto").ds("block").pd("2px").mg("0").wt("auto").ba("none");
				div4.pmpstyle().mw("auto").ds("block").pd("2px").mg("0").wt("auto").ba("rgba(134, 134, 134, 0.023)").br("3px").bd("1px solid rgba(134, 134, 134, 0.053)").ta("center");
				span.pmpstyle().mw("auto").ds("inline-block").pd(a.large?"17px 30px":a.medium?"8px 18px":"3px 13px").mg("2px").wt("auto").ba("rgba(200, 200, 200, 0.33)").br("3px").bd("none").ta("center").cl("rgb(148, 148, 148, 0.43)").fs(a.large?"510%":a.medium?"400%":"302%").bs("0px 0px 1px 1px #e2e2e2").po("relative").ov("hidden").cr("pointer").noselect();
				span[r.t]('onclick','mpforms.Filesystem.trigger(this,event)');
				div5.pmpstyle().mw("auto").ds("none").ba("none").pd("0 0 0 0").mg("0 0 0 0").tp("0").rt("0").wt("100%").ht("100%").po("absolute");
				text[r.h] = '&plus;';

				span[r.h] = text[r.H]+div5[r.H]
				div4[r.h] = span[r.H]
				div3[r.h] = div4[r.H]

				var format = (a.accept||a.type||a.name);
				var accept = a.accept?a.accept:(format==="video"?"video/*":(format==="audio"?"audio/*":(format==="image"||format==="picture"?"image/*":((a.extention||'').toString().indexOf(".")>-1)?a.extention:'')));
				div5.pmpstyle().ds("none").vs("hidden");
				imp.pmpstyle().ds("none").vs("hidden");
				imp[r.t]('onchange','mpforms.Filesystem.process(this,event)');
				imp[r.t]('type','file');
				imp[r.t]('name',(a.name||'file')+"[]");
				imp[r.t]('format',(a.type||a.name||'file'));
				if(a.multiple===true||a.more===true)imp[r.t]('multiple',(a.multiple||a.more||'false'));
				imp[r.t]('limit',(a.limit||a.limit||'false'));
				imp[r.t]('extention',(a.extention||a.extentions||a.ext||''));
				imp[r.t]('accept',(accept));
				imp = mpforms.root.__handleCallBcks(a,imp)
				if(a.require==false)imp[r.t]('notrequired',"true");
				div5[r.h] = imp[r.H]

				div[r.h] = div2[r.H]+div3[r.H]+div5[r.H];

			return div[r.H];
		},
		options:function(a,c){
			var cf = this.config();
			var r = this.raw;
			var div = r.e();
			var div2 = r.e();
			var select = r.e('select');
			var options = a.options||a.option;
			var ret = "";
			var o = "";
			var e = "";
				select.pmpstyle().pd((a.padding||cf.padding||"7px")+" 12px").bd("none").ol("none").br("0").nw("50px").mw(cf.maxwidth).mg("1px auto").ba(cf.background).wt("100%").fs("100%").cl(cf.color3)
				select[r.t]('name',a.name||a.names||a.type);
				select[r.t]('onfocus','mpforms.dofocus(this)');
				select[r.t]('onfocusout','mpforms.nofocus(this)');
				if(a.printstate)select[r.t]('onchange','mpforms.printstate(this)');
				a.attr = a.attr||a.attribute||a.setAttribute||a.setattribute||a.event||{};
				select = this.setInputAttribute(select,a.attr);
				select = mpforms.root.__handleCallBcks(a,select)

				div.pmpstyle().pd("0").bd(cf.border+" solid #ddd").ol("none").br(cf.curve).nw("50px").mw(cf.maxwidth).mg("1px auto").ba(cf.background).wt("auto").ov("hidden")
				for(var i = 0; i<options.length;i++){
							e = options[i]||'';
							o = (options[i]||'').split("${{selected}}").join("");
							a.selected = !!a.selected?a.selected:(e.indexOf("${{selected}}")>-1?o:'');
						ret+='<option '+(((a.selected).toLowerCase()==o.toLowerCase())?'selected="true"':'')+'>'+o+'</option>'

				}

				if(a.printstate&&a.selected){
					div2[r.h]=mpforms.printstate({},a.selected)
				}
			select[r.h] = ret;
			div[r.h] = select[r.H];

			return div[r.H]+div2[r.H];
		},
		birth:function(a,c){
			var r = this.raw;
			var cf = this.config();
			var div = r.e();
			var select1 = r.e('select');
			var select2 = r.e('select');
			var select3 = r.e('select');
			var span1 = r.e("span");
			var span2 = r.e("span");
			var span3 = r.e("span");

				span1.pmpstyle().pd("2px").bd(cf.border+" solid #ccc").ol("none").br("0").nw("50px").ds("table-cell").ba("none").wt("1%").mg("0 0 0 2px").ov("hidden").ta("center")
				span1.style.borderRight = "none";
				span1.style.borderTopLeftRadius = cf.curve;
				span1.style.borderBottomLeftRadius = cf.curve;

				select1.pmpstyle().pd((a.padding||cf.padding||"6px")+" 0").bd("none").ol("none").br("0").nw("50px").ba(cf.background).wt("auto").fs("90%").cl(cf.color3).ds("inline-block").wt("100%")
				select1[r.t]('name',"birth-day");
				select1[r.t]('onfocus','mpforms.dofocus(this)');
				select1[r.t]('onfocusout','mpforms.nofocus(this)');
				select1 = mpforms.root.__handleCallBcks(a,select1,1)
				select1[r.h] = mpforms.setBDoptions("day")
				span1[r.h] = select1[r.H]

				span2.pmpstyle().pd("2px").bd(cf.border+" solid #ccc").ol("none").br("0").nw("50px").ds("table-cell").ba("none").wt("1%").mg("0 0").ov("hidden").ta("center").ta("center")
				span2.style.borderLeft = "none";
				span2.style.borderRight = "none";

				select2.pmpstyle().pd((a.padding||cf.padding||"6px")+" 0").bd("none").ol("none").br("0").nw("50px").ba(cf.background).wt("auto").fs("90%").cl(cf.color3).ds("block").wt("100%")
				select2 = mpforms.root.__handleCallBcks(a,select2,2);
				select2[r.t]('name',"birth-month");
				select2[r.t]('onfocus','mpforms.dofocus(this)');
				select2[r.t]('onfocusout','mpforms.nofocus(this)');
				select2[r.h] = mpforms.setBDoptions("month")
				span2[r.h] = select2[r.H]

				span3.pmpstyle().pd("2px").bd(cf.border+" solid #ccc").ol("none").br("0").nw("50px").ds("table-cell").ba("none").wt("1%").mg("0 2px 0 0").ov("hidden").ta("center");
				span3.style.borderLeft = "none";
				select3.pmpstyle().pd((a.padding||cf.padding||"6px")+" 0").bd("none").ol("none").br("0").nw("50px").ba(cf.background).wt("auto").fs("90%").cl(cf.color3).ds("block").wt("100%")
				select3[r.t]('name',"birth-year");
				select3[r.t]('onfocus','mpforms.dofocus(this)');
				select3[r.t]('onfocusout','mpforms.nofocus(this)');
				select3 = mpforms.root.__handleCallBcks(a,select3,3)
				select3[r.h] = mpforms.setBDoptions("year")
				span3[r.h] = select3[r.H]
				span3.style.borderTopRightRadius = cf.curve;
				span3.style.borderBottomRightRadius = cf.curve;
				div.pmpstyle().pd("0").bd("none").ol("none").br("0").nw("50px").mw(cf.maxwidth).mg("1px auto").ba("none").wt("auto").ds("auto")
				div[r.h] = span1[r.H]+span2[r.H]+span3[r.H]

			return div[r.H]
		},
		scale:function(a,c){
			var cf = this.config();
			var r = this.raw;
			var div1 = r.e();
			var div2 = r.e();
			var div3 = r.e();
			var div4 = r.e();
			var span1 = r.e("span");
			var span2 = r.e("span");
			var span3 = r.e("span");
			var span4 = r.e("span");
			var span5 = r.e("span");
			var imp = r.e("input");
				div1.pmpstyle().pd("0").bd("none").ol("none").br("0").nw("auto").ds("block").ba("none").wt("auto").mw(cf.maxwidth).mg("1px auto").mg("0px 0px");
				div2.pmpstyle().pd("4px 0").bd("none").ol("none").br("0").nw("auto").ds("block").ba("none").wt("auto").mg("0px 0px");
				div2[r.t]("ondragenter","this.style.cursor='pointer'");

				div3.pmpstyle().pd("0").bd("none").ol("none").br("0").nw("auto").ds("table").ba("none").wt("auto").mg("0px 0px").fs("82%");
				span1.pmpstyle().pd("0").bd("none").ol("none").br("0").nw("auto").ds("table-cell").ba("none").wt("auto").mg("0px 0px").wt("1%").ta("left").noselect();
				span2.pmpstyle().pd("0").bd("none").ol("none").br("0").nw("auto").ds("table-cell").ba("none").wt("auto").mg("0px 0px").wt("1%").ta("center").fs("160%").noselect();
				span3.pmpstyle().pd("0").bd("none").ol("none").br("0").nw("auto").ds("table-cell").ba("none").wt("auto").mg("0px 0px").wt("1%").ta("right").noselect();
				span1[r.h] = a.min||a.minimum||0
				span2[r.h] = a.default||a.current||0;
				span3[r.h] = a.max||a.maximum||1;
				div3[r.h] = span1[r.H]+span2[r.H]+span3[r.H];

				div4.pmpstyle().pd("0").bd("none").ol("none").br("10px").nw("auto").ds("block").ba(cf.objectcolorD).wt("100%").ht("5px").mg("0px 0px").po("relative");
				div4[r.t]("onclick","mpforms.clickslide(this,event,"+(a.min||a.minimum||0)+","+(a.max||a.maximum||1)+",this.previousElementSibling.children[1])");

				span5.pmpstyle().pd("0").bd("none").ol("none").br("10px").nw("auto").ds("inline-block").ba(cf.objectcolor).wt(((((a.default||a.current||0.01)-(a.min||a.minimum||0))*100)/((a.max||a.maximum||1)-(a.min||a.minimum||0)))+"%").ht("100%").mg("0px 0px").po("relative");

				span4.pmpstyle().pd("12px").bd("1px solid #fff").ol("none").br("100%").nw("auto").ds("inline-block").ba(cf.objectcolorB).wt("auto").ht("auto").mg("0px 0px").po("absolute").tp("0").cr("poiter").bs("0px 0px 2px 0px #000").fs("0.1px");
				span4.style.marginTop = "-10px";
				span4.style.marginLeft = "-12px";
				span4.style.userSelect = "all";

				span4[r.t]("ontouchstart","mpforms.driveslideTouch(this,event,"+(a.min||a.minimum||0)+","+(a.max||a.maximum||1)+",this.parentNode.previousElementSibling.children[1])");
				span4[r.t]("ontouchmove","mpforms.driveslideTouch(this,event,"+(a.min||a.minimum||0)+","+(a.max||a.maximum||1)+",this.parentNode.previousElementSibling.children[1])");
				span4[r.t]("ondrag","mpforms.driveslide(this,event,"+(a.min||a.minimum||0)+","+(a.max||a.maximum||1)+",this.parentNode.previousElementSibling.children[1])");
				span4[r.t]("tabindex","0");
				span4[r.t]("draggable","true");
				span4[r.h] = 'i';

				imp[r.t]('type','text');
				imp[r.t]('name',(a.name||a.names||a.type||'scale'));
				imp[r.t]('value',(a.default||a.current||a.min||a.minimum||0));
				imp.pmpstyle().ds("none").vs("hidden")
				if((/Firefox|efox\/|firefox\//i).test(navigator.userAgent)&&!(/mobile/i).test(navigator.userAgent)){
					span4[r.t]('onmousemove',"mpforms.driveslide(this,event,"+(a.min||a.minimum||0)+","+(a.max||a.maximum||1)+",this.parentNode.previousElementSibling.children[1])")
				}
				div4[r.h] = span5[r.H]+span4[r.H]+imp[r.H];
				div2[r.h] = div3[r.H]+div4[r.H]
				div1[r.h] = div2[r.H]
			return div1[r.H]
		},
		range:function(a,c){
			var cf = this.config();
			var r = this.raw;
			var div1 = r.e();
			var div2 = r.e();
			var div3 = r.e();
			var div4 = r.e();
			var span1 = r.e("span");
			var span2 = r.e("span");
			var span3 = r.e("span");
			var span4 = r.e("span");
			var span5 = r.e("span");
			var span6 = r.e("span");
			var span7 = r.e("span");
			var imp = r.e("input");
			var minr = (a.default||[])[0]||(a.current||[])[0]||0
			var maxr = (a.default||[])[1]||(a.current||[])[1]||(((a.max||a.maximum||2)/2)>minr?((a.max||a.maximum||2)/2):(((a.max||a.maximum||2)/2)-(minr+1)));
				div1.pmpstyle().pd("0").bd("none").ol("none").br("0").nw("auto").ds("block").ba("none").wt("auto").mg("0px 0px").mw(cf.maxwidth).mg("1px auto");
				div2.pmpstyle().pd("4px 0").bd("none").ol("none").br("0").nw("auto").ds("block").ba("none").wt("auto").mg("0px 0px");
				div2[r.t]("ondragenter","this.style.cursor='pointer'");

				div3.pmpstyle().pd("0").bd("none").ol("none").br("0").nw("auto").ds("table").ba("none").wt("auto").mg("0px 0px").fs("82%");
				span1.pmpstyle().pd("0").bd("none").ol("none").br("0").nw("auto").ds("table-cell").ba("none").wt("auto").mg("0px 0px").wt("1%").ta("left").noselect();
				span2.pmpstyle().pd("0").bd("none").ol("none").br("0").nw("auto").ds("table-cell").ba("none").wt("auto").mg("0px 0px").wt("1%").ta("center").fs("160%").noselect();
				span3.pmpstyle().pd("0").bd("none").ol("none").br("0").nw("auto").ds("table-cell").ba("none").wt("auto").mg("0px 0px").wt("1%").ta("right").noselect();
				span1[r.h] = a.min||a.minimum||0
				span2[r.h] = (a.default||a.current||a.min||a.minimum||0).toString().split(",").join(" - ")
				span3[r.h] = a.max||a.maximum||1;
				div3[r.h] = span1[r.H]+span2[r.H]+span3[r.H];

				div4.pmpstyle().pd("0").bd("none").ol("none").br("10px").nw("auto").ds((/Firefox|efox\/|firefox\//i).test(navigator.userAgent)&&!(/mobile/i).test(navigator.userAgent)?"-webkit-box":'block').ba(cf.objectcolorD).wt("100%").ht("5px").mg("0px 0px").po("relative");

				span5.pmpstyle().pd("0").bd("none").ol("none").br("10px").nw("auto").ds("block").ba("none").wt((((minr-(a.min||a.minimum||0))*100)/((a.max||a.maximum||1)-(a.min||a.minimum||0)))+"%").ht("100%").mg("0px 0px").po("initial");
				span5.style.float="left";

				span4.pmpstyle().pd("12px").bd("1px solid #fff").ol("none").br("100%").nw("auto").ds("inline-block").ba(cf.objectcolorC).wt("auto").ht("auto").mg("0px 0px").po("absolute").tp("0").cr("poiter").bs("0px 0px 2px 0px #000").fs("0.1px");
				span4.style.marginTop = "-10px";
				span4.style.marginLeft = "-12px";
				span4.style.userSelect = "all";


				var vas = ((((minr-(a.min||a.minimum||0))*100)/((a.max||a.maximum||1)-(a.min||a.minimum||0))))
				var val = ((((maxr-(a.min||a.minimum||0))*100)/((a.max||a.maximum||1)-(a.min||a.minimum||0))))-vas


				span6.pmpstyle().pd("0").bd("none").ol("none").br("10px").nw("auto").ds("block").ba(cf.objectcolor).wt((val)+"%").ht("100%").mg("0px 0px").po("initial");
				span6.style.float="left";

				span7.pmpstyle().pd("12px").bd("1px solid #fff").ol("none").br("100%").nw("auto").ds("inline-block").ba(cf.objectcolorB).wt("auto").ht("auto").mg("0px 0px").po("absolute").tp("0").cr("poiter").bs("0px 0px 2px 0px #000").fs("0.1px");
				span7.style.marginTop = "-10px";
				span7.style.marginLeft = "-12px";
				span7.style.userSelect = "all";



				span4[r.t]("ontouchstart","mpforms.driveRangeTouchX(this,event,"+(a.min||a.minimum||0)+","+(a.max||a.maximum||1)+",this.parentNode.previousElementSibling.children[1])");
				span4[r.t]("ontouchmove","mpforms.driveRangeTouchX(this,event,"+(a.min||a.minimum||0)+","+(a.max||a.maximum||1)+",this.parentNode.previousElementSibling.children[1])");
				span4[r.t]("ondrag","mpforms.driveRangeX(this,event,"+(a.min||a.minimum||0)+","+(a.max||a.maximum||1)+",this.parentNode.previousElementSibling.children[1])");
				span4[r.t]("tabindex","0");
				span4[r.t]("draggable","true");
				span4[r.h] = 'i';

				span7[r.t]("ontouchstart","mpforms.driveRangeTouch(this,event,"+(a.min||a.minimum||0)+","+(a.max||a.maximum||1)+",this.parentNode.previousElementSibling.children[1])");
				span7[r.t]("ontouchmove","mpforms.driveRangeTouch(this,event,"+(a.min||a.minimum||0)+","+(a.max||a.maximum||1)+",this.parentNode.previousElementSibling.children[1])");
				span7[r.t]("ondrag","mpforms.driveRange(this,event,"+(a.min||a.minimum||0)+","+(a.max||a.maximum||1)+",this.parentNode.previousElementSibling.children[1])");
				span7[r.t]("tabindex","0");
				span7[r.t]("draggable","true");
				span7[r.h] = 'i';



				imp[r.t]('type','text');
				imp[r.t]('name',(a.name||a.names||a.type||'scale'));
				imp[r.t]('value',(a.default||a.current||a.min||a.minimum||0).toString().split(",").join(" - "));
				imp.pmpstyle().ds("none").vs("hidden")
				if((/Firefox|efox\/|firefox\//i).test(navigator.userAgent)&&!(/mobile/i).test(navigator.userAgent)){
					span4[r.t]('onmousemove',"mpforms.driveRangeX(this,event,"+(a.min||a.minimum||0)+","+(a.max||a.maximum||1)+",this.parentNode.previousElementSibling.children[1])")
					span7[r.t]('onmousemove',"mpforms.driveRange(this,event,"+(a.min||a.minimum||0)+","+(a.max||a.maximum||1)+",this.parentNode.previousElementSibling.children[1])")
				}
				div4[r.h] = span5[r.H]+span4[r.H]+span6[r.H]+span7[r.H]+imp[r.H];
				div2[r.h] = div3[r.H]+div4[r.H]
				div1[r.h] = div2[r.H]
			return div1[r.H]
		},
		pack:function(){},
		_:function(){},

	}

mpforms.getter = {
	setError:function(a){a =a||{};return typeof a.require=="undefined"||a.require===true||a.require==="require"||a.require==="required"||typeof a.require==="string"?'** Required!':'(Optional)'},
	clone:function(a,domain){if(a.bypass===true||a.pass===true||a.skip===true){return '';}mpforms.bind.counter+=1;mpforms.bind.np.panels+=1;a =a||{};a.name=a.name||'';a.error = this.setError(a); a.body = mpforms.root[domain](a);  return mpforms.root.body(a)},button:function(a,c){a =a||{}; a.hidename=true;a.hideinfo=true;a.body = mpforms.root["submit"](a,c);return mpforms.root.body(a)},
	nxpr:function(a,c){a =a||{}; a.hidename=true;a.hideinfo=true;a.body = mpforms.root["nxpr"](a,c);return mpforms.root.body(a)},
	input:function(a){return this.clone(a,"input")},
	textarea:function(a){return this.clone(a,"textarea")},
	note:function(a){return this.clone(a,"note")},
	gender:function(a){return this.clone(a,"gender")},
	questionaire:function(a){return this.clone(a,"gender")},
	options:function(a){return this.clone(a,"options")},
	birth:function(a){return this.clone(a,"birth")},
	yesno:function(a){return this.clone(a,"yesno")},
	check:function(a){return this.clone(a,"checks")},
	checks:function(a){return this.clone(a,"checks")},
	select:function(a){return this.clone(a,"select")},
	radio:function(a){return this.clone(a,"radio")},
	scale:function(a){return this.clone(a,"scale")},
	range:function(a){return this.clone(a,"range")},
	question:function(a){return this.clone(a,"yesno")},
	keywords:function(a){return this.clone(a,"keywords")},
	file:function(a){return this.clone(a,"files")},
	neterror:function(a){return this.clone(a,"neterror")},
	header:function(a){return this.clone(a,"neterror")},

}



mpforms.bind = {
	Print:null,
	Active:null,
	counter:0,
	breakcounts:0,
	start:function(){
		if(this.active==="bypass")return false;
		this.configID=mpforms.res.rand(true,20);
		mpforms.formChain[(Object.keys(mpforms.formChain).length)] = {}
	},
	end:function(){ return (Object.keys(mpforms.formChain).length)-1},
	chain:"",
	neterror:function(){
		if(this.chain==""){this.start()}
		var a = {};
		a.hideinfo = true;
		a.hidename = true;
		a.padding = "0";
		a.margin = "0";
		a.name = mpforms.res.netError(arguments);
		var form = mpforms.getter.neterror(a);
		this.chain += form;
		return this;
	},
	header:function(v){
		if(this.chain==""){this.start()}
		var v = "string"===typeof v?v:("[object Object]"==v?(v.label||v.name||v.info||v.information||v.header||''):'');
		var a = {};
		a.hideinfo = false;
		a.hidename = true;
		a.padding = "0";
		a.margin = "0";
		a.name = '<h1 style="font-size:120%;margin:0;padding:5px; color:currentColor;">'+(v)+"</h1>";
		var form = mpforms.getter.header(a);
		this.chain += form;
		return this;
	},
	info:function(v){
		if(this.chain==""){this.start()}
		var v = "string"===typeof v?v:("[object Object]"==v?(v.label||v.name||v.info||v.information||v.header||''):'');
		var a = {};
		a.hideinfo = false;
		a.hidename = true;
		a.padding = "0";
		a.margin = "0";
		a.name = '<span style="font-size:85%;margin:0;padding:5px; color:currentColor; display: block; font-style: italic;">'+(v)+"</span>";
		var form = mpforms.getter.header(a);
		this.chain += form;
		return this;
	},
	thanks:function(v,a,c){
		var v = "string"===typeof v?v:("[object Object]"==v?(v.label||v.name||v.info||v.information||v.header||''):'Thanks!');
			v = '<h1 style="font-size:150%;margin:0;padding:50px 10px; color:currentColor; text-align:center;">'+(v)+"</h1>";
			return this.form({form:true,handle:"ajax"}).header(v).onsubmit(function(__,e){e.preventDefault();__.Form.Close();return false}).button({name:"Close panel"}).done();
	},
	image:function(a){
		a = a||{}
		a.name = a.name||"Image"
		a.type = a.type||"image"
		a.info = a.info||"Choose image from gallery";
		return this.file(a);
	},
	video:function(a){
		a = a||{}
		a.name = a.name||"Video"
		a.type = a.type||"video"
		a.info = a.info||"Choose video from gallery";
		return this.file(a);
	},
	audio:function(a){
		a = a||{}
		a.name = a.name||"Audio"
		a.type = a.type||"audio"
		a.info = a.info||"Choose an audio file";
		return this.file(a);
	},
	file:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"File"
		a.type = a.type||"file"
		a.info = a.info||"Choose a file";
		a.multiple = a.multiple||"false";
		a.limit = a.limit||1;
		a.extention = a.extention;
		a.accept = a.accept;
		var form = mpforms.getter.file(a);
		this.chain += form;
		return this;
	},
	name:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"name"
		a.info = a.info||"Enter your name";
		a.type = a.type||"name";
		a.placeholder = a.placeholder||'Enter your name: e.g: Ken Hu';
		var form = mpforms.getter.input(a);
		this.chain += form;
		return this;
	},
	number:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"name"
		a.info = a.info||"Enter your name";
		a.type = "number";
		a.placeholder = a.placeholder||'0.001';
		var form = mpforms.getter.input(a);
		this.chain += form;
		return this;
	},
	names:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"names"
		a.info = a.info||"Enter your names";
		a.type = a.type||"name";
		a.placeholder = a.placeholder||'Enter your names: e.g: Solomon Ghox';
		var form = mpforms.getter.input(a);
		this.chain += form;
		return this;
	},
	firstname:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"firstname"
		a.info = a.info||"Enter your first name";
		a.type = a.type||"text";
		a.placeholder = a.placeholder||'Enter your firstname';
		var form = mpforms.getter.input(a);
		this.chain += form;
		return this;
	},
	lastname:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"lastname"
		a.info = a.info||"Enter your last name";
		a.type = a.type||"text";
		a.placeholder = a.placeholder||'Enter your lastname';
		var form = mpforms.getter.input(a);
		this.chain += form;
		return this;
	},
	middlename:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"middlename"
		a.info = a.info||"Enter your last name";
		a.type = a.type||"text";
		a.placeholder = a.placeholder||'Enter your middlename';
		var form = mpforms.getter.input(a);
		this.chain += form;
		return this;
	},
	username:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"username"
		a.info = a.info||"Enter username";
		a.type = a.type||"text";
		a.placeholder = a.placeholder||'Enter your username';
		var form = mpforms.getter.input(a);
		this.chain += form;
		return this;
	},
	password:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"password"
		a.info = a.info||"Choose a password";
		a.type = a.type||"password";
		a.placeholder = a.placeholder||'Enter your password';
		var form = mpforms.getter.input(a);
		this.chain += form;
		return this;
	},
	email:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"email"
		a.info = a.info||"Enter email";
		a.type = a.type||"email";
		a.placeholder = a.placeholder||'Your email: sample@mail.com';
		var form = mpforms.getter.input(a);
		this.chain += form;
		return this;
	},
	mobile:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"mobile"
		a.info = a.info||"Enter mobile";
		a.type = a.type||"mobile";
		a.placeholder = a.placeholder||'Mobile number: +44 254 267 2467';
		var form = mpforms.getter.input(a);
		this.chain += form;
		return this;
	},
	gender:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"Gender"
		a.info = a.info||"Choose your gender";
		var form = mpforms.getter.gender(a);
		this.chain += form;
		return this;
	},
	questionaire:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.isObjective=true;
		a.sendObjective = a.objective||a.sendOption||a.sendOptions||a.sendoption||a.sendoptions||a.sendABC||a.sendabc||a.letter||a.letters
		a.name = a.name||"question"
		a.label = a.questionaire||a.quest||a.question||a.label||"...";
		a.info = a.info||a.instruction||a.instruct||false;
		a.block = a.block||a.divide||a.div
		var form = mpforms.getter.questionaire(a);
		this.chain += form;
		return this;
	},
	website:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"URL"
		a.info = a.info||"Enter a full url link";
		a.type = a.type||"url";
		a.placeholder = a.placeholder||"URL: https://example.com";
		var form = mpforms.getter.input(a);
		this.chain += form;
		return this;
	},
	disabled:function(a){
		if(this.chain==""){this.start()}
		var v = "string"===typeof a?a:null;
		a = typeof a==="object"?a:{};
		a.name = a.name||"disabled"
		a.info = a.info||"";
		a.type = a.type||"text";
		a.disable = true;
		a.disabled = true;
		a.placeholder = a.placeholder||"";
		a.value = v||a.value;
		var form = mpforms.getter.input(a);
		this.chain += form;
		return this;
	},
	hide:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.label = "<s></s>"
		a.info = "<s></s>";
		a.name = a.name||"hidden"
		a.require = false;
		a.value = a.value||null;
		a[(!a.value?"bypass":'_hiddeninput__')]=true;
		var form = mpforms.getter.input(a);
		this.chain += form;
		return this;
	},
	hidden:function(a){return this.hide(a)},
	keywords:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"keywords"
		a.info = a.info||"Enter keywords: Press enter/space to add a new";
		a.type = a.type||"enter keywords";
		a.placeholder = a.placeholder||"Write keywords then space";
		var form = mpforms.getter.keywords(a);
		this.chain += form;
		return this;
	},
	url:function(a){return this.website(a)},
	gender:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"Gender"
		a.info = a.info||"Choose your gender";
		var form = mpforms.getter.gender(a);
		this.chain += form;
		return this;
	},
	country:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"Country"
		a.info = a.info||"Choose your country";
		a.options = Nation.getAll(a.value);
		var form = mpforms.getter.options(a);
		this.chain += form;
		return this;
	},
	state:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"States"
		a.info = a.info||"Choose your state/region";
		var c = a.country||a.nation
		if(!c){a.printstate=true; return this.country(a)}
		else{a.options=Nation.getStates(c);var form = mpforms.getter.options(a);}
		this.chain += form;
		return this;
	},
	birth:function(a){
		a = a||{}
		a.name = a.name||"date of birth"
		a.info = a.info||"Select your birth date";
		var form = mpforms.getter.birth(a);
		if(this.chain==""){this.start()}
		this.chain += form;
		return this;
	},
	address:function(a){
		if(this.chain==""){this.start()}
		a = a||{}
		a.name = a.name||"address"
		a.info = a.info||"Your address";
		var form = mpforms.getter.textarea(a);
		this.chain += form;
		return this;
	},
	note:function(a){
		if(this.chain==""){this.start()}
		var a = a||{}
		a.name = a.name||"note"
		a.info = a.info||"Your note";
		a.placeholder = a.placeholder||"Write here";
		var form = mpforms.getter.note(a);
		this.chain += form;
		return this;
	},
	feedback:function(a){
		if(this.chain==""){this.start()}
		var a = a||{}
		a.name = a.name||"feedback"
		a.info = a.info||"Your feedback";
		a.placeholder = a.placeholder||"Write a message";
		return this.note(a);
	},
	disable:function(a){return this.disabled(a)},
	region:function(a){return this.state(a)},
	states:function(a){return this.state(a)},
	countries:function(a){return this.country(a)},
	countrystate:function(a){a=a||{};a.printstate = true;return this.country(a)},
	countryandstate:function(a){return this.countrystate(a)},
	countryState:function(a){return this.countrystate(a)},
	keyword:function(a){return this.keywords(a)},
	yesno:function(a){
		if(a){
			if(this.chain==""){this.start()}
			a=a||{};
			a.info = a.info||'<small>Question</small>'
			a.label = '<span style="display:inline; font-size:120%; color:currentColor; font-weight:normal;">'+(a.question||a.ask||a.label||'')+'</span>'
			var form=mpforms.getter.yesno(a);this.chain += form;
		}
		return this
	},
	Formmetadata:{
		method:"get",
		form:false,
		enctype:'multipart/formdata',
		handler:"default",
		action:window.location.href,
	},
	form:function(a){
		a=a||{};
		a.method = a.type||a.method||this.Formmetadata.method
		a.form = a.form||true;
		a.enctype = a.enctype||a.encoding||this.Formmetadata.enctype
		a.handler = a.handler||a.handle||a.handleEvent||a.use||this.Formmetadata.handler
		a.action = a.action||a.url||a.link||this.Formmetadata.action;
		this.Formmetadata = a;
		return this;
	},
	Formdata:function(a){
		var m = this.Formmetadata
		var s = m.form?'form':'fieldset'
		var c = 'mpforms'
		var i = '_'+mpforms.res.rand(true,50);
		var f = document.createElement(s);
			f.setAttribute("id",i);
			f.setAttribute("class",c);
			f.setAttribute("action",m.action);
			f.setAttribute("method",m.method);
			f.setAttribute("enctype",m.enctype);
			f.setAttribute("handler",m.handler); 
			f.setAttribute("form-chain",Object.keys(mpforms.formChain).length-1); 
			f.setAttribute("style","cone:start;display:block;margin-inline-start: 0;margin-inline-end: 0;padding-block-start: 0;padding-inline-start: 0;padding-inline-end: 0;padding-block-end: 0;min-inline-size: 0;border-width: 0;border-style: none;border-color: 0;border-image: 0;"); 
			if(!!this.configID){
				f.setAttribute("config",this.configID)
				mpforms.design[this.configID] = mpforms.root.config(false);
			}; 
			f.innerHTML = a;
			if(this.submissionfuncion)mpforms.responses.submit[i] = this.submissionfuncion;
			if(this.responsefunction)mpforms.responses.JX[i] = this.responsefunction;
			this.configID = null
			mpforms.responses.avata[i] = f.outerHTML;
			mpforms.responses.avata[m.action] = i;
		return f.outerHTML;
	},
	bind:function(a,c,n){
		if(this.active==="bypass")return this;
		a = this.chain;
		n = this.Formdata(a)
		this.chain = "";
		if(this.Active==="print"){
			c = document.getElementsByTagName("script")
			this.Print=c[(c.length)-1];
			this.Print.outerHTML = n;
			this.Print = null;
		};

			this.submissionfuncion = null;
			this.responsefunction = null;

			this.np.panels=0
			this.counter=0
			this.np.breakpoint=0
			this.breakcounts=0
			mpforms.breakpoint=null;
			if(!mpforms.design.inheritances)mpforms.design.classic();
			if(this.Active=="get")return n;
	},
	button:function(a,c){a=a||{};
		a.chainvalues = this.end();
			a.name="string"===typeof a?a:("[object Object]"==a?(a.name||'submit'):a.name)
			var form=mpforms.getter.button(a,c);
			this.chain += form;
			return this
	},
	continue:function(a,c){
			a=("boolean"===typeof a||!a?{}:a);
			a.chainvalues = this.end();
			c=(c===true?{}:(c=="[object Object]"?c:null));
			a.name = a.name||a.label||this.np.sv("Continue","down")
			a.type=a.type||"continue"
			if(c){
				c.chainvalues = this.end();
				c.hidenext=a.hidenext||a.hide||false
				c.name = c.name||c.label||this.np.sv("Previous","left")
			}
			this.breakcounts += 1;
			this.np.panels += 1;
			a.breakcounts =this.breakcounts||0;
			a.breakpoint=this.np.breakpoint||0;
			a.insertBreakpointType=a.type;
			a.panels=this.np.panels;
			a.counts=(this.counter-(this.np.breakpoint||0))+1
			this.np.breakpoint=a.counts;
			var form=mpforms.getter.nxpr(a,c);

			mpforms.breakpoint=true;
			this.chain += form;
			return this;
	},
	next:function(a,c){
			a=("boolean"===typeof a||!a?{}:a);
			a.hidenext=a.hidenext||a.hide||true
			a.name=a.name||a.label||this.np.sv("Next &nbsp;&nbsp;","right")
			a.type="next"
			return this.continue(a,c)
	},
	break:function(a,c){return this.continue(a,c)},
	np:{
		breakpoint:0,
		panels:0,
		sv:function(a,v,o,i,d){
			i='<span style="display:table-cell; vertical-align:middle;">'+a+'</span>'
			d='<span style="display:table-cell; vertical-align: middle;">'+mpforms.SVG[v](o||20)+'</span>'
			return '<span style="display:table;">'+(v==="right"?(i+d):(d+i))+'</span>';
		}
	},
	onsubmit:function(fn){
		if("function"===typeof fn){this.submissionfuncion=fn}
		return this;
	},
	response:function(fn){
		if("function"===typeof fn){this.responsefunction=fn}
		return this;
	},
	done:function(){return this.bind()},
	exec:function(){return this.bind()},
	input:function(a){if(this.chain==""){this.start()};var form=mpforms.getter.input(a);this.chain += form;return this},
	textarea:function(a){if(this.chain==""){this.start()};var form=mpforms.getter.textarea(a);this.chain += form;return this},
	check:function(a){if(this.chain==""){this.start()};var form=mpforms.getter.check(a);this.chain += form;return this},
	checks:function(a){if(this.chain==""){this.start()};var form=mpforms.getter.checks(a);this.chain += form;return this},
	options:function(a){if(this.chain==""){this.start()};var form=mpforms.getter.options(a);this.chain += form;return this},
	select:function(a){if(this.chain==""){this.start()};var form=mpforms.getter.select(a);this.chain += form;return this},
	radio:function(a){if(this.chain==""){this.start()};var form=mpforms.getter.radio(a);this.chain += form;return this},
	scale:function(a){if(this.chain==""){this.start()};var form=mpforms.getter.scale(a);this.chain += form;return this},
	range:function(a){if(this.chain==""){this.start()};var form=mpforms.getter.range(a);this.chain += form;return this},
	question:function(a){return this.yesno(a)},
	submit:function(a,c){return this.button(a,c)},
}

mpforms.responses={
	/**NOT EMPTY!*/
	submit:{},
	JX:{},
	avata:{},
	InputCallbacks:{"-":null},
	HandleInputCallbacks:function(d){
		var id = d.getAttribute("callbackid")
		var fn = this.InputCallbacks[id||"-"];
		if("function"===typeof fn){
			var par = function(){
				var p = "parentNode";
				var l = "localName";
				var s = "section";
				return d[p][l]===s?d[p]
							 :d[p][p][l]===s?d[p][p]
							 :d[p][p][p][l]===s?d[p][p][p]
							 :d[p][p][p][p][l]===s?d[p][p][p][p]
							 :d[p][p][p][p][p][l]===s?d[p][p][p][p][p]
							 :d[p][p][p][p][p][p][l]===s?d[p][p][p][p][p][p]
							 :d[p][p][p][p][p][p][p][l]===s?d[p][p][p][p][p][p][p]
							 :d[p][p][p][p][p][p][p][p][l]===s?d[p][p][p][p][p][p][p][p]
							 :d[p][p][p][p][p][p][p][p][p][l]===s?d[p][p][p][p][p][p][p][p][p]
							 :d[p][p][p][p][p][p][p][p][p][p][l]===s?d[p][p][p][p][p][p][p][p][p][p]
							 :d[p][p][p][p][p][p][p][p][p][p][p][l]===s?d[p][p][p][p][p][p][p][p][p][p][p]
							 :d[p][p][p][p][p][p][p][p][p][p][p][p][l]===s?d[p][p][p][p][p][p][p][p][p][p][p][p]:null;
			}
			var parent_ = par();
			var orgFormchain = function(){
				var disform = mpforms.formChain[(parent_.parentNode.getAttribute("form-chain")||"0")*1]
				var newform = mpforms.formChain[Object.keys(mpforms.formChain).length-1];
				var forms = Object.keys(newform);
				for (var i = 0; i < forms.length; i++) {
					disform[forms[i]] = newform[forms[i]];
				}
				try{
					delete mpforms.formChain[Object.keys(mpforms.formChain).length-1];
				}catch(e){}
			}
			var ret = {
				form:function(){ return parent_.parentNode},
				closeForm:function(){ return parent_.parentNode.outerHTML=""},
				close:function(){ return parent_.outerHTML=""},
				remove:function(){ return this.close()},
				value:function(){ return d.value},
				replaceParent:function(data){
					if(d.getAttribute("called-replaceparent")) return false;
					data = "object"===typeof data?data.done():data;
					return parent_.parentNode.outerHTML = data||""
					d.setAttribute("called-replaceparent","true")
				},
				hide:function(){
					if(d.getAttribute("called-hide")) return false;
					parent_.style.display = "none";
					d.setAttribute("called-hide","true")
				},
				hideForm:function(){
					if(d.getAttribute("called-hideform")) return false;
					parent_.parentNode.style.display = "none";
					parent_.parentNode.style.visibility = "hidden";
					d.setAttribute("called-hideform","true")
				},
				add:function(data){
					if(d.getAttribute("called-add")) return false;
					if("object"!==typeof data) throw new Error("\"remove .done()!\" mpform callback expects an mpform object")
					var div = document.createElement("div");
					if(parent_.nextElementSibling)parent_.parentNode.insertBefore(div,parent_.nextElementSibling);
					else parent_.parentNode.append?parent_.parentNode.append(div):parent_.parentNode.appendChild(div);
					div.outerHTML=data.chain||"";
					orgFormchain();
					d.setAttribute("called-add","true")
				},
				replace:function(data){
					if(d.getAttribute("called-replace")) return false;
					if("object"!==typeof data) throw new Error("\"remove .done()!\" mpform callback expects an mpform object")
					parent_.outerHTML=data.chain||"";
					orgFormchain();
					d.setAttribute("called-replace","true")
				},
				replaceForm:function(data){ return this.replaceParent(data)},
				new:function(data){ return this.replaceParent(data)},
			}
			fn(ret,new mpforms.createPageBind().bypass)
		}
	}
}
mpforms.createPageBind = function(){
		this.bypass = mpforms.bypass;
		this.get = mpforms.get;
		this.print = mpforms.print;
}
mpforms.design={
	inherit:function(_){
		this.inheritances=(_===true||typeof _==="undefined")?true:false;
	},
	orange:function(){
		mpforms.config={
			curve:"4px",
			borderB:"#FF9800",
			objectcolorA:"#FF9800",
			objectcolorB:'#fba424',
			objectcolorC:'#FFC107',
			objectcolorD:'#efd99a',
			button:'#ff5722',
			boxshadow:'none',
		}
		return mpforms.config
	},
	orangecurve:function(){var a = this.orange();a.curve = '50px';mpforms.config=a},
	blue:function(){
		mpforms.config={
			curve:"4px",
			objectcolorA:"#008eff",
			objectcolorB:'#409ce4',
			objectcolorC:'#529dd8',
			objectcolorD:'#b1d7f5',
			button:'#0564af',
			boxshadow:'none',
		}
		return mpforms.config
	},
	bluecurve:function(){var a = this.blue();a.curve = '50px';mpforms.config= a},
	red:function(){
		mpforms.config={
			curve:"4px",
			objectcolorA:"rgb(218 17 2)",
			objectcolorB:'#e63232',
			objectcolorC:'#ff3f3f',
			objectcolorD:'rgb(214, 165, 165,  7.5)',
			button:'rgb(218 17 2)',
			boxshadow:'none',
		}
		return mpforms.config
	},
	redcurve:function(){var a = this.red();a.curve = '50px'; mpforms.config=a},
	sky:function(){
		mpforms.config={
			curve:"4px",
			objectcolorA:"rgb(13 178 199)",
			objectcolorB:'rgb(21 205 247)',
			objectcolorC:'rgb(119 214 226)',
			button:'rgb(29 171 214)',
			boxshadow:'none',
		}
		return mpforms.config
	},
	skycurve:function(){var a = this.sky();a.curve = '50px';mpforms.config=a},
	black:function(){
		mpforms.config={
			curve:"4px",
			objectcolorA:"#222",
			objectcolorB:'#444',
			objectcolorC:'#666',
			objectcolorD:'#ccc',
			button:'#000',
			boxshadow:'none',
		}
		return mpforms.config
	},
	blackcurve:function(){var a = this.black();a.curve = '50px';mpforms.config=a},
	classic:function(){
		mpforms.config={
			curve:"4px",
			boxshadow:'none',
		}
		return mpforms.config
	},
	classiccurve:function(){var a = this.black();a.curve = '50px'; mpforms.config=a},
	allblack:function(){
		mpforms.config={
			textcolorA:'#aaa',
			textcolorB:'#888',
			textcolorC:'#DDD',
			background:'#000',
			boxshadow:'none',
			objectcolorA:'#FF5722',
			objectcolorB:'#ececec',
			objectcolorC:'#8c8c8c',
			objectcolorD:'#5a5a5a',
		}
		return mpforms.config
	},
	allblackcurve:function(){var a = this.black();a.curve = '50px';mpforms.config=a}

};

mpforms.bindTo=function(type){

		 mpforms.bind.Active = type;
				 mpforms[type] = {}
 var k = Object.keys(mpforms.bind);
		 mpforms.set.filter(k,function(v,c){
			 mpforms[type][v] = mpforms.bind[v];
		 })

}
mpforms.bindTo("print");
mpforms.bindTo("get");
mpforms.bindTo("bypass");
mpforms.design.classic();
mpforms.design.inherit();


mpforms.Filesystem = {
	targ:"",
	active:null,
	trigger:function(_,event,targ,m){
	targ = _.getAttribute("targ");
	if(!targ){
		var s = _.parentNode.parentNode.nextElementSibling.children
		s[(s.length)-1].click()
	}else{
		m = this;
		m.targ = targ;
		setTimeout(function(){
			if(!m.active){document.getElementById(m.targ).click();m.targ = null}
			else{ }
			},50)
	}
	},
	process:function(_,event){
		return this.Extendprocess(_,event)
	},
	Extendprocess:function(_,event,__,temp,mult,lim){
		temp = _.getAttribute("format");
		mult = _.getAttribute("multiple");
		mult = (mult==="true")?true:false;
		lim = _.getAttribute("limit");
		lim = (lim==="false"||isNaN(lim*1))?(mult?100:1):(lim*1);
		temp = temp==="image"?this.tempP:(temp==="video"?this.tempV:this.tempF);
		if(!_.id){
		if(!_.value) return;
			var o = '_'+mpforms.res.rand(true,20)
			var p = _.parentNode.previousElementSibling.children[0]
			var s = p.children
			var d = s[(s.length)-1];
			var i = d.childNodes[1]
			var n = d.outerHTML
			var v = document.createElement('div');
			var w = document.createElement('div');
			var m = URL.createObjectURL(event.target.files[0]);
			var c = _.parentNode.children.length;

			if(lim>c)p[document.append?'append':'appendChild'](v);
			if(lim>c)v.outerHTML = n;
			i.style.display = 'block';
			_.setAttribute("bypass","true")
			__ = _.outerHTML
			_.removeAttribute("bypass")
			if(lim>c)_.parentNode[document.append?'append':'appendChild'](w);
			if(lim>c)w.outerHTML = __;
			_.setAttribute("id",o);
			d.setAttribute("id","_"+o)
			d.setAttribute("targ",o)
			i.innerHTML = temp(m,lim);
			d.childNodes[0].style.color='rgba(0,0,0,0)'

		}else{
			if(!_.value){
				document.getElementById("_"+_.id).outerHTML="";
				_.outerHTML="";
				return;
			}
			var p = document.getElementById("_"+_.id);
			var i = p.childNodes[1]
				p.childNodes[0].style.color='rgba(0,0,0,0)'
			var m = URL.createObjectURL(event.target.files[0]);
				i.style.display = 'block';
				i.innerHTML = temp(m,lim);
		}
	},
	remove:function(s,c,r,i,p,t){
		t = c;
		c = this;
		c.active = true;
		r = s.parentNode.parentNode.parentNode.parentNode
		i = r.getAttribute("targ")||(r.id||'').substring(1);
		p = (document.getElementById(i)||[]).parentNode.children.length

		setTimeout(function(){
			if(p>1){
				var o = document.getElementById(c.targ)
				var d = o.parentNode;
						o.outerHTML = "";
				document.getElementById("_"+c.targ).outerHTML = "";
				if(d.children.length==1)d.children[0].removeAttribute("bypass")
			}else{
				var a = document.getElementById(c.targ)
						a.value = "";
						a.setAttribute("id","");
						a.removeAttribute("bypass");

				i=document.getElementById("_"+c.targ);
				i.setAttribute("targ","");
				i.setAttribute("id","");

				var o = i.childNodes[1];
					o.innerHTML = "";
					o.style.display = "none";
					i.childNodes[0].setAttribute("style","")
			}

			c.active = null;
			c.targ = null;

		},70);



	},
	tempP:function(sr,c){ return '<div style="display:table;width:100%; font-size:11px; height:100%;"><div style="display:table-cell; vertical-align:middle; height:100%; background:; width:100%; position:relative; "><img src="'+sr+'" style="width:100%;"><b onclick="mpforms.Filesystem.remove(this,'+c+')" style="position:absolute; font-size:20px; top:0; right:0; padding:0 6px; border-radius:20px; background:#fff; box-shadow: 0 0 3px 0 #000;">&times;</b></div>';},
	tempV:function(sr,c){ return '<div style="display:table;width:100%; font-size:11px; height:100%;"><div style="display:table-cell; vertical-align:middle; height:100%; background:; width:100%; position:relative; "><video controls="false" src="'+sr+'" style="width:100%;"></video><b onclick="mpforms.Filesystem.remove(this,'+c+')" style="position:absolute; font-size:20px; top:0; right:0; padding:0 6px; border-radius:20px; background:#fff; box-shadow: 0 0 3px 0 #000;">&times;</b></div>';},
	tempF:function(sr,c){ return '<div style="display:table;width:100%; font-size:11px; height:100%;"><div style="display:table-cell; vertical-align:middle; height:100%; background:; width:100%; position:relative; "><c style="width:100%;">'+(mpforms.SVG.file(30))+' </c><b onclick="mpforms.Filesystem.remove(this,'+c+')" style="position:absolute; font-size:20px; top:0; right:0; padding:0 6px; border-radius:20px; background:#fff; box-shadow: 0 0 3px 0 #000;">&times;</b></div>';},
}

mpforms.closeform = function(d){
	var v = Object.keys(d)[0];
	if(v=="url"){
		v = document.querySelectorAll("form.mpforms[action='"+(d.url)+"']")[0]
	}else {
		v = document.getElementById(v);
	}
	if(v){
		(v||{}).outerHTML="";
	}
}
mpforms.clearform = function(d){
	var v = Object.keys(d)[0];
	var avata;
	if(v=="url"){
		avata = v.toString();
		avata = mpforms.responses.avata[mpforms.responses.avata[v]];
		v = document.querySelectorAll("form.mpforms[action='"+(d.url)+"']")[0]
	
	}else{
		avata = mpforms.responses.avata[v];
		v = document.getElementById(v);
	} 
	if(v&&avata){
		(v||{}).innerHTML="";
		(v||{}).outerHTML=avata;
	}
	
}

mpforms.JX = {send:function(form,data){this.jx({method:data.method,url:data.url,data:!data.form?form:{},call:function(a){if("function"===typeof data.fn)data.fn(a,null,{Form:form})},error:function(status,info,form){if("function"===typeof data.fn)data.fn(null,status,{Form:form})},formData:data.form?new FormData(form):false})},evaluateAjaxScript:function(a){var script=document.createElement("script");script.innerHTML=a;var s=document.getElementsByTagName("script"),s=s[(s.length)-1];s.parentNode.insertBefore(script,s);script.outerHTML='';},pscript:function (_source){ var dom = document.createElement('div'),scripts=dom.getElementsByTagName('script');dom.innerHTML=_source;if(_source.toLowerCase().indexOf('<script')>-1){ for(var i=0;i<scripts.length;i++){try{ this.evaluateAjaxScript(scripts[i].innerHTML)}catch(e){/*console.log('ERROR AJAX: Error parsinig script in response'+e);*/}}}return _source},sblast:function(x,max){var v=!max?1:max,x=x.toString().split(''),r='';if(Array.isArray(x)){for(var i=0;i<x.length-v;i++){r+=x[i];}}return r;},setRequestHeader:function(a,req){if(a.header&&a.header=="[object Object]"){if(!Object.keys(a.header)[0]) return false;var k = Object.keys(a.header);for(var i=0;i<(k||[]).length;i++){req.setRequestHeader(k[i],a.header[k[i]])}return true}return false},jx:function(a){var u=a.url;if(a.data){var data=a.data;var nData=Object.keys(data),vNew,val='';for(var i=0;i<nData.length;i++){vNew=data[nData[i]];val+=nData[i]+'='+vNew+'&';}a.url=a.url+'?'+mpforms.JX.sblast(val);}if(window.XMLHttpRequest){var req= new XMLHttpRequest();}else{req=new ActiveXObject('Microsoft.XMLHTTP');}if(a.method.toUpperCase()==='POST'){if(a['formData']&&a['formData']=='[object FormData]'){ req.open(a.method.toUpperCase(),u,true);req.send(a['formData']);}else{req.open(a.method.toUpperCase(),u,true);if(!mpforms.JX.setRequestHeader(a,req)){req.setRequestHeader('Content-type',a.contentType||'application/x-www-form-urlencoded');req.setRequestHeader('X-Requested-With','XMLHttpRequest')};req.send(val)}}else{req.open(a.method.toUpperCase(),a.url,true);if(!(a,req)){req.setRequestHeader('Content-type',a.contentType||'text/plain');req.setRequestHeader('X-Requested-With','XMLHttpRequest')}req.send(null)}req.onreadystatechange = function(){var e='',ok = 200, loaded = 4;if(req.readyState==loaded&&req.status==ok){if(a.call){ a.call(req.responseText); mpforms.JX.pscript(req.responseText); if(a.progress)a.progress(4,100)} } else {if(req.status!==ok) e+='connectionerror';if(req.readyState!==loaded) e+='loading';if(a.error&&req.status!=ok&&req.readyState==loaded)a.error(req.status,a); if(a.progress)a.progress(req.readyState,(req.readyState*25))}}}};function ____prnt(s,a){var p = "parentNode",l = "localName";if(!s[p]){return false}else return s[p][l]===a?s[p]:s[p][p][l]===a?s[p][p]:s[p][p][p][l]===a?s[p][p][p]:s[p][p][p][p][l]===a?s[p][p][p][p]:s[p][p][p][p][p][l]===a?s[p][p][p][p][p]:s[p][p][p][p][p][p][l]===a?s[p][p][p][p][p][p]:s[p][p][p][p][p][p][p][l]===a?s[p][p][p][p][p][p][p]:s[p][p][p][p][p][p][p][p][l]===a?s[p][p][p][p][p][p][p][p]:s[p][p][p][p][p][p][p][p][p][l]===a?s[p][p][p][p][p][p][p][p][p]:false};var countString=function(a){var a=!!(a)&&!empty__(a)?a:null,a=a&&"number"===typeof a?a.toString().trim():a.trim(),a=!a?null:a.split('').length; return a},empty__=function(a){ if(Array.isArray(a)){return !a[0]?true:false};  if("[object Object]"==a){return !Object.keys(a)[0]?true:false}},end___=function(v){if(Array.isArray(v)){a=v.length-1;return v[a];}},isCleanString=function(){ var a=arguments,m=a[0],preg,mat,ret,l=a.length,c;if(!!(m)){preg=/[-,%£!|"*&^:;'<>,@`¬)\/(+=}${~#]/ig;mat=m.match(preg);ret= (!Array.isArray(mat));if(l==2&&Array.isArray(mat)){ret=true; for(i=0; i<mat.length;i++){if(mat[i]!==a[1]){ret = false;}}}if(l===3){c=new RegExp(a[1],'ig'); m=m.replace(c,''); return isCleanString(m,a[2]);}if(l===4){c=new RegExp(a[2],'ig'); m=m.replace(c,''); return isCleanString(m,a[2],a[3]);} return ret}};mpforms.verify={ email:function(m){if(!!(m)){if(m.indexOf('@')>-1&&m.indexOf('.')>-1){var t='@',i=m.indexOf(t),l=m.lastIndexOf(t),s=m.lastIndexOf('.'),c=countString(m),com=end___(m.split('.'));cc=countString(com),p=isCleanString(m,'@'),mailer=countString(m.split('@')[1].split('.')[0]),rt=(p&&cc<4&&i===l&&s>l&&mailer>1)?true:false;return rt;}else{return false;}}else{return false}},mobile:function(m){var m=!!(m)?m:false,mat=/[-,%£!"*&^:;_'<>|,@`¬\/=}${~#A-Za-z]/ig;if(m)mat=m.match(mat);m=(!mat&&m.toString().split(',').join('').lastIndexOf('+')<1&&countString(m)>3)?true:false;return m;},number:function(m){return this.mobile(m)},password:function(m,a,p,s){var m=!!(m)?m:false,b=!!(a)&&"number"===typeof a&&a>4?a+1:5,p=!!(p)?p:false,s=!!(s)?s:false,e=true;if(m){if(countString(m)<b) e='Password characters must atleast be ' + a;if(p===true){p=m.match(/[-,%£!"*&^:;_'<>,()|@`¬\/.=}${~#?+]/ig); if(!p) e='password must countain at least a special characters like -%£!*&^? or a space_ etc';}if(s===true){s=m.match(/[0-9]/g); if(!s) e='password must countain at least a number';}return e;}else return 'Password cannot be empty';},names:function(m){ var n,c,lim; if(m){ c=countString(m);lim=1;n=c<=lim||(function(m){ var p=m.match(/["%&^:;'<>,|@`()¬\/=}{~#?+]/ig); if(!p){ p=m.indexOf('[')<1&&m.indexOf(']')<1?false:true} return p;}(m))?(function(m){ var r = countString(m)<2?'Character must not be less than two':'Input value contains bad character(s) (TIPS) You can use any of these characters: _ ! . - £ $';  return r; }(m)):true;}else{ n=null;}return n;},nameStrict:function(m){ var n,c,lim; if(m){ c=countString(m);lim=1;n=c<=lim||(function(m){ var p=m.match(/[-!"%&^:;'<>,|@`()¬\/=_. £$}{~#?+]/ig); if(!p){ p=m.indexOf('[')<1&&m.indexOf(']')<1?false:true} return p;}(m))?(function(m){ var r = countString(m)<2?'Character must not be less than two':'Input characters must strictly be letters! the use of _space or any other character is not allowed';  return r; }(m)):true;}else{ n=null;}return n;},username:function(m){ var m=m.trim(),usernameBODY=function(m){ var n,c,lim; if(m){ c=countString(m);lim=1;n=c<=lim||(function(m){ var p=m.match(/[-,%£!"*&^:;'<>,()|@`¬\/.=}${~#?+]/ig); if(!p){ p=m.indexOf('[')<1&&m.indexOf(']')<1?false:true} return p;}(m))?(function(m){ var r = countString(m)<2?'Character must not be less than two':'Input value contains bad character(s) (TIPS) You can only use underscore "_" to seperate words';  return r; }(m)):true; }else{ n=null;}return n;}; return (m.split('')[0]==='@'?usernameBODY(m.substring(1)):usernameBODY(m));},namechar:function(m){ var n,c,lim; if(m){ c=countString(m);lim=1;n=c<=lim?false:true;}else{ n=null;}return n;},name:function(m){return this.names(m);},url:function(a){if(!!(a)&&a.indexOf('.')>0&&((a||'').split("://")[0].indexOf("http")>-1)){var p=a.toString().split(':')[0],protocol=!p&&p!=='https'&&p!=='http'&&p!=='ftp'?'http':p,dot='.',dv=':',sl='//',t='www',tc='www.',protA=protocol+dv,protB=protA+sl,ip=a.indexOf(protocol),s=a.indexOf(' '),ipa=a.indexOf(protA),ipb=a.indexOf(protB), d=a.split(protB),sa=!d[1]?d[0]:d[1],it=sa.indexOf(t),itc=sa.indexOf(tc),www=it===0&&itc===0?true:false,ddomain=sa.split(tc),dd=!ddomain[1]?ddomain[0].split(dot):ddomain[1].split(dot),domain=dd[0],com=(dd[1]||'').split('/')[0],returner=isCleanString(domain,'-')&&isCleanString(com)&&domain!==''?true:false,f=sa.split('/')[0],ff=isCleanString(f,'-'),rt=f.indexOf('.')<1||!ff||!returner?false:true;qr=s<0?true:null,rr=ip===0&&ipa===0&&ipb===0?returner:rt,y=!qr?false:rr;return y;}else{return false}},format:{format:function(val,addformat,acceptedformat){var format,r=false,val=(val||"").toString().toLowerCase().trim();	if(!val) return r;format = Array.isArray(acceptedformat)?acceptedformat:(!!acceptedformat)?acceptedformat.split(","):null||['.jpeg','.png','.wbmp','.jpg','.gif'];if(addformat){ format.push(Array.isArray(addformat)?addformat:addformat.split(","))}val=val.split(".")[((val.split(".").length)-1)];if(inArray('.'+val,format)){r = true}else if(inArray(val,format.toString().split(".").join("").split(","))){r = true}return r},image:function(val,addformat,acceptedformat){return this.format(val,addformat,acceptedformat)},video:function(val,addformat,acceptedformat){return this.format(val,addformat,acceptedformat||['.mp4','.3gp','.mkv'])},music:function(val,addformat,acceptedformat){return this.format(val,addformat,acceptedformat||['.mp3','.wma','.aac'])},audio:function(val,addformat,acceptedformat){return this.music(val,addformat,acceptedformat)},file:function(val,acceptedformat){return !!acceptedformat?this.format(val,false,acceptedformat):false},php:function(val,addformat,acceptedformat){return this.format(val,addformat,acceptedformat||['.php'])},pdf:function(val,addformat,acceptedformat){return this.format(val,addformat,acceptedformat||['.pdf'])},asp:function(val,addformat,acceptedformat){return this.format(val,addformat,acceptedformat||['.asp'])},go:function(val,addformat,acceptedformat){return this.format(val,addformat,acceptedformat||['.go'])},py:function(val,addformat,acceptedformat){return this.format(val,addformat,acceptedformat||['.py'])},text:function(val,addformat,acceptedformat){return this.format(val,addformat,acceptedformat||['.text'])},js:function(val,addformat,acceptedformat){return this.format(val,addformat,acceptedformat||['.js'])},html:function(val,addformat,acceptedformat){return this.format(val,addformat,acceptedformat||['.html'])},javascript:function(val,addformat,acceptedformat){return this.format(val,addformat,acceptedformat||['.js'])}}};mpforms.SVG = {checkbox:function(a){a=a||'';a=a==='inherit'||a.toString().indexOf("px")<0?'15px':a;return '<svg width="'+(a||'15px')+'" height="'+(a||'15px')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>'},checkcircle:function(a,c){a=a||'';a=a==='inherit'||a.toString().indexOf("px")<0?'15px':a;return '<svg width="'+(a||'15px')+'" height="'+(a||'15px')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(2)+'" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'},file:function(a,c){a=a||'';a=a==='inherit'||a.toString().indexOf("px")<0?'15px':a;return '<svg width="'+(a||'15px')+'" height="'+(a||'15px')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(c||2)+'" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>'},caret:function(a){a=a||'';a=a==='inherit'||a.toString().indexOf("px")<0?'15px':a;return '<svg width="'+(a||'15px')+'" height="'+(a||'15px')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-down"><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline></svg>'},box:function(a){a=a||'';a=a==='inherit'||a.toString().indexOf("px")<0?'15px':a;return '<svg width="'+(a||'15px')+'" height="'+(a||'15px')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-package"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>'},info:function(a){a=a||'';a=a==='inherit'||a.toString().indexOf("px")<0?'15px':a;return '<svg width="'+(a||'15px')+'" height="'+(a||'15px')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'},left:function(a){a=a||'';a=a==='inherit'||a.toString().indexOf("px")<0?'15px':a;return '<svg width="'+(a||'15px')+'" height="'+(a||'15px')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-left"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>'},right:function(a){a=a||'';a=a==='inherit'||a.toString().indexOf("px")<0?'15px':a;return '<svg width="'+(a||'15px')+'" height="'+(a||'15px')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>'},down:function(a){a=a||'';a=a==='inherit'||a.toString().indexOf("px")<0?'15px':a;return '<svg width="'+(a||'15px')+'" height="'+(a||'15px')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-down"><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline></svg>'}}
