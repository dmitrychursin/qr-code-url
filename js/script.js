document.addEventListener('DOMContentLoaded', function () {
	let url = document.querySelector('[name="url"]');
	let qrcodeContainer = document.getElementById("qrcode");
	let errorMessage = document.querySelector('.error-message');

	var qrcode = new QRCode(qrcodeContainer, {
		width: 512,
		height: 512
	});

	let showErrorMessage = function (message) {
		errorMessage.innerHTML = message;
		errorMessage.classList.add('error-message-active');
		qrcodeContainer.querySelector('img').style.display = 'none';
		qrcodeContainer.querySelector('img').src = '';
		let canvas = qrcodeContainer.querySelector('canvas');
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
		canvas.style.display = 'block';
		url.focus();
	};

	let hideErrorMessage = function () {
		errorMessage.classList.remove('error-message-active');
		errorMessage.innerHTML = '';
	};

	let makeCode = function () {

		if (url.value == '') {
			showErrorMessage('Введите адрес ресурса, который хотите закодировать');
			return;
		}

		if (!url.value.match(/^[a-z]+:\/\//)) {
			showErrorMessage('Адрес должен начинаться с протокола,\nнапример, http:// или https://');
			return;
		}

		qrcode.makeCode(url.value);
	}

	url.addEventListener('keypress', function () {
		hideErrorMessage();
	});

	url.addEventListener('paste', function () {
		hideErrorMessage();
	});

	document.querySelector('button').addEventListener('click', function () {
		makeCode();
	});
});