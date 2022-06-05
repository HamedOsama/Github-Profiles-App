const userApi = 'https://api.github.com/users/'
const search = document.getElementById("search")
const btn = document.getElementById("btn")
const container = document.querySelector(".data-container")
getUser("HamedOsama")
async function getUser(name){
    const res = await fetch(userApi+name)
    const data = await res.json()
    createUser(data,await getRepos(name));
}
async function getRepos(user){
    const res = await fetch(userApi+user+"/repos")
    const resData = await res.json();
    return await resData ;
}
function createUser(user,repos){
    const name = document.getElementById("name")
    const bio = document.getElementById("bio")
    const img = document.getElementById("img")
    const followers = document.getElementById("followers")
    const repo = document.getElementById("repo")
    img.src = user.avatar_url
    name.innerHTML = user.name
    bio.innerHTML = user.bio
    followers.innerHTML = `
    <li>${user.followers}<strong>Followers</strong></li>
    <li>${user.following}<strong>Following</strong></li>
    <li>${user.public_repos}<strong><i class="fa-solid fa-book-bookmark"></i></strong></li>
    `
    repo.innerHTML = '';
    for(let i = 0 ; i < repos.length ; i++)
    repo.innerHTML += `<li><a class="repo" target="blank" href=${repos[i].html_url}>${repos[i].name}</a></li>`
    container.style.opacity = 1;
}
const searchFun = async (e)=>{
    if(e.key == 'Enter' || e.key == undefined){
        const user = search.value;
        if (user)
        await  getUser(user);
        else alert("Please Enter a Name.")
    }
}
btn.addEventListener("click",  searchFun)
search.addEventListener("keypress",searchFun)
