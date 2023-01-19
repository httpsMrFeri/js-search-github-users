class GitHubUser {
    constructor() {

    }
    async FetchFunc(event, userId) {
        event.preventDefault()
        let response = await fetch(`https://api.github.com/users/${userId}`)
        if (response.status === 200) {
            let date = await response.json()
            userBox.innerHTML = `
            <div class="userInfo flex">
                <div class="infoImg flex">
                    <img src="${date.avatar_url}">
                    <p class="flex">${date.name}</p>
                </div>
                <div class="infoText">
                    <div class="shortInfo flex">
                        <div class="infoBox infoBox-g"><p>Repos: ${date.public_repos}</p></div>
                        <div class="infoBox infoBox-b"><p>Gists: ${date.public_gists}</p></div>
                        <div class="infoBox infoBox-y"><p>Followers: ${date.followers}</p></div>
                        <div class="infoBox infoBox-p"><p>Following: ${date.following}</p></div>
                    </div>
                    <div class="ul">
                        <ul class="flex">
                            <li>
                                <p>Company: ${date.company}</p>
                            </li>
                            <li>
                                <p>Website/Blog: ${date.blog}</p>
                            </li>
                            <li>
                                <p>Location: ${date.location}</p>
                            </li>
                            <li>
                                <p>Member Since: ${date.updated_at}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="lastRepos flex">
            </div>
        `
        }
        else {
            userBox.innerHTML = '<p class="notFound">User Not Found</p>'
        }
        response = await fetch(`https://api.github.com/users/${userId}/repos`)
        console.log(response)
        if (response.status === 200) {
            let date = await response.json(),
                lastRepos = document.querySelector('.lastRepos'),
                i = 0
            while (i < date.length) {
                lastRepos.innerHTML += `
                <div class="reposBox" id="repoBox${i}">
                    <div class="repoText">
                        <p>${date[i].name}</p>
                    </div>
                    <div class="repoInfo">
                        <div class="rapoInfoBox infoBox-g"><p>forcks: ${date[i].forks}</p></div>
                        <div class="rapoInfoBox infoBox-b"><p>watchers: ${date[i].watchers_count}</p></div>
                        <div class="rapoInfoBox infoBox-r"><p>stars: ${date[i].stargazers_count}</p></div>
                    </div>
                    <div class="repoPage">
                        <a href="${date[i].html_url}">Repo Page</a>
                    </div>
                </div>
                `
                console.log(date)
                i++
            }

        }
        else {
            userBox.innerHTML = '<p class="notFound">Repos of User Not Found</p>'
        }
    }
}


let newListener = new GitHubUser(),
    searchForm = document.querySelector('.searchBoxForm'),
    searchInput = document.querySelector('#searchInput'),
    valueEror = document.querySelector('.value-eror'),
    userBox = document.querySelector('.userBox')

searchForm.addEventListener('submit', function (event) {
    event.preventDefault()
    if (searchInput.value == '') {
        valueEror.className = 'show'
        searchInput.className = 'red'
    }
    else if (searchInput.value != '') {
        console.log('Validation done')
        valueEror.className = 'none'
        searchInput.className = 'green'
        newListener.FetchFunc(event, searchInput.value)
    }
    else {
        userBox.innerHTML = `
        <p class="error">error</p>
        `
    }
})
