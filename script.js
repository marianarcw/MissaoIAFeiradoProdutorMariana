document.addEventListener('DOMContentLoaded', function() {
    const estoque = [];
    const produtoSelect = document.getElementById('produto-select');
    const produtoImg = document.getElementById('produto-img');
    const quantidadeInput = document.getElementById('quantidade-input');
    const precoInput = document.getElementById('preco-input');
    const adicionarBtn = document.getElementById('adicionar-btn');
    const estoqueList = document.getElementById('estoque-list');
    const totalValue = document.getElementById('total-value');

    // Mostra imagem ao selecionar produto
    produtoSelect.addEventListener('change', function() {
        if (this.value) {
            produtoImg.src = `img/${this.value}.jpg`;
            produtoImg.style.display = 'block';
        } else {
            produtoImg.style.display = 'none';
        }
    });

    // Adiciona/Atualiza produto
    adicionarBtn.addEventListener('click', function() {
        const produtoNome = produtoSelect.value;
        const quantidade = parseFloat(quantidadeInput.value);
        const preco = parseFloat(precoInput.value);

        if (!produtoNome || isNaN(quantidade) || quantidade <= 0 || isNaN(preco) || preco <= 0) {
            alert('Preencha todos os campos corretamente!');
            return;
        }

        const index = estoque.findIndex(item => item.nome === produtoNome);
        
        if (index !== -1) {
            estoque[index] = {
                nome: produtoNome,
                quantidade: quantidade,
                preco: preco,
                img: `img/${produtoNome}.jpg`
            };
        } else {
            estoque.push({
                nome: produtoNome,
                quantidade: quantidade,
                preco: preco,
                img: `img/${produtoNome}.jpg`
            });
        }

        atualizarEstoque();
        produtoSelect.value = '';
        quantidadeInput.value = '';
        precoInput.value = '';
        produtoImg.style.display = 'none';
    });

    function atualizarEstoque() {
        estoqueList.innerHTML = '';
        let total = 0;

        estoque.forEach(produto => {
            const valorTotal = produto.quantidade * produto.preco;
            total += valorTotal;

            const card = document.createElement('div');
            card.className = 'produto-card';
            card.innerHTML = `
                <img src="${produto.img}" alt="${produto.nome}">
                <div class="produto-info">
                    <div class="produto-nome">${produto.nome.charAt(0).toUpperCase() + produto.nome.slice(1)}</div>
                    <div>
                        <span>${produto.quantidade} kg</span> | 
                        <span>R$ ${produto.preco.toFixed(2)}/kg</span> | 
                        <span>Total: R$ ${valorTotal.toFixed(2)}</span>
                    </div>
                </div>
            `;
            estoqueList.appendChild(card);
        });

        totalValue.textContent = total.toFixed(2);
    }
});