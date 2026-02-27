const Api_KEY = `1762ea44d88e4718ba27607148b2bced`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");
const sideMenus = document.querySelectorAll(".side-menu-list button");


menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event)),
);

sideMenus.forEach((sideMenus) =>
  sideMenus.addEventListener("click", (event) => getNewsByCategory(event)),
);

let url = new URL(
  `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`,
);


const fetchNews = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if(response.status===200){
      if(data.articles.length===0){
        throw new Error("No result for this search");
      }
      newsList=data.articles;
      render();
    }else{
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`,
  );
  fetchNews(url);
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase(); // 어떤 버튼 눌렀는지 설정(소문자로)
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`,
  );
  fetchNews(url);
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`,
  );
  fetchNews(url);
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
                <div class="col-lg-4">
                     <img class="news-img-size"
                src="${
                  news.urlToImage ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                }" />

                </div>
                <div class="col-lg-8">
                    <h2>${news.title}</h2>

                     <p>${
                       news.description == null || news.description == ""
                         ? "내용없음"
                         : news.description.length > 200
                           ? news.description.substring(0, 200) + "..."
                           : news.description
                     }
                    </p>

                    <div>${news.source.name || "no source"}  ${moment(
                      news.publishedAt,
                    ).fromNow()}
                    </div>
                </div>
            </div>`,
    )
    .join(``);
  console.log("html", newsHTML);
  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML =`<div class="alert alert-danger" role="alert">
    ${errorMessage}
    </div>`;

    document.getElementById("news-board").innerHTML=errorHTML;
}

getLatestNews();

//*사이드리스트
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};
