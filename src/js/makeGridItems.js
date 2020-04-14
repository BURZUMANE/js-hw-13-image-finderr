import imageListTemplate from '../templates/image-list.hbs';

const makeGridItem = (obj) => {
    const container = document.createElement('div');
    container.classList.add('grid-item');
    container.innerHTML = imageListTemplate(obj)

    return container;
}

export default makeGridItem;    