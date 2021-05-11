// Description
// We're going to put to good use our knowledge of fetch by creating a full client in the browser! To achieve this, you'' 
// have to set up all the interactions with the server

// Instructions
// - Use this template as a starting point. Make sure you download it into your laptop => https://codesandbox.io/s/instabool-template-cwhm7?file=/index.html
// - Set up your json-server using the files in the db folder; You must start the server on your local machine, 
//   using this exact command from the terminal on the root of your project folder:  json-server --watch db/db.json --routes db/routes.json 

// - Dynamically render the posts using the card HTML portion that you'll find in the index.html
// - Try to use the same CSS classes to achieve the desired look


// Tips
// - Make some requests to your server and inspect the response, so you can check the data structure before start coding
// - Focus first on render the data onto your page
// - Try to think which kind of HTTP method you should use on each occasion
// - Try to use function scopes to your advantage

fetch("http://localhost:3000/images")//I am calling a db named "images"
  .then(function(response) {
    return response.json() //trasform json into obj js
  })
  .then(function(postsData) {  // I am giving the name to the obj received before
    console.log(postsData)

    renderCards(postsData)
  })
  .catch(console.error)


function renderCards(cardsData) {
  let wrapperSectionEl = document.querySelector(`.image-container`)
  
  //rendering ONE card at the time:
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

    //comment Ul
    let ulEl = document.createElement(`ul`)
    ulEl.setAttribute(`class`, `comments`)
    
    //create the comment for each card (as many as there are)
    for (const comment of card.comments) {
      let liEl = document.createElement(`li`)
      liEl.innerText = comment.content
        ulEl.append(liEl)
    }

    
    wrapperSectionEl.append(articleEl)
    articleEl.append(titleEl, imgEl, likesDivEl, ulEl) //missing the form after the Ul
    likesDivEl.append(spanEl, buttonLikeEl)

  }
}
  


//   //form
//   let formEL = document.createElement(`form`)
//   formEL.setAttribute(`class`, `comment-form`)

//     let inputEL = document.createElement(`input`)
//     inputEL.setAttribute(`class`, `comment-input`)
//     inputEL.setAttribute(`type`, `text`)
//     inputEL.setAttribute(`name`, `comment`)
//     inputEL.setAttribute(`placeholder`, `Add a comment...`)

//     let buttonCommentEL = document.createElement(`button`)
//     buttonCommentE.setAttribute(`class`, `comment-button`)
//     buttonCommentE.setAttribute(`type`, `submit`)


