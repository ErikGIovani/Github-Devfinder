const DarkMode = document.getElementById('darkmode');

DarkMode.addEventListener('click', () => {
	document.body.classList.toggle('dark');
  
  if(document.body.classList.contains('dark')){
		DarkMode.innerHTML = 'LIGHT <i class="fas fa-sun"></i>';
    localStorage.setItem('dark-mode', 'true');
	} else {
    DarkMode.innerHTML = 'DARK <i class="fas fa-moon"></i>';
    localStorage.setItem('dark-mode', 'false');
	}
});

if(localStorage.getItem('dark-mode') === 'true'){
	document.body.classList.add('dark');
  DarkMode.innerHTML = 'LIGHT <i class="fas fa-sun"></i>';
} else {
	document.body.classList.remove('dark');
}


const form = document.querySelector('form');
let nombre = document.getElementById('nombre');
let link = 'octocat';

function Borrar() {
  document.getElementById('link').classList.add('hidde');
}

function ApiCall() {
  fetch(`https://api.github.com/users/${link}`)
    .then(response => response.json())
    .then(json => {
      let year = json.created_at.slice(0, 4);
      let day = json.created_at.slice(8, 10);
      let month = json.created_at.slice(5, 7);
      let area = json.location;
      let twitter = json.twitter_username;
      let pagina = json.blog;
      let empresa = json.company;

      if (month == '01') {
        month = 'Jan';
      } else if (month == '02') {
        month = 'Feb';
      } else if (month == '03') {
        month = 'Mar';
      } else if (month == '04') {
        month = 'Apr';
      } else if (month == '05') {
        month = 'May';
      } else if (month == '06') {
        month = 'Jun';
      } else if (month == '07') {
        month = 'Jul';
      } else if (month == '08') {
        month = 'Aug';
      } else if (month == '09') {
        month = 'Sep';
      } else if (month == '10') {
        month = 'Oct';
      } else if (month == '11') {
        month = 'Nov';
      } else if (month == '12') {
        month = 'Dec';
      }

      if (json.bio == null) {
        bio = 'This profile has no bio';
      } else {
        bio = json.bio;
      }

      if (area == null) {
        area = 'Not available';
        document.getElementById('location').classList.add('not-available');
      } else {
        area = area;
        document.getElementById('location').classList.remove('not-available');
      }

      if (twitter == null) {
        twitter = 'Not available';
        document.getElementById('twitter').classList.add('not-available');
      } else {
        twitter = twitter;
        document.getElementById('twitter').classList.remove('not-available');
      }

      if (pagina == '') {
        pagina = 'Not available';
        document.getElementById('blog').classList.add('not-available');
      } else {
        pagina = pagina;
        document.getElementById('blog').classList.remove('not-available');
      }

      if (empresa == null) {
        empresa = 'Not available';
        document.getElementById('company').classList.add('not-available');
      } else {
        empresa = empresa;
        document.getElementById('company').classList.remove('not-available');
      }

      document.getElementById('image-avatar').src = json.avatar_url;
      document.getElementById('name').innerText = json.name;
      document.getElementById(
        'day-creation'
      ).innerText = `Joined ${day} ${month} ${year}`;
      document.getElementById('user-name').innerText = '@' + json.login;
      document.getElementById('bio').innerText = bio;
      document.getElementById('repos').innerText = json.public_repos;
      document.getElementById('followers').innerText = json.followers;
      document.getElementById('following').innerText = json.following;
      document.getElementById('location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${area}`;
      document.getElementById('twitter').innerHTML = `<i class="fab fa-twitter"></i> ${twitter}`;
      document.getElementById('blog').innerHTML = `<i class="fas fa-link"></i> ${pagina}`;
      document.getElementById('company').innerHTML = `<i class="fas fa-building"></i> ${empresa}`;
    })
    .catch(error => {
      document.getElementById('link').classList.remove('hidde');
    nombre.value = 'No results';
    document.getElementById('link').innerText = nombre.value;
    nombre.value = '';
    setTimeout(Borrar, 3000);
    });
}

ApiCall();

form.addEventListener('submit', e => {
  e.preventDefault();
  if (nombre.value == '') {
    document.getElementById('link').classList.remove('hidde');
    nombre.value = 'No results';
    document.getElementById('link').innerText = nombre.value;
    nombre.value = '';
    setTimeout(Borrar, 3000);
  } else {
    link = nombre.value;
    ApiCall();
    nombre.value = '';
  }
});