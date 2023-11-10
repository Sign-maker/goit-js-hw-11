import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import { PixabayAPI } from './modules/pixabay-api';
import {
  renderMarkup,
  scrollCards,
  clearRender,
} from './modules/renderHandler';
import { Button } from './modules/load-more-btn';
import { Loader } from './modules/loader';
import { goTopBtnHandler } from './modules/go-top-btn';

const formRef = document.querySelector('#search-form');
const loadMoreBtnRef = document.querySelector('.load-more-btn');
const searchLoaderRef = document.querySelector('.search-loader');
const loadMoreLoaderRef = document.querySelector('.load-more-loader');
const renderRef = document.querySelector('.gallery');

Notiflix.Notify.init({
  fontSize: '16px',
  timeout: 4000,
  clickToClose: true,
});

const pixabayApi = new PixabayAPI();
const loadMoreBtn = new Button(loadMoreBtnRef);
const searchLoader = new Loader(searchLoaderRef, '🔍');
const loadMoreLoader = new Loader(loadMoreLoaderRef, '🎞️');
const lightbox = new SimpleLightbox('.gallery a', { overlayOpacity: 0.9 });

searchLoader.hide();
loadMoreBtn.hide();
loadMoreLoader.hide();

formRef.addEventListener('submit', onFormSubmit);
loadMoreBtnRef.addEventListener('click', onLoadMoreClick);
goTopBtnHandler();

async function onFormSubmit(evt) {
  evt.preventDefault();

  const searchQuery = evt.target.elements.searchQuery.value.trim();
  if (!searchQuery) {
    Notiflix.Notify.warning('Plase input search query!');
    return;
  }

  pixabayApi.params.page = 1;
  clearRender(renderRef);
  if (loadMoreBtn.isVisible) {
    loadMoreBtn.hide();
  }
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

    Notiflix.Notify.success(
      `Hooray! We found ${total} image${total === 1 ? '' : 's'}.`
    );
    pixabayApi.totalPages = Math.ceil(total / pixabayApi.params.per_page);
    renderMarkup(renderRef, data.hits);
    lightbox.refresh();

    if (pixabayApi.isNextPage()) {
      pixabayApi.params.page += 1;
      loadMoreBtn.show();
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

async function onLoadMoreClick() {
  try {
    loadMoreBtn.disable();
    loadMoreLoader.show();
    const data = await pixabayApi.getCards();

    renderMarkup(renderRef, data.hits);
    scrollCards(renderRef);
    lightbox.refresh();
    loadMoreBtn.enable();

    if (pixabayApi.isNextPage()) {
      pixabayApi.params.page += 1;
    } else {
      Notiflix.Notify.success(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.hide();
    }
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Oops, something went wrong, try again!');
  } finally {
    loadMoreLoader.hide();
  }
}
