let input = document.querySelector("input");
let btn = document.querySelector("button");
let Ansbox = document.querySelector("#para2");


btn.addEventListener("click", async()=>{

    
  let loading = "Loading......."
  Ansbox.innerText =loading;

    try{

let response = await fetch("http://localhost:3000/Asksomething",
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
         body:JSON.stringify({
            text:`You are AskGemini AI. Give clear, short, and helpful answers in simple English. Do not use markdown, headings, bullet points, code blocks, stars (*), hashes (#), or any special formatting. Return only clean plain text that can be shown directly in a website answer box ${input.value}.`


        })
})

 let data = await response.text();
  Ansbox.innerHTML =data;

} catch(err){
    console.log(err);
    Ansbox.innerHTML ="Somthing went wrong"
}


})
    
    