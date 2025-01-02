//load category button

const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch((error) => console.log(error))
}


   //Disply category loadCatagoriesVideos(${data.category_id})
   
const displayCategories=(data)=>{
    data.forEach(data=>{
       const buttonContainer=document.createElement('div')
       
       buttonContainer.innerHTML=`
       <button id="btn-${data.category}" onclick="categories('${data.category}')" flex justify-between items-center class="w-[200px] h-[60px] border border-solid border-[#64A7AB] rounded-lg font-bold text-lg text-black btn btn-s"> <img class="w-8" src="${data.category_icon}" alt=""> ${data.category}</button>
       `
        const cata=document.getElementById('category')
        cata.appendChild(buttonContainer)
     }) 
 }
//function for remove active from category button
const removeActive=()=>{
   const allButton=document.getElementsByClassName('btn-s')
    for(const button of allButton){
        button.classList.remove('active')
    }
  }
 //load pets by catagory


 const categories = (name) => {
   const spiner = document.getElementById('spiner');
   const petsContainer = document.getElementById('pets');
   const fotter=document.getElementById('footer')
   // Hide all cards
   petsContainer.innerHTML = '';
    fotter.classList.add('hidden');
   
   // Show the spinner
   spiner.classList.remove('hidden');
 
   setTimeout(() => {
     fetch(`https://openapi.programming-hero.com/api/peddy/category/${name}`)
       .then(res => res.json())
       .then(category => {
         
         {
          removeActive();
          displayPets(category.data);

          const activeBtn = document.getElementById(`btn-${name}`);
          activeBtn.classList.add('active');} 
        
         // Hide the spinner
         spiner.classList.add('hidden');
         fotter.classList.remove('hidden');
       })
       .catch((error) => {
         console.log(error);
         // Hide the spinner
         spiner.classList.add('hidden');
         fotter.classList.remove('hidden');
       });
   }, 2000);
 };
 //sort

 const sort=()=>{
    
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data =>displayPets(data.pets.sort((a, b) => b.price - a.price)))
    .catch((error) => console.log(error))

   

 }
 const sortCategories=()=>{
    
    fetch('https://openapi.programming-hero.com/api/peddy/category/cat')
    .then(res => res.json())
    .then(data =>displayPets(data.category.sort((a, b) => a.price - b.price)))
    .catch((error) => console.log(error))

   

 }

//load all pets

const loadAllPets = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => displayPets(data.pets))
    .catch((error) => console.log(error))
   
   }

   //Display all pets grid grid-cols-3 gap-4 col-span-3
   const displayPets=(data)=>{
   
    const sectionPets=document.getElementById('pets')
    sectionPets.innerHTML=""
    if(data.length===0){
        
        
        sectionPets.innerHTML=`
        <div class=" bg-base-200 flex flex-col items-center ml-[200px] w-[600px] h-[400px] border border-solid-2 rounded-xl border-base-300 ">
        <div>
         <img src="./assets/error.webp">
        </div>
        <div class="text-center p-4">
        <h1>No Information Available</h1>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking <br> at its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
        </div>
        `
        return
    }
   
    data.forEach(data=>{
        const petContainer=document.createElement('div')
        
       petContainer.classList="card border border-solid border-base-200 rounded-xl px-[15px] py-[17px]"
       petContainer.innerHTML=` 
      
     <figure class="mb-[20px]">
    <img class="w-[250px] h-[140px] rounded-xl object-cover"
      src="${data.image}"
      alt="image will update soon" />
  </figure>
  <div class=" border-b-2 border-base-200 mb-6 pl-2 ">
    <h2 class="text-xl text-bold">${data.pet_name}</h2>
    <div class="flex gap-2 mb-2">
    <img class="w-5 object-cover" src="https://img.icons8.com/?size=80&id=6C93MhII3kih&format=png">
    
     ${
        "breed" in data ? `<p>Breed:${data.breed}</p>`  : `<p>Breed: Not Available</p>`


      }
    </div>
    <div class="flex gap-2 mb-2">
    <img class="w-5 object-cover" src="https://img.icons8.com/?size=80&id=8yG2a6v2mm3S&format=png">
       ${ 
        data.date_of_birth==null?`<p>Birth:Not Available</p>`   :`<p>Birth:${data.date_of_birth}</p>`
       }
    </div>
    <div class="flex gap-2 mb-2">
    <img class="w-5 " src="https://img.icons8.com/?size=50&id=11780&format=png">
    
      ${
        "gender" in data ? `<p>Gender: ${data.gender}</p>`  : `<p>Gender: Not Available</p>`


      }
    </div>
    <div class="flex gap-2 mb-2">
    <img class="w-5" src="https://img.icons8.com/?size=32&id=15919&format=png">
    ${
     data.price==null?`<p>Price:Not Available</p>`  :`<p>Price:${data.price}</p>`
    }
     <img class="w-4" src="https://img.icons8.com/?size=32&id=15919&format=png">
    </div>
    </div>
    <div id="dtl-container" class=" flex justify-between items-center">
      <button onclick="likedPets(${data.petId})" class="btn"><img class="h-6" src="https://img.icons8.com/?size=24&id=u8MTpAq972MG&format=png"></button>
      <button onclick="adopt()" class="h-[40px] w-[90px] border border-solid border-[#64A7AB] rounded-lg font-bold text-lg text-[#0E7A81]">Adopt</button>
     
<button class="h-[40px] w-[90px] border border-solid border-[#64A7AB] rounded-lg font-bold text-lg text-[#0E7A81]" onclick="dtailsPets(${data.petId})">Details</button>

    </div>
  
    
       `
        sectionPets.appendChild(petContainer)   
    })
    }    
// fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
//.then(res => res.json())
//.then(data => displayLikedPets(data.petData))
//.catch((error) => console.log(error))

    //aside liked pets part
    const likedPets=(id)=>{
        fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => displayLikedPets(data.petData))
        .catch((error) => console.log(error))
       
    }
   
    const displayLikedPets=(data)=>{
        const sectionliked=document.getElementById('liked')
        
            const likedContainer=document.createElement('div')
            likedContainer.classList="bg-gray-200 p-2 w-[50%]"
            likedContainer.innerHTML=`
            <img class="" src="${data.image}"/>
            `
            sectionliked.appendChild(likedContainer)
        
    }


    const dtailsPets=(id)=>{
        fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => displayDtailsPets(data.petData))
        .catch((error) => console.log(error))
       
    }

    //<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
   
    const displayDtailsPets=(data)=>{
        console.log(data)
        
        const dtailsContainer=document.getElementById('modal-content')
        const showModal=document.getElementById('showModal')
        
        showModal.click()
        dtailsContainer.innerHTML=`
        <div class="w-full">
        <img class="w-[600px] h-[300px] object-cover" src="${data.image}">
        </div>
  <div class="flex flex-col row-gap-4 border-b-2 border-base-200 mb-6 pl-2 ">
    <h2 class="text-xl text-bold mb-2">${data.pet_name}</h2>
    <div class="flex gap-2 mb-2">
    <img class="w-5 object-cover" src="https://img.icons8.com/?size=80&id=6C93MhII3kih&format=png">
    
     ${
        "breed" in data ? `<p>Breed:${data.breed}</p>`  : `<p>Breed: Not Available</p>`


      }
    </div>
    <div class="flex gap-2 mb-2">
    <img class="w-5 object-cover" src="https://img.icons8.com/?size=80&id=8yG2a6v2mm3S&format=png">
       ${ 
        data.date_of_birth==null?`<p>Birth:Not Available</p>`   :`<p>Birth:${data.date_of_birth}</p>`
       }
    </div>
    <div class="flex gap-2 mb-2">
    <img class="w-5 " src="https://img.icons8.com/?size=50&id=11780&format=png">
    
      ${
        "gender" in data ? `<p>Gender: ${data.gender}</p>`  : `<p>Gender: Not Available</p>`


      }
    </div>
    <div class="flex gap-2 mb-2">
    <img class="w-5" src="https://img.icons8.com/?size=32&id=15919&format=png">
    ${
     data.price==null?`<p>Price:Not Available</p>`  :`<p>Price:${data.price}</p>`
    }
     <img class="w-4" src="https://img.icons8.com/?size=32&id=15919&format=png">
    </div>
    </div>
        
        `
        
    }

    const adopt=()=>{
       
        
        const dtailsContainer=document.getElementById('modal-content2')
        const showModal2=document.getElementById('showModal2')
       
        showModal2.click()
        dtailsContainer.innerHTML=`
        <div class="text-center">
        <h1 class="text-5xl font-bold text-black mb-4">Congratulations!</h1>
        <p>You Adopt this cute pet</p>
  
        </div>
        `
       
}

    
    
   



loadCategory();
loadAllPets();
