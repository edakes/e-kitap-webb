let bookList=[] , basketList = [];

const getBookS =() => {
    fetch("./products.json").then(res => res.json()).then((books) => (bookList = books));
}
getBookS();

const createBookStars = (starRate) => {
    let starRateHtml = "";
    for(let i =1;i<=5;i++){
        if(Math.round(starRate) >= i) starRateHtml+= `<i class="bi bi-star-fill active"></i>`;
        else starRateHtml += `<i class="bi bi-star-fill"></i>`;
    }
    return starRateHtml;
};
 

const createBookItemsHtml = () => {
    const bookListEl = document.querySelector(".book__list");
    let bookListHtml = "";
  
    bookList.forEach((book, index) => {
      bookListHtml += `
        <div class="col-5 ${index % 2 === 0 &&"offset-2" } my-5">
          <div class="row book__card">
            <div class="col-6">
              <img class="img-fluid shadow" src="${book.imgSource}" alt="${book.name}" width="100%">
            </div>
            <div class="col-6 d-flex justify-content-between flex-column">
              <div class="book__detail">
                <span class="fos gray fs-5">${book.author}</span><br>
                <span class="fs-4 fw-bold">${book.name}</span><br>
                <span class="book__star-rate">
                  ${createBookStars(book.starRate)}  </span><br>
                <span class="gray">${book.reviewCount} reviews</span>
              </div>
              <p class="book__description fos gray">${book.description}</p>
              <div>
                <span class="price fw-bold fs-4">${book.price}₺</span>
                ${book.oldPrice ? `<span class="black fs-5 fw-bold old__price">${book.oldPrice}₺</span>` : "" }  </div>
              <button class="btn__purple" onclick="addBookToBasket(${book.id})">Sepete Ekle</button>
            </div>
          </div>
        </div>
      `;
    });
  
    bookListEl.innerHTML = bookListHtml;
  };

const BOOK_TYPES ={
    ALL: "Tümü",
    NOVEL: "Roman",
    CHILDREN: "Çocuk",
    SELFIMPROVEMENT: "Kişisel Gelişim",
    HISTORY: "Tarih",
    FINANCE: "Finans",
    SCIENCE: "Bilim",

};


  const createBookTypeHtml = () =>{
    const filterEl = document.querySelector(".filter");
    let filterHtml="";
    let filterTypes = ["ALL"];
    bookList.forEach(book => {
        if(filterTypes.findIndex(filter => filter == book.type) == -1) filterTypes.push(book.type);
    });

    filterTypes.forEach((type , index ) => {
        filterHtml+=`<li class="${index == 0 ? "active": null }" onclick ="filterBooks(this)" data-type="${type}">${BOOK_TYPES[type] ||type }</li>`;
    });

    filterEl.innerHTML =filterHtml;

};


let basketIndex = 0;
const addBookToBasket = (bookId) => {
     
      let findedBook = bookList.find((book) => book.id == bookId);
      if(findedBook){
        const basketAlreadyIndex = basketIndex.findIndex((basket) => basket.product.id == bookId);
        if(basketAlreadyIndex== -1){ 

        let addedItem =  {quantity : 1, product: findedBook };
        basketList.push();
      }else{
        basketList[basketAlreadyIndex].quantity+=1;
      }
       
      // console.log(basketList);
    }
      
};

const filterBooks= (filterEl) =>{
    document.querySelector(".filter .active").classList.remove("active");
    filterEl.classList.add("active");
    let bookType= filterEl.dataset.type;
    getBookS();
    if(bookType !="ALL") 
         bookList = bookList.filter(book => book.type == bookType);
    createBookItemsHtml();
};

  setTimeout(() => {
    createBookItemsHtml();
    createBookTypeHtml();
  }, 100);



   