# memory-leak

## examples


### object creation

**Run memory leak**  
`node --expose-gc memory-leak/index.js`

**with node-inspector**  
```
node-inspector
node --debug --expose-gc memory-leak/index.js
```


### array of buffers with top

`node top.js`

`top` and then type `o` followed by `mem`
