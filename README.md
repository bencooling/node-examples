# hello world

![Build status](//jenkins.bcooling.com.au/job/node-hello-world/badge/icon)

- Very simple Hello World Node app using only core Node.js modules (http, cluster etc)
- Only dependency is Tape for testing
- Useful for initial setup of CI & deployment server, benchmarking etc


## single or cluster process

- Simple

**run single process**  
`node server.js`

**run as cluster**  
`node cluster.js`


## benchmarking

**install wrk**  
`brew install wrk`

**run wrk**  
duration: 10 seconds
threads: 12
HTTP connections open 400 .
`wrk -t12 -c400 -d10s http://127.0.0.1:5000`

**run ab**  
-n: 1000 requests
-c: 20 concurrent requests
`ab -n 1000 -c 20 http://127.0.0.1:5000/`


**number of occurance in file**  
`grep -c "echo" FILE`
