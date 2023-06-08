let candidates = [
];

async function loadMovies(dataFile) {
    const request = await fetch(dataFile);
    if (request.status !== 200) {
        throw 'Failed to load movies!';
    }
    candidates = (await request.text()).split('\n');
}

function disableWithError(error, targetEl, triggerBtn) {
    targetEl.innerText = error;
    triggerBtn.setAttribute('disabled', 'disabled');
}
function pick() {
    return candidates[parseInt('' + Math.random() * candidates.length)];
}

function count() {
    return candidates.length;
}

let typingAnimationHandle = null;

function typingAnimation(text, targetEl) {
    targetEl.innerText = '';
    let i = 0;
    const TYPING_DELAY = 200;
    const TYPING_DELAY_VARIANCE = 0.5;
    if (typingAnimationHandle !== null) {
        clearTimeout(typingAnimationHandle);
    }
    var typingFn = function() {
        let newChar = text.substring(i, i + 1);
        if (newChar === ' ' && text.length >= i + 2) {
            newChar += text.substring(i + 1, i + 2);
            i++;
        }
        targetEl.innerText += newChar;
        if (i + 1 < text.length) {
            i++;
            typingAnimationHandle = setTimeout(typingFn, TYPING_DELAY * TYPING_DELAY_VARIANCE * Math.random() * Math.random());
        }
    }
    typingAnimationHandle = setTimeout(typingFn, 0);
}

function transformToDisneyPlusUrl(movie) {
    return movie
        .toLowerCase()
        .replaceAll(/\s+/g, '-')
        .replaceAll(/[^a-z0-9\-]/g, '');
}