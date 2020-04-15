import imageService from './services/apiService';
// import spinner from './spinner';
import 'basiclightbox/dist/basicLightbox.min.css'
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import makeGridItems from './makeGridItems';

// PROBLEM WITH IMPORT
const basicLightbox = require('basiclightbox');

const refs = {
    searchForm: document.querySelector('#search-form'),
    imageList: document.querySelector('#gallery'),
    loadMore: document.querySelector('button[data-action="load-more"]'),
    grid: document.querySelector('.grid'),
    stats: document.querySelector('.stats'),
}

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.loadMore.addEventListener('click', loadMoreBtnHandler);


let currentHeight = 0;

// LOAD MORE

function loadMoreBtnHandler() {
    // spinner.show()
    imageService.fetchImages().then(images => {
        // spinner.hide();
        appendedMarkUp(images);
        refs.grid.addEventListener('click', lightBoxHandle)
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
    msnry.appended(elements);
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

function load(){
    imageService.fetchImages().then(images => {
        // spinner.hide();
        appendedMarkUp(images);
    }).catch(error => {
        console.warn(error);
    });
}


const observer = new IntersectionObserver(loadMoreBtnHandler,{});
observer.observe(refs.loadMore);



function lightBoxHandle(e){
    if(e.target.nodeName !== 'UL') return;
    const src = e.target.dataset.source;
    const instance = basicLightbox.create(`
    <img width="1400" height="900" class="box-image"
    src="${src}">
	`)
    instance.show();
}