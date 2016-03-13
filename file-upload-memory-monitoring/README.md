# file upload testing and memory monitoring

413 Payload Too Large (RFC 7231)
The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".[47]

Payload

The payload option controls how incoming payloads (request body) are processed. Payload options:  

maxBytes - limits the size of incoming payloads to the specified bytes count. Allowing very large payloads may cause the server to run out of memory. Defaults to 1MB.

Test memory usage
`curl -F "file=@<large_file>" http://localhost:3000/upload`

// curl -F "file=@/Users/bencooling/Downloads/micky_mouse.jpg" http://localhost:3000/upload

// curl -F "file=@/Users/bencooling/Downloads/windows-7-professional.iso" http://localhost:3000/upload

TODO
- bytes module
-
