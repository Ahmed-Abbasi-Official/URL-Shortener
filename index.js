import express from "express"

const app=expres()
const port=process.env.PORT || 4000

app.listen(port,()=>{console.log(`Server Started at Port ${port}`);
})