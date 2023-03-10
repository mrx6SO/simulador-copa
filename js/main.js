var btnCreateGroups = document.getElementById('createGroups');

btnCreateGroups.addEventListener('click', createGroups);

function createGroups() {

  // get all the img and span elements within the bandeiras class
  const flagElements = document.querySelectorAll('#todosPaises > .bandeiras img');
  const nameElements = document.querySelectorAll('#todosPaises > .bandeiras span');


  // create an array of the countries
  const countries = [];
  for (let i = 0; i < flagElements.length; i++) {
    const country = {
      name: nameElements[i].innerText,
      flag: flagElements[i].src
    };
    countries.push(country);
  }

  // shuffle the array of countries
  countries.sort(() => Math.random() - 0.5);

  // iterate through the array of countries
  let groupNumber = 1;
  for (let i = 0; i < countries.length; i++) {
    // create a div element for the country
    const countryElement = document.createElement('div');

    // create the flag image element
    const flagElement = document.createElement('img');
    flagElement.src = countries[i].flag;
    flagElement.width = 50;
    flagElement.height = 'auto';
    flagElement.borderRadius = 5;
    flagElement.margin = 1;

    // create the text element for the country name
    const nameElement = document.createElement('span');
    nameElement.className = 'country selected';
    nameElement.innerText = countries[i].name;

    // add the flag and country name elements to the country element
    countryElement.appendChild(flagElement);
    countryElement.appendChild(nameElement);

    // if it's the first country in a new group, create a div element for the group
    if (i % 4 == 0) {
      const groupElement = document.createElement('div');
      groupElement.className = 'groups';
      groupElement.setAttribute("id", "group-" + String.fromCharCode(groupNumber + 96));
      groupElement.innerHTML = `Grupo: ${String.fromCharCode(groupNumber + 96)}`;
      document.body.appendChild(groupElement);
      groupNumber++;
    }

    // add the country element to the group
    document.querySelectorAll('.groups')[groupNumber - 1].appendChild(countryElement);
  }
  btnCreateGroups.disabled = true;
  btnCreateGroups.style.display = 'none';

var countryElementss = document.querySelectorAll('.groups > div');
var selectedCountriess = [];

for (const countryElementt of countryElementss) {
  countryElementt.addEventListener('click', function() {
    if (selectedCountriess.length < 2) {
      selectedCountriess.push(this);
      this.classList.add('selected');
      //countryElementt.style.display = 'none'
    } else {
      if (this.parentElement === selectedCountriess[0].parentElement) {
        selectedCountriess.push(this);
        this.classList.add('selected');
        this.style.display = 'none';
        countryElementt.style.display = 'none'
      } else {
        alert('Error: countries must belong to the same group');
      }
    }
    if (selectedCountriess.length == 2) {
      const containerElement = document.createElement('div');
      containerElement.classList.add('groups');
      containerElement.classList.add('selected-countries');
      document.body.appendChild(containerElement);
    if (selectedCountriess.length > 2) {
		alert('erro');
		return; }
      for (const countryy of selectedCountriess) {
        containerElement.appendChild(countryy);
      }
      selectedCountriess = [];
    }
  });
}};
function hideBandeiras() {
  // Get all the elements with the class "bandeiras"
  var bandeirasElements = document.querySelectorAll("#todosPaises > .bandeiras");

  // Loop through the elements
  for (var i = 0; i < bandeirasElements.length; i++) {
    // Set the display property to "none" to hide the element
    bandeirasElements[i].style.display = "none";
  }
}


var btnCreateResultForm = document.getElementById('createResultForm');

btnCreateResultForm.addEventListener('click', createResultForm);
function createResultForm() {
  // get all the selected-countries groups
    const selectedCountriesGroups = document.querySelectorAll('.selected-countries');

  // loop through each group
    selectedCountriesGroups.forEach(group => {
    // create a form element
    const form = document.createElement('form');

    // create a label and input element for the first country
    const label1 = document.createElement('label');
    label1.innerText = `${group.querySelector('.selected:first-child > span').innerText}`;
    const input1 = document.createElement('input');
    input1.type = 'number';
    input1.className = 'country1';
    input1.setAttribute("name", "country1");

    // create a label and input element for the second country
    const label2 = document.createElement('label');
    label2.innerText = `${group.querySelector('.selected:last-child > span').innerText}`;
    const input2 = document.createElement('input');
    input2.type = 'number';
    input2.className = 'country2';
    input2.setAttribute("name", "country2");

    // create a submit button
    const button = document.createElement('button');
    button.type = 'button';
    button.value = 'Definir resultados';
    button.innerHTML = 'Definir resultados';
    button.setAttribute("onclick", 'determineWinner();');

    // add the elements to the form
    form.appendChild(label1);
    form.appendChild(input1);
    form.appendChild(label2);
    form.appendChild(input2);
    form.appendChild(button);

    // add the form to the group
    group.appendChild(form);
  });
}

/*function determineWinner() {
  // Get all the forms in the selected-countries class
  const forms = document.querySelectorAll('.selected-countries form');
  // Iterate through the forms
  for (let i = 0; i < forms.length; i++) {
    // Get the input elements for the goals of each country
    const country1Goals = forms[i].querySelector('input[name="country1"]').value;
    const country2Goals = forms[i].querySelector('input[name="country2"]').value;
    // Compare the number of goals and determine the winner
    let winner1 = '';
    let winner2 = '';
    let empate = '';
    if (country1Goals > country2Goals) {
      winner1 = forms[i].querySelector('.country1').previousSibling.textContent
    } else if (country2Goals > country1Goals) {
      winner2 = forms[i].querySelector('.country2').previousSibling.textContent
    } else {
      empate = 'Empate';
    }
    // Display the winner
    //console.log(`Winner of game ${i+1}: ${winner}`);
    alert(`Pr??xima rodada: ${winner1}x${winner2}`);
  }
}*/

function determineWinner() {
  // Get all the forms in the selected-countries class
  const forms = document.querySelectorAll('.selected-countries form');
	let vencedoresOitavas = [];
  // Iterate through the forms
  for (let i = 0; i < forms.length; i++) {
    // Get the input elements for the goals of each country
    const country1Goals = forms[i].querySelector('input[name="country1"]').value;
    const country2Goals = forms[i].querySelector('input[name="country2"]').value;

    // Compare the number of goals and determine the winner
    let winner1 = '';
    let winner2 = '';
    let empate = '';
    if (country1Goals > country2Goals) {
      winner1 = forms[i].querySelector('.country1').previousSibling.textContent
    } else if (country2Goals > country1Goals) {
      winner2 = forms[i].querySelector('.country2').previousSibling.textContent
    } else {
      empate = new Error("Jogos com o mesmo n??mero de gols");
      alert(`${empate} n??o s??o permitidos. Defina o vencedor da partida para prosseguir.`);
    }
    vencedoresOitavas.push([winner1 + winner2])
    // Display the winner
    //console.log(`Winner of game ${i+1}: ${winner}`);
    //alert(`Pr??xima rodada: ${winner1}x${winner2}`);
  }
  // salvar vencedores no localStorage
  localStorage.setItem('vencedoresOitavas', JSON.stringify(vencedoresOitavas))
  //criar a pr??xima fase quartasDeFinais
  criarQuartasDeFinais();

}
/*function determineWinner1() {
  // Get all the forms in the selected-countries class
  const forms = document.querySelectorAll('div.quartasDeFinais form')
	let vencedoresOitavas = [];
  // Iterate through the forms
  for (let i = 0; i < forms.length; i++) {
    // Get the input elements for the goals of each country
    const country1Goals = forms[i].querySelector('input[name="country1"]').value;
    const country2Goals = forms[i].querySelector('input[name="country2"]').value;
    // Compare the number of goals and determine the winner
    let winner1 = '';
    let winner2 = '';
    let empate = '';
    if (country1Goals > country2Goals) {
      winner1 = forms[i].querySelector('.country1').previousSibling.textContent
    } else if (country2Goals > country1Goals) {
      winner2 = forms[i].querySelector('.country2').previousSibling.textContent
    } else {
      empate = new Error("Jogos com o mesmo n??mero de gols");
      alert(`${empate} n??o s??o permitidos. Defina o vencedor da partida para prosseguir.`);
    }
    vencedoresOitavas.push([winner1 + winner2])
    // Display the winner
    //console.log(`Winner of game ${i+1}: ${winner}`);
    //alert(`Pr??xima rodada: ${winner1}x${winner2}`);
  }}*/

// essa fun????o ?? s?? para checar no console.log() os resultados 
function exibirVencedores() {
  //buscar os vencedores no localStorage
  let vencedores = JSON.parse(localStorage.getItem('vencedoresOitavas'))

  //iterar atrav??s dos vencedores
  for (let i = 0; i < vencedores.length; i++) {
    //exibir os vencedores
    console.log(`Jogo ${i+1}: ${vencedores[i]}`);
  }
}

function criarQuartasDeFinais() {
  //buscar os vencedores no localStorage
  let vencedores = JSON.parse(localStorage.getItem('vencedoresOitavas'))

  //criar uma nova div para a pr??xima fase
  let quartasFinais = document.createElement('div');
  //quartasFinais.className = '
  quartasFinais.classList.add('quartas-finais')

  //iterar atrav??s dos vencedores
  for (let i = 0; i < vencedores.length; i++) {
    //criar uma nova div para cada jogo
    let jogo = document.createElement('div')
    jogo.classList.add('quartasDeFinais')

    //criar uma div para cada pa??s
    let pais1 = document.createElement('div')
    pais1.classList.add('pais1')
    pais1.textContent = vencedores[i][0]

    let pais2 = document.createElement('div')
    pais2.classList.add('pais2')
    pais2.textContent = vencedores[i][1]

    //criar um form para definir o resultado do jogo
   let form = document.createElement('form')
    form.classList.add('resultado')

    //let input1 = document.createElement('input')
    /*input1.setAttribute('type', 'number')
    input1.setAttribute('name', 'pais1')
    input1.setAttribute('placeholder', 'Gols')
    let input2 = document.createElement('input')
   input2.setAttribute('type', 'number')
    input2.setAttribute('name', 'pais2')
    input2.setAttribute('placeholder', 'Gols')
    form.appendChild(input1)
    form.appendChild(input2)
*/
    //adicionar os elementos a div do jogo
    jogo.appendChild(pais1)
    jogo.appendChild(pais2)
    jogo.appendChild(form)


    //adicionar o jogo ?? div das quartas de finais
    quartasFinais.appendChild(jogo)
  }

  //adicionar a div das quartas de finais ?? p??gina
  document.body.appendChild(quartasFinais)

  //esconder a div da ??ltima fase
  let ultimaFase = document.querySelectorAll('.selected-countries')//.style.display = 'none'
	for(let j = 0; j < ultimaFase.length; j++) {
		ultimaFase[j].style.display = 'none'

	}
	criarFormQuartasDeFinais()
}

function criarFormQuartasDeFinais() {
  // criar um formul??rio
  let form = document.createElement('form');

  // criar um bot??o de submit
  let submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.innerHTML = 'Gerar camp??es';
  submitButton.addEventListener('click', gerarCampeoes);

  // adicionar o bot??o ao formul??rio
  form.appendChild(submitButton);

  // adicionar o formul??rio ?? p??gina
  document.body.appendChild(form);
}
function determinarVencedoresQuartasDeFinais() {
  // buscar todos os elementos com a classe .resultado
  const resultado = document.querySelectorAll('.quartasDeFinais > .resultado');

  // array para armazenar os vencedores
  let vencedores = [];

  // iterar sobre os resultados
  for(var i = 0; i < resultado.length; i++) {
    //resultados.forEach(resultado => {
    // buscar os inputs dos gols
    const gol1 = resultado[i].querySelector('input').value;
    const gol2 = resultado[i].querySelector('input').value;

    // comparar os gols e determinar o vencedor
    let vencedor;
    if (gol1 > gol2) {
      vencedor = resultado[i].querySelector('.pais1').previousSibling.textContent
    } else if (gol2 > gol1) {
      vencedor = resultado[i].querySelector('.pais2').previousSibling.textContent
    } else {
      vencedor = 'Empate';
    }

    // adicionar o vencedor ao array de vencedores
    vencedores.push(vencedor);


  // salvar os vencedores no localStorage
  localStorage.setItem('vencedoresQuartasDeFinais', JSON.stringify(vencedores));
  }}
 function gerarCampeoes() {
  // Obter todas as divs com a classe "pais1" nas quartas de finais
  const paises = document.querySelectorAll('.quartas-finais .pais1');
  // Armazenar todos os times em um array
  const times = [];
  paises.forEach(pais => {
    times.push(pais.textContent);
  });

  // Embaralhar o array de times
  for (let i = times.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [times[i], times[j]] = [times[j], times[i]];
  }

  // Extrair os tr??s primeiros times do array embaralhado
  const campeoes = times.slice(0, 3);

  // Criar um container para exibir os tr??s primeiros colocados
  const container = document.createElement('div');
  container.classList.add('campeoes');

  // Adicionar os tr??s primeiros colocados ao container
  campeoes.forEach((time, index) => {
    const posicao = document.createElement('div');
    posicao.classList.add('posicao');
    posicao.textContent = `${index + 1}?? lugar: ${time}`;
    container.appendChild(posicao);
  });

  // Adicionar o container ?? p??gina
  document.body.appendChild(container);
}
