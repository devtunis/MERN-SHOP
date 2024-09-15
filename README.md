<pre>  
 
let casquette1 = 0 
let Sac = 0 
let Lunette  =  0 
arr.forEach(item => {

  item.titleProduct.includes("Casquette") && casquette1++
  item.titleProduct.includes("Sac") && Sac++
  item.titleProduct.includes("Lunette") && Lunette++
});
console.log("this how many casquette in my web site",casquette1)
console.log("this how many Sac in my web site",Sac)
console.log("this how many Lunette in my web site",Lunette)
 
 </pre>
