document.addEventListener('DOMContentLoaded', function () {

  // 1. Move .listing-categories out of .body into its own grid column
  document.querySelectorAll('.quarto-post').forEach(function (post) {
    var body = post.querySelector('.body');
    var categories = post.querySelector('.listing-categories');
    var titleLink = post.querySelector('.listing-title a');

    // Move categories out of body to be a direct child of post
    if (categories && body) {
      post.insertBefore(categories, body.nextSibling);
    }

    // Add clock icon before reading time
    var readingTime = post.querySelector('.listing-reading-time');
    if (readingTime) {
      readingTime.innerHTML = '<i class="bi bi-clock"></i> ' + readingTime.textContent.trim();
    }

    // Inject real "Read →" link as last grid column
    var readEl = document.createElement('div');
    readEl.className = 'mn-read-link';
    if (titleLink) {
      readEl.innerHTML = '<a href="' + titleLink.getAttribute('href') + '">Read →</a>';
    }
    post.appendChild(readEl);
  });

  // 2. Move tag filter row above listing
  var categoryDiv = document.querySelector('.quarto-listing-category');
  var listing = document.querySelector('.quarto-listing');
  if (!categoryDiv || !listing) return;

  var postCount = document.querySelectorAll('.quarto-post').length;

  var filterRow = document.createElement('div');
  filterRow.className = 'mn-filter-row';

  var countEl = document.createElement('div');
  countEl.className = 'mn-post-count';
  countEl.innerHTML = '<span>' + postCount + ' post' + (postCount !== 1 ? 's' : '') + '</span><span class="mn-sort">Sort: <strong>Newest</strong></span>';

  filterRow.appendChild(categoryDiv);
  filterRow.appendChild(countEl);
  listing.parentNode.insertBefore(filterRow, listing);

  // 3. Set "All" active by default
  var allCategory = categoryDiv.querySelector('.category[data-category=""]');
  if (allCategory) allCategory.classList.add('active');

  // 4. Update active pill on click
  categoryDiv.querySelectorAll('.category').forEach(function (pill) {
    pill.addEventListener('click', function () {
      categoryDiv.querySelectorAll('.category').forEach(function (p) {
        p.classList.remove('active');
      });
      pill.classList.add('active');
    });
  });
});
