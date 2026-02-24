const Api_KEY=`1762ea44d88e4718ba27607148b2bced`;
let news = []
const getLatesNews = async () => {
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${Api_KEY}`);
    const response = await fetch(url);
    const data = await response.json();
    news= data.articles;
    console.log("news",news);
};

getLatesNews();
