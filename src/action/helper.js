import axios from "axios"
export const request = (path, data, method) => {
  const serverPath="http://localhost:8085"
	var options = {
		method: method,
		url:`${serverPath}/${path}`,
		headers: {
			"Content-Type":"application/json",
		},
		dataType: 'json',
	};
	 let Token = localStorage.getItem("Token");
	 if(Token){
	 	options.headers["Authorization"] = Token;
	 }
	
	if(method==="GET"){
		options["params"] = data;
	}
	else{
		options["data"] = data;
	}

    let res = axios(options);
    res.then(res1=>{
            // console.log(res1)
			})
	return res;
}

export const postRequest = async(path, data) =>await request(path, data, "POST")
export const putRequest = async(path, data) =>await request(path, data, "PUT")
export const getRequest = async(path, data) =>await request(path, data, "GET")
export const deleteRequest = async(path, data) =>await request(path, data, "DELETE")
