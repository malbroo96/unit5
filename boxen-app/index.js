const boxen=require("boxen");



const message ="i am using my first external module!";
const title ="hurray!!!!!";





const classicbox=boxen(message,{title,padding:1,margin:1});
console.log(classicbox);




const singledoublebox=boxen(message,{
    title,
    padding:1,
    margin:2,
    borderStyle:"singleDouble"
});
console.log(singledoublebox);








const roundbox=boxen(message,{
    title,
    padding:1,
    margin:3,
    borderStyle:"round"
})
console.log(roundbox)








const colorfulBox = boxen(message, { 
  title, 
  padding: 1, 
  margin: 4, 
  borderStyle: "round", 
  backgroundColor: "cyan", 
  titleAlignment: "center" 
});
console.log(colorfulBox);
