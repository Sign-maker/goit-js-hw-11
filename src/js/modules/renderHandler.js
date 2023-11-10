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

export function clearRender(renderRef) {
  renderRef.innerHTML = '';
}

export function renderMarkup(renderRef, cards) {
  const markup = cards.map(cardTemplate).join('');
  renderRef.insertAdjacentHTML('beforeend', markup);
}

export function scrollCards(renderRef) {
  const { height: cardHeight } =
    renderRef.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
