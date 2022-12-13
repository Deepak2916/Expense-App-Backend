
let addbtn=document.getElementById('add-expenses')
let list=document.getElementById('list')
var User;
addbtn.addEventListener('click',addExpense)
list.addEventListener('click',editDelete)
let [obj,id,editId]=[{},0,0]

// display expenses(Home)

function displayExpenses(id,amount,description,category,disabled){
    let total=document.getElementById('expenditure-value')
    total.textContent=parseInt(total.textContent)+parseInt(amount)
    list.innerHTML+=`<div class='sublist-content flex-space'>
    <input type='hidden' id='hiddenId' value='${id}'>
    <p class="product"> ₹ ${amount}</p><p class="amount">${description}</p><p class="categoryList">${category}</p>
   <button class='delete fa fa-trash' id='deletebtn' ${disabled}></button>
    </div>`

}   

async function Axios(){
    console.log("axios called")
    try{
        if(editId!=0) await axios.put(`http://localhost:4000/expense/edit/${editId}`,obj)
            
        else {
            console.log('added to axios')
            let token=localStorage.getItem('token')
            console.log(token)
            let expense=await axios.post('http://localhost:4000/expense',obj,{headers:{"Authorization":token}})
            id=expense.data.id
        }
    }

    catch(err){
        console.log(err)
    }
}

function addExpense(e){
    
e.preventDefault()
let amount=document.getElementById('amount').value
let description=document.getElementById('description').value
let category=document.getElementById('select').value
 obj={
    Amount:amount,
    Description:description,
    Category:category
}
// console.log(amount,description);
// // console.log(obj,id,editId,deleteId,displayAll)
//  editId=0
 Axios(obj)
displayExpenses(id,amount,description,category,'')
document.getElementById('amount').value=''
document.getElementById('description').value=''
}
let totalPages=1
function DisplayAllExpenses(pageNumber){
    let token=localStorage.getItem('token')
    // console.log(token)
    async function Window(){
    let size=localStorage.getItem('size')
    let expenses= await axios.get(`http://localhost:4000/expense?page=${pageNumber}&size=${size}`,{headers:{"Authorization":token}})
   
        let allExpenses=expenses.data.expenses
        User=expenses.data.user
        totalPages=expenses.data.pages
        // document.querySelector('.pagination').innerHTML=''
        if(expenses.data.pages!='0'){
            document.getElementById('pages').innerHTML=''
        Displaypages(parseInt(expenses.data.pages))

        }
     
       

        let premiumUser=await axios.get(`http://localhost:4000/premium/get?id=${User.id}`)

        if(premiumUser.data.success){
            document.getElementById('pay-button').disabled=true
            document.getElementById("History").classList.add('active')
            
            document.querySelector('.output-container').style='background-color: rgb(201, 136, 225);'
          let body= document.querySelector('body')
          body.style='background-color: #707072;'
          document.getElementById('lederbtn').classList.add('active')
        }
        document.getElementById('expenditure-value').textContent=0
      for(var i=0;i<allExpenses.length;i++){
           let e=allExpenses[i]
           displayExpenses(e.id,e.Amount,e.Description,e.Category,'')
      } 
    }
    Window()  

}
 //Display pages

 let pagesDiv=document.getElementById('formid')
 console.log(pagesDiv)
 function Displaypages(pages){
    
     let Addpages=document.getElementById('pages')
     console.log('form')
     for(let i=1;i<=pages;i++){
        //  Addpages.innerHTML+=` <button id='${1}'>${3}</button>`
        let btn=document.createElement('button')
        btn.classList.add('pagebtn')
        btn.id=pages-i+1
        btn.textContent=i
        Addpages.appendChild(btn)
     }
 }

 

 //pagination for expenses
 pagesDiv.addEventListener('click',Addpages)
console.log(pagesDiv)
 function Addpages(e){
   e.preventDefault()
   if(e.target.id=='size'){
    localStorage.setItem('size',e.target.value)
   }
   e.target.className='size'
    document.getElementById('list').innerHTML=''
    
    console.log(e.target)
     DisplayAllExpenses(e.target.id)
 }
window.addEventListener("DOMContentLoaded",()=>{
DisplayAllExpenses(0)
})


function editDelete(e){
    e.preventDefault();
    var li = e.target.parentElement;
    let id=li.children[0].value
    
if(e.target.classList.contains('delete')){
    
    if(confirm('Are You Sure?')){
   list.removeChild(li)
   deleteId=id
   async function Delete(){
     let token=localStorage.getItem('token')
   await axios.delete(`http://localhost:4000/expense/delete/?id=${deleteId}`,{headers:{"Authorization":token}})
   deleteId=0
   }
   Delete()
  }
}
else if(e.target.textContent=='edit'){
    let text=li.children[1].textContent.split('-')
    document.getElementById('amount').value=parseInt(text[0])
    document.getElementById('description').value=text[1]
    document.getElementById('select').value=text[2]
    editId=id  
    ul.removeChild(li)
 }
    }

//hamburger

const btn=document.getElementById('hambergerbtn')
const nav=document.getElementById('nav')

btn.addEventListener('click',()=>{
    console.log('hello')
    nav.classList.toggle('active')
  

})


//logout

let expence_logout=document.getElementById('logout')

expence_logout.addEventListener('click',logout)
function logout(e){
    localStorage.removeItem('token')
    window.location="login.html"

}

// payment
function paymentStatus(id,status){
    console.log(User)
   
    if(status){ 
        document.getElementById('pay-button').disabled=true
        document.getElementById("History").classList.add('active')
        document.getElementById('lederbtn').classList.add('active')
        document.querySelector('.output-container').style='background-color: rgb(201, 136, 225);'
        let body= document.querySelector('body')
        body.style='  background-color: #707072;'
        async function addPremium(){
            await axios.post(`http://localhost:4000/premium/add`,{userId:id})
        }
        addPremium()
    }
}


  
document.getElementById('pay-button').onclick = function(e){
  
    
    async function userpayment(){
    //     console.log(User)
    let token=localStorage.getItem('token')
    let expenses= await axios.get(`http://localhost:4000/expense?page=1&size=2`,{headers:{"Authorization":token}})

     let user=expenses.data.user
    var options = {
        "key": "rzp_test_2vjBd5AyaipCTU", 
        "amount": "49900", 
        "currency": "INR",
        "name": "premium membership",
        "description": "Expense app premium membership",
         "image": "https://media.geeksforgeeks.org/wp-content/uploads/20210806114908/dummy-200x200.png",
        // "order_id": "order_Ko7SRrv6nM075i",  
        "handler": function (response){
            console.log('handlerresponse:-',response)
            alert("This step of Payment Succeeded");
            paymentStatus(user.id,true)
        },
        "prefill": {
            // Here we are prefilling random contact
           "contact":"9000106153", 
             //name and email id, so while checkout
           "name": `${user.name}`,  
           "email": `${user.email}`
         },
       "notes" : {
          "description":"premium membership for extra features"
        }, 
        "theme": {
            "color": "#2300a3"
        }
    };
    // var razorpayObject = new Razorpay(options);
    var razorpayObject=new Razorpay(options)
    // console.log('razorpayObject:-',razorpayObject);
    razorpayObject.on('payment.failed', function (response){
          console.log(':-',response);
          alert("This step of Payment Failed");
          paymentStatus(false)
    });
  
  async  function pay(){
    await axios.post('http://localhost:4000/expense/payment',options)
    let order=razorpayObject.open();
    console.log('...order:-',order)
    }
    pay()
    e.preventDefault();
}
userpayment()
    
};


//leader bord
const leaderbtn=document.getElementById('lederbtn')
const leadernav=document.getElementById('leadernav')
const Xbtn=document.getElementById('X')
Xbtn.addEventListener('click',()=>{
    leadernav.style='display:none'
})

leaderbtn.addEventListener('click',()=>{
    if(!leaderbtn.classList.contains('active')){
        alert('Sorry, to get this feature you need to buy premium')
        return
    }
    
    leadernav.style='display:block'
  
})
window.addEventListener('DOMContentLoaded',()=>{
async function showUsers(){
    let users=await axios.get(`http://localhost:4000/expense/leaderbord`)
    let bord=document.getElementById('leaderUl')
    function display(name,expense,id,rank){
        let premiumUser;
        
        async function UserPremium(){
            let token=localStorage.getItem('token')
        let expenses= await axios.get(`http://localhost:4000/expense?page=${1}&size=${1}`,{headers:{"Authorization":token}})
        premiumUser=expenses.data.user

        if(premiumUser.id==id){
            // console.log(id,name)
            bord.innerHTML+=` 
            <tr id='User'>
            <td>${rank}</td>
            <td>${name}</td>
            <td>${expense}</td>
            <td><button id='${id}' disabled>see expenses</button></td>
            </tr>`
            document.getElementById('User').style='background-color: #a5a6aa'
         }
         else{
            bord.innerHTML+=` 
            <tr>
            <td>${rank}</td>
            <td>${name}</td>
            <td>${expense}</td>
            <td><button type='submit' id='${id}' class='usersdetails'>see expenses</button></td>
            </tr>`
         }
        }
        UserPremium()
        // console.log('id---->',User.id)
     
    }

   
    let count=0
    users.data.users.forEach(user=>{
        // console.log('.....',user[0],user[1],user[2])
        count+=1
        display(user[0],user[1],user[2],count)
    })
   }
   showUsers()
})

//display user details(for premium users)

let detailsBtn=document.querySelector('table')
detailsBtn.addEventListener('click',Getdetails)

function Getdetails(e){
if(e.target.id>0){
    let del=document.querySelector('.deletebtn')
    console.log('......>',del)
    list.innerHTML=''
    document.querySelector('.user-amount-container').style='display:none'
    document.getElementById('userbtn').style='display:block'
    document.getElementById('userbtn').disabled=false
    document.querySelector('.list').className='otherUserStyle'
    leadernav.classList.toggle('active')
    async function userExpense(){
        let user=await axios.get(`http://localhost:4000/expense/oneUser?id=${e.target.id}`)
        document.getElementById('expenditure-value').textContent=0
       document.querySelector('.pagination').style='display:none'
        for(let expense of user.data){
            displayExpenses(expense.id,expense.Amount,expense.Description,expense.Category,'disabled')
        }
    }
    userExpense()
    // let del=document.getElementById('deletebtn')
    // console.log('......>',del)
}
}

document.getElementById('userbtn').onclick=function (){
document.querySelector('.user-amount-container').style='display:block'
document.getElementById('userbtn').style='display:none'
document.querySelector('.otherUserStyle').className='list'
document.querySelector('.pagination').style='display:block'
leadernav.classList.toggle('active')
// document.querySelectorAll('.delete').disabled=false
list.innerHTML=''
DisplayAllExpenses()

}


// Day to day expenses

document.querySelector('.X-2').onclick=()=>{
    document.getElementById('expense-container').style='display:none'
}
let dayTodaybtn=document.getElementById('History')
dayTodaybtn.onclick=()=>{
    if(!dayTodaybtn.classList.contains('active')){
        alert('Sorry, to get this feature you need to buy premium')
        return
    }
    document.getElementById('expense-container').style='display:block'
    let table=document.getElementById('Historytbl')
function displayHistory(date,description,category,income,expenses){
   
    table.innerHTML+=
  `  <tr>
        <td>${date}</td>
        <td>${description}</td>
        <td>${category}</td>
        <td>${income}</td>
        <td>${expenses}</td>
    <tr>`
}
// download files
function getDate(date){
    let Date=date.split('-')
    return `${Date[0]}-${Date[1]}-${Date[2].slice(0,2)}`
}
let download=document.getElementById('download')
download.onclick=(e)=>{
    e.preventDefault()
async function DownloadLink(){
    // let user=await axios.get(`http://localhost:4000/expense/oneUser?id=${User.id}`)
        let link=await axios.post('http://localhost:4000/expense/download',{
            id:User.id
        })
       let a= document.createElement('a')
       a.href=link.data.fileUrl
       a.click()
      
    }
    DownloadLink()
console.log('downloaded....')
}

async function getexpenses(){
    let user=await axios.get(`http://localhost:4000/expense/oneUser?id=${User.id}`)
    console.log(user)
  table.innerHTML=` <tr>
  <th>Date</th>
    <th>Description</th>
    <th>Category</th>
    <th>Income</th>
    <th>Expenses</th>
</tr>`
    user.data.forEach(expense=>{
        date=getDate(expense.createdAt)
        displayHistory(date,expense.Description,expense.Category,0,expense.Amount)
    })
}
getexpenses()

// downloaded files
let tableFiles=document.querySelector('#filesUrl')
function displayfileUrl(date,fileUrl){
   
    tableFiles.innerHTML+=
  `  <tr>
        <td>${date}</td>
        <td><a href=${fileUrl}>Downloaded file</a></td>
        
    <tr>`
}
async function downloadedfiles(){
    let files=await axios.get(`http://localhost:4000/files/downloadedfiles/${User.id}`)
    // console.log(files.data.files)
    tableFiles.innerHTML=`<tr>
    <th>Date</th>
    <th>Downloaded files</th> 
  </tr>`
    files.data.files.forEach(file=>{
        date=getDate(file.createdAt)
        displayfileUrl(date,file.fileUrl)
    })
}
downloadedfiles()
}





 