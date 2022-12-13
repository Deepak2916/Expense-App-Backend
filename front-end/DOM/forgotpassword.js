let email=document.getElementById('email')
let btn=document.getElementById('btn')
btn.addEventListener('click',sendRequest)

function sendRequest(e){
    e.preventDefault()
    console.log('clicked')
    async function PostRequest(){
        // console.log(email.value)
       let user= await axios.post('http://localhost:4000/resetPassword/postRequest',{
            email:email.value
        })
        // console.log(user.data)
        let container=document.getElementById('container')
        container.innerHTML=`<a href=${user.data.link}>${user.data.link}</a>`
    }
    PostRequest()
    
    console.log(container)
   
}