// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const array = range(10);
      const newarray = array.map(() => {
        const numbers = Math.floor(Math.random() * 243);
        return fromServer[numbers];
      });

      const revcoun = newarray.sort((a, b) => sortFunction(b, a, 'name'));
      const ordlist = document.createElement('ol');
      ordlist.className = 'flex-inner';
      $('form').prepend(ordlist);

      revcoun.forEach((el) => {
        const element = document.createElement('li');
        $(element).append(`<input type="checkbox" value=${el.code} id=${el.code} />`);
        $(element).append(`<label for=${el.code}>${el.name} </label>`);
        ordlist.appendChild(element);
      });
    })
    .catch((err) => console.log(err));
});