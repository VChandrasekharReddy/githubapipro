function fetchdata() {
    let myDiv = document.getElementById('profile');

    let userid = document.getElementById('userid').value;
    let url = "https://api.github.com/users/" + userid;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('User data not found or ID not found');
        }
        return response.json();
    })
    .then(data => {
        let userimg = document.getElementById('userimg');
        let username = document.getElementById('username');
        let bio = document.getElementById('bio');
        let repo = document.getElementById('repo');
        let followers = document.getElementById('followers');
        let following = document.getElementById('following');
        let location = document.getElementById('location');
        let createdat = document.getElementById('createdat');
        let prolink = document.getElementById('link');
        myDiv.style.display = "inline"; // Changes the display property to block
        // Safeguard null elements
        if (userimg) userimg.src = data.avatar_url || 'default-avatar.png';
        if (username) username.textContent = data.name || 'No name provided';
        if (bio) bio.innerHTML = `<strong>BIO : </strong>${data.bio || 'No bio available'}`;
        if (repo) repo.innerHTML = `<strong>Repositories : </strong>${data.public_repos}`;
        if (followers) followers.innerHTML = `<strong>Followers : </strong>${data.followers}`;
        if (following) following.innerHTML = `<strong>Following : </strong>${data.following}`;
        if (createdat) createdat.innerHTML = `<strong>Created At : </strong>${new Date(data.created_at).toLocaleDateString()}`;
        if (location) location.innerHTML = `<strong>Updated At : </strong>${new Date(data.updated_at).toLocaleDateString()}`;
        if (prolink) {
            prolink.href = data.html_url;
            prolink.textContent = "GitHub Profile";
        }
    })
    .catch(error => {
        errormsg(error.message);
        console.error("Error fetching data:", error);
    });
}
