let emailIn = ""
let user_name = "User"
let botName = "Bot"



document.getElementById("generate").addEventListener("click", () => {
  if(document.getElementById('emailIn').value === "") return 
  const email = document.getElementById('emailIn').value
  emailIn = email
  ApiCall(emailIn)
})

document.getElementById('copy').addEventListener("click", () => {
  let responseText = document.getElementById("emailOut").textContent
  navigator.clipboard.writeText(responseText)
})



const ApiCall = async (transcript) => {

  let prompt = user_name + ": Can you generate a response for the following email:" + transcript + `\n ${botName}: `


  let encode = encodeURIComponent(prompt)
  const url = `http://localhost:3000/api?q=${encode}`
  const res = await fetch(url)

  const data = await res.json()
  const stringdata = data.toString()
  var lines = data.toString().split('\n');
  
  let newtext = data;


  if (data.includes(`${botName}:`)) {
    newtext = data.split(`${botName}: `)[1]
  }


  if (data.includes(`${botName}:`) === false && lines.length >=2 && lines[0].charAt(0) === '+') {
    lines.splice(0,1)
    newtext = lines.join('\n')
    
  }
  if (data.includes(`${botName}:`) === false && lines.length >=2 && lines[0] === '') {
    lines.splice(0,1)
    newtext = lines.join('\n')
    
  }
  if (data.includes(`${botName}:`) === false && lines.length >=2 && lines[0].charAt(0) === '&') {
    lines.splice(0,1)
    newtext = lines.join('\n')
    
  }
  if (data.includes(`${botName}:`) === false && lines.length === 1 && lines[0].charAt(0) === '+') {
    newtext = data.replaceAll('+', ' ')

  }

  if (stringdata.includes(`${botName}:`) === false && stringdata.includes(`${user_name}:`) ) {
    newtext = data.split(`${user_name}: `)[1]

  }

  let responseArea = document.getElementById("emailOut")
  console.log(responseArea)
  responseArea.textContent = newtext
  document.getElementById("input").style.display = "none"
  document.getElementById("response").style.display = "block"
}