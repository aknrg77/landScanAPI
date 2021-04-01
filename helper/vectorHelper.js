const classIdNames = 
[
    {
    "classId":1,
    "className":"House"
    },
    {
    "classId":2,
    "className":"Mall"
    },
    {
    "classId":3,
    "className":"Car Parking"
    },
    {
    "classId":4,
    "className":"Swimming Pool"
    },
    {
    "classId":5,
    "className":"Kesa"
    },
]


const classIdFilter = (classId) =>{
    let [a] = classIdNames.filter((x)=>{
    if(x.classId == classId){
        return x;
    }
    });

    if(a){
        return a.className;
    }else{
        return "House";
    }
  
}


module.exports = {
    classIdFilter
}