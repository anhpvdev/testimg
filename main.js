var __URL = "https://fake-chat-mxjs.onrender.com/"

///asdwwss


function addtext(t,c,u){
    let content = `<li>
    <div>
        <h3>${t}</h3>
        <p>${c}</p>
        <span>${u}</span>
    </div>
    
    </li>`
    document.getElementById("chatbox").innerHTML += content
}

async function Loadchat(){
    return new Promise((resolve) => {
        $.ajax({
            type: "get",
            url: __URL,
            success: function(data) {
                console.log(data)

                if(data?.data){
                    let value = data.data
                    for(let i=0;i<value.length;i++){
                        console.log(value)
                        addtext(value[i].ten,value[i].noidung,value[i].thoigian)
                    }
                }else{
                    alert("có lỗi sảy ra")
                }        
               
            },error:function(message){
                console.log(message)

            }
        })
        
    })
}

Loadchat()


async function Sendchat(name,content){
    return new Promise((resolve) => {
        $.ajax({
            type: "post",
            url: __URL+"add",
            data:{
                name:name,
                content:content
            },
            success: function(data) {
              
                if(data.status=="success"){
                    console.log(data)
                    let value = data.data
                    addtext(value.ten,value.noidung,value.thoigian)
                }
               
            },error:function(message){
              
                alert("có lỗi sảy ra")
            }
        })
    })
}


const socket = io(__URL)


var username = localStorage.getItem("user")

document.getElementById("form").addEventListener("submit",async (e)=>{
    e.preventDefault()
    if(!username){
        var regisname = prompt("Vui lòng nhập tên của bạn:");
        if(regisname){
            localStorage.setItem("user",regisname)
            username = localStorage.getItem("user")
            alert("đã đăng ký: "+username)
        }else{
            alert("vui lòng nhập tên để tiếp tục")
        }
    }else{ // đã có tên 
        var message = document.getElementById("chatbtn").value
        if(message.length>0){
            socket.emit('on-chat',{message:{ten:username,noidung:message}})
            await Sendchat(username,message)
        }else{
            alert("nhập j đó đi")
        }

    }

})

socket.on('user-chat',(message)=>{
    console.log(message.message)
    if(message.message.ten!= username){
        addtext(message.message.ten,message.message.noidung,"now")
    }

})