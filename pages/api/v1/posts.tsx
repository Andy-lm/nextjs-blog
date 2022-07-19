import { NextApiRequest, NextApiResponse } from "next"

const Posts = (request:NextApiRequest,response:NextApiResponse) => {
    response.statusCode = 200;
    response.setHeader("Content-Type","application/json");
    response.write(JSON.stringify({name:"Andy"}))
    response.end()
}

export default Posts