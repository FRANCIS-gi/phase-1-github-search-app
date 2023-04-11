const form = document.querySelector('form');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const userRepos = document.getElementById('userRepos');

form.addEventListener('submit', event => {
  event.preventDefault();

  const searchTerm = searchInput.value;

  // Search for users
  fetch(`https://api.github.com/search/users?q=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      // Clear previous search results
      searchResults.innerHTML = '';

      // Display search results
      data.items.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" />
          <p>${user.login}</p>
          <a href="${user.html_url}" target="_blank">View Profile</a>
        `;
        userDiv.addEventListener('click', () => {
          // Display user's repositories
          fetch(`https://api.github.com/users/${user.login}/repos`)
            .then(response => response.json())
            .then(repos => {
              // Clear previous user's repositories
              userRepos.innerHTML = '';

              // Display user's repositories
              repos.forEach(repo => {
                const repoDiv = document.createElement('div');
                repoDiv.innerHTML = `
                  <h3>${repo.name}</h3>
                  <p>${repo.description || 'No description'}</p>
                  <a href="${repo.html_url}" target="_blank">View on Github</a>
                `;
                userRepos.appendChild(repoDiv);
              });
            });
        });
        searchResults.appendChild(userDiv);
      });
    })
    .catch(error => console.error(error));
});
