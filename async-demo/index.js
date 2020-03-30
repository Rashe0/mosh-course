console.log('Before')
// getUser(1, getRepositories)
console.log('After')

// function getRepositories(user) {
//     getRepositories(user, getCommits)
// }

// function getCommits(repos){
//     getCommits(repos, displayCommits)
// }

// function displayCommits(commits) {
//     console.log(commits)
// }


//Callbacks
//Promises
//Async/await

//Promise approach

// getUser(1)
//     .then(user => getRepositories(user))
//     .then(repos => getCommits(repos))
//     .then(commits => console.log('Commits ', commits))
//     .catch(err => console.log('Error', err.message))

//Async/await approach
async function displayCommits() {
    try{
        const user = await getUser(1)
        const repos = await getRepositories(user)
        const commits = await getCommits(repos)
        console.log(commits)
    } catch (err) {
        console.log('Error', err.message)
    }
}
displayCommits()

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting user from database...')
            resolve({id: id, username: 'mosh'})
        }, 2000)
    })
    
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub's API...")
            resolve(['repo1', 'repo2', 'repo3'])
            // reject(new Error('Could not get the repos.'))
        }, 2000)
    })
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub's API...")
            resolve(['commit'])
        }, 2000)
    })
}

