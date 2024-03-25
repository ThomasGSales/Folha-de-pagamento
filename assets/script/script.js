document.addEventListener("DOMContentLoaded", function() {
    const formSelecionarFuncionario = document.getElementById('form-selecionar-funcionario');
    const selectFuncionario = document.getElementById('select-funcionario');

    fetch('assets/data.json')
        .then(response => response.json())
        .then(data => {
            data.funcionarios.forEach(funcionario => {
                const option = document.createElement('option');
                option.value = JSON.stringify(funcionario); // Armazena o objeto JSON como uma string
                option.textContent = funcionario.nome;
                selectFuncionario.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar dados:', error);
        });

    formSelecionarFuncionario.addEventListener('submit', function(event) {
        event.preventDefault();

        const funcionarioSelecionado = selectFuncionario.value;

        // Armazenar o funcionário selecionado no sessionStorage
        sessionStorage.setItem('funcionarioSelecionado', funcionarioSelecionado);

        window.location.href = 'selecionar-descontos-adicionais.html';
    });
});
