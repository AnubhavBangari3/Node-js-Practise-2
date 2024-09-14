import http from 'http';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

dotenv.config();

const PORT=process.env.PORT;

const __filename=url.fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

console.log(__filename,__dirname);

const server=http.createServer(async (req,res) => {
    // console.log(req.url);
    // console.log(req.method);
    //res.write("I am the best");

    //res.setHeader('Content-Type','text/html');
    //res.end("<h1>I am the best</h1>");

    // res.writeHead(500,{'Content-Type':'application/json'});
    // res.end(JSON.stringify({message:"Server Error"}));


    try{
        if(req.method === 'GET'){
                
                if(req.url === '/'){
                    filepath=path.join(__dirname,'public','index.html');
                }
                else if(req.url === '/about'){
                    filepath=path.join(__dirname,'public','index.html');
                }
                else{
                    throw new Error("Not Found");
                }
                const data=await fs.readFile(filepath);
                res.setHeader('Content-Type','text/html');
                res.write(data);
                res.end();
        }
        else{
            throw new Error("Method not allowed");
        }
    }catch(error){
        res.writeHead(500,{'Content-Type':'text/html'});
        res.end('<h1>Server Error</h1>');
    }


    

});



server.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
})