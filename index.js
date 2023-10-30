const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]

const postsFeedEl = document.getElementById("posts-feed")

function renderPosts() {
    
    for (let i = 0; i < posts.length; i++) {
        const post = document.createElement("li")
        console.log(posts[i])


       post.innerHTML = `
            <section>
            <div class="artist-info container">
                    <img class="avatar-image" src="${posts[i].avatar}">
                    <div class="name-and-location-container">
                        <h1>${posts[i].name}</h1>
                        <h2>${posts[i].location}</h2>
                    </div>
            </div>
            </section>
            
            <section class="post-content">
                    <div class="container">
            <img class="post-image" id="post-el" data-key="${posts[i].username}" src="${posts[i].post}">
                    </div>
            </section>

            <section class="icons-section">
                    <div class="container">
                        <img class="icon" id="like-icon" data-key="${posts[i].username}" src="images/icon-heart.png" alt="Like icon">
                        <img class="icon" src="images/icon-comment.png" alt="Comment icon">
                        <img class="icon" src="images/icon-dm.png" alt="Dm icon">
                        <h3> <span id="likes-number">${posts[i].likes}</span> likes</h3>
                    </div>
                </section>


            <section class="comments-section">
                <div class="container">
                    <p><span class="user-name">${posts[i].username}</span> ${posts[i].comment}</p>
                </div>
            </section>
        `

        postsFeedEl.append(post)


         // Check if this item was previously liked by the user
         if (localStorage.getItem(`liked-${posts[i].username}`)) {
            // Indicate it's already liked
            post.querySelector("#post-el").setAttribute("data-liked", "true")
            post.querySelector("#like-icon").setAttribute("data-liked", "true")
        }

            function handleLikeClick(e) {
                let btn = e.target
                toggleLikeForElement(btn)
            }

            function handlePostDoubleClick(e) {
                let postEl = e.target
                let iconEl = postEl.closest("li").querySelector("#like-icon")
                toggleLikeForElement(iconEl)
            }

            function toggleLikeForElement(btn) {
                let itemKey = btn.dataset.key
                let countEl = btn.closest("li").querySelector("#likes-number")
                let number = Number(countEl.textContent)

                let postEl = btn.closest("li").querySelector("#post-el")
                let iconEl = btn.closest("li").querySelector("#like-icon")

                // Check if the post is already liked
            if (btn.getAttribute("data-liked") === "true") {
                //Unlike the post
                number -= 1 // Decrement like count
                localStorage.removeItem(`liked-${itemKey}`) // Remove from local storage
                postEl.removeAttribute("data-liked") // Mark as unliked
                iconEl.removeAttribute("data-liked") // Mark as unliked
            } else {
                // Like the post
                number +=1 // Increment like count
                localStorage.setItem(`liked-${itemKey}`, true) // Save to local storage
                postEl.setAttribute("data-liked", "true") // Mark as liked
                iconEl.setAttribute("data-liked", "true") // Mark as liked
            }

                countEl.textContent = number // Update what is rendered (display)


            }


            // Attach the event listeners

            postsFeedEl.addEventListener("click", function(e) {
                if (e.target.matches("#like-icon")) {
                    handleLikeClick(e)
                }
            })

            postsFeedEl.addEventListener("dblclick", function(e) {
                if (e.target.matches("#post-el")) {
                    handlePostDoubleClick(e)
                }
            })
            



          }

    }

renderPosts()
