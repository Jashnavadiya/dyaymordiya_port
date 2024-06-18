let hi=sessionStorage.getItem('isLoginnnn')||false

if(!hi){
    window.location.href="./login.html"
}


window.onload = async () => {
    try {
        const response = await fetch('https://dyaymordiya.onrender.com/get-images'); // Assuming your backend is on the same domain
        const imageUrls = await response.json();

        // Use the imageUrls to display the images on your webpage

        // Example:
        const imageContainer = document.querySelector('.main-show-area');

        imageUrls.forEach(imageUrl => {
            let image = document.createElement('span');
            image.innerHTML = `<div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
            <div class="portfolio-info">
            <h4>Title: ${imageUrl.title}</h4>
            <p>Description: ${imageUrl.desc}</p>
            <img src="${imageUrl.url}" class="img-fluid " style="width:200px;" alt="">
                  <a href="assets/img/portfolio/app-1.jpg" title="App 1" data-gallery="portfolio-gallery-app"
                    class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                  <a href="portfolio-details.html" title="More Details" class="details-link"><i
                      class="bi bi-link-45deg"></i></a>
                </div>
              </div>`;
            let del_btn = document.createElement('button');
            del_btn.innerHTML = "Delete"
            imageContainer.append(image, del_btn);
            del_btn.addEventListener('click', async() => {

               
                const url = imageUrl.url
                

                try {
                    const response = await fetch('https://dyaymordiya.onrender.com/delete-img-link', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({url})
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const result = await response.json();
                    console.log('Delete Success:', result);


                } catch (error) {
                    console.error('Error:', error);
                }
            })
        });
    } catch (err) {
        console.error(err);
        // Handle errors gracefully (e.g., display an error message)
    }
};