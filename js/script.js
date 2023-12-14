function prevButton() { window.location.href = '../index.html'; }
function nextButton() { window.location.href = '../index.html'; }
function homeButton() { window.location.href = './index.html'; }
function productosButton() { window.location.href="productos.html"; }
function clasicosButton() { window.location.href = './pages/clasicos.html'; }
function aventuraButton() { window.location.href = './pages/aventura.html'; }
function subirButton() { window.scrollTo({top: 0}) }

function agregarElementos() {
    let pContainer = document.getElementById('container');
    juegos.forEach(function(juego) {
    let pDiv = document.createElement('div');
    pDiv.classList.add('grid-item');
    pDiv.innerHTML = juego.foto;
    pContainer.appendChild(pDiv);
  });
}

function domLoaded() {document.addEventListener('DOMContentLoaded', agregarElementos())};

