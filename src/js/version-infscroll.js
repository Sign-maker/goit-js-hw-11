import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import { PixabayAPI } from './modules/pixabay-api';
import { Button } from './modules/load-more-btn';
import { Loader } from './modules/loader';
import { goTopBtnHandler } from './modules/go-top-btn';

const formRef = document.querySelector('#search-form');
const searchLoaderRef = document.querySelector('.search-loader');
const renderRef = document.querySelector('.gallery');
const targetRef = document.querySelector('.target');

Notiflix.Notify.init({
  fontSize: '16px',
  timeout: 5000,
});

const pixabayApi = new PixabayAPI();

const searchLoader = new Loader(searchLoaderRef, '🔍');

const lightbox = new SimpleLightbox('.gallery a', {});

searchLoader.hide();

formRef.addEventListener('submit', onFormSubmit);
// loadMoreBtnRef.addEventListener('click', onLoadMoreClick);
let options = {
  rootMargin: '200px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(handleIntersect, options);

goTopBtnHandler();

async function onFormSubmit(evt) {
  evt.preventDefault();

  const searchQuery = evt.target.elements.searchQuery.value.trim();
  if (!searchQuery) {
    Notiflix.Notify.warning('Plase input search query!');
    return;
  }
  pixabayApi.params.page = 1;

  clearRender();

  pixabayApi.params = { ...pixabayApi.params, q: searchQuery };

  try {
    evt.target.lastElementChild.disabled = true;
    searchLoader.show();

    const data = await pixabayApi.getCards();
    const total = data.totalHits;

    if (!total) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      return;
    }

    Notiflix.Notify.success(`${total} image${total === 1 ? '' : 's'} finded`);

    pixabayApi.totalPages = Math.ceil(total / pixabayApi.params.per_page);

    renderMarkup(data.hits);
    lightbox.refresh();

    if (isNextPage()) {
      pixabayApi.params.page += 1;
      observer.observe(targetRef);
    } else
      Notiflix.Notify.success(
        "We're sorry, but you've reached the end of search results."
      );
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Oops, something went wrong, try again!');
  } finally {
    searchLoader.hide();
    evt.target.lastElementChild.disabled = false;
  }
}

function handleIntersect(entries, observer) {
  entries.forEach(async entry => {
    if (!entry.isIntersecting) {
      return;
    }
    console.log(entry);
    try {
      const data = await pixabayApi.getCards();

      renderMarkup(data.hits);
      lightbox.refresh();

      if (isNextPage()) {
        pixabayApi.params.page += 1;
      } else {
        Notiflix.Notify.success(
          "We're sorry, but you've reached the end of search results."
        );
        observer.unobserve(targetRef);
      }
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure('Oops, something went wrong, try again!');
    }
  });
}
function isNextPage() {
  return pixabayApi.totalPages > pixabayApi.params.page;
}

function cardTemplate(card) {
  const {
    webformatURL,
    largeImageURL,
    likes,
    views,
    comments,
    downloads,
    tags,
  } = card;
  return `<div class="photo-card">
      <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${likes}
        </p>
        <p class="info-item">
          <b>Views</b>${views}
        </p>
        <p class="info-item">
          <b>Comments</b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${downloads}
        </p>
      </div>
    </div>`;
}

function clearRender() {
  renderRef.innerHTML = '';
}

function renderMarkup(cards) {
  const markup = cards.map(cardTemplate).join('');
  renderRef.insertAdjacentHTML('beforeend', markup);
}
