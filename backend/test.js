const group = (collection, grouper) =>{
  
    let obj = {};
    collection.forEach((element) => {
        let x= grouper(element);
         (Array.isArray(obj[x])) ?  obj[x].push(element)
         : obj[x]=[element];
    });
    console.log(obj);
}
  
  group([6.5, 4.2, 6.3], Math.floor);