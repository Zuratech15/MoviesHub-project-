const NAV_LINKS = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "details.html", label: "Details" }
];

function renderNavLinks(listEl) {
    if (!listEl) return;

    listEl.innerHTML = NAV_LINKS.map(link => {
        return `<li><a href="${link.href}">${link.label}</a></li>`;
    }).join("");
}


renderNavLinks(document.querySelector(".nav_ul"));
renderNavLinks(document.querySelector(".mobile_menu ul"));


const wrapper = document.querySelector('.movies_wrapper');
const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGEyODFiYTgzY2E4YTRjODI4NjkwMGU4YWRiODA1NyIsIm5iZiI6MTcxMDA4ODE0Ni44NDA5OTk4LCJzdWIiOiI2NWVkZGZkMmJkYzM0YzAxNjMzMmU3ZDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bR8_7MDrrLu9QV_6E37DT0uRK_NiKq_W0dsAg0_JiOk";

if (wrapper) {
    fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc", {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`
        }
    })
        .then(res => res.json())
        .then(data => {
            wrapper.innerHTML = "";

            data.results.forEach(movie => {
                const year = movie.release_date ? movie.release_date.split("-")[0] : "N/A";
                const poster = movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image";

                wrapper.innerHTML += `
<a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" class="movie_card">
    <div class="poster">
        <img src="${poster}" alt="${movie.title}" loading="lazy">
    </div>
    <div class="movie_info">
        <div>
            <p class="title">${movie.title}</p>
            <p class="year">${year}</p>
        </div>
        <span class="rating">⭐ ${movie.vote_average.toFixed(1)}</span>
    </div>
</a>
                `;
            });
      
        });
}


const burger = document.querySelector('.burger');
const menu = document.querySelector('.mobile_menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
});


const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const headerFixed = window.scrollY > 0;

    header.classList.toggle('is-fixed', headerFixed);
    document.body.classList.toggle('header-fixed', headerFixed);
});


const viewMoviesBtn = document.getElementById("viewMoviesBtn");
const moviesSection = document.querySelector(".movies_section");

if (viewMoviesBtn && moviesSection) {
    viewMoviesBtn.addEventListener("click", () => {
        moviesSection.scrollIntoView({
            behavior: "smooth"
        });
    });
}

