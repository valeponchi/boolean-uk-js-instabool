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
  .then(function(data) {  // I am giving the name to the obj received before
    console.log(data)

    renderCards(data)
  })
  .catch(console.error)




function renderCards(cards) {
  let wrapperSectionEl = document.querySelector(`.image-container`)

  for (const card of cards) { //cards (in this exercise) are the "images" in the db.json
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
      spanEl.innerText = card.likes 
  
      let buttonLikeEl = document.createElement(`button`)
      buttonLikeEl.setAttribute(`class`, `like-button`)
      buttonLikeEl.innerText = `♥`

      //comment Ul
    let ulEl = document.createElement(`ul`)
    ulEl.setAttribute(`class`, `comments`)

    // let liEl1 = document.createElement(`li`)
    // liEl1.innerText = card.comments[0].content
    // let liEl2 = document.createElement(`li`)
    // liEl2.innerText = card.comments[1].content
    // let liEl3 = document.createElement(`li`)
    // liEl3.innerText = card.comments[2].content    

    // let liEl3 = document.createElement(`li`)
    
    wrapperSectionEl.append(articleEl)
    articleEl.append(titleEl, imgEl, likesDivEl, ulEl) //missing the form after the Ul
    likesDivEl.append(spanEl, buttonLikeEl)
    // ulEl.append(liEl1, liEl2, liEl3)

//ANOTHER WAY I WAS TRU+YING TO DO FOR THE COMMENTS:
    // for (const comment of card.comments) {
      // if (card.comments.imageId === card.id) {
        // let liEl = document.createElement(`li`)
        // liEl.innerText = card.comments.content
        // ulEl.append(liEl)
      // }
    // }


    // for (const comment of cards.comments) {
    //   let commentLiEl = document.createElement(`li`)
    //   commentLiEl.innerText = comment.content
    // }
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


