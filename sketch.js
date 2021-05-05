var dog, happyDog,dog1, database, foodS, foodStock;
var FoodObj,FedTime,lastFed,feed,addFood;

function preload()
{
  happyDog = loadImage("images/dogImg.png")
 dog1= loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,300,150,150)
  dog.addImage(happyDog);
    dog.scale=0.15;
  foodStock=database.ref('food');
  foodStock.on("value",readStock)
  FoodObj = new Food();
  feed = createButton("Fed the Dog!!!!!!!!!!!");
  feed.position(700,95);
  feed.mousedPressed(feedDog)
  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousedPressed(addFoods)
  
}


function draw() { 
  background(46, 139, 87); 
  FoodObj.display();
  
 FedTime=database.ref('FeedTime');
FedTime.on("value",function(data){
  lastFed=data.val();
});
fill(255,255,254);
 textSize(15);
  if(lastFed>=12){ 
    text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
  }
    else if(lastFed==0){
       text("Last Feed : 12 AM",350,30);
   }
   else{
      text("Last Feed : "+ lastFed + " AM", 350,30);
     }
      drawSprites(); 
    } 
    function readStock(data){
       foodS=data.val();
        FoodObj.updateFoodStock(foodS);
       }
 
  function feedDog(){ 
    dog.addImage(happyDog); 
    FoodObj.updateFoodStock(FoodObj.getFoodStock()-1);
     database.ref('/').update({
        Food:FoodObj.getFoodStock(), 
        FedTime:hour()
       })
     } 
     function addFoods(){
        foodS++; 
        database.ref('/').update({
           Food:foodS 
          })
         }
