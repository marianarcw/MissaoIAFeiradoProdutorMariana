document.addEventListener('DOMContentLoaded', function() {
    const estoque = [];
    const produtoSelect = document.getElementById('produto-select');
    const quantidadeInput = document.getElementById('quantidade-input');
    const precoInput = document.getElementById('preco-input');
    const adicionarBtn = document.getElementById('adicionar-btn');
    const estoqueList = document.getElementById('estoque-list');
    const totalValue = document.getElementById('total-value');

    // Adicionar produto ao estoque
    adicionarBtn.addEventListener('click', function() {
        const produtoNome = produtoSelect.value;
        const quantidade = parseInt(quantidadeInput.value);
        const preco = parseFloat(precoInput.value);

        if (!produtoNome || isNaN(quantidade) || isNaN(preco)) {
            alert('Preencha todos os campos corretamente!');
            return;
        }

        // Verifica se o produto já existe no estoque
        const produtoExistente = estoque.find(item => item.nome === produtoNome);
        
        if (produtoExistente) {
            produtoExistente.quantidade += quantidade;
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
    });

    // Atualiza a exibição do estoque
    function atualizarEstoque() {
        estoqueList.innerHTML = '';
        let total = 0;

        estoque.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'produto-card';

            card.innerHTML = `
                <img src="${produto.img}" alt="${produto.nome}" class="produto-img">
                <div class="produto-info">
                    <div class="produto-nome">${formatarNome(produto.nome)}</div>
                    <div class="produto-detalhes">
                        <span>Quantidade: ${produto.quantidade} kg</span>
                        <span>Preço: R$ ${produto.preco.toFixed(2)}/kg</span>
                        <span>Total: R$ ${(produto.quantidade * produto.preco).toFixed(2)}</span>
                    </div>
                </div>
            `;

            estoqueList.appendChild(card);
            total += produto.quantidade * produto.preco;
        });

        totalValue.textContent = total.toFixed(2);
    }

    // Formata o nome do produto (remove underline e capitaliza)
    function formatarNome(nome) {
        return nome.charAt(0).toUpperCase() + nome.slice(1);
    }
});