// Votação para Personagem Favorito
// Sistema de votação usando localStorage para persistência

// Inicializar votos no localStorage se não existirem
function initVotes() {
    const defaultVotes = {
        'homem-aranha': 0,
        'homem-de-ferro': 0,
        'capitao-america': 0,
        'thor': 0,
        'hulk': 0,
        'viuva-negra': 0
    };
    
    if (!localStorage.getItem('marvelVotes')) {
        localStorage.setItem('marvelVotes', JSON.stringify(defaultVotes));
    }
}

// Obter todos os votos
function getVotes() {
    return JSON.parse(localStorage.getItem('marvelVotes')) || {};
}

// Votar em um personagem
function voteForCharacter(characterName) {
    const votes = getVotes();
    if (votes[characterName] !== undefined) {
        votes[characterName]++;
        localStorage.setItem('marvelVotes', JSON.stringify(votes));
        updateVoteDisplay();
        showVoteConfirmation(characterName);
    }
}

// Atualizar a exibição dos votos
function updateVoteDisplay() {
    const votes = getVotes();
    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
    
    for (const [character, count] of Object.entries(votes)) {
        const voteCountElement = document.getElementById(`vote-${character}`);
        const percentageElement = document.getElementById(`percentage-${character}`);
        
        if (voteCountElement) {
            voteCountElement.textContent = count;
        }
        
        if (percentageElement && totalVotes > 0) {
            const percentage = ((count / totalVotes) * 100).toFixed(1);
            percentageElement.textContent = `${percentage}%`;
            percentageElement.style.width = `${percentage}%`;
        }
    }
    
    // Atualizar total de votos
    const totalElement = document.getElementById('total-votes');
    if (totalElement) {
        totalElement.textContent = totalVotes;
    }
}

// Mostrar confirmação de voto
function showVoteConfirmation(characterName) {
    const characterNames = {
        'homem-aranha': 'Homem-Aranha',
        'homem-de-ferro': 'Homem de Ferro',
        'capitao-america': 'Capitão América',
        'thor': 'Thor',
        'hulk': 'Hulk',
        'viuva-negra': 'Viúva Negra'
    };
    
    const message = `Obrigado por votar no ${characterNames[characterName]}! 🕷️`;
    showNotification(message);
}

// Mostrar notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'vote-notification';
    notification.innerHTML = `
        <span class="notification-icon">✅</span>
        <span class="notification-text">${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Reiniciar votação
function resetVotes() {
    if (confirm('Tem certeza que deseja reiniciar toda a votação? 🤔')) {
        localStorage.removeItem('marvelVotes');
        initVotes();
        updateVoteDisplay();
        showNotification('Votação reiniciada! 🔄');
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initVotes();
    updateVoteDisplay();
    
    // Adicionar evento de clique aos botões de votação
    document.querySelectorAll('.vote-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const character = this.getAttribute('data-character');
            voteForCharacter(character);
        });
    });
});
