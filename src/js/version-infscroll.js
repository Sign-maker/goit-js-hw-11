import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import { PixabayAPI } from './modules/pixabay-api';
import { renderMarkup, clearRender } from './modules/renderHandler';
import { Loader } from './modules/loader';
import { goTopBtnHandler } from './modules/go-top-btn';

const formRef = document.querySelector('#search-form');
const searchLoaderRef = document.querySelector('.search-loader');
const renderRef = document.querySelector('.gallery');
const targetRef = document.querySelector('.target');

Notiflix.Notify.init({
  fontSize: '16px',
  timeout: 4000,
  clickToClose: true,
});

const pixabayApi = new PixabayAPI();
const searchLoader = new Loader(searchLoaderRef, '🔍');
const lightbox = new SimpleLightbox('.gallery a', { overlayOpacity: 0.9 });

searchLoader.hide();

formRef.addEventListener('submit', onFormSubmit);

const options = {
  rootMargin: '400px',
  threshold: 1.0,
};
const observer = new IntersectionObserver(handleIntersect, options);

goTopBtnHandler();

async function onFormSubmit(evt) {
  evt.preventDefault();

  const searchQuery = evt.target.elements.searchQuery.value.trim();
  if (!searchQuery) {
    Notiflix.Notify.warning('Plase input search query!');
    return;
  }
  pixabayApi.params.page = 1;
  observer.unobserve(targetRef);
  clearRender(renderRef);
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

      renderMarkup(renderRef, data.hits);
      lightbox.refresh();

      if (pixabayApi.isNextPage()) {
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
