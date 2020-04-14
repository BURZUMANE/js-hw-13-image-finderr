import imageService from './services/apiService';
// import spinner from './spinner';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import makeGridItems from './makeGridItems';
import InfiniteScroll from 'infinite-scroll';

const refs = {
    searchForm: document.querySelector('#search-form'),
    imageList: document.querySelector('#gallery'),
    loadMore: document.querySelector('button[data-action="load-more"]'),
    grid: document.querySelector('.grid'),
}

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.loadMore.addEventListener('click', loadMoreBtnHandler);


let currentHeight = 0;

// LOAD MORE

function loadMoreBtnHandler(e) {
    // spinner.show()
    imageService.fetchImages().then(images => {
        // spinner.hide();
        appendedMarkUp(images);
    }).catch(error => {
        console.warn(error);
    });
}

function searchFormSubmitHandler(e) {
    e.preventDefault();
    // spinner.show();
    let inputValue = e.currentTarget.elements.query.value;
    imageService.resetPage();
    imageService.searchQuery = inputValue;
    e.currentTarget.elements.query.value = '';
    clearListItems();
    imageService.fetchImages().then(images => {
            appendedMarkUp(images);

        })
        .catch(error => {
            console.warn(error);
        })
};

// APPEND 

function appendedMarkUp(arr) {
    const elements = []
    arr.forEach((arr) => {
        const item = makeGridItems(arr)
        elements.push(item);

    });
    refs.grid.append(...elements);
    const imgLoad = imagesLoaded('.grid');
    console.log(msnry)
    msnry.appended(elements);
    console.log(msnry)
    imgLoad.on('progress', msnry.layout.bind(msnry));
}

// REMOVE

function clearListItems() {
    const elements = document.querySelectorAll('.grid-item');
    msnry.remove(elements);
    msnry.layout();

}


// MASONRY
const msnry = new Masonry('.grid', {

    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    percentPosition: true,
    transitionDuration: '0.2s'
});

// element

const imgLoad = imagesLoaded('.grid');

imgLoad.once('progress', () => {
    msnry.layout();
});


var elem = document.querySelector('.container');
var infScroll = new InfiniteScroll(elem, {
    // options
    path() {
        return imageService.loader()
    },
    append: '.post123',
    history: false,
});

// infScroll.on( 'load', function( response ) {
//     // parse response into JSON data
//     var data = JSON.parse( response );
//     // compile data into HTML
//     var itemsHTML = data.map( getItemHTML ).join('');
//     // convert HTML string into elements
//     proxyElem.innerHTML = itemsHTML;
//     // append item elements
//     var items = proxyElem.querySelectorAll('.photo-item');
//     imagesLoaded( items, function() {
//       infScroll.appendItems( items );
//       msnry.appended( items );
//     });
//   });
  