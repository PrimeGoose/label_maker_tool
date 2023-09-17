document.addEventListener('DOMContentLoaded', (event) => {
    const howToUseBtn = document.getElementById('how-to-use');
    const modal = document.getElementById('how-to-use-modal');
    const closeBtn = document.querySelector('.close-btn');

    howToUseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = "block";
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });
});