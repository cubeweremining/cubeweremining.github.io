let produtos = [];
let carrinho = [];
let total = 0;

fetch('/produtos')  // Vai buscar os produtos do backend Python
  .then(res => res.json())
  .then(data => {
    produtos = data;
    mostrarProdutos();
  });

function mostrarProdutos() {
  const container = document.getElementById('produtos');
  produtos.forEach(prod => {
    const div = document.createElement('div');
    div.className = 'produto';
    div.innerHTML = `
      <img src="${prod.imagem}" />
      <h3>${prod.nome}</h3>
      <p>R$ ${prod.preco.toFixed(2)}</p>
      <button onclick="adicionarCarrinho(${prod.id})">Adicionar</button>
    `;
    container.appendChild(div);
  });
}

function adicionarCarrinho(id) {
  const item = produtos.find(p => p.id === id);
  carrinho.push(item);
  total += item.preco;
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById('carrinho');
  lista.innerHTML = '';
  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.nome + ' - R$ ' + item.preco.toFixed(2);
    lista.appendChild(li);
  });
  document.getElementById('total').textContent = total.toFixed(2);
}
