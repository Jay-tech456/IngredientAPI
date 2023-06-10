



let express = require('express')
let app = express();
let bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

let ingredients = [
    
    {
        "id": "232kak", 
        "text": "Eggs"
    }, 
     {
        "id": "243Eak", 
        "text": "Milk"
    }, 
     {
        "id": "2uykak", 
        "text": "Cheese"
    }, 
     {
        "id": "232ssk", 
        "text": "Butter"
    } 
]


app.get('/ingredients', (req, res)=>{ 
    
    res.send(ingredients)
    
});

app.post('/ingredients', (req, res) => { 
    let ingredient = req.body; 
    
    if(!ingredient || ingredient.text === ""){
        res.status(500).send({error: "Your ingredient must have text"})
    } else { 
        ingredients.push(ingredient)
        res.status(200).send(ingredients)
    }
});




app.put('/ingredients/:ingredientId', (req, res)=> {
    let newText = req.body.text
    
    if( (!newText || newText === "")) {
        res.status(500).send({error: "You must provide ingredient text"})
    } else { 
        
   
        let ObjectFound = false;
        for(let count = 0; count < ingredients.length; count++){

            let ing = ingredients[count]
            if(ing.id === req.params.ingredientId){
                ingredients[count].text = newText
                ObjectFound = true;
                break
            }
        }
        
        if(!ObjectFound){ 
            res.status(500).send({error: "the ingredient is not found within the list"})
        } else{
            res.send(ingredients)
        }
    }

}); 

app.delete('/ingredients/:ingredientId', (req, res) => { 
    let newText = req.body.text
    
    if(!newText || newText === ""){ 
        res.status(500).send({error: "You must provide ingredient"})        
    } else { 
    
        let ObjectFound = false; 
        
        for(let count = 0; count < ingredients.length; count++){ 
            let temp = ingredients[count]
            
            if(req.params.ingredientId=== temp.id){ 
                ingredients.splice(count, 1)
                ObjectFound = true
                break
            }
        }
         if(!ObjectFound){ 
            res.status(500).send({error: "the ingredient is not found within the list"})
        } else{
            res.send(ingredients)
        }
    }
    
    
})


app.listen(3000, () => { 

    console.log("Server is running on port 3000"); 
})

