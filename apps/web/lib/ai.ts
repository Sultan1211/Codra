// const anthropic = new Anthropic(api: "adfsdfasdfsadfas");


// app.get("/events",(req,res)=>{
//     const prompt = req.prompt
//     res.setHeaders("Content-Type","text/event-stream")
//     res.setHeaders("Cache-control","no-cache")
//     res.setHeaders("Connection","keep-alive")
//     res.flushHeaders();

//     const stream = anthropic.messages.stream(
// {
//     modal:"claude 5.5",
//     tokens: "1024",
//     message:[{role: "user",content: prompt}]

// }
//     )
//     stream.on("text",(textChunk)=>{
//         res.write({JSON.stringify({Data: textChunk})})
//     })
//     stream.on("error")
// })