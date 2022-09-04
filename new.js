document.getElementById('home-button').addEventListener('click', () => {
    document.getElementById('blog-post').classList.remove('d-block');
    document.getElementById('blog-post').classList.add('d-none');
    document.getElementById('news-card').classList.remove('d-none');
    document.getElementById('news-card').classList.add('d-block');
});
document.getElementById('blog-button').addEventListener('click', () => {
    document.getElementById('news-card').classList.remove('d-block');
    document.getElementById('news-card').classList.add('d-none');
    document.getElementById('blog-post').classList.remove('d-none');
    document.getElementById('blog-post').classList.add('d-block');
});
const category = () => {
    toggleLoader(true);
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then((res) => res.json())
        .then((data) => newsCategory(data.data.news_category));
    toggleLoader(false);
};

const newsCategory = (news) => {
    const categoryNavLink = document.getElementById('nav');
    //   console.log(news);
    news.forEach((newslink) => {
        console.log(newslink);
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `
      <a class="nav-link text-muted fw-bold" href="#" onclick='(newsThumbel(${newslink.category_id}))'>${newslink.category_name}</a>
      `;
        categoryNavLink.appendChild(li);
    });
};

const newsThumbel = (category_id) => {
    console.log(category_id);
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
    console.log(url);
    fetch(url)
        .then((res) => res.json())
        .then((newsInfo) => newsCategoryThumbel(newsInfo.data));
};

const newsCategoryThumbel = (info) => {
    console.log(info);
    const newsCard = document.getElementById('news-card');
    const displayDataLength = document.getElementById('data-value');
    if (info.length) {
        displayDataLength.innerText = ` ${info.length} item found`;
    } else {
        displayDataLength.innerText = ` No item found`;
    }
    newsCard.textContent = '';

    info.forEach((cardInfo) => {
        console.log(cardInfo);
        const newsCardDiv = document.createElement('div');
        newsCardDiv.classList.add('card');
        newsCardDiv.innerHTML = `
                <div class="row g-0 p-3 ">
                            <div class="col-md-4">
                              <img
                                style="width: 200px; height: 250px"
                                src="${cardInfo.thumbnail_url}"
                                class="rounded-start"
                                alt="..."
                              />
                            </div>
                            <div class="col-md-8">
                              <div class="card-body">
                                <h5 class="card-title fw-bold">${cardInfo.title
            }</h5>
                                <p class="card-text">
                                 ${cardInfo.details.slice(0, 400) + ' ...'}
                                </p>
                                <div class="d-flex justify-content-between align-items-center">
                      <div class="d-flex">
                        <div>
                          <img
                            class="rounded-circle me-2"
                            style="width: 50px; height: 50px"
                            src="${cardInfo.author.img}"
                            alt=""
                          />
                        </div>
                        <div class="card-text">
                          <small class="text-muted"
                            >${cardInfo.author.name
                ? cardInfo.author.name
                : 'No author'
            }</small
                          >
                          <br />
                          <small class="text-muted"
                            >${cardInfo.author.published_date
                ? cardInfo.author.published_date
                : 'No Date'
            }</small
                          >
                        </div>
                      </div>
                      <div><h6 class='text-muted fw-bold'>View: ${cardInfo.total_view ? cardInfo.total_view : 'No View'
            }</h3></div>
                    </div>
                    <div class='mt-3'><button onclick="loadNews('${cardInfo._id
            }')" class="btn btn-primary" data-bs-toggle="modal"
                      data-bs-target="#phoneDetailModal">Show Details</button></div>
                              </div>
                            </div>
                          </div>
                `;
        newsCard.appendChild(newsCardDiv);
    });
    toggleLoader(false);
};

// toggle option

const toggleLoader = (isLoading) => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
};

const loadNews = (id) => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    console.log(url);
    fetch(url)
        .then((res) => res.json())
        .then((data) => loadNewsDetails(data.data[0]));
    toggleLoader(false);
};

const loadNewsDetails = (cardInfo) => {
    console.log(cardInfo);
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = cardInfo.title;

    const newsDetails = document.getElementById('news-modal-details');
    newsDetails.innerHTML = `
      <p> Detail news: ${cardInfo.details} </p>
    
      <p> Author Name: ${cardInfo.author ? cardInfo.author.name : 'No author'
        } </p>
      
      
      `;
};

category();