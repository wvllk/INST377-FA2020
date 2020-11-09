// function findMatches(wordToMatch, data) {
//   return data.filter((item) => {
//     // here we need to figure out if the city or state matches what was searched
//     const regex = new RegExp(wordToMatch, 'gi');
//     return item.name.match(regex) || item.category.match(regex);
//   });
// }
// const searchInput = document.querySelector('.search');
// const suggestions = document.querySelector('.suggestions');

// function displayMatches(choices) {
//   const matchArray = findMatches(this.value, choices);
//   const html = matchArray.map((place) => {
//     const regex = new RegExp(this.value, 'gi');
//     const restaurantName = place.name.replace(regex, `<span class="hl">${this.value}</span>`);
//     return `
//       <li>
//         <span class="name">${restaurantName}</span>
//         <span class="category">${place.category}</span>
//         <span class="address">${place.address_line_1}</span>
//         <span class="city">${place.city}</span>
//         <span class="zip">${place.zip}</span>
//       </li>
//     `;
//   }).join('');
//   suggestions.innerhtml = html;
// }

// async function main() {
//   const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
//   const json = await data.json();

//   searchInput.addEventListener('change', displayMatches(json));
//   searchInput.addEventListener('keyup', displayMatches(json));
// }
// window.onload = main;
const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const restaurants = [];
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => restaurants.push(...data));

function findMatches(wordToMatch, choices) {
  return choices.filter((place) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.name.match(regex) || place.category.match(regex);
  });
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

function displayMatches() {
  const matchArray = findMatches(this.value, restaurants);
  const html = matchArray.map((place) => `
      <li>
        <span class="name">${place.name}</span><br>
        <span class="population">${place.category}</span><br>
        <span class="address">${place.address_line_1}</span><br>
        <span class="city">${place.city}</span><br>
        <span class="zip">${place.zip}</span><br>
      </li>
      
    `).join('');
  suggestions.innerHTML = html;
}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);