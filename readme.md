# Creds

email: soooyc@gmail.com
password: admin89Q!


# File upload through postman 

operations: {"query":"mutation UploadFile($file: Upload!) {  uploadFile(file: $file){  message file { path }  }}"}
map: {"0": ["variables.file"]}
0: <FILE>