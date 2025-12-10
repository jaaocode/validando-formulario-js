function validaFormulario() {
    const form = document.querySelector('#form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        if (verificaCampo()) {
            alert('Formulário enviado com sucesso!');
            form.reset();
        } else {
            console.log('Formulário inválido!');
        }
    });
}

function verificaCampo() {
    const form = document.querySelector('#form');
    let isValid = true;
    
    for (let errorText of form.querySelectorAll('.error-text')) {
        errorText.remove();
    }

    if (!verificaNome()) {
        isValid = false;
    }
    if (!verificaUser()) {
        isValid = false;
    }
    if (!verificaSenha()) {
        isValid = false;
    }
    if (!verificaCPF()) {
        isValid = false;
    }
    
    return isValid;
}

function verificaNome() {
    const nameInput = document.querySelector('#name');
    const name = nameInput.value.trim();
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
    let isValid = true;
    
    if (!name) {
        retornaErro(nameInput, 'Por favor, preencha com seu nome real');
        isValid = false;
    } else if (!regex.test(name)) {
        retornaErro(nameInput, 'Não pode conter números ou caracteres especiais');
        isValid = false;
    }
    
    return isValid;
}

function verificaUser() {
    const userInput = document.querySelector('.user');
    const user = userInput.value.trim();
    const regex = /^[a-zA-Z0-9]+$/;
    let isValid = true;
    
    if (!user) {
        retornaErro(userInput, 'Nome de usuário não pode ser vazio');
        return false;
    }
    
    if (user.length < 3 || user.length > 12) {
        retornaErro(userInput, 'Seu nome de usuário deve ter entre 3 e 12 caracteres');
        isValid = false;
    }
    
    if (!regex.test(user)) {
        retornaErro(userInput, 'Seu nome de usuário não deve ter caracteres especiais');
        isValid = false;
    }
    
    return isValid;
}

function verificaSenha() {
    const passwordInput = document.querySelector('#password');
    const passwordConfirmInput = document.querySelector('#passwordConfirm');
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;
    let isValid = true;
    
    if (!password || password.length < 8) {
        retornaErro(passwordInput, 'Sua senha deve ter no mínimo 8 caracteres');
        isValid = false;
    }
    
    if (!passwordConfirm) {
        retornaErro(passwordConfirmInput, 'Por favor, confirme sua senha');
        isValid = false;
    } else if (passwordConfirm !== password) {
        retornaErro(passwordConfirmInput, 'As senhas não coincidem');
        isValid = false;
    }
    
    return isValid;
}

function validaCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11) {
        return false;
    }
    
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.charAt(9))) {
        return false;
    }
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.charAt(10))) {
        return false;
    }
    
    return true;
}

function verificaCPF() {
    const cpfInput = document.querySelector('.cpf');
    const cpf = cpfInput.value;
    
    if (!cpf || cpf.trim() === '') {
        retornaErro(cpfInput, 'CPF não pode ser vazio');
        return false;
    }
    
    if (!validaCPF(cpf)) {
        retornaErro(cpfInput, 'CPF inválido');
        return false;
    }
    
    return true;
}

function retornaErro(field, msg) {
    const div = document.createElement('div');
    const container = field.closest('.input-container');
    div.innerText = msg;
    div.classList.add('error-text');
    
    if (container) {
        container.insertAdjacentElement('afterend', div);
    } else {
        field.insertAdjacentElement('afterend', div);
    }
}

validaFormulario();