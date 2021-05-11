// Description****
// We're going to put to good use our knowledge of fetch by creating a full client in the browser! To achieve this, you'' 
// have to set up all the interactions with the server
// Instructions ****
// -DONE- Use this template as a starting point. Make sure you download it into your laptop => https://codesandbox.io/s/instabool-template-cwhm7?file=/index.html
// -DONE- Set up your json-server using the files in the db folder; You must start the server on your local machine, 
//   using this exact command from the terminal on the root of your project folder:  json-server --watch db/db.json --routes db/routes.json 
// -DONE- Dynamically render the posts using the card HTML portion that you'll find in the index.html
// -DONE- Try to use the same CSS classes to achieve the desired look
// Tips****
// - Make some requests to your server and inspect the response, so you can check the data structure before start coding
// - Focus first on render the data onto your page
// - Try to think which kind of HTTP method you should use on each occasion
// - Try to use function scopes to your advantage

// Today's Exercise starts here
// - You can use the same repo from yesterday's exercise
// - If you haven't fully completed yesterday's part, use Nico's review from this morning as a stepping point
// - Have the like button adding 1 like to the respective counter each time you click it, and display the changes
// - Have the comments form to add another comment to the respective post, and display the changes
// - The data must be persisted in the server so that when you refresh the page it doesn't go away
function getPosts() {
  fetch("http://localhost:3000/images")//I am calling a db named "images"
    .then(function(response) {
      return response.json() //trasform json into obj js
    })
    .then(function(postsData) {  // I am giving the name to the obj received before
      console.log(postsData)
  
      renderCards(postsData)
    })
    .catch(console.error)
}

getPosts()


function renderCards(cardsData) {
  let wrapperSectionEl = document.querySelector(`.image-container`)
  
  //RENDERING ONE CARD at the time:
  for (const card of cardsData) { //cardsData refers to "images" in the db.json
    let articleEl = document.createElement(`article`) 
    articleEl.setAttribute(`class`, `image-card`)
      let titleEl = document.createElement(`h2`)
      titleEl.setAttribute(`class`, `title`)
      titleEl.innerText = card.title
      let imgEl = document.createElement(`img`)
      imgEl.setAttribute(`class`, `image`)
      imgEl.src = card.image 
      
    //likes div
    let likesDivEl = document.createElement(`div`)
    likesDivEl.setAttribute(`class`, `likes-section`)
  
      let spanEl = document.createElement(`span`)
      spanEl.setAttribute(`class`, `likes`)
      spanEl.innerText = `${card.likes} likes` 
  
      let buttonLikeEl = document.createElement(`button`)
      buttonLikeEl.setAttribute(`class`, `like-button`)
      buttonLikeEl.innerText = `♥`

      // - Have the like button adding 1 like to the respective counter each time you click it, and display the changes
      //1. add eventListener to the likeBtn -when click -> add++ to the likes
      buttonLikeEl.addEventListener(`click`, function(event) {
        event.preventDefault()
        // console.log(card.likes)

        fetch(`http://localhost:3000/images/${card.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            likes: ++card.likes
          })
        })
        .then(function() {
          spanEl.innerText = `${card.likes} likes` //recalling the span with the likes
        })
      })



    //COMMENTS Ul
    let ulEl = document.createElement(`ul`)
    ulEl.setAttribute(`class`, `comments`)
    
    //create the comment for each card (as many as there are)
    for (const comment of card.comments) {
      let liEl = document.createElement(`li`)
      liEl.innerText = comment.content
      ulEl.append(liEl)
    }
    
  // - Have the comments form to add another comment to the respective post, and display the changes
  //2.create the form - use fetch update to ADD one more comment to that post
  
  //form:
  let formEl = document.createElement(`form`)
  formEl.setAttribute(`class`, `comment-form`)

    let inputEl = document.createElement(`input`) //new Comment is here
    inputEl.setAttribute(`class`, `comment-input`)
    inputEl.setAttribute(`type`, `text`)
    inputEl.setAttribute(`name`, `comment`)
    inputEl.setAttribute(`placeholder`, `Add a comment...`)  
    
    let buttonCommentEl = document.createElement(`button`)
    buttonCommentEl.setAttribute(`class`, `comment-button`)
    buttonCommentEl.setAttribute(`type`, `submit`) //type: SUBMIT
    buttonCommentEl.innerText = "Post"
    
    //quando submit il form
    //deve  create un nuovo commento dentro l'array dei commenti nella card
    
    
    // function addComment() {
      formEl.addEventListener(`submit`, function(event) {
        console.log(inputEl)
        event.preventDefault()
        fetch(`http://localhost:3000/comments`, { //we want to fetch only this card
          method: `POST`,   //we want to create a new comment
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({  //in here put what you want the updates to be
            content: inputEl.value,
            imageId: card.id
          })//PATCH body=data I want to create in the db
        })//fetch card.id to add comment
        .then(function() {
          ulEl = document.querySelector(`ul`)
          let newliEl = document.createElement(`li`)
          newliEl.innerText = inputEl.value
          ulEl.append(newliEl)
        })
        
        formEl.reset();
      }) //buttonCommentEL.addEventListener 
    // }//function addComment

    wrapperSectionEl.append(articleEl)
    articleEl.append(titleEl, imgEl, likesDivEl, ulEl, formEl) //missing the form after the Ul
    likesDivEl.append(spanEl, buttonLikeEl)
    formEl.append(inputEl, buttonCommentEl)

  } //end of render one card of Cards (for of loop)
} //end of renderCards()


//QUESTION = il primo click dei like non lo salva, ma dal secondo in poi si.why??
//QUESTION = i commenti li crea nel server ma li visualizzi solo se aggiorni la pagina.
