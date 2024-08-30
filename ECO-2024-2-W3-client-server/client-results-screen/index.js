let socket = io('http://localhost:5050', { path: '/real-time' });

socket.on('new-player', (player) => {
	renderNewPlayer(player);
});

socket.on('game-result', (result) => {
	renderGameResult(result);

});

function renderNewPlayer(player) {
	const container = document.getElementById('data-container');
	const div = document.createElement('div');
	div.className = 'item';

	div.innerHTML = `
    <img src="${player.profilePicture}" alt="${player.name}'s profile picture" />
    <p>Name: ${player.name}</p>
    <p>Chose: ${player.move}</p>
  `;

	container.appendChild(div);
}

function renderGameResult(result) {
	const container = document.getElementById('result-container');
	if (container) {
		container.innerHTML = '';
		const resultDiv = document.createElement('div');
		resultDiv.className = 'winner-announcement';
		resultDiv.innerHTML = `
			<h2>🎉 Resultado del Juego 🎉</h2>
			<p class="winner-text">${result}</p>
		`;
		container.appendChild(resultDiv);
	} else {
		console.error('Result container not found in the DOM');
	}
}