// ======================================================================
//     CODE PRÊT À L'EMPLOI - NE RIEN MODIFIER
// ======================================================================

document.addEventListener('DOMContentLoaded', () => {

    // (Votre code existant pour la page d'accueil, etc. reste ici)
    // ...
    // ...

    // GESTION DU MENU ET DU THÈME (Existant)
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if(menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => { mainNav.classList.toggle('active'); menuToggle.classList.toggle('active'); });
        mainNav.addEventListener('click', (e) => { if (e.target.closest('a')) { mainNav.classList.remove('active'); menuToggle.classList.remove('active'); } });
    }
    const themeToggle = document.getElementById('theme-toggle');
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            const html = document.documentElement;
            const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            themeToggle.querySelector('i').className = `fa-solid ${newTheme === 'dark' ? 'fa-sun' : 'fa-moon'}`;
        });
    }

    // GESTION DES CARTES PRODUITS (Existant)
    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length > 0) {
        productCards.forEach(card => {
            const likeBtn = card.querySelector('.like-btn');
            const commentBtn = card.querySelector('.comment-btn');
            const shareBtn = card.querySelector('.share-btn');
            const sendBtn = card.querySelector('.send-btn');
            const commentSection = card.querySelector('.product-comments-section');
            const newCommentForm = card.querySelector('.new-comment-form');
            if (likeBtn) { likeBtn.addEventListener('click', () => { const icon = likeBtn.querySelector('i'); icon.classList.toggle('fa-regular'); icon.classList.toggle('fa-solid'); icon.classList.toggle('liked'); }); }
            if (commentBtn) { commentBtn.addEventListener('click', () => { commentSection.classList.toggle('visible'); }); }
            if (newCommentForm) { newCommentForm.addEventListener('submit', (e) => { e.preventDefault(); const input = newCommentForm.querySelector('input'); const commentText = input.value.trim(); if (commentText) { const commentsContainer = card.querySelector('.comments-container'); const newComment = document.createElement('div'); newComment.classList.add('comment'); newComment.textContent = commentText; commentsContainer.appendChild(newComment); input.value = ''; } }); }
            if (shareBtn) { shareBtn.addEventListener('click', async () => { const productTitle = card.querySelector('.product-card-title').textContent; const shareData = { title: 'Découvrez ce produit Élégante !', text: `J'adore ce modèle : ${productTitle}. Jetez un œil !`, url: window.location.href }; try { await navigator.share(shareData); } catch (err) { alert('Le partage n\'est pas supporté sur votre navigateur ou a été annulé.'); } }); }
            if (sendBtn) { sendBtn.addEventListener('click', () => alert("Contenu envoyé ! (simulation)")); }
        });
    }


    // ======================================================================
    // NOUVEAU CODE : ACTIVATION DES ANIMATIONS AU DÉFILEMENT (SCROLL)
    // ======================================================================
    const observerOptions = {
      root: null, // observe par rapport au viewport
      rootMargin: '0px',
      threshold: 0.1 // Se déclenche quand 10% de l'élément est visible
    };

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // L'élément est visible, on ajoute la classe pour l'animation
          entry.target.classList.add('is-visible');
        } else {
          // Optionnel : si vous voulez que l'animation s'arrête quand on quitte l'écran
          // entry.target.classList.remove('is-visible');
        }
      });
    };

    const cardObserver = new IntersectionObserver(observerCallback, observerOptions);

    // On observe chaque carte produit
    productCards.forEach(card => {
      cardObserver.observe(card);
    });

});