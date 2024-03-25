document.addEventListener("DOMContentLoaded", function() {
    const adicionalTempoServicoCheckbox = document.querySelector('input[name="adicional-tempo-servico"]');
    const horasExtrasCheckbox = document.querySelector('input[name="horas-extras"]');
    const adiantamentoCheckbox = document.querySelector('input[name="adiantamento"]');

    adicionalTempoServicoCheckbox.addEventListener('change', function() {
        const adicionalTempoServicoInput = document.getElementById('adicional-tempo-servico-input');
        if (this.checked) {
            adicionalTempoServicoInput.style.display = 'block';
        } else {
            adicionalTempoServicoInput.style.display = 'none';
        }
        saveSelectedDiscounts(); // Salvar os descontos selecionados
    });

    horasExtrasCheckbox.addEventListener('change', function() {
        const horasExtrasInput = document.getElementById('horas-extras-input');
        if (this.checked) {
            horasExtrasInput.style.display = 'block';
        } else {
            horasExtrasInput.style.display = 'none';
        }
        saveSelectedDiscounts(); // Salvar os descontos selecionados
    });

    adiantamentoCheckbox.addEventListener('change', function() {
        const adiantamentoInput = document.getElementById('adiantamento-input');
        if (this.checked) {
            adiantamentoInput.style.display = 'block';
        } else {
            adiantamentoInput.style.display = 'none';
        }
        saveSelectedDiscounts(); // Salvar os descontos selecionados
    });

    // Função para salvar os descontos selecionados no armazenamento local
    function saveSelectedDiscounts() {
        const selectedDiscounts = {
            "adicional-tempo-servico": adicionalTempoServicoCheckbox.checked,
            "horas-extras": horasExtrasCheckbox.checked,
            "adiantamento": adiantamentoCheckbox.checked
        };
        localStorage.setItem('selectedDiscounts', JSON.stringify(selectedDiscounts));
    }

    const formSelecionarDescontosAdicionais = document.getElementById('form-selecionar-descontos-adicionais');
    
    if (formSelecionarDescontosAdicionais) { // Verifica se o formulário existe
        formSelecionarDescontosAdicionais.addEventListener('submit', function(event) {
            event.preventDefault();

            // Redirecionar para a próxima página (visualizar folha de pagamento)
            window.location.href = 'visualizar-folha-pagamento.html';
        });
    } else {
        console.log("Formulário não encontrado");
    }
});
