	const player1HPstatus = document.querySelector('.player-1__hp')
	const player2HPstatus = document.querySelector('.player-2__hp')
	const observer = new MutationObserver(endGame);

	function endGame(mutations) {
		if(mutations[0]['target'].classList.contains('player-1__hp-value') && mutations[0].target.childNodes[0].data <= 0) {
			document.querySelector('.player-2__name').textContent = 'Chicken';
			boardModel.cardInHand.classList.add('hidden')
		}
		if (mutations[0]['target'].classList.contains('player-2__hp-value') && mutations[0].target.childNodes[0].data <= 0) {
			document.querySelector('.player-1__name').textContent = 'Chicken';
			boardModel.cardInHand.classList.add('hidden')
		}
	}

	observer.observe(player1HPstatus, {
		childList: true,
		subtree: true,
		characterData: true
	})
	observer.observe(player2HPstatus, {
		childList: true,
		subtree: true,
		characterData: true
	})