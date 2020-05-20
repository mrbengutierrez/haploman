// Shared navigation bar for all pages





var html = '\
  <nav class="navbar navbar-expand-md navbar-dark bg-dark navigation-bar">\
    <a class="navbar-brand" href="https://www.haploman.com">Haploman</a>\
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler_01" aria-controls="navbarToggler_01" aria-expanded="false" aria-label="Toggle navigation">\
      <span class="navbar-toggler-icon"></span>\
    </button>\
    <div class="collapse navbar-collapse" id="navbarToggler_01">\
      <ul class="navbar-nav ml-auto">\
        <li class="nav-item">\
          <a class="nav-link" href="https://www.haploman.com/education">Education</a>\
        </li>\
        <li class="nav-item">\
          <a class="nav-link" href="https://www.haploman.com/projects">Projects</a>\
        </li>\
        <li class="nav-item">\
          <a class="nav-link" href="https://www.haploman.com/#contact">Contact</a>\
        </li>\
      </ul>\
    </div>\
  </nav>\
  \
  <div class="navigation-spacing navbar-expand-md navbar-dark bg-dark">\
  <p class="navbar-brand" href="">Haploman</p>\
  </div>';


document.write(html);



