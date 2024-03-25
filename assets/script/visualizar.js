document.addEventListener("DOMContentLoaded", function() {
    // Obtém os descontos selecionados na página anterior
    const descontosSelecionados = JSON.parse(sessionStorage.getItem('descontosSelecionados'));
    if (!descontosSelecionados) {
        console.error('Nenhum desconto selecionado.');
        return;
    }

    // Obtém informações do funcionário do JSON
    fetch('assets/data.json')
        .then(response => response.json())
        .then(data => {
            // Vamos assumir que o funcionário selecionado também está armazenado na sessionStorage
            const funcionarioSelecionado = sessionStorage.getItem('funcionarioSelecionado');
            if (!funcionarioSelecionado) {
                console.error('Nenhum funcionário selecionado.');
                return;
            }

            const funcionario = data.funcionarios.find(f => f.nome === funcionarioSelecionado);
            if (!funcionario) {
                console.error('Funcionário não encontrado.');
                return;
            }

            // Calcula o salário líquido com base nos descontos selecionados
            let salarioLiquido = funcionario.salario;
            descontosSelecionados.forEach(desconto => {
                if (desconto === 'fgts') {
                    salarioLiquido -= 0.08 * funcionario.salario; // Desconto de 8% do FGTS
                } else if (desconto === 'va') {
                    salarioLiquido -= 100; // Desconto fixo de R$ 100 do Vale Alimentação
                } else if (desconto === 'vt') {
                    salarioLiquido -= 150; // Desconto fixo de R$ 150 do Vale Transporte
                } else if (desconto === 'adicional-tempo-servico') {
                    const horasAdicionalTempoServico = parseFloat(document.getElementById('adicional-tempo-servico').value);
                    salarioLiquido -= horasAdicionalTempoServico * X; // Substitua X pelo valor do adicional por hora
                } else if (desconto === 'horas-extras') {
                    const horasExtras = parseFloat(document.getElementById('horas-extras').value);
                    salarioLiquido -= horasExtras * Y; // Substitua Y pelo valor da hora extra
                } else if (desconto === 'adiantamento') {
                    const adiantamento = parseFloat(document.getElementById('adiantamento').value);
                    salarioLiquido -= adiantamento; // Desconto de adiantamento
                }
                // Adicione mais condições para outros descontos, se necessário
            });

            // Exibe as informações da folha de pagamento
            const folhaPagamentoDiv = document.getElementById('folha-pagamento');
            folhaPagamentoDiv.innerHTML = `
                <h2>${funcionario.nome}</h2>
                <p>Cargo: ${funcionario.cargo}</p>
                <p>Salário Bruto: R$ ${funcionario.salario.toFixed(2)}</p>
                <p>Descontos:</p>
                <ul>
                    ${descontosSelecionados.map(desconto => `<li>${desconto}</li>`).join('')}
                </ul>
                <p>Salário Líquido: R$ ${salarioLiquido.toFixed(2)}</p>
            `;
        })
        .catch(error => {
            console.error('Erro ao carregar dados:', error);
        });
});
