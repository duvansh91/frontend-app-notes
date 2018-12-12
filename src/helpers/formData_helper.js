export function formDataEncode(body){
    let formBody = [];
        for(let property in body){
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
         formBody = formBody.join("&");
         return formBody;
}